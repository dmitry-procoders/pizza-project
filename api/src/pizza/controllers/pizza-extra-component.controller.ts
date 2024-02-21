import { Controller, Get } from '@nestjs/common';
import { PizzaExtraComponentService } from '../services/pizza-extra-component.service';
import { PizzaExtraComponentEntity } from '../entities/pizza-extra-component.entity';

@Controller('pizza-extra-component')
export class PizzaExtraComponentController {
  constructor(public service: PizzaExtraComponentService) {}

  @Get()
  async getList(): Promise<PizzaExtraComponentEntity[]> {
    return await this.service.getList();
  }
}
