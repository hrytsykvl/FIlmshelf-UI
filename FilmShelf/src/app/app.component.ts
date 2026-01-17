import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SignalRService } from './services/signal-r.service';
import { CommonModule } from '@angular/common';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';
import { CustomNotification } from './models/custom-notification';
import { NotificationService } from './services/notification.service';
import { AccountService } from './services/account.service';
import { TOKEN_KEY } from './constants/constants';
import { MovieNotification } from './models/movie-notification';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule, NgHeroiconsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'FilmShelf';
  notifications: CustomNotification[] = [];
  movieNotifications: MovieNotification[] = [];
  unreadNotificationsCount = 0;
  fadingNotifications: Set<number> = new Set();

  constructor(
    private signalRService: SignalRService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initializeNotifications();
  }

  ngOnDestroy() {
    this.stopConnection();
  }

  initializeNotifications(fromLogin: boolean = false) {
    this.notificationService.unreadNotificationsCount().subscribe({
      next: (count) => {
        this.unreadNotificationsCount = count;
      },
    });

    this.signalRService.startConnection();

    if (!fromLogin) {
      this.signalRService
        .addNotificationListener()
        .subscribe((notification) => {
          this.notifications.push(notification);
          this.unreadNotificationsCount++;
          this.playNotificationSound();

          const index = this.notifications.length - 1;
          this.autoRemoveNotification(index);
        });

      this.signalRService
        .addMovieNotificationListener()
        .subscribe((notification) => {
          this.movieNotifications.push(notification);
          this.unreadNotificationsCount++;
          this.playNotificationSound();

          const index = this.notifications.length - 1;
          this.autoRemoveNotification(index);
        });
    }
  }

  stopConnection() {
    this.signalRService.stopConnection();
  }

  onCountDecrement() {
    this.unreadNotificationsCount--;
  }

  onCountDelete() {
    this.unreadNotificationsCount = 0;
  }

  playNotificationSound() {
    const audio = new Audio('notification.mp3');
    audio.play();
  }

  removeNotification(index: number, event?: Event): void {
    event?.stopPropagation();

    if (index >= 0) {
      this.fadingNotifications.add(index);

      setTimeout(() => {
        this.notifications.splice(index, 1);
        this.fadingNotifications.delete(index);
      }, 1000);
    }
  }

  removeMovieNotification(index: number, event?: Event): void {
    event?.stopPropagation();

    if (index >= 0) {
      this.fadingNotifications.add(index);

      setTimeout(() => {
        this.movieNotifications.splice(index, 1);
        this.fadingNotifications.delete(index);
      }, 1000);
    }
  }

  autoRemoveNotification(index: number): void {
    setTimeout(() => {
      this.removeNotification(index);
    }, 5000);
  }

  onNotificationClicked(notification: CustomNotification) {
    this.notificationService.markNotificationAsRead(notification.id).subscribe({
      next: () => {
        this.notifications = this.notifications.filter(
          (n) => n.id !== notification.id
        );
        this.onCountDecrement();
        this.router.navigate(['/movie', notification.movieId, 'reviews'], {
          queryParams: { reviewId: notification.reviewResponse!.reviewId },
          fragment: `response-${notification.reviewResponse!.id}`,
        });
      },
    });
  }

  isFading(index: number): boolean {
    return this.fadingNotifications.has(index);
  }
}
