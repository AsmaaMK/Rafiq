import { Component, Input, OnInit } from '@angular/core';
import { ToasterType } from '../../models/toaster-status';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class ToasterComponent implements OnInit {
  @Input() show = false;
  @Input() status: ToasterType = 'error';
  @Input() message = '';

  constructor() {}

  ngOnInit(): void {}

  close() {
    this.show = false;
  }
}
