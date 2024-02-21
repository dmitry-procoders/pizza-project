import { KitchenPrepareService } from '../services/kitchen-prepare-service';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class KitchenPrepareJob {
  constructor(private kitchenPrepareService: KitchenPrepareService) {}

  @Cron('0 */2 * * * *')
  handleCron() {
    console.log('Looking for orders to prepare...');
    this.kitchenPrepareService.reviewPrepared();
  }
}
