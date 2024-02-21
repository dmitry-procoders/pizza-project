import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { PizzaExtraComponentEntity } from 'src/pizza/entities/pizza-extra-component.entity';
import { PizzaSizeEntity } from 'src/pizza/entities/pizza-size.entity';
import { PizzaTypeEntity } from 'src/pizza/entities/pizza-type.entity';
import { OrderEntity } from './order.entity';

@Entity('order-item')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PizzaTypeEntity, (pizzaType) => pizzaType.orderItems, {
    cascade: true,
  })
  pizzaType: PizzaTypeEntity;

  @ManyToOne(() => PizzaSizeEntity, (pizzaSize) => pizzaSize.orderItems, {
    cascade: true,
  })
  pizzaSize: PizzaSizeEntity;

  @ManyToMany(
    () => PizzaExtraComponentEntity,
    (pizzaExtraComponent) => pizzaExtraComponent.orderItems,
    { cascade: true },
  )
  @JoinTable({
    name: 'order_item_pizza_extra_components',
  })
  pizzaExtraComponents: PizzaExtraComponentEntity[];

  @ManyToOne(() => OrderEntity, (order) => order.items)
  order: OrderEntity;
}
