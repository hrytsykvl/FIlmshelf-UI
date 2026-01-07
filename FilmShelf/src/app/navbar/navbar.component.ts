import { Component, input, output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../services/account.service';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../services/notification.service';
import { ReviewNotification } from '../models/review-notification';
import { NotificationComponent } from '../notification/notification.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgHeroiconsModule,
    CommonModule,
    NotificationComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  notifications: ReviewNotification[] = [];
  isNotificationMenuVisible = false;
  unreadNotificationsCount = input<number>(0);
  countDecrement = output<void>();
  countDelete = output<void>();

  constructor(
    public accountService: AccountService,
    private router: Router,
    private notificationService: NotificationService,
    private appComponent: AppComponent
  ) {}

  toggleNotificationMenu() {
    if (!this.isNotificationMenuVisible) {
      this.notificationService.retrieveReviewNotifications().subscribe({
        next: (notifications) => {
          this.notifications = notifications.sort((a, b) => {
            if (a.isRead !== b.isRead) {
              return a.isRead ? 1 : -1;
            }
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          });
        },
      });
    }
    this.isNotificationMenuVisible = !this.isNotificationMenuVisible;
  }

  onNotificationClicked(notification: ReviewNotification) {
    this.notificationService.markNotificationAsRead(notification.id).subscribe({
      next: () => {
        this.countDecrement.emit();
        this.router.navigate(['/movie', notification.movieId, 'reviews'], {
          queryParams: { reviewId: notification.reviewResponse.reviewId },
          fragment: 'response-' + notification.reviewResponse.id,
        });
        this.isNotificationMenuVisible = false;
      },
    });
  }

  onNotificationDeleted(notification: ReviewNotification) {
    this.notificationService.deleteNotification(notification.id).subscribe({
      next: () => {
        this.countDecrement.emit();
        this.notifications = this.notifications.filter(
          (n) => n.id !== notification.id
        );
      },
    });
  }

  onNotificationRead(notification: ReviewNotification) {
    this.notificationService.markNotificationAsRead(notification.id).subscribe({
      next: () => {
        this.countDecrement.emit();
        this.notifications = this.notifications.map((n) => {
          if (n.id === notification.id) {
            return { ...n, isRead: true };
          }
          return n;
        });
      },
    });
  }

  deleteAllNotifications() {
    this.notificationService.deleteAllNotifications().subscribe({
      next: () => {
        this.countDelete.emit();
        this.notifications = [];
      },
    });
  }

  onLogOutClicked() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      this.accountService.logout().subscribe({
        next: () => {
          localStorage.clear();
          this.router.navigate(['/login']);
          this.appComponent.stopConnection();
        },

        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
