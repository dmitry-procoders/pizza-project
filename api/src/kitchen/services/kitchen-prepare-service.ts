import { KitchenService } from 'src/kitchen/services/kitchen.service';
import { Injectable } from '@nestjs/common';
import { OrderStateMachineService } from 'src/order/services/state-machine/order-state-machine-service';
import { OrderStatuses } from 'src/order/constants/order-statuses';

@Injectable()
export class KitchenPrepareService {
  constructor(
    private kitchenService: KitchenService,
    private orderStateMachineService: OrderStateMachineService,
  ) {}

  async reviewPrepared() {
    const preparedOrders = await this.kitchenService.getPreparingOrders();
    for (const kitchenRecord of preparedOrders) {
      const order = Object.assign({}, kitchenRecord.order);
      order.kitchen = kitchenRecord;
      this.orderStateMachineService.moveOrderToState(
        order,
        OrderStatuses.ReadyForPickup,
      );
    }
  }
}
