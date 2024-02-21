import { Injectable } from '@nestjs/common';
import { OrderStateMachineService } from 'src/order/services/state-machine/order-state-machine-service';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { DeliveryEntity } from '../entities/delivery.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { DeliveryRepositoryService } from './delivery-repository.service';

@Injectable()
export class DeliveryCompletionService {
  constructor(
    private deliveryService: DeliveryRepositoryService,
    private orderStateMachineService: OrderStateMachineService,
  ) {}

  async reviewDeliveringOrders() {
    const deliveringOrders = await this.deliveryService.getOrdersInDelivery();
    for (const deliveryRecord of deliveringOrders) {
      const order = this.mapDeliveryToOrder(deliveryRecord);
      const status = OrderStatuses.Completed;
      this.orderStateMachineService.moveOrderToState(order, status);
    }
  }

  private mapDeliveryToOrder(deliveryRecord: DeliveryEntity): OrderEntity {
    const order = Object.assign({}, deliveryRecord.order);
    order.delivery = deliveryRecord;
    return order;
  }
}
