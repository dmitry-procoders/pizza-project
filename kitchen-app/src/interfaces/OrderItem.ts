import { PizzaExtraComponent } from './PizzaExtraComponent';
import { PizzaType } from './PizzaType';
import { PizzaSize } from './PizzaSize';

export interface OrderItem {
  pizzaSize: PizzaSize;
  pizzaType: PizzaType;
  pizzaExtraComponents: PizzaExtraComponent[];
}