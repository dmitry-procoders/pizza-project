import { OrderStatuses } from 'src/order/constants/order-statuses';
import { Injectable } from '@nestjs/common';
import { OrderEntity } from 'src/order/entities/order.entity';

@Injectable()
export abstract class OrderBaseTransition {
  abstract validInitialStates: OrderStatuses[];
  abstract moveToFinalState(order: OrderEntity, status: OrderStatuses): void;

  async moveToState(order: OrderEntity, status: OrderStatuses): Promise<void> {
    this.checkInitialState(order);
    this.moveToFinalState(order, status);
  }

  checkInitialState(order: OrderEntity): void {
    if (!this.validInitialStates.includes(order.status)) {
      throw new Error(
        `Invalid initial state. Must be one of ${this.validInitialStates.join(', ')}`,
      );
    }
  }
}
