import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PostData } from '../../components/post/post';
import { PostService } from '../../components/post/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private postService: PostService) {}

  posts: string[] = [
  ];

  ngOnInit(): void {
    this.posts = [
      '62653bd48622e648819139e2',
      '626565e78622e64881913bda',
      '6264878bdb7ea6a449ca9698',
      '62658e988622e648819140e0',
      '62658f218622e64881914118',
      '6265903c8622e6488191416d',
    ];
  }

 
}
