import { Injectable } from '@nestjs/common';
import { DeliveryEntity } from '../entities/delivery.entity';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { OrderStateMachineService } from 'src/order/services/state-machine/order-state-machine-service';
import { DeliveryRepositoryService } from './delivery-repository.service';

/**
 * Service responsible for handling delivery-related operations.
 * @param deliveryRepositoryService - Service for interacting with the delivery repository.
 * @param orderStateMachine - Service for managing the state transitions of orders.
 */
@Injectable()
export class DeliveryService {
  constructor(
    private deliveryRepositoryService: DeliveryRepositoryService,
    private orderStateMachine: OrderStateMachineService,
  ) {}

  /**
   * Retrieves a delivery order by its ID.
   * @param {number} id - The ID of the delivery order to retrieve.
   * @returns {Promise<DeliveryEntity>} A promise that resolves to the delivery order entity.
   */
  async getDeliveryOrder(id: number): Promise<DeliveryEntity> {
    return await this.deliveryRepositoryService.getDeliveryOrder(id);
  }

  /**
   * Retrieves a list of orders that are ready for delivery.
   * @returns {Promise<DeliveryEntity[]>} A promise that resolves to an array of DeliveryEntity objects representing the orders ready for delivery.
   */
  async getOrdersReadyForDelivery(): Promise<DeliveryEntity[]> {
    return await this.deliveryRepositoryService.getOrdersReadyForDelivery();
  }

  /**
   * Picks an order for delivery by its ID.
   * This method retrieves the delivery order by the given ID and moves the order
   * to the delivery state using the order state machine.
   * @param id - The ID of the delivery order to be picked.
   * @returns A promise that resolves when the order has been successfully moved to the delivery state.
   */
  async pickOrderForDelivery(id: number): Promise<void> {
    const delivery = await this.getDeliveryOrder(id);
    await this.orderStateMachine.moveOrderToState(
      delivery.order,
      OrderStatuses.Delivery,
    );
  }

  /**
   * Completes an order by moving it to the specified status.
   * @param id - The unique identifier of the delivery order.
   * @param status - The final status of the order, either Completed or Cancelled.
   * @returns A promise that resolves when the order has been successfully moved to the specified status.
   */
  async completeOrder(
    id: number,
    status: OrderStatuses.Completed | OrderStatuses.Cancelled,
  ): Promise<void> {
    const delivery = await this.getDeliveryOrder(id);
    await this.orderStateMachine.moveOrderToState(delivery.order, status);
  }
}
