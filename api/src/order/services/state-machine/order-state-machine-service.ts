import { OrderStateMachineTransitionFactory } from './transitions/order-state-machine-transition-factory';
import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../../entities/order.entity';
import { OrderStatuses } from '../../constants/order-statuses';

/**
 * Constructs an instance of OrderStateMachineService.
 * @param factoryService - An instance of OrderStateMachineTransitionFactory used to create state machine transitions.
 */
@Injectable()
export class OrderStateMachineService {
  constructor(private factoryService: OrderStateMachineTransitionFactory) {}

  /**
   * Moves the given order to the specified state using the appropriate transition handler.
   * @param {OrderEntity} order - The order entity to be moved to a new state.
   * @param {OrderStatuses} state - The target state to which the order should be moved.
   * @returns {Promise<void>} A promise that resolves when the order has been moved to the new state.
   */
  async moveOrderToState(order: OrderEntity, state: OrderStatuses) {
    const handler = this.factoryService.getTransitionHandler(state);
    await handler.moveToFinalState(order);
  }
}
