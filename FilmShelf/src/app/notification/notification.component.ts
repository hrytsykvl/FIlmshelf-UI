import { Component, input, output } from '@angular/core';
import { ReviewNotification } from '../models/review-notification';
import { CommonModule } from '@angular/common';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgHeroiconsModule, CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent {
  notification = input.required<ReviewNotification>();
  notificationClicked = output<ReviewNotification>();
  notificationDeleted = output<ReviewNotification>();
  notificationRead = output<ReviewNotification>();

  onNotificationClicked() {
    this.notificationClicked.emit(this.notification());
  }

  deleteNotification(event: Event) {
    event.stopPropagation();
    this.notificationDeleted.emit(this.notification());
  }

  markAsRead(event: Event) {
    event.stopPropagation();
    this.notificationRead.emit(this.notification());
  }
}
