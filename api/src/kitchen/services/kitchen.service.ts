import { Injectable } from '@nestjs/common';
import { KitchenEntity } from '../entities/kitchen.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { OrderStateMachineService } from 'src/order/services/state-machine/order-state-machine-service';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { KitchenRepositoryService } from './kitchen-repository.service';

/**
 * Service responsible for managing kitchen operations.
 *
 * @param kitchenRepositoryService - Service for interacting with the kitchen repository.
 * @param orderStateMachine - Service for managing the state machine of orders.
 */
@Injectable()
export class KitchenService {
  constructor(
    private kitchenRepositoryService: KitchenRepositoryService,
    private orderStateMachine: OrderStateMachineService,
  ) {}

  /**
   * Retrieves an order from the kitchen by its ID.
   *
   * @param id - The unique identifier of the order.
   * @returns A promise that resolves to the KitchenEntity representing the order.
   */
  async getOrderOnKitchen(id: number): Promise<KitchenEntity> {
    return await this.kitchenRepositoryService.getOrderOnKitchen(id);
  }

  /**
   * Retrieves a kitchen record associated with a specific order.
   *
   * @param {number} id - The unique identifier of the order.
   * @returns {Promise<KitchenEntity>} A promise that resolves to the kitchen record associated with the given order.
   */
  async getKitchenRecordByOrder(id: number): Promise<KitchenEntity> {
    return await this.kitchenRepositoryService.getKitchenRecordByOrder(id);
  }

  /**
   * Retrieves a list of kitchen orders that are ready for preparing.
   *
   * @returns {Promise<KitchenEntity[]>} A promise that resolves to an array of KitchenEntity objects representing the orders ready for preparing.
   */
  async getOrdersReadyForPreparing(): Promise<KitchenEntity[]> {
    return await this.kitchenRepositoryService.getOrdersReadyForPreparing();
  }

  /**
   * Retrieves a list of kitchen orders that are currently in the preparing state.
   *
   * @returns {Promise<KitchenEntity[]>} A promise that resolves to an array of KitchenEntity objects representing the orders in the preparing state.
   */
  async getOrdersInPreparingState(): Promise<KitchenEntity[]> {
    return await this.kitchenRepositoryService.getOrdersInPreparingState();
  }

  /**
   * Retrieves a list of kitchen orders that are ready for pick-up.
   *
   * @returns {Promise<KitchenEntity[]>} A promise that resolves to an array of KitchenEntity objects representing the orders ready for pick-up.
   */
  async getOrdersReadyForPickUp(): Promise<KitchenEntity[]> {
    return await this.kitchenRepositoryService.getOrdersReadyForPickUp();
  }

  /**
   * Prepares an order by updating its state to 'Preparing'.
   *
   * @param {number} id - The unique identifier of the order to be prepared.
   * @returns {Promise<void>} A promise that resolves when the order has been successfully prepared.
   */
  async prepareOrder(id: number): Promise<void> {
    const kitchenRecord = await this.getOrderOnKitchen(id);
    const order = this.mapKitchenToOrder(kitchenRecord);
    this.orderStateMachine.moveOrderToState(order, OrderStatuses.Preparing);
  }

  /**
   * Maps a KitchenEntity to an OrderEntity.
   *
   * This function creates a new OrderEntity object by copying the properties
   * from the `order` property of the given KitchenEntity. It also sets the
   * `kitchen` property of the new OrderEntity to the provided KitchenEntity
   * and removes the circular reference to the order within the kitchen.
   *
   * @param kitchen - The KitchenEntity to map to an OrderEntity.
   * @returns A new OrderEntity object with the mapped properties.
   */
  private mapKitchenToOrder(kitchen: KitchenEntity): OrderEntity {
    const order = Object.assign({}, kitchen.order);
    order.kitchen = kitchen;
    delete order.kitchen.order;
    return order;
  }
}
