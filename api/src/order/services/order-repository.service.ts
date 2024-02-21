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

  async getPendingOrders(): Promise<OrderEntity[]> {
    return await this.repository.find({
      where: { status: OrderStatuses.Pending },
    });
  }

  async placeOrder(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const order = Object.assign(new OrderEntity(), createOrderDto);
    order.status = OrderStatuses.Pending;
    return await this.repository.save(order);
  }

  async updateOrderStatus(
    order: OrderEntity,
    status: OrderStatuses,
  ): Promise<void> {
    await this.repository.update(order.id, { status });
  }

  // async confirmOrder(order: OrderEntity): Promise<void> {
  //   await this.repository.update(order.id, { status: OrderStatuses.Confirmed });
  // }

  // async completeOrder(order: OrderEntity): Promise<void> {
  //   await this.repository.update(order.id, { status: OrderStatuses.Completed });
  // }

  // async readyForPick(order: OrderEntity): Promise<void> {
  //   await this.repository.update(order.id, { status: OrderStatuses.Confirmed });
  // }

  // async cancelOrder(order: OrderEntity): Promise<void> {
  //   await this.repository.update(order.id, { status: OrderStatuses.Cancelled });
  // }
}
