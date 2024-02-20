import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { OrderStatuses } from '../constants/order-statuses';
import { KitchenEntity } from 'src/kitchen/entities/kitchen.entity';
import { DeliveryEntity } from 'src/delivery/entities/delivery.entity';
import { OrderItemEntity } from './order-item.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  phone: string;

  @Column({ length: 255 })
  address: string;

  @Column()
  isBilledOnline: boolean;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'NOW()',
  })
  @Index()
  createdAt: Date;

  @Column({ length: 50 })
  status: OrderStatuses;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  items: OrderItemEntity[];

  @OneToOne(() => KitchenEntity, (kitchen) => kitchen.order)
  kitchen: KitchenEntity;

  @OneToOne(() => DeliveryEntity, (delivery) => delivery.order)
  delivery: DeliveryEntity;
}
