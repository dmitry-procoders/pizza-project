import { OrderEntity } from 'src/order/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, Column } from 'typeorm';
import { BillingStatuses } from '../constants/billing-statuses';

@Entity()
export class BillingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  status: BillingStatuses;

  @Column({
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp with time zone',
  })
  paidAt: Date;

  @OneToOne(() => OrderEntity, (order) => order.delivery)
  order: OrderEntity;
}
