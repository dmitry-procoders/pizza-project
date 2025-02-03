import { OrderRepositoryService } from './order-repository.service';
import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../entities/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderStatuses } from '../constants/order-statuses';
import { OrderStateMachineService } from './state-machine/order-state-machine-service';

/**
 * Constructs an instance of OrderService.
 * @param orderRepositoryService - Service for handling order repository operations.
 * @param orderStateMachineService - Service for managing order state transitions.
 */
@Injectable()
export class OrderService {
  constructor(
    private orderRepositoryService: OrderRepositoryService,
    private orderStateMachineService: OrderStateMachineService,
  ) {}

  /**
   * Retrieves an order by its ID.
   * @param {number} id - The ID of the order to retrieve.
   * @returns {Promise<OrderEntity>} A promise that resolves to the retrieved order entity.
   */
  async getOrder(id: number): Promise<OrderEntity> {
    return await this.orderRepositoryService.getOrder(id);
  }

  /**
   * Places a new order using the provided order details.
   * @param {CreateOrderDto} createOrderDto - The data transfer object containing the details of the order to be placed.
   * @returns {Promise<OrderEntity>} A promise that resolves to the created OrderEntity.
   */
  async placeOrder(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    return await this.orderRepositoryService.placeOrder(createOrderDto);
  }

  /**
   * Confirms an order by its ID.
   * This method retrieves the order by its ID and transitions its state to 'Confirmed'
   * using the order state machine service.
   * @param id - The ID of the order to confirm.
   * @returns A promise that resolves when the order has been confirmed.
   */
  async confirmOrder(id: number): Promise<void> {
    const order = await this.getOrder(id);
    this.orderStateMachineService.moveOrderToState(
      order,
      OrderStatuses.Confirmed,
    );
  }

  /**
   * Completes an order by moving it to the "Completed" state.
   * @param {number} id - The unique identifier of the order to be completed.
   * @returns {Promise<void>} A promise that resolves when the order has been successfully moved to the "Completed" state.
   */
  async completeOrder(id: number): Promise<void> {
    const order = await this.getOrder(id);
    this.orderStateMachineService.moveOrderToState(
      order,
      OrderStatuses.Completed,
    );
  }

  /**
   * Cancels an order by its ID.
   * This method retrieves the order using the provided ID and then
   * transitions the order to the "Cancelled" state using the order state machine service.
   * @param id - The ID of the order to be cancelled.
   * @returns A promise that resolves when the order has been successfully cancelled.
   */
  async cancelOrder(id: number): Promise<void> {
    const order = await this.getOrder(id);
    this.orderStateMachineService.moveOrderToState(
      order,
      OrderStatuses.Cancelled,
    );
  }
}
