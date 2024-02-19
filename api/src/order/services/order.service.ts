import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderStatus } from './../constants/statuses';

/**
 * Service responsible for managing orders.
 */
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity) private repository: Repository<OrderEntity>,
  ) {}

  /**
   * Retrieves an order by its ID.
   * @param id - The ID of the order to retrieve.
   * @returns A promise that resolves to the order entity.
   */
  async getOrder(id: number): Promise<OrderEntity> {
    return await this.repository.findOneByOrFail({ id });
  }

  /**
   * Places a new order.
   * @param createOrderDto - The data for creating the order.
   * @returns A promise that resolves to the created order entity.
   */
  async placeOrder(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const order = Object.assign(new OrderEntity(), createOrderDto);
    return await this.repository.save(order);
  }

  /**
   * Completes an order by updating its status to "Completed".
   * @param id - The ID of the order to complete.
   * @throws {Error} Will throw an error if the order's current status is not "Delivery".
   * @returns A promise that resolves when the order is completed.
   */
  async completeOrder(id: number): Promise<void> {
    const order = await this.getOrder(id);
    if (order.status !== OrderStatus.Delivery) {
      throw new Error('Order must be in "Delivery" status to be completed');
    }
    await this.repository.update(id, { status: OrderStatus.Completed });
  }

  /**
   * Cancel an order by updating its status to "Cancelled".
   * @param id - The ID of the order to complete.
   * @throws {Error} Will throw an error if the order's current status is not "Delivery" or "  AwaitingBilling".
   * @returns A promise that resolves when the order is completed.
   */
  async cancelOrder(id: number): Promise<void> {
    const order = await this.getOrder(id);
    const correctStatuses = [OrderStatus.Delivery, OrderStatus.AwaitingBilling];
    if (!correctStatuses.includes(order.status)) {
      throw new Error('Order must be in "Delivery" status to be completed');
    }
    await this.repository.update(id, { status: OrderStatus.Cancelled });
  }
}
