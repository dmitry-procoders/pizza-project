import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DeliveryCompletionService } from '../services/delivery-completion-service';

@Injectable()
export class DeliveryCompletionJob {
  constructor(private deliveryCompletionService: DeliveryCompletionService) {}

  @Cron('0 */2 * * * *')
  handleCron() {
    console.log('Finishing orders delivering...');
    this.deliveryCompletionService.reviewDeliveringOrders();
  }
}
