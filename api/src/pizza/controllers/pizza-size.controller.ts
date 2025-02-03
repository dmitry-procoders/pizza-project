import { Controller, Get } from '@nestjs/common';
import { PizzaSizeService } from '../services/pizza-size.service';
import { PizzaSizeEntity } from '../entities/pizza-size.entity';

/**
 * Controller for handling requests related to pizza sizes.
 */
@Controller('pizza-size')
export class PizzaSizeController {
  constructor(public service: PizzaSizeService) {}

  /**
   * Retrieves a list of all pizza sizes.
   * @returns A promise that resolves to an array of PizzaExtraComponentEntity objects.
   */
  @Get()
  async getList(): Promise<PizzaSizeEntity[]> {
    return await this.service.getList();
  }
}
