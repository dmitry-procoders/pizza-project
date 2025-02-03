import { Controller, Get } from '@nestjs/common';
import { PizzaExtraComponentService } from '../services/pizza-extra-component.service';
import { PizzaExtraComponentEntity } from '../entities/pizza-extra-component.entity';

/**
 * Controller for handling requests related to pizza extra components.
 */
@Controller('pizza-extra-component')
export class PizzaExtraComponentController {
  constructor(public service: PizzaExtraComponentService) {}

  /**
   * Retrieves a list of all pizza extra components.
   * @returns A promise that resolves to an array of PizzaExtraComponentEntity objects.
   */
  @Get()
  async getList(): Promise<PizzaExtraComponentEntity[]> {
    return await this.service.getList();
  }
}
