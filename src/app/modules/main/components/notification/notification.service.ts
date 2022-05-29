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

  closeNotification() {
    if (this.notificationIsShown.value === true)
      this.notificationIsShown.next(false);
  }

  isOpen() {
    return this.notificationIsShown.value;
  }
}
