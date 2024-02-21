import { Injectable } from '@nestjs/common';
import { DeliveryEntity } from '../entities/delivery.entity';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { OrderStateMachineService } from 'src/order/services/state-machine/order-state-machine-service';
import { DeliveryRepositoryService } from './delivery-repository.service';

@Injectable()
export class DeliveryService {
  constructor(
    private deliveryRepositoryService: DeliveryRepositoryService,
    private orderStateMachine: OrderStateMachineService,
  ) {}

  async getDeliveryOrder(id: number): Promise<DeliveryEntity> {
    return await this.deliveryRepositoryService.getDeliveryOrder(id);
  }

  async getOrdersReadyForDelivery(): Promise<DeliveryEntity[]> {
    return await this.deliveryRepositoryService.getOrdersReadyForDelivery();
  }

  async pickOrderForDelivery(id: number): Promise<void> {
    const delivery = await this.getDeliveryOrder(id);
    await this.orderStateMachine.moveOrderToState(
      delivery.order,
      OrderStatuses.Delivery,
    );
  }

  async completeOrder(
    id: number,
    status: OrderStatuses.Completed | OrderStatuses.Cancelled,
  ): Promise<void> {
    const delivery = await this.getDeliveryOrder(id);
    await this.orderStateMachine.moveOrderToState(delivery.order, status);
  }
}
