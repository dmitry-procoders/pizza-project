import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PizzaSizeEntity } from '../entities/pizza-size.entity';

@Injectable()
export class PizzaSizeService {
  constructor(
    @InjectRepository(PizzaSizeEntity)
    private repository: Repository<PizzaSizeEntity>,
  ) {}

  async getList(): Promise<PizzaSizeEntity[]> {
    return await this.repository.find();
  }
}
