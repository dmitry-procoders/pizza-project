import { OrderEntity } from '../../../entities/order.entity';
import { Injectable } from '@nestjs/common';
import { OrderBaseTransition } from './order-base-transition';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { OrderRepositoryService } from '../../order-repository.service';
import { DeliveryRepositoryService } from 'src/delivery/services/delivery-repository.service';

@Injectable()
export class OrderCompleteTransition extends OrderBaseTransition {
  constructor(
    private orderRepositoryService: OrderRepositoryService,
    private deliveryService: DeliveryRepositoryService,
  ) {
    super();
  }

  validInitialStates = [OrderStatuses.Delivery];

  async moveToFinalState(order: OrderEntity) {
    await this.deliveryService.markOrderAsDelivered(order.delivery);
    await this.orderRepositoryService.updateOrderStatus(
      order,
      OrderStatuses.Completed,
    );
  }
}
