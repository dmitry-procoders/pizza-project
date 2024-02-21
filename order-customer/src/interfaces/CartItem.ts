import { PizzaExtraComponent } from './PizzaExtraComponent';
import { PizzaType } from './PizzaType';
import { PizzaSize } from './PizzaSize';

export interface CartItem {
  pizzaSize: PizzaSize;
  pizzaType: PizzaType;
  pizzaExtraComponents: PizzaExtraComponent[];
}