import { DeliveryRepositoryService } from './../../../../delivery/services/delivery-repository.service';
import { OrderEntity } from '../../../entities/order.entity';
import { Injectable } from '@nestjs/common';
import { OrderBaseTransition } from './order-base-transition';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { OrderRepositoryService } from '../../order-repository.service';
import { KitchenRepositoryService } from 'src/kitchen/services/kitchen-repository.service';

/**
 * Order ready for preparing transition.
 * @param orderRepositoryService - Service to interact with order repository.
 * @param deliveryRepositoryService - Service to interact with delivery repository.
 */
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

  /**
   * Moves the given order to the final state of "Ready for Pickup".
   * This method performs the following actions in sequence:
   * 1. Marks the kitchen order as prepared.
   * 2. Marks the order as ready for pickup by the delivery service.
   * 3. Updates the order status in the repository to "Ready for Pickup".
   * @param {OrderEntity} order - The order entity to be moved to the final state.
   * @returns {Promise<void>} A promise that resolves when the order has been successfully moved to the final state.
   */
  async moveToFinalState(order: OrderEntity) {
    await this.kitchenService.markAsPrepared(order.kitchen);
    await this.deliveryService.markAsReadyForPickup(order);
    await this.orderRepositoryService.updateOrderStatus(
      order,
      OrderStatuses.ReadyForPickup,
    );
  }
}
