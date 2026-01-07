import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReviewNotification } from '../models/review-notification';
import { API_URL_NOTIFICATIONS } from '../constants/api.urls';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private httpClient: HttpClient) {}

  public retrieveReviewNotifications(): Observable<ReviewNotification[]> {
    return this.httpClient.get<ReviewNotification[]>(
      `${API_URL_NOTIFICATIONS}`
    );
  }

  public unreadNotificationsCount(): Observable<number> {
    return this.httpClient.get<number>(`${API_URL_NOTIFICATIONS}/unread`);
  }

  public markNotificationAsRead(notificationId: number): Observable<void> {
    return this.httpClient.put<void>(
      `${API_URL_NOTIFICATIONS}/${notificationId}/read`,
      {}
    );
  }

  public deleteNotification(notificationId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${API_URL_NOTIFICATIONS}/${notificationId}`
    );
  }

  public deleteAllNotifications(): Observable<void> {
    return this.httpClient.delete<void>(`${API_URL_NOTIFICATIONS}`);
  }
}
