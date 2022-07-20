import { Component, OnInit } from '@angular/core';
import { POST } from 'src/app/shared/components/post/post';
import { PostService } from '../../../../shared/components/post/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: POST[] = [];
  showSpinner = true;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getNewsfeed().subscribe((res) => {
      res.forEach((post) => {
        this.posts.push(new POST(post, this.postService));
      });

      this.showSpinner = false;
    });
  }
}
