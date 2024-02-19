import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from 'src/order/entities/order.entity';

@Entity()
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

  @ManyToMany(() => OrderEntity, (order) => order.pizzaExtraComponents)
  orders: OrderEntity[];
}
