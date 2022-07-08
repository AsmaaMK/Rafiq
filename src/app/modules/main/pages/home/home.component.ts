import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../shared/components/post/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private postService: PostService) {}

  posts!: string[];

  ngOnInit(): void {}
}
