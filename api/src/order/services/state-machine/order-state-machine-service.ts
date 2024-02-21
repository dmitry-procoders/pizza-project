import { OrderStateMachineTransitionFactory } from './transitions/order-state-machine-transition-factory';
import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../../entities/order.entity';
import { OrderStatuses } from '../../constants/order-statuses';

@Injectable()
export class OrderStateMachineService {
  constructor(private factoryService: OrderStateMachineTransitionFactory) {}

  async moveOrderToState(order: OrderEntity, state: OrderStatuses) {
    const handler = this.factoryService.getTransitionHandler(state);
    handler.moveToFinalState(order);
  }
}
