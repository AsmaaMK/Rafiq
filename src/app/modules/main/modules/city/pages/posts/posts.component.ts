import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostData } from 'src/app/shared/components/post/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  isAdmin = true;
  posts: PostData[] = [];

  showSpinner = true;
  cityId = this.router.url.split('/')[3];
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.showPost();
  }

  showPost() {
    setTimeout(() => {
      this.showSpinner = false;
      if (this.cityId === '1840034016') {
        this.posts.push({
          authorInfo: {
            avatar:
              'https://res.cloudinary.com/elaraby/image/upload/v1658278653/image/cityPhoto/1024px-New_york_times_square-terabass_wu1kfo.jpg',
            firstName: 'New York',
            lastName: 'US',
            userName: '1840034016',
          },
          content: {
            text: 'Welcome to New York!',
            media: {
              type: 'images',
              files: [
                'https://res.cloudinary.com/elaraby/image/upload/v1658278718/image/cityPhoto/new-york-cityscape-tourism-concept-photograph-image-id-57571180-1422963181-rBqn_tjlzwv_ykv4wl.jpg',
              ],
            },
          },
          isLiked: false,
          isShared: false,
          numberOfComments: 0,
          numberOfLikes: 23,
          postId: '',
          sharedSource: {
            authorInfo: {
              avatar: '',
              firstName: '',
              lastName: '',
              userName: '',
            },
            content: {
              text: '',
              media: {
                type: 'images',
                files: [],
              },
            },
            deleted: false,
            postId: '',
          },
        });
      }
    }, 1000);
  }
}
