import { Injectable } from '@nestjs/common';
import { OrderStateMachineService } from './state-machine/order-state-machine-service';
import { OrderStatuses } from '../constants/order-statuses';
import { OrderRepositoryService } from 'src/order/services/order-repository.service';

@Injectable()
export class OrderReviewService {
  constructor(
    private orderRepositoryService: OrderRepositoryService,
    private orderStateMachineService: OrderStateMachineService,
  ) {}

  async reviewPendingOrders() {
    // Get all pending orders
    const pendingOrders = await this.orderRepositoryService.getPendingOrders();
    for (const order of pendingOrders) {
      // With probability 0.75, the order is confirmed, otherwise it is cancelled
      // const status =
      //   Math.random() < 0.75
      //     ? OrderStatuses.Confirmed
      //     : OrderStatuses.Cancelled;
      const status = OrderStatuses.Confirmed;
      // Move the order to the new state
      await this.orderStateMachineService.moveOrderToState(order, status);
    }
  }
}
