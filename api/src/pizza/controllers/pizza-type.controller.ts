import { Controller, Get } from '@nestjs/common';
import { PizzaTypeService } from '../services/pizza-type.service';
import { PizzaTypeEntity } from '../entities/pizza-type.entity';

@Controller('pizza-type')
export class PizzaTypeController {
  constructor(public service: PizzaTypeService) {}

  @Get()
  async getList(): Promise<PizzaTypeEntity[]> {
    return await this.service.getList();
  }
}
