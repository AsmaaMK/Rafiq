import { Directive } from '@angular/core';

@Directive({
  selector: '[appPossissionNotification]',
})
export class PossissionNotificationDirective {
  constructor() {}

  ngOnInit() {
    this.possissionNoficationIndicator();
  }

  possissionNoficationIndicator() {
    const notificationBtn = document.getElementById('notification-btn');
    const notificationContainer = document.querySelector<HTMLElement>(
      '.notification-container'
    );
    const notificationIndicator = document.querySelector<HTMLElement>(
      '.notification-indicator'
    );

    const bodyWidth = document.body.getBoundingClientRect().width;

    if (bodyWidth >= 800) {
      let possissionTop = 0;
      let possissionLeft = 0;

      if (notificationBtn && notificationIndicator) {
        possissionTop = notificationBtn.getBoundingClientRect().top - 17;
        possissionLeft = notificationBtn.getBoundingClientRect().width * 2;
      }

      if (notificationIndicator && notificationContainer) {
        notificationIndicator.style.top = possissionTop.toString() + 'px';
        notificationContainer.style.left = possissionLeft.toString() + 'px';
      }
    } else {
      let possissionLeft = 0;

      if (notificationBtn) {
        possissionLeft = notificationBtn.getBoundingClientRect().left - bodyWidth * 0.025;
      }

      if (notificationIndicator) {
        notificationIndicator.style.left = possissionLeft.toString() + 'px';
      }
    }
  }
}
