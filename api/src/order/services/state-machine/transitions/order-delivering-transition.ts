import { DeliveryRepositoryService } from './../../../../delivery/services/delivery-repository.service';
import { OrderEntity } from '../../../entities/order.entity';
import { Injectable } from '@nestjs/common';
import { OrderBaseTransition } from './order-base-transition';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { OrderRepositoryService } from '../../order-repository.service';
import { KitchenRepositoryService } from 'src/kitchen/services/kitchen-repository.service';

@Injectable()
export class OrderDeliveringTransition extends OrderBaseTransition {
  constructor(
    private orderRepositoryService: OrderRepositoryService,
    private deliveryService: DeliveryRepositoryService,
    private kitchenService: KitchenRepositoryService,
  ) {
    super();
  }

  validInitialStates = [OrderStatuses.ReadyForPickup];

  async moveToFinalState(order: OrderEntity) {
    await this.kitchenService.markAsTakenForDelivery(order.kitchen);
    await this.deliveryService.pickOrderForDelivery(order.delivery);
    await this.orderRepositoryService.updateOrderStatus(
      order,
      OrderStatuses.Delivery,
    );
  }
}
