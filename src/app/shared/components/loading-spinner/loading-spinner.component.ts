import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {

  @Input() show = false;
  @Input() overlay: 'page' | 'component' = 'page';
  @Input() colored = true;

  constructor() { }

  ngOnInit(): void {
  }

}
