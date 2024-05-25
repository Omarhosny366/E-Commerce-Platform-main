export interface User {
  id: string;
  username: string;
  email: string;
  role?: string;
  PhoneNumber?: string;
  OTP?: string;
  address_Id?: string[];
  paymentCard_ID?: string[];
}
