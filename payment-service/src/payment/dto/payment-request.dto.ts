import { OrderItemDTO } from './create-order.dto';
import { BillingDataDTO } from './billing-data.dto';

export class PaymentRequestDTO {
  order_cart: OrderItemDTO[];
  billing_data: BillingDataDTO;
  amount_cents: string;
  delivery_needed: string;
}
