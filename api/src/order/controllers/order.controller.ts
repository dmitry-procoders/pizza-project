import {
  Controller,
  Get,
  Param,
  Body,
  ParseIntPipe,
  Post,
  Patch,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { OrderEntity } from '../entities/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';

/**
 * Controller for handling order-related operations.
 */
@Controller('order')
export class OrderController {
  constructor(public service: OrderService) {}

  /**
   * Retrieves an order by its ID.
   * @param id - The ID of the order to retrieve.
   * @returns A promise that resolves to the OrderEntity corresponding to the given ID.
   */
  @Get(':id')
  async getOrder(@Param('id', ParseIntPipe) id: number): Promise<OrderEntity> {
    return await this.service.getOrder(id);
  }

  /**
   * Places a new order.
   * @param createOrderDto - Data transfer object containing the details of the order to be created.
   * @returns A promise that resolves to the created OrderEntity.
   */
  @Post()
  async placeOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<OrderEntity> {
    return await this.service.placeOrder(createOrderDto);
  }

  /**
   * Completes an order by its ID.
   * @param id - The ID of the order to complete.
   * @returns A promise that resolves when the order is completed.
   */
  @Patch('complete/:id')
  async completeOrder(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.service.completeOrder(id);
  }

  /**
   * Cancels an order with the specified ID.
   * @param id - The ID of the order to cancel.
   * @returns A promise that resolves when the order is successfully canceled.
   */
  @Patch('cancel/:id')
  async cancelOrder(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.service.cancelOrder(id);
  }
}
