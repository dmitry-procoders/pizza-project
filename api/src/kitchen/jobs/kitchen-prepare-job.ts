import { KitchenPrepareService } from '../services/kitchen-prepare-service';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class KitchenPrepareJob {
  constructor(private kitchenPrepareService: KitchenPrepareService) {}

  @Cron('*/10 * * * * *')
  handleCron() {
    this.kitchenPrepareService.reviewPrepared();
  }
}
