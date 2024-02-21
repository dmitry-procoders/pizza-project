import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryEntity } from '../entities/delivery.entity';
import { DeliveryStatuses } from '../constants/delivery-statuses';
import { OrderEntity } from 'src/order/entities/order.entity';

@Injectable()
export class DeliveryRepositoryService {
  constructor(
    @InjectRepository(DeliveryEntity)
    private repository: Repository<DeliveryEntity>,
  ) {}

  async getDeliveryOrder(id: number): Promise<DeliveryEntity> {
    const delivery = await this.repository.findOneOrFail({
      where: { id },
      relations: ['order'],
    });
    return delivery;
  }

  async getOrdersReadyForDelivery(): Promise<DeliveryEntity[]> {
    return await this.repository.find({
      where: {
        status: DeliveryStatuses.Pending,
      },
      relations: ['order', 'order.kitchen'],
    });
  }

  async getOrdersInDelivery(): Promise<DeliveryEntity[]> {
    return await this.repository.find({
      where: {
        status: DeliveryStatuses.Delivering,
      },
      relations: ['order'],
    });
  }

  async markAsReadyForPickup(order: OrderEntity): Promise<void> {
    const delivery = new DeliveryEntity();
    delivery.status = DeliveryStatuses.Pending;
    delivery.order = Object.assign(new OrderEntity(), {
      id: order.id,
    });
    await this.repository.save(delivery);
  }

  async pickOrderForDelivery(delivery: DeliveryEntity): Promise<void> {
    await this.repository.update(delivery.id, {
      status: DeliveryStatuses.Delivering,
      createdAt: new Date(),
    });
  }

  async markOrderAsDelivered(delivery: DeliveryEntity): Promise<void> {
    await this.repository.update(delivery.id, {
      status: DeliveryStatuses.Ready,
      finishedAt: new Date(),
    });
  }
}
