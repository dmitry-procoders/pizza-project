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

@Controller('order')
export class OrderController {
  constructor(public service: OrderService) {}

  @Get(':id')
  async getOrder(@Param('id', ParseIntPipe) id: number): Promise<OrderEntity> {
    return await this.service.getOrder(id);
  }

  @Post()
  async placeOrder(@Body() createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    return await this.service.placeOrder(createOrderDto);
  }

  @Patch('complete/:id')
  async completeOrder(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.service.completeOrder(id);
  }

  @Patch('cancel/:id')
  async cancelOrder(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.service.cancelOrder(id);
  }
}
