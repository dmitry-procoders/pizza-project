import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryEntity } from '../entities/delivery.entity';
import { DeliveryStatuses } from '../constants/delivery-statuses';
import { OrderService } from 'src/order/services/order.service';
import { OrderStatuses } from 'src/order/constants/order-statuses';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(DeliveryEntity)
    private repository: Repository<DeliveryEntity>,
    private orderService: OrderService,
  ) {}

  async getDeliveryOrder(id: number): Promise<DeliveryEntity> {
    return await this.repository.findOneOrFail({
      where: { id },
      relations: ['order'],
    });
  }

  async getOrdersReadyForDelivery(): Promise<DeliveryEntity[]> {
    return await this.repository.find({
      where: { status: DeliveryStatuses.Pending },
    });
  }

  async pickOrderForDelivery(id: number): Promise<void> {
    const delivery = await this.getDeliveryOrder(id);
    if (delivery.status !== DeliveryStatuses.Pending) {
      throw new Error('Delivery is not pending');
    }
    await this.repository.update(id, {
      status: DeliveryStatuses.Delivering,
      createdAt: new Date(),
    });
  }

  async completeOrder(
    id: number,
    status: OrderStatuses.Completed | OrderStatuses.Cancelled,
  ): Promise<void> {
    const delivery = await this.getDeliveryOrder(id);
    if (delivery.status !== DeliveryStatuses.Delivering) {
      throw new Error('Delivery is not in delivering status');
    }
    await this.repository.update(id, {
      status: DeliveryStatuses.Delivering,
      finishedAt: new Date(),
    });
    // close order
    if (status === OrderStatuses.Completed) {
      await this.orderService.completeOrder(delivery.order.id);
    } else {
      await this.orderService.cancelOrder(delivery.order.id);
    }
  }
}
