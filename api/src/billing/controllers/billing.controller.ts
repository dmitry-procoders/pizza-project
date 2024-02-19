import { Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { BillingService } from '../services/billing.service';
import { BillingEntity } from '../entities/billing.entity';

@Controller('billing')
export class BillingController {
  constructor(public service: BillingService) {}

  @Get(':id')
  async getOrder(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BillingEntity> {
    return await this.service.getBillingOrder(id);
  }

  @Patch(':id')
  async payOrder(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.service.payOrder(id);
  }
}
