import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItemEntity } from 'src/order/entities/order-item.entity';

@Entity('pizza_extra_component')
export class PizzaExtraComponentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  value: string;

  @Column()
  description: string;

  @Column({ length: 255 })
  image: string;

  @Column({ default: true })
  status: boolean;

  @ManyToMany(
    () => OrderItemEntity,
    (orderItem) => orderItem.pizzaExtraComponents,
  )
  orderItems: OrderItemEntity[];
}
