import { CartItem } from "@/interfaces/CartItem";
import { PizzaExtraComponent } from "@/interfaces/PizzaExtraComponent";
import { PizzaSize } from "@/interfaces/PizzaSize";
import { PizzaType } from "@/interfaces/PizzaType";

export const addOrderItem = (
  pizzaSize: PizzaSize, 
  pizzaType: PizzaType, 
  pizzaExtraComponents: PizzaExtraComponent[],
) => ({
  type: 'ADD_ORDER_ITEM',
  payload: {
    pizzaSize,
    pizzaType,
    pizzaExtraComponents
  },
});

export const placeOrder = (
  namer: string,
  phone: string,
  address: string,
  cartItems: CartItem[],
  pizzaSize: PizzaSize, 
  pizzaType: PizzaType, 
  pizzaExtraComponents: PizzaExtraComponent[],
) => ({
  type: 'PLACE_ORDER',
  payload: {
    pizzaSize,
    pizzaType,
    pizzaExtraComponents
  },
});
