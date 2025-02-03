import { OrderEntity } from '../../../entities/order.entity';
import { Injectable } from '@nestjs/common';
import { OrderBaseTransition } from './order-base-transition';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { OrderRepositoryService } from '../../order-repository.service';
import { DeliveryRepositoryService } from 'src/delivery/services/delivery-repository.service';

/**
 * Order complete transition.
 * @param orderRepositoryService - Service to interact with order repository.
 * @param deliveryRepositoryService - Service to interact with delivery repository.
 */
@Injectable()
export class OrderCompleteTransition extends OrderBaseTransition {
  constructor(
    private orderRepositoryService: OrderRepositoryService,
    private deliveryService: DeliveryRepositoryService,
  ) {
    super();
  }

  validInitialStates = [OrderStatuses.Delivery];

  /**
   * Moves the given order to its final state by marking it as delivered and updating its status to completed.
   * @param {OrderEntity} order - The order entity to be moved to the final state.
   * @returns {Promise<void>} A promise that resolves when the order has been successfully moved to the final state.
   */
  async moveToFinalState(order: OrderEntity) {
    await this.deliveryService.markOrderAsDelivered(order.delivery);
    await this.orderRepositoryService.updateOrderStatus(
      order,
      OrderStatuses.Completed,
    );
  }
}
