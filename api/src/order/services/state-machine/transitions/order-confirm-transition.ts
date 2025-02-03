import { OrderEntity } from '../../../entities/order.entity';
import { Injectable } from '@nestjs/common';
import { OrderBaseTransition } from './order-base-transition';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { OrderRepositoryService } from '../../order-repository.service';
import { KitchenRepositoryService } from 'src/kitchen/services/kitchen-repository.service';

/**
 * Order confirm transition.
 * @param orderRepositoryService - Service to interact with order repository.
 * @param deliveryRepositoryService - Service to interact with delivery repository.
 */
@Injectable()
export class OrderConfirmTransition extends OrderBaseTransition {
  constructor(
    private orderRepositoryService: OrderRepositoryService,
    private kitchenService: KitchenRepositoryService,
  ) {
    super();
  }

  validInitialStates = [OrderStatuses.Pending, OrderStatuses.Confirmed];

  /**
   * Moves the given order to its state by updating its status to 'Confirmed'
   * and creating a corresponding kitchen record.
   * @param {OrderEntity} order - The order entity to be moved to the final state.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async moveToFinalState(order: OrderEntity) {
    await this.orderRepositoryService.updateOrderStatus(
      order,
      OrderStatuses.Confirmed,
    );
    await this.kitchenService.createKitchenRecord(order);
  }
}
