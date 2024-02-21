import { OrderEntity } from 'src/order/entities/order.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { DeliveryStatuses } from '../constants/delivery-statuses';

@Entity('delivery')
export class DeliveryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  status: DeliveryStatuses;

  @Column({
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp with time zone',
  })
  finishedAt: Date;

  @OneToOne(() => OrderEntity, (order) => order.delivery, { cascade: true })
  @JoinColumn({
    name: 'orderId',
    referencedColumnName: 'id',
  })
  order: OrderEntity;
}
