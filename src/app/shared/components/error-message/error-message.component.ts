import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  @Input() show = new BehaviorSubject(false);
  @Input() status = false;
  @Input() message = '';

  constructor(public elementRef: ElementRef) { }

  ngOnInit(): void {}

  close() {
    this.show.next(false);
  }

}
