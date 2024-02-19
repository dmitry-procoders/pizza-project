import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from 'src/order/entities/order.entity';

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

  @ManyToOne(() => OrderEntity, (order) => order.pizzaType)
  orders: OrderEntity[];
}
