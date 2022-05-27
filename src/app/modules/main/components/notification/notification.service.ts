import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notificationIsShown = new BehaviorSubject(false);

  toggleNotificationView() {
    this.notificationIsShown.next(!this.notificationIsShown.value);
  }
}
