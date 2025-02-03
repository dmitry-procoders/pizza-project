import { Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { KitchenService } from '../services/kitchen.service';
import { KitchenEntity } from '../entities/kitchen.entity';

/**
 * Controller for handling kitchen-related operations.
 */
@Controller('kitchen')
export class KitchenController {
  constructor(public service: KitchenService) {}

  /**
   * Retrieves orders that are ready for preparing.
   * @returns A promise that resolves to an array of KitchenEntity objects.
   */
  @Get('ready-preparing')
  async getOrdersReadyForPreparing(): Promise<KitchenEntity[]> {
    return await this.service.getOrdersReadyForPreparing();
  }

  /**
   * Retrieves orders that are currently being prepared.
   * @returns A promise that resolves to an array of KitchenEntity objects.
   */
  @Get('preparing')
  async getOrdersPreparing(): Promise<KitchenEntity[]> {
    return await this.service.getOrdersInPreparingState();
  }

  /**
   * Retrieves orders that are ready for pick-up.
   * @returns A promise that resolves to an array of KitchenEntity objects.
   */
  @Get('ready-pick-up')
  async getOrdersReadyForPickUp(): Promise<KitchenEntity[]> {
    return await this.service.getOrdersReadyForPickUp();
  }

  /**
   * Marks an order as being prepared.
   * @param id - The ID of the order to be marked as preparing.
   * @returns A promise that resolves when the order has been marked as preparing.
   */
  @Patch('prepare/:id')
  async prepareOrder(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.service.prepareOrder(id);
  }
}
