import { Injectable } from '@nestjs/common';
import { OrderStateMachineService } from 'src/order/services/state-machine/order-state-machine-service';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { DeliveryEntity } from '../entities/delivery.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { DeliveryRepositoryService } from './delivery-repository.service';

@Injectable()
export class DeliveryPickUpService {
  constructor(
    private deliveryService: DeliveryRepositoryService,
    private orderStateMachineService: OrderStateMachineService,
  ) {}

  async reviewOrdersReadyForPickup() {
    const orderReadyForDelivery =
      await this.deliveryService.getOrdersReadyForDelivery();
    for (const deliveryRecord of orderReadyForDelivery) {
      const order = this.mapDeliveryToOrder(deliveryRecord);
      this.orderStateMachineService.moveOrderToState(
        order,
        OrderStatuses.Delivery,
      );
    }
  }

  private mapDeliveryToOrder(deliveryRecord: DeliveryEntity): OrderEntity {
    const order = Object.assign({}, deliveryRecord.order);
    order.kitchen = deliveryRecord.order.kitchen;
    order.delivery = deliveryRecord;
    delete order.delivery.order;
    return order;
  }
}
