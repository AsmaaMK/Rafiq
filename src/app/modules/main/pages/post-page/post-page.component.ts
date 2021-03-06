import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RouterExtService } from 'src/app/shared/services/router-ext.service';
import { POST, PostData } from '../../../../shared/components/post/post';
import { PostService } from '../../../../shared/components/post/post.service';
import { UserInfo } from '../../modules/profile/models/user-info';
import { UserInfoService } from '../../modules/profile/services/user-info.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  previousUrl = '';
  postId: string = this.router.url.split('/')[3];
  postData!: PostData;

  constructor(
    private routerExtService: RouterExtService,
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit(): void {
    // get previous URL
    this.previousUrl = this.routerExtService.getPreviousUrl();
    if (this.previousUrl === '' || this.previousUrl === this.router.url)
      this.previousUrl = '/app/home';
    
    this.postService.getPostById(this.postId).subscribe(
      res => {
        const post = new POST(res, this.postService);
        this.postData = post.postData;
      }
    )
  }
}
