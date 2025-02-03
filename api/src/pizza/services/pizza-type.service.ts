import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PizzaTypeEntity } from '../entities/pizza-type.entity';

@Injectable()
export class PizzaTypeService {
  constructor(
    @InjectRepository(PizzaTypeEntity)
    private repository: Repository<PizzaTypeEntity>,
  ) {}

  /**
   * Retrieves a list of all pizza types.
   * @returns {Promise<PizzaTypeEntity[]>} A promise that resolves to an array of PizzaTypeEntity objects.
   */
  async getList(): Promise<PizzaTypeEntity[]> {
    return await this.repository.find();
  }
}
