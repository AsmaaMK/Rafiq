import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { TestingApiService } from '../shared/services/testing-api.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {

  data = '';
  error = '';
  constructor(private test: TestingApiService, private auth: AuthService) { }

  ngOnInit(): void {
    // this.test.getPosts().subscribe(
    //   res => this.data = res.toString(),
    //   err => this.error = err.toString()
    // )

    this.auth.refreshAccessToken().subscribe(
      res => this.data = res.toString(),
      err => this.error = err
    )
  }
}
