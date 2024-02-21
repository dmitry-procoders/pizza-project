import { CartItem } from "./CartItem";

export interface Cart {
  name: string;
  phone: string;
  address: string;
  cartItems: CartItem[];
}