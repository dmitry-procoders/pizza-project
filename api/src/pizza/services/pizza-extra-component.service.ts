import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PizzaExtraComponentEntity } from '../entities/pizza-extra-component.entity';

/**
 * Service responsible for handling operations related to pizza extra components.
 */
@Injectable()
export class PizzaExtraComponentService {
  constructor(
    @InjectRepository(PizzaExtraComponentEntity)
    private repository: Repository<PizzaExtraComponentEntity>,
  ) {}

  /**
   * Retrieves a list of all PizzaExtraComponentEntity records from the repository.
   * @returns {Promise<PizzaExtraComponentEntity[]>} A promise that resolves to an array of PizzaExtraComponentEntity objects.
   */
  async getList(): Promise<PizzaExtraComponentEntity[]> {
    return await this.repository.find();
  }
}
