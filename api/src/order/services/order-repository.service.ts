import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderStatuses } from '../constants/order-statuses';

/**
 * Service responsible for managing orders.
 */
@Injectable()
export class OrderRepositoryService {
  constructor(
    @InjectRepository(OrderEntity) private repository: Repository<OrderEntity>,
  ) {}

  /**
   * Retrieves an order by its ID.
   * @param id - The ID of the order to retrieve.
   * @returns A promise that resolves to the order entity.
   */
  async getOrder(id: number): Promise<OrderEntity> {
    const order = await this.repository.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    return order;
  }

  /**
   * Retrieves a list of orders that are currently pending.
   * @returns {Promise<OrderEntity[]>} A promise that resolves to an array of pending orders.
   */
  async getPendingOrders(): Promise<OrderEntity[]> {
    return await this.repository.find({
      where: { status: OrderStatuses.Pending },
    });
  }

  /**
   * Places a new order by creating an OrderEntity from the provided DTO and saving it to the repository.
   * @param {CreateOrderDto} createOrderDto - The data transfer object containing the details of the order to be placed.
   * @returns {Promise<OrderEntity>} A promise that resolves to the saved OrderEntity.
   */
  async placeOrder(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const order = Object.assign(new OrderEntity(), createOrderDto);
    order.status = OrderStatuses.Pending;
    return await this.repository.save(order);
  }

  /**
   * Updates the status of an order.
   * @param {OrderEntity} order - The order entity to update.
   * @param {OrderStatuses} status - The new status to set for the order.
   * @returns {Promise<void>} A promise that resolves when the update is complete.
   */
  async updateOrderStatus(
    order: OrderEntity,
    status: OrderStatuses,
  ): Promise<void> {
    await this.repository.update(order.id, { status });
  }

  /**
   * Confirms an order by updating its status to 'Confirmed'.
   * @param {OrderEntity} order - The order entity to be confirmed.
   * @returns {Promise<void>} A promise that resolves when the order status has been updated.
   */
  async confirmOrder(order: OrderEntity): Promise<void> {
    await this.repository.update(order.id, { status: OrderStatuses.Confirmed });
  }

  /**
   * Marks the given order as completed by updating its status in the repository.
   * @param {OrderEntity} order - The order entity to be marked as completed.
   * @returns {Promise<void>} A promise that resolves when the order status has been updated.
   */
  async completeOrder(order: OrderEntity): Promise<void> {
    await this.repository.update(order.id, { status: OrderStatuses.Completed });
  }

  /**
   * Marks the given order as ready for pick-up by updating its status to 'Confirmed'.
   * @param {OrderEntity} order - The order entity to be updated.
   * @returns {Promise<void>} A promise that resolves when the order status has been updated.
   */
  async readyForPick(order: OrderEntity): Promise<void> {
    await this.repository.update(order.id, { status: OrderStatuses.Confirmed });
  }

  /**
   * Cancels the given order by updating its status to 'Cancelled'.
   * @param {OrderEntity} order - The order entity to be cancelled.
   * @returns {Promise<void>} A promise that resolves when the order status has been updated.
   */
  async cancelOrder(order: OrderEntity): Promise<void> {
    await this.repository.update(order.id, { status: OrderStatuses.Cancelled });
  }
}
