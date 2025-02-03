import { Controller, Get } from '@nestjs/common';
import { PizzaTypeService } from '../services/pizza-type.service';
import { PizzaTypeEntity } from '../entities/pizza-type.entity';

/**
 * Controller for handling requests related to pizza types.
 */
@Controller('pizza-type')
export class PizzaTypeController {
  constructor(public service: PizzaTypeService) {}

  /**
   * Retrieves a list of pizza types.
   * @returns {Promise<PizzaTypeEntity[]>} A promise that resolves to an array of PizzaTypeEntity objects.
   */
  @Get()
  async getList(): Promise<PizzaTypeEntity[]> {
    return await this.service.getList();
  }
}
