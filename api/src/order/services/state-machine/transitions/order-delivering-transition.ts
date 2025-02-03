import { DeliveryRepositoryService } from './../../../../delivery/services/delivery-repository.service';
import { OrderEntity } from '../../../entities/order.entity';
import { Injectable } from '@nestjs/common';
import { OrderBaseTransition } from './order-base-transition';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { OrderRepositoryService } from '../../order-repository.service';
import { KitchenRepositoryService } from 'src/kitchen/services/kitchen-repository.service';

/**
 * Order delivering transition.
 * @param orderRepositoryService - Service to interact with order repository.
 * @param deliveryRepositoryService - Service to interact with delivery repository.
 */
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

  /**
   * Moves the given order to the final state by performing the following actions:
   * 1. Marks the order as taken for delivery in the kitchen service.
   * 2. Picks the order for delivery in the delivery service.
   * 3. Updates the order status to 'Delivery' in the order repository service.
   * @param {OrderEntity} order - The order entity to be moved to the final state.
   * @returns {Promise<void>} A promise that resolves when the order has been successfully moved to the final state.
   */
  async moveToFinalState(order: OrderEntity) {
    await this.kitchenService.markAsTakenForDelivery(order.kitchen);
    await this.deliveryService.pickOrderForDelivery(order.delivery);
    await this.orderRepositoryService.updateOrderStatus(
      order,
      OrderStatuses.Delivery,
    );
  }
}
