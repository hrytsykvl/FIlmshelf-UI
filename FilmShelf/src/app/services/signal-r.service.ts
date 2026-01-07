import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';
import { TOKEN_KEY } from '../constants/constants';
import { HUB_NOTIFICATION_URL } from '../constants/hub.urls';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  private token: string = localStorage.getItem(TOKEN_KEY)!;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_NOTIFICATION_URL, { accessTokenFactory: () => this.token })
      .build();
  }

  public startConnection(): void {
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
      })
      .catch((err) => {
        console.log('Error while starting connection: ' + err);
      });
  }

  public addNotificationListener(): Observable<any> {
    return new Observable((observer) => {
      this.hubConnection.on('ReceiveNotification', (message: string) => {
        observer.next(message);
      });
    });
  }

  public sendNotification(message: string): void {
    this.hubConnection.invoke('SendNotification', message).catch((err) => {
      console.error(err);
    });
  }

  public stopConnection(): void {
    this.hubConnection
      .stop()
      .then(() => {
        console.log('Connection stopped');
      })
      .catch((err) => {
        console.log('Error while stopping connection: ' + err);
      });
  }
}
