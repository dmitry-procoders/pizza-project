import { KitchenPrepareService } from '../services/kitchen-prepare-service';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
/**
 * A job that handles the preparation of orders in the kitchen.
 * This job is scheduled to run every 2 minutes using a cron expression.
 */
export class KitchenPrepareJob {
  constructor(private kitchenPrepareService: KitchenPrepareService) {}

  /**
   * Handles the cron job for preparing kitchen orders.
   * Logs a message indicating that it is looking for orders to prepare,
   * and then calls the `reviewPrepared` method of the `kitchenPrepareService`
   * to review the prepared orders.
   */
  @Cron('0 */2 * * * *')
  handleCron() {
    console.log('Looking for orders to prepare...');
    this.kitchenPrepareService.reviewPrepared();
  }
}
