import { DeliveryRepositoryService } from 'src/delivery/services/delivery-repository.service';
import { OrderEntity } from '../../../entities/order.entity';
import { Injectable } from '@nestjs/common';
import { OrderBaseTransition } from './order-base-transition';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { OrderRepositoryService } from 'src/order/services/order-repository.service';

/**
 * Order cancel transition.
 * @param orderRepositoryService - Service to interact with order repository.
 * @param deliveryRepositoryService - Service to interact with delivery repository.
 */
@Injectable()
export class OrderCancelTransition extends OrderBaseTransition {
  constructor(
    private orderRepositoryService: OrderRepositoryService,
    private deliveryRepositoryService: DeliveryRepositoryService,
  ) {
    super();
  }

  validInitialStates = [OrderStatuses.Pending, OrderStatuses.Delivery];

  /**
   * Moves the given order to its final state by updating its status to 'Cancelled'.
   * If the order has a delivery associated with it, marks the order as delivered.
   * @param {OrderEntity} order - The order entity to be moved to the final state.
   * @returns {Promise<void>} A promise that resolves when the order status has been updated.
   */
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
