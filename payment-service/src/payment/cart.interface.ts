import { Types } from 'mongoose';

export interface Cart {
  userId: Types.ObjectId;
  items: CartItem[];
  totalPrice: number;
  downpayment?: number;
  startDate?: Date;
  endDate?: Date;
}

export interface CartItem {
  product_id: Types.ObjectId;
  quantity: number;
  price: number;
  type?: string;
  material?: any;
  dimensions?: any;
  name?: string;
  downPayment?: number;
}

  