import { Component, input, OnInit, output } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../services/account.service';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../services/notification.service';
import { CustomNotification } from '../models/custom-notification';
import { NotificationComponent } from '../notification/notification.component';
import { AppComponent } from '../app.component';
import { GoogleAuthService } from '../services/google-auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  notifications: CustomNotification[] = [];
  isNotificationMenuVisible = false;
  unreadNotificationsCount = input<number>(0);
  countDecrement = output<void>();
  countDelete = output<void>();
  isMenuVisible = false;
  isDropdownOpen = false;

  constructor(
    public accountService: AccountService,
    private router: Router,
    private notificationService: NotificationService,
    private appComponent: AppComponent,
    private googleAuthService: GoogleAuthService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isMenuVisible = false;
        this.isDropdownOpen = false;
      }
    });
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(`(max-width: 800px)`).subscribe((result) => {
      if (!result.matches) {
        this.isMenuVisible = false;
      }
    });
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

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

  onNotificationClicked(notification: CustomNotification) {
    this.notificationService.markNotificationAsRead(notification.id).subscribe({
      next: () => {
        if (!notification.isRead) {
          this.countDecrement.emit();
        }
        this.router.navigate(['/movie', notification.movieId, 'reviews'], {
          queryParams: { reviewId: notification.reviewResponse?.reviewId },
          fragment: `response-${notification.reviewResponse!.id}`,
        });
        this.isNotificationMenuVisible = false;
      },
    });
  }

  onNotificationDeleted(notification: CustomNotification) {
    this.notificationService.deleteNotification(notification.id).subscribe({
      next: () => {
        if (!notification.isRead) {
          this.countDecrement.emit();
        }
        this.notifications = this.notifications.filter(
          (n) => n.id !== notification.id
        );
      },
    });
  }

  onNotificationRead(notification: CustomNotification) {
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
          this.googleAuthService.logOut();
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
