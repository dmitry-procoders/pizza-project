import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KitchenEntity } from '../entities/kitchen.entity';
import { KitchenStatuses } from '../constants/kitchen-statuses';

@Injectable()
export class KitchenService {
  constructor(
    @InjectRepository(KitchenEntity)
    private repository: Repository<KitchenEntity>,
  ) {}

  async getOrderOnKitchen(id: number): Promise<KitchenEntity> {
    return await this.repository.findOneOrFail({
      where: { id },
    });
  }

  async getOrdersReadyForPreparing(): Promise<KitchenEntity[]> {
    return await this.repository.find({
      where: { status: KitchenStatuses.Pending },
    });
  }

  async getOrdersReadyForPickUp(): Promise<KitchenEntity[]> {
    return await this.repository.find({
      where: { status: KitchenStatuses.Ready },
    });
  }

  async prepareOrder(id: number): Promise<void> {
    const kitchenRecord = await this.getOrderOnKitchen(id);
    if (kitchenRecord.status !== KitchenStatuses.Pending) {
      throw new Error('Order must be in "Pending" status to be prepared');
    }
    kitchenRecord.status = KitchenStatuses.Preparing;
    await this.repository.save(kitchenRecord);
  }
}
