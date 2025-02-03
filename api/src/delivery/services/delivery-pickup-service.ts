import { Injectable } from '@nestjs/common';
import { OrderStateMachineService } from 'src/order/services/state-machine/order-state-machine-service';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { DeliveryEntity } from '../entities/delivery.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { DeliveryRepositoryService } from './delivery-repository.service';

/**
 * Service responsible for handling delivery pickup operations.
 * @param deliveryService - Service for interacting with delivery repository.
 * @param orderStateMachineService - Service for managing order state transitions.
 */
@Injectable()
export class DeliveryPickUpService {
  constructor(
    private deliveryService: DeliveryRepositoryService,
    private orderStateMachineService: OrderStateMachineService,
  ) {}

  /**
   * Reviews orders that are ready for pickup and moves them to the delivery state.
   * This method retrieves orders that are ready for delivery from the delivery service,
   * maps each delivery record to an order, and then transitions the order to the delivery state
   * using the order state machine service.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async reviewOrdersReadyForPickup() {
    const orderReadyForDelivery =
      await this.deliveryService.getOrdersReadyForDelivery();
    for (const deliveryRecord of orderReadyForDelivery) {
      const order = this.mapDeliveryToOrder(deliveryRecord);
      this.orderStateMachineService.moveOrderToState(
        order,
        OrderStatuses.Delivery,
      );
    }
  }

  /**
   * Maps a delivery record to an order entity.
   * This function takes a `DeliveryEntity` object and maps it to an `OrderEntity` object.
   * It creates a copy of the order from the delivery record, assigns the kitchen and delivery
   * properties, and removes the circular reference to the order within the delivery object.
   * @param {DeliveryEntity} deliveryRecord - The delivery record to map from.
   * @returns {OrderEntity} The mapped order entity.
   */
  private mapDeliveryToOrder(deliveryRecord: DeliveryEntity): OrderEntity {
    const order = Object.assign({}, deliveryRecord.order);
    order.kitchen = deliveryRecord.order.kitchen;
    order.delivery = deliveryRecord;
    delete order.delivery.order;
    return order;
  }
}
