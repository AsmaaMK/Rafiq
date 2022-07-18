import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToasterInfo, ToasterType } from '../../models/toaster-status';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  initInfo: ToasterInfo = {
    show: false,
    type: 'error',
    message: 'error',
  };

  toasterInfo: BehaviorSubject<ToasterInfo> = new BehaviorSubject(
    this.initInfo
  );

  constructor() {}

  showToaster(type: ToasterType, message: string) {
    this.toasterInfo.next({
      show: true,
      type: type,
      message: message,
    });
  }
}
