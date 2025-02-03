import { Injectable } from '@nestjs/common';
import { OrderStateMachineService } from './state-machine/order-state-machine-service';
import { OrderStatuses } from '../constants/order-statuses';
import { OrderRepositoryService } from 'src/order/services/order-repository.service';

/**
 * Service responsible for handling order reviews.
 * @param {OrderRepositoryService} orderRepositoryService - Service for interacting with the order repository.
 * @param {OrderStateMachineService} orderStateMachineService - Service for managing the state transitions of orders.
 */
@Injectable()
export class OrderReviewService {
  constructor(
    private orderRepositoryService: OrderRepositoryService,
    private orderStateMachineService: OrderStateMachineService,
  ) {}

  /**
   * Reviews all pending orders and updates their status.
   * This method retrieves all pending orders from the order repository service.
   * For each pending order, it randomly determines the order status with a
   * probability of 0.8 for confirmation and 0.2 for cancellation. It then
   * updates the order status using the order state machine service.
   * @returns {Promise<void>} A promise that resolves when all pending orders
   * have been reviewed and their statuses updated.
   */
  async reviewPendingOrders() {
    const pendingOrders = await this.orderRepositoryService.getPendingOrders();
    for (const order of pendingOrders) {
      // With probability 0.8, the order is confirmed, otherwise it is cancelled
      const status =
        Math.random() < 0.8 ? OrderStatuses.Confirmed : OrderStatuses.Cancelled;
      await this.orderStateMachineService.moveOrderToState(order, status);
    }
  }
}
