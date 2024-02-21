import { Injectable } from '@nestjs/common';
import { KitchenEntity } from '../entities/kitchen.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { OrderStateMachineService } from 'src/order/services/state-machine/order-state-machine-service';
import { OrderStatuses } from 'src/order/constants/order-statuses';
import { KitchenRepositoryService } from './kitchen-repository.service';

@Injectable()
export class KitchenService {
  constructor(
    private kitchenRepositoryService: KitchenRepositoryService,
    private orderStateMachine: OrderStateMachineService,
  ) {}

  async getOrderOnKitchen(id: number): Promise<KitchenEntity> {
    return await this.kitchenRepositoryService.getOrderOnKitchen(id);
  }

  async getKitchenRecordByOrder(id: number): Promise<KitchenEntity> {
    return await this.kitchenRepositoryService.getKitchenRecordByOrder(id);
  }

  async getOrdersReadyForPreparing(): Promise<KitchenEntity[]> {
    return await this.kitchenRepositoryService.getOrdersReadyForPreparing();
  }

  async getOrdersInPreparingState(): Promise<KitchenEntity[]> {
    return await this.kitchenRepositoryService.getOrdersInPreparingState();
  }

  async getOrdersReadyForPickUp(): Promise<KitchenEntity[]> {
    return await this.kitchenRepositoryService.getOrdersReadyForPickUp();
  }

  async prepareOrder(id: number): Promise<void> {
    const kitchenRecord = await this.getOrderOnKitchen(id);
    const order = this.mapKitchenToOrder(kitchenRecord);
    this.orderStateMachine.moveOrderToState(order, OrderStatuses.Preparing);
  }

  private mapKitchenToOrder(kitchen: KitchenEntity): OrderEntity {
    const order = Object.assign({}, kitchen.order);
    order.kitchen = kitchen;
    delete order.kitchen.order;
    return order;
  }
}
