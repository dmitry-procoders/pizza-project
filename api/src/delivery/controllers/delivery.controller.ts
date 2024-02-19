import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { DeliveryService } from '../services/delivery.service';
import { DeliveryEntity } from '../entities/delivery.entity';
import { OrderStatuses } from 'src/order/constants/order-statuses';

@Controller('delivery')
export class DeliveryController {
  constructor(public service: DeliveryService) {}

  @Get()
  async getOrdersForDelivery(): Promise<DeliveryEntity[]> {
    return await this.service.getOrdersReadyForDelivery();
  }

  @Patch('pick/:id')
  async prepareOrder(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.service.pickOrderForDelivery(id);
  }

  @Patch('complete/:id')
  async completeOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: OrderStatuses.Completed | OrderStatuses.Cancelled,
  ): Promise<void> {
    return await this.service.completeOrder(id, status);
  }
}
