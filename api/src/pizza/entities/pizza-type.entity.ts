import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItemEntity } from 'src/order/entities/order-item.entity';

@Entity('pizza_type')
export class PizzaTypeEntity {
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

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.pizzaType)
  orderItems: OrderItemEntity[];
}
