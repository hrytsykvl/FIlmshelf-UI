import { Component, input, output } from '@angular/core';
import { CustomNotification } from '../models/custom-notification';
import { CommonModule } from '@angular/common';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';
import { Router } from '@angular/router';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgHeroiconsModule, CommonModule, TranslatePipe],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  notification = input.required<CustomNotification>();
  notificationClicked = output<CustomNotification>();
  notificationDeleted = output<CustomNotification>();
  notificationRead = output<CustomNotification>();

  constructor(private router: Router) {}

  onNotificationClicked() {
    this.notification().movieId
      ? this.notificationClicked.emit(this.notification())
      : this.router.navigate(['/movies/popular']);
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
