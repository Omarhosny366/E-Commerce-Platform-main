  import { Injectable, Inject, OnModuleInit, BadRequestException } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model, Types } from 'mongoose';
  import { ClientKafka } from '@nestjs/microservices';
  import { Cart } from './schemas/cart.schema';
  import { UserSingleton } from './userSingleton';

  @Injectable()
  export class CartService implements OnModuleInit {
    constructor(
      @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
      @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    ) {}

    async onModuleInit() {
      this.kafkaClient.subscribeToResponseOf('get.product.price');
      this.kafkaClient.subscribeToResponseOf('get.product.mat');
      this.kafkaClient.subscribeToResponseOf('get.product.type');
      this.kafkaClient.subscribeToResponseOf('get.product.dimm');
      this.kafkaClient.subscribeToResponseOf('get.product.qua');
      this.kafkaClient.subscribeToResponseOf('get.product.pricee');
      this.kafkaClient.subscribeToResponseOf('get.product.matt');
      this.kafkaClient.subscribeToResponseOf('get.product.typee');
      this.kafkaClient.subscribeToResponseOf('get.product.dimmm');
      this.kafkaClient.subscribeToResponseOf('get.product.quaa');
      this.kafkaClient.subscribeToResponseOf('get.product.price.cus');
      this.kafkaClient.subscribeToResponseOf('get.product.mat.cus');
      this.kafkaClient.subscribeToResponseOf('get.product.type.cus');
      this.kafkaClient.subscribeToResponseOf('get.product.dimm.cus');
      this.kafkaClient.subscribeToResponseOf('get.product.qua.cus');


      await this.kafkaClient.connect();
    }
   

    private getCurrentUserId(): string {
      const userSingleton = UserSingleton.getInstance();
      const currentUser = userSingleton.getCurrentUser();
      if (!currentUser) {
        throw new Error('User not logged in');
      }
      return currentUser.id;
    }

   
    async getProductQuantity(productId: string): Promise<number> {
      console.log(`Requesting product price for ID: ${productId}`);
      try {
        const response = await this.kafkaClient.send('get.product.qua', { productId }).toPromise();
        console.log(`Received product price: ${response.quantity}`);
        return response.quantity;
      } catch (error) {
        console.error('Error fetching product price from rent service:', error);
        try {
          const response2 = await this.kafkaClient.send('get.product.quaa', { productId }).toPromise();
          console.log(`Received product price from purchase service: ${response2.quantity}`);
          return response2.quantity;
        } catch (error2) {
          console.error('Error fetching product price from purchase service:', error2);
          try {
            const response3 = await this.kafkaClient.send('get.product.qua.cus', { productId }).toPromise();
            console.log(`Received product price from custom purchase service: ${response3.quantity}`);
            return response3.quantity;
          } catch (error3) {
            console.error('Error fetching product price from custom purchase service:', error3);
            throw new Error('Product price not found');
          }
        }
      }
    }



    async getProductPrice(productId: string): Promise<number> {
      console.log(`Requesting product price for ID: ${productId}`);
      try {
        const response = await this.kafkaClient.send('get.product.price', { productId }).toPromise();
        console.log(`Received product price: ${response.price}`);
        return response.price;
      } catch (error) {
        console.error('Error fetching product price from rent service:', error);
        try {
          const response2 = await this.kafkaClient.send('get.product.pricee', { productId }).toPromise();
          console.log(`Received product price from purchase service: ${response2.price}`);
          return response2.price;
        } catch (error2) {
          console.error('Error fetching product price from purchase service:', error2);
          try {
            const response3 = await this.kafkaClient.send('get.product.price.cus', { productId }).toPromise();
            console.log(`Received product price from custom purchase service: ${response3.price}`);
            return response3.price;
          } catch (error3) {
            console.error('Error fetching product price from custom purchase service:', error3);
            throw new Error('Product price not found');
          }
        }
      }
    }

    async getProductType(productId: string): Promise<string> {
      console.log(`Requesting product type for ID: ${productId}`);
      try {
        const response = await this.kafkaClient.send('get.product.type', { productId }).toPromise();
        console.log(`Received product type: ${response.type}`);
        return response.type;
      } catch (error) {
        console.error('Error fetching product type:', error);
        try {
          const response2 = await this.kafkaClient.send('get.product.typee', { productId }).toPromise();
          console.log(`Received product type from purchase service: ${response2.type}`);
          return response2.type;
        } catch (error2) {
          console.error('Error fetching product type from purchase service:', error2);
          try {
            const response3 = await this.kafkaClient.send('get.product.type.cus', { productId }).toPromise();
            console.log(`Received product type from custom purchase service: ${response3.type}`);
            return response3.type;
          } catch (error3) {
            console.error('Error fetching product type from custom purchase service:', error3);
            throw new Error('Product type not found');
          }
        }
      }
    }

    async getProductmat(productId: string): Promise<string> {
      console.log(`Requesting product material for ID: ${productId}`);
      try {
        const response = await this.kafkaClient.send('get.product.mat', { productId }).toPromise();
        console.log(`Received product material: ${response.material}`);
        return response.material;
      } catch (error) {
        console.error('Error fetching product material:', error);
        try {
          const response2 = await this.kafkaClient.send('get.product.matt', { productId }).toPromise();
          console.log(`Received product material from secondary service: ${response2.material}`);
          return response2.material;
        } catch (error2) {
          console.error('Error fetching product material from secondary service:', error2);
          try {
            const response3 = await this.kafkaClient.send('get.product.mat.cus', { productId }).toPromise();
            console.log(`Received product material from custom service: ${response3.material}`);
            return response3.material;
          } catch (error3) {
            console.error('Error fetching product material from custom service:', error3);
            throw new Error('Product material not found');
          }
        }
      }
    }

    async getProductdimm(productId: string): Promise<string> {
      console.log(`Requesting product dimensions for ID: ${productId}`);
      try {
        const response = await this.kafkaClient.send('get.product.dimm', { productId }).toPromise();
        console.log(`Received product dimensions: ${response.dimensions}`);
        return response.dimensions;
      } catch (error) {
        console.error('Error fetching product dimensions:', error);
        try {
          const response2 = await this.kafkaClient.send('get.product.dimmm', { productId }).toPromise();
          console.log(`Received product dimensions from secondary service: ${response2.dimensions}`);
          return response2.dimensions;
        } catch (error2) {
          console.error('Error fetching product dimensions from secondary service:', error2);
          try {
            const response3 = await this.kafkaClient.send('get.product.dimm.cus', { productId }).toPromise();
            console.log(`Received product dimensions from custom service: ${response3.dimensions}`);
            return response3.dimensions;
          } catch (error3) {
            console.error('Error fetching product dimensions from custom service:', error3);
            throw new Error('Product dimensions not found');
          }
        }
      }
    }

    async getCartByUserId(userId: string): Promise<Cart> {
      const cart = await this.cartModel.findOne({ userId }).exec();
      if (!cart) {
        throw new Error('Cart not found');
      }
      return cart;
    }

    async deleteCartByUserId(userId: string): Promise<void> {
      await this.cartModel.deleteOne({ userId }).exec();
    }

    async addToCart(productId: string, quantity: number, startDate?: Date, endDate?: Date): Promise<Cart> {
      const userId = this.getCurrentUserId();
      const productPrice = await this.getProductPrice(productId);
      const productType = await this.getProductType(productId);
      const productMat = await this.getProductmat(productId);
      const productDimm = await this.getProductdimm(productId);
      let ProductQuantity= await this.getProductQuantity(productId);
if (quantity>ProductQuantity){
  throw new Error('no enough products in the stock the only available quantity is '+ ProductQuantity);
     }
      if (productPrice == null) {
        throw new Error('Product price not found');
      }

      if (productType === 'Rent' && (!startDate || !endDate)) {
        throw new BadRequestException('Start date and end date must be provided for rental items.');
      }

      let cart = await this.cartModel.findOne({ userId }).exec();
      if (!cart) {
        cart = new this.cartModel({
          userId: userId,
          items: []
        });
      } else {
        if (cart.items.length > 0 && cart.items[0].type !== productType) {
          throw new Error(`Cart already has items of type "${cart.items[0].type}". Clean it to add another type.`);
        }
      }

      const itemIndex = cart.items.findIndex(item => item.product_id.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({
          product_id: new Types.ObjectId(productId),
          quantity: quantity,
          price: productPrice,
          type: productType,
          material: productMat,
          dimensions: productDimm,
        });
      }

      if (productType === 'Rent' && startDate && endDate  ) {
        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.round(Math.abs((startDate.getTime() - endDate.getTime()) / oneDay));
        cart.totalPrice = cart.items.reduce((total, item) => {
          return total + item.price * item.quantity * diffDays;
        }, 0);
        cart.downpayment = cart.totalPrice * 0.3; // Calculate downpayment
        cart.startDate = startDate;
        cart.endDate = endDate;
      } else {
        cart.totalPrice = cart.items.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
      }
      if (productType === 'customized'   ) {
        cart.totalPrice = cart.items.reduce((total, item) => {
          return total + item.price * item.quantity ;
        }, 0);
        cart.downpayment = cart.totalPrice * 0.3; 
      
      } else {
        cart.totalPrice = cart.items.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
      }

      await cart.save();
      return cart;
    }

    async deleteItemFromCart(itemId: string): Promise<Cart> {
      const userId = this.getCurrentUserId();
      let cart = await this.cartModel.findOne({ userId }).exec();
      if (!cart) {
        throw new Error('Cart not found');
      }

      const itemIndex = cart.items.findIndex(item => item.product_id.toString() === itemId);
      if (itemIndex === -1) {
        throw new Error(`Item ID ${itemId} not found in cart`);
      }

      cart.items.splice(itemIndex, 1);

      if (cart.items.length === 0) {
        await this.cartModel.deleteOne({ userId });
        return null;
      }

      cart.totalPrice = cart.items.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);

      await cart.save();
      return cart;
    }
  }
