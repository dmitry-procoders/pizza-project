import { OrderStatuses } from 'src/order/constants/order-statuses';
import { Injectable } from '@nestjs/common';
import { OrderEntity } from 'src/order/entities/order.entity';

/**
 * Abstract base class for order state transitions.
 * This class provides the basic structure and methods for transitioning an order
 * from one state to another within a state machine.
 */
@Injectable()
export abstract class OrderBaseTransition {
  abstract validInitialStates: OrderStatuses[];
  abstract moveToFinalState(order: OrderEntity, status: OrderStatuses): void;

  /**
   * Moves the given order to the specified status.
   * @param {OrderEntity} order - The order entity to be moved to a new state.
   * @param {OrderStatuses} status - The target status to move the order to.
   * @returns {Promise<void>} A promise that resolves when the order has been moved to the new state.
   */
  async moveToState(order: OrderEntity, status: OrderStatuses): Promise<void> {
    this.checkInitialState(order);
    this.moveToFinalState(order, status);
  }

  /**
   * Checks if the initial state of the given order is valid.
   * @param order - The order entity to check.
   * @throws {Error} If the initial state of the order is not valid.
   */
  checkInitialState(order: OrderEntity): void {
    if (!this.validInitialStates.includes(order.status)) {
      throw new Error(
        `Invalid initial state. Must be one of ${this.validInitialStates.join(', ')}`,
      );
    }
  }
}
