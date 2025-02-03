import { Injectable } from '@nestjs/common';
import { OrderStateMachineService } from 'src/order/services/state-machine/order-state-machine-service';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { DeliveryEntity } from '../entities/delivery.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { DeliveryRepositoryService } from './delivery-repository.service';

/**
 * Service responsible for handling delivery completion operations.
 *
 * @param deliveryService - Service for interacting with delivery repository.
 * @param orderStateMachineService - Service for managing order state transitions.
 */
@Injectable()
export class DeliveryCompletionService {
  constructor(
    private deliveryService: DeliveryRepositoryService,
    private orderStateMachineService: OrderStateMachineService,
  ) {}

  /**
   * Reviews the orders that are currently in delivery and updates their status.
   * This method retrieves all orders that are currently in the delivery process
   * and iterates over each delivery record. For each delivery record, it maps
   * the delivery record to an order and randomly assigns a status of either
   * `Completed` or `Cancelled` to the order.
   * The order's state is then updated using the `orderStateMachineService`.
   * @returns {Promise<void>} A promise that resolves when the review process is complete.
   */
  async reviewDeliveringOrders() {
    const deliveringOrders = await this.deliveryService.getOrdersInDelivery();
    for (const deliveryRecord of deliveringOrders) {
      const order = this.mapDeliveryToOrder(deliveryRecord);
      // Just a random status for the order to show different branches of the state machine
      const status =
        Math.random() < 0.9 ? OrderStatuses.Completed : OrderStatuses.Cancelled;
      this.orderStateMachineService.moveOrderToState(order, status);
    }
  }

  /**
   * Maps a given delivery record to its corresponding order entity.
   * @param {DeliveryEntity} deliveryRecord - The delivery record to be mapped.
   * @returns {OrderEntity} The order entity with the delivery record attached.
   */
  private mapDeliveryToOrder(deliveryRecord: DeliveryEntity): OrderEntity {
    const order = Object.assign({}, deliveryRecord.order);
    order.delivery = deliveryRecord;
    return order;
  }
}
