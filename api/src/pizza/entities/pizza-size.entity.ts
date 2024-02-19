import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from 'src/order/entities/order.entity';

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

  @ManyToOne(() => OrderEntity, (order) => order.pizzaType)
  orders: OrderEntity[];
}
