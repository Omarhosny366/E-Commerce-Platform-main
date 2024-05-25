import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { PaymentRequestDTO } from './dto/payment-request.dto';
import { authenticate } from './utils/authenticate';
import { OrderResponseDTO } from './dto/order-response.dto';
import { PaymentKeyResponseDTO } from './dto/payment-key-response.dto';
import { CartSingleton } from './cartSingleton';
import { UserSingleton } from './userSingleton';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaMessage } from 'kafkajs';

const PAYMOB_URL = "https://accept.paymob.com/api";

@Injectable()
export class PaymentService implements OnModuleInit {
  private readonly logger = new Logger(PaymentService.name);

  constructor(@Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('user.logged.in');
    this.kafkaClient.subscribeToResponseOf('cart.details');
    await this.kafkaClient.connect();
    this.logger.log('Kafka client connected and subscribed to topics');
  }

  @KafkaListener('user.logged.in')
  async handleUserLoggedIn(message: KafkaMessage) {
    try {
      const user = JSON.parse(message.value.toString());
      const userSingleton = UserSingleton.getInstance();
      userSingleton.setCurrentUser(user);
      this.logger.log(`Received user data: ${JSON.stringify(user)}`);
    } catch (error) {
      this.logger.error('Error parsing user data:', error);
    }
  }

  @KafkaListener('cart.details')
  async handleCartDetails(message: KafkaMessage) {
    try {
      const cart = JSON.parse(message.value.toString());
      const cartSingleton = CartSingleton.getInstance();
      cartSingleton.setCurrentCart(cart);
      this.logger.log(`Received cart data: ${JSON.stringify(cart)}`);
    } catch (error) {
      this.logger.error('Error parsing cart data:', error);
    }
  }

  async pay(paymentRequestDTO: PaymentRequestDTO): Promise<string | undefined> {
    try {
      const { order_cart, billing_data, amount_cents, delivery_needed } = paymentRequestDTO;

      // Authentication Request -- step 1 in the docs
      const accessToken = await authenticate();

      if (!accessToken) {
        throw new Error("Authentication failed. No access token obtained.");
      }

      // Order Registration API -- step 2 in the docs
      const orderUrl = `${PAYMOB_URL}/ecommerce/orders`;
      const headers = {
        "Content-Type": "application/json",
      };
      const orderData = {
        auth_token: accessToken,
        delivery_needed,
        amount_cents,
        currency: "EGP",
        items: order_cart,
      };
      const orderResponse: AxiosResponse<OrderResponseDTO> = await axios.post(orderUrl, orderData, { headers });
      const orderId = orderResponse.data.id;

      // Payment Key Request  -- step 3 in the docs
      const paymentKeyUrl = `${PAYMOB_URL}/acceptance/payment_keys`;
      const paymentKeyData = {
        auth_token: accessToken,
        amount_cents,
        delivery_needed,
        expiration: 3600,
        order_id: orderId,
        billing_data,
        currency: "EGP",
        lock_order_when_paid: "false",
        integration_id: 4580362, // Replace with your integration id
      };
      const paymentKeyResponse: AxiosResponse<PaymentKeyResponseDTO> = await axios.post(paymentKeyUrl, paymentKeyData, { headers });
      const paymentToken = paymentKeyResponse.data.token;

      // Construct the iframe URL
      const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/847842?payment_token=${paymentToken}`;
      
      // Add the billing data
      console.log("Payment URL:", iframeUrl);
      console.log("Billing data:", billing_data);
      return iframeUrl;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error in pay function:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
      return undefined;
    }
  }

  async getTransactionById(transactionId: string): Promise<PaymentKeyResponseDTO | undefined> {
    try {
      // Authenticate -- Step 1
      const accessToken = await authenticate();
      const url = `${PAYMOB_URL}/acceptance/transactions/${transactionId}`;
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      };
      const response: AxiosResponse<PaymentKeyResponseDTO> = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error in getTransactionById function:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
      // Rethrow the error for the caller to handle
      throw error;
    }
  }

  async getOrderStatusByTransactionId(transactionId: string): Promise<OrderResponseDTO | undefined> {
    try {
      // Authenticate -- Step 1
      const accessToken = await authenticate();
      const url = `${PAYMOB_URL}/acceptance/transactions/${transactionId}/order`;
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      };
      const response: AxiosResponse<OrderResponseDTO> = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error in getOrderStatusByTransactionId function:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
      // Rethrow the error for the caller to handle
      throw error;
    }
  }

  async getOrderStatusByOrderId(orderId: string): Promise<OrderResponseDTO | undefined> {
    try {
      // Authenticate -- Step 1
      const accessToken = await authenticate();
      const url = `${PAYMOB_URL}/ecommerce/orders/${orderId}`;
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      };
      const response: AxiosResponse<OrderResponseDTO> = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error in getOrderStatusByOrderId function:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
      // Rethrow the error for the caller to handle
      throw error;
    }
  }
}

function KafkaListener(topic: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const [message] = args;
      if (message.topic === topic) {
        return method.apply(this, args);
      }
    };
  };
}
