import { OrderItem } from "./OrderItem";

export interface Order {
  id: number;
  name: string;
  phone: string;
  address: string;
  items: OrderItem[];
}