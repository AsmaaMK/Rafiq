import { Component, Input, OnInit } from '@angular/core';
import { ToasterType } from '../../models/toaster-status';
import { ToasterService } from './toaster.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class ToasterComponent implements OnInit {
  show = false;
  status: ToasterType = 'error';
  message = '';

  constructor(private toasterService: ToasterService) {}

  ngOnInit(): void {
    this.toasterService.toasterInfo.subscribe((info) => {
      this.show = info.show;
      this.status = info.type;
      this.message = info.message;
    });
  }

  close() {
    this.show = false;
  }
}
