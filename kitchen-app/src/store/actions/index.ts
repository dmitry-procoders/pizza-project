import { PizzaExtraComponent } from "@/interfaces/PizzaExtraComponent";
import { PizzaSize } from "@/interfaces/PizzaSize";
import { PizzaType } from "@/interfaces/PizzaType";

export const addOrderItem = (
  pizzaSize: PizzaSize, 
  pizzaType: PizzaType, 
  pizzaExtraComponents: PizzaExtraComponent[],
) => ({
  type: 'ADD_CART_ITEM',
  payload: {
    pizzaSize,
    pizzaType,
    pizzaExtraComponents
  },
});

export const clearCart = () => ({
  type: 'CLEAR_CART',
});
