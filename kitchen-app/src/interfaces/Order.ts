import { Cart } from "./Cart";

export interface Order extends Cart {
  id: number;
}