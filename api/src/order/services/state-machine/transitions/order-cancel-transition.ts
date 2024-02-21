import { DeliveryRepositoryService } from 'src/delivery/services/delivery-repository.service';
import { OrderEntity } from '../../../entities/order.entity';
import { Injectable } from '@nestjs/common';
import { OrderBaseTransition } from './order-base-transition';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { OrderRepositoryService } from 'src/order/services/order-repository.service';

@Injectable()
export class OrderCancelTransition extends OrderBaseTransition {
  constructor(
    private orderRepositoryService: OrderRepositoryService,
    private deliveryRepositoryService: DeliveryRepositoryService,
  ) {
    super();
  }

  validInitialStates = [OrderStatuses.Pending, OrderStatuses.Delivery];
  async moveToFinalState(order: OrderEntity) {
    if (order.delivery) {
      await this.deliveryRepositoryService.markOrderAsDelivered(order.delivery);
    }
    await this.orderRepositoryService.updateOrderStatus(
      order,
      OrderStatuses.Cancelled,
    );
  }
}
