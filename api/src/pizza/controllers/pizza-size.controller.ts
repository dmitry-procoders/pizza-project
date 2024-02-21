import { Controller, Get } from '@nestjs/common';
import { PizzaSizeService } from '../services/pizza-size.service';
import { PizzaSizeEntity } from '../entities/pizza-size.entity';

@Controller('pizza-size')
export class PizzaSizeController {
  constructor(public service: PizzaSizeService) {}

  @Get()
  async getList(): Promise<PizzaSizeEntity[]> {
    return await this.service.getList();
  }
}
