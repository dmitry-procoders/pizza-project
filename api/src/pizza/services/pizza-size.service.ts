import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PizzaSizeEntity } from '../entities/pizza-size.entity';

/**
 * Service responsible for handling operations related to pizza sizes.
 */
@Injectable()
export class PizzaSizeService {
  constructor(
    @InjectRepository(PizzaSizeEntity)
    private repository: Repository<PizzaSizeEntity>,
  ) {}

  /**
   * Retrieves a list of all pizza sizes from the repository.
   * @returns {Promise<PizzaSizeEntity[]>} A promise that resolves to an array of PizzaSizeEntity objects.
   */
  async getList(): Promise<PizzaSizeEntity[]> {
    return await this.repository.find();
  }
}
