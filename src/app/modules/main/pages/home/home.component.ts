import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TestingApiService } from 'src/app/shared/services/testing-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private testapi: TestingApiService, private auth: AuthService) { }

  ngOnInit(): void {
    // this.testapi.getPosts().subscribe(
    //   res => {
    //     console.log('hi');
    //   },
    //   err => {
    //     console.error('bye', err);
    //   }
    // )

  }

  logout() {
    this.auth.logoutUser();
  }

}
