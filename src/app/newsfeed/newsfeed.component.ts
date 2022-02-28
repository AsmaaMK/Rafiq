import { Component, OnInit } from '@angular/core';
import { TestingApiService } from '../shared/services/testing-api.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {

  data = '';
  error = '';
  constructor(private test: TestingApiService) { }

  ngOnInit(): void {
    this.test.getPosts().subscribe(
      res => this.data = res.toString(),
      err => this.error = err.toString()
    )
  }
}
