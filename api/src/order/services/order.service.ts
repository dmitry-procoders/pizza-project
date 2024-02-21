import { OrderRepositoryService } from './order-repository.service';
import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../entities/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderStatuses } from '../constants/order-statuses';
import { OrderStateMachineService } from './state-machine/order-state-machine-service';

@Injectable()
export class OrderService {
  constructor(
    private orderRepositoryService: OrderRepositoryService,
    private orderStateMachineService: OrderStateMachineService,
  ) {}

  async getOrder(id: number): Promise<OrderEntity> {
    return await this.orderRepositoryService.getOrder(id);
  }

  async placeOrder(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    return await this.orderRepositoryService.placeOrder(createOrderDto);
  }

  async confirmOrder(id: number): Promise<void> {
    const order = await this.getOrder(id);
    this.orderStateMachineService.moveOrderToState(
      order,
      OrderStatuses.Confirmed,
    );
  }

  async completeOrder(id: number): Promise<void> {
    const order = await this.getOrder(id);
    this.orderStateMachineService.moveOrderToState(
      order,
      OrderStatuses.Completed,
    );
  }

  async cancelOrder(id: number): Promise<void> {
    const order = await this.getOrder(id);
    this.orderStateMachineService.moveOrderToState(
      order,
      OrderStatuses.Cancelled,
    );
  }
}
