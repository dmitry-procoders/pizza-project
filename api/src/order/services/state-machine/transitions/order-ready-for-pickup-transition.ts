import { DeliveryRepositoryService } from './../../../../delivery/services/delivery-repository.service';
import { OrderEntity } from '../../../entities/order.entity';
import { Injectable } from '@nestjs/common';
import { OrderBaseTransition } from './order-base-transition';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { OrderRepositoryService } from '../../order-repository.service';
import { KitchenRepositoryService } from 'src/kitchen/services/kitchen-repository.service';

@Injectable()
export class OrderReadyForPickUpTransition extends OrderBaseTransition {
  constructor(
    private orderRepositoryService: OrderRepositoryService,
    private kitchenService: KitchenRepositoryService,
    private deliveryService: DeliveryRepositoryService,
  ) {
    super();
  }

  validInitialStates = [OrderStatuses.Preparing];

  async moveToFinalState(order: OrderEntity) {
    await this.kitchenService.markAsPrepared(order.kitchen);
    await this.deliveryService.markAsReadyForPickup(order);
    await this.orderRepositoryService.updateOrderStatus(
      order,
      OrderStatuses.ReadyForPickup,
    );
  }
}
