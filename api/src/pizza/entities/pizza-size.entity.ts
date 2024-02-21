import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItemEntity } from 'src/order/entities/order-item.entity';

@Entity('pizza_size')
export class PizzaSizeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  value: string;

  @Column()
  description: string;

  @Column({ default: true })
  status: boolean;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.pizzaType)
  orderItems: OrderItemEntity[];
}
