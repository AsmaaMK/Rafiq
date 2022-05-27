import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  show!: boolean;
  notificationsOn = true;
  notifications = [
    {
      id: 1,
      title: 'New Post',
      description: 'New post is created',
      date: '2020-01-01 4:00 PM',
      avatar: '',
    },
    {
      id: 1,
      title: 'New Post',
      description: 'New post is created',
      date: '2020-01-01 4:00 PM',
      avatar: '',
    },
    {
      id: 1,
      title: 'New Post',
      description: 'New post is created',
      date: '2020-01-01 4:00 PM',
      avatar: '',
    },
    {
      id: 1,
      title: 'New Post',
      description: 'New post is created',
      date: '2020-01-01 4:00 PM',
      avatar: '',
    },
    {
      id: 1,
      title: 'New Post',
      description: 'New post is created',
      date: '2020-01-01 4:00 PM',
      avatar: '',
    },
  ];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notificationIsShown.subscribe(
      (res) => (this.show = res)
    );
  }

  toggleNotifications() {
    this.notificationsOn = !this.notificationsOn;
  }
}
