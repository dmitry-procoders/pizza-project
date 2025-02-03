import { Injectable } from '@nestjs/common';
import { OrderConfirmTransition } from './order-confirm-transition';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { OrderCancelTransition } from './order-cancel-transition';
import { OrderReadyForPickUpTransition } from './order-ready-for-pickup-transition';
import { OrderDeliveringTransition } from './order-delivering-transition';
import { OrderCompleteTransition } from './order-complete-transition';
import { OrderPreparingTransition } from './order-preparing-transition';

/**
 * Factory class for creating order state machine transitions.
 * This class is responsible for initializing various order state transitions.
 */
@Injectable()
export class OrderStateMachineTransitionFactory {
  constructor(
    private confirmTransition: OrderConfirmTransition,
    private cancelTransition: OrderCancelTransition,
    private preparingTransition: OrderPreparingTransition,
    private orderReadyForPickUpTransition: OrderReadyForPickUpTransition,
    private orderDeliveryTransition: OrderDeliveringTransition,
    private orderCompleteTransition: OrderCompleteTransition,
  ) {}

  /**
   * Retrieves the appropriate transition handler based on the provided final order status.
   * @param {OrderStatuses} finalStatus - The final status of the order for which the transition handler is needed.
   * @returns {Function} The transition handler function corresponding to the provided final status.
   * @throws {Error} If no transition handler is found for the provided final status.
   */
  getTransitionHandler(finalStatus: OrderStatuses) {
    switch (finalStatus) {
      case OrderStatuses.Confirmed:
        return this.confirmTransition;
      case OrderStatuses.Cancelled:
        return this.cancelTransition;
      case OrderStatuses.Preparing:
        return this.preparingTransition;
      case OrderStatuses.ReadyForPickup:
        return this.orderReadyForPickUpTransition;
      case OrderStatuses.Delivery:
        return this.orderDeliveryTransition;
      case OrderStatuses.Completed:
        return this.orderCompleteTransition;
      default:
        throw new Error(
          `Transition handler for status ${finalStatus} not found`,
        );
    }
  }
}
