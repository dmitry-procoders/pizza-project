import { Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { KitchenService } from '../services/kitchen.service';
import { KitchenEntity } from '../entities/kitchen.entity';

@Controller('kitchen')
export class KitchenController {
  constructor(public service: KitchenService) {}

  @Get('ready-preparing')
  async getOrdersReadyForPreparing(): Promise<KitchenEntity[]> {
    return await this.service.getOrdersReadyForPreparing();
  }

  @Get('ready-pick-up')
  async getOrdersReadyForPickUp(): Promise<KitchenEntity[]> {
    return await this.service.getOrdersReadyForPickUp();
  }

  @Patch('prepare/:id')
  async prepareOrder(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.service.prepareOrder(id);
  }
}
