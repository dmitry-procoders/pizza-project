import { Injectable } from '@nestjs/common';
import { OrderConfirmTransition } from './order-confirm-transition';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { OrderCancelTransition } from './order-cancel-transition';
import { OrderReadyForPickUpTransition } from './order-ready-for-pickup-transition';
import { OrderDeliveringTransition } from './order-delivering-transition';
import { OrderCompleteTransition } from './order-complete-transition';

@Injectable()
export class OrderStateMachineTransitionFactory {
  constructor(
    private confirmTransition: OrderConfirmTransition,
    private cancelTransition: OrderCancelTransition,
    private preparingTransition: OrderConfirmTransition,
    private orderReadyForPickUpTransition: OrderReadyForPickUpTransition,
    private orderDeliveryTransition: OrderDeliveringTransition,
    private orderCompleteTransition: OrderCompleteTransition,
  ) {}

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
        return null;
    }
  }
}
