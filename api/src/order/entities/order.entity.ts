import { PizzaExtraComponentEntity } from 'src/pizza/entities/pizza-extra-component.entity';
import { PizzaSizeEntity } from 'src/pizza/entities/pizza-size.entity';
import { PizzaTypeEntity } from 'src/pizza/entities/pizza-type.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
  ManyToMany,
  OneToOne,
  JoinTable,
} from 'typeorm';
import { OrderStatuses } from '../constants/order-statuses';
import { KitchenEntity } from 'src/kitchen/entities/kitchen.entity';
import { DeliveryEntity } from 'src/delivery/entities/delivery.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  phone: string;

  @Column()
  isBilledOnline: boolean;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'NOW()',
  })
  @Index()
  createdAt: Date;

  @Column({ length: 50 })
  status: OrderStatuses;

  @OneToMany(() => PizzaTypeEntity, (pizzaType) => pizzaType.orders, {
    cascade: true,
  })
  pizzaType: PizzaTypeEntity;

  @OneToMany(() => PizzaSizeEntity, (pizzaSize) => pizzaSize.orders, {
    cascade: true,
  })
  pizzaSize: PizzaSizeEntity;

  @ManyToMany(
    () => PizzaExtraComponentEntity,
    (pizzaExtraComponent) => pizzaExtraComponent.orders,
    { cascade: true },
  )
  @JoinTable({
    name: 'order_pizza_extra_components',
  })
  pizzaExtraComponents: PizzaExtraComponentEntity[];

  @OneToOne(() => KitchenEntity, (kitchen) => kitchen.order)
  kitchen: KitchenEntity;

  @OneToOne(() => DeliveryEntity, (delivery) => delivery.order)
  delivery: DeliveryEntity;
}
