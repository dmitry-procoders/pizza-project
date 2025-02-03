import { Injectable } from '@nestjs/common';
import { OrderStateMachineService } from 'src/order/services/state-machine/order-state-machine-service';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { KitchenRepositoryService } from './kitchen-repository.service';

/**
 * Service responsible for preparing orders in the kitchen.
 * This service interacts with the kitchen repository to retrieve orders
 * that are currently being prepared and updates their status to "ReadyForPickup".
 */
@Injectable()
export class KitchenPrepareService {
  constructor(
    private kitchenService: KitchenRepositoryService,
    private orderStateMachineService: OrderStateMachineService,
  ) {}

  /**
   * Reviews the prepared orders and updates their status to "ReadyForPickup".
   * This method retrieves the list of orders that are currently being prepared
   * from the kitchen service. For each order, it creates a copy of the order
   * object, attaches the kitchen record to it, and then moves the order to the
   * "ReadyForPickup" state using the order state machine service.
   * @returns {Promise<void>} A promise that resolves when all orders have been
   *                          processed and their statuses have been updated.
   */
  async reviewPrepared(): Promise<void> {
    const preparedOrders = await this.kitchenService.getPreparingOrders();
    for (const kitchenRecord of preparedOrders) {
      const order = Object.assign({}, kitchenRecord.order);
      order.kitchen = kitchenRecord;
      await this.orderStateMachineService.moveOrderToState(
        order,
        OrderStatuses.ReadyForPickup,
      );
    }
  }
}
