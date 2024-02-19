import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
