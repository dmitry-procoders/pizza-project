import { OrderReviewService } from '../services/order-review.service';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class OrderReviewJob {
  constructor(private orderReviewService: OrderReviewService) {}

  @Cron('*/10 * * * * *')
  handleCron() {
    console.log('Called when the current second is 10');
    this.orderReviewService.reviewPendingOrders();
  }
}
