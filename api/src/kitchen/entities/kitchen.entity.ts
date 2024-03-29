import { OrderEntity } from 'src/order/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { KitchenStatuses } from '../constants/kitchen-statuses';

@Entity('kitchen')
export class KitchenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  status: KitchenStatuses;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'NOW()',
  })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  finishedAt: Date;

  @OneToOne(() => OrderEntity, (order) => order.kitchen, { cascade: true })
  @JoinColumn({
    name: 'orderId',
    referencedColumnName: 'id',
  })
  order: OrderEntity;
}
