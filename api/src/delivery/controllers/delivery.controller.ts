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

/**
 * Controller for handling delivery-related operations: retrieving orders ready for delivery,
 * preparing orders for delivery, and completing orders by setting their status
 * to either `Completed` or `Cancelled`.
 */
@Controller('delivery')
export class DeliveryController {
  constructor(public service: DeliveryService) {}

  /**
   * Retrieves a list of orders that are ready for delivery.
   * @returns {Promise<DeliveryEntity[]>} A promise that resolves to an array of DeliveryEntity objects.
   */
  @Get()
  async getOrdersForDelivery(): Promise<DeliveryEntity[]> {
    return await this.service.getOrdersReadyForDelivery();
  }

  /**
   * Prepares an order for delivery.
   * @param {number} id - The ID of the order to prepare for delivery.
   * @returns {Promise<void>} A promise that resolves when the order has been prepared for delivery.
   */
  @Patch('pick/:id')
  async prepareOrder(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.service.pickOrderForDelivery(id);
  }

  /**
   * Completes an order by setting its status to `Completed` or `Cancelled`.
   * @param {number} id - The ID of the order to complete.
   * @param {OrderStatuses.Completed | OrderStatuses.Cancelled} status - The status to set on the order.
   * @returns {Promise<void>} A promise that resolves when the order has been completed.
   */
  @Patch('complete/:id')
  async completeOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: OrderStatuses.Completed | OrderStatuses.Cancelled,
  ): Promise<void> {
    return await this.service.completeOrder(id, status);
  }
}
