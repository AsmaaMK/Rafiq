import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TestingApiService } from 'src/app/shared/services/testing-api.service';
import { PostData } from '../../components/post/post';
import { PostService } from '../../components/post/post.service';
import { UserInfo } from '../../modules/profile/models/user-info';
import { UserInfoService } from '../../modules/profile/services/user-info.service';
import { UserInfoResolver } from '../../resolvers/user-info.resolver';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private testapi: TestingApiService,
    private auth: AuthService,
    private postService: PostService,
    private userInfoService: UserInfoService
  ) { }
  
  postDataAssigned = new BehaviorSubject(false);

  postImages: string[] = [];

  postId = '6249dc2a8c72371ae4e9d67c';

  postAuthor: UserInfo = {
    userName: 'aaa',
    firstName: 'Asmaa',
    lastName: 'Mahmoud',
    avatar:
      'assets/main-module/post-images/WhatsApp Image 2022-03-24 at 11.34.08 AM.jpeg',
  };

  postData: PostData = {
    content: {
      media: {
        images: [
          'assets/main-module/post-images/WhatsApp Image 2022-03-24 at 11.34.08 AM.jpeg',
        ],
        video: '',
      },
      text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus nisi numquam voluptate labore facere, consequuntur fugit dignissimos quisquam, perferendis dolorum deserunt tenetur consequatur sunt esse sed soluta mollitia nam ipsam.',
    },
    auther: {
      name: 'aaa',
      avatar: '',
    },
    isLiked: true,
    numberOfComments: 2,
    numberOfLikes: 50,
    shared: false,
    sharedFrom: '',
  };

  ngOnInit(): void {
    this.preparePostData(this.postId);
    this.postDataAssigned.subscribe(() => {
      this.postImages = this.postData.content.media.images;
    });
  }

  preparePostData(postId: string) {
    this.postService.getPostById(postId).subscribe((res) => {
      this.postData.content.text = res.content.text;
      this.postData.content.media = this.postService.classifyPostMedia(
        res.content.files
      );
      this.postData.shared = res.shared;
      this.postData.sharedFrom = res.sharedSource?.author;
      this.postData.numberOfLikes = res.numberOfLikes;
      this.postData.numberOfComments = res.numberOfComments;
      this.postData.isLiked = res.isLiked;

      this.userInfoService.getUserInfo(res.author).subscribe((res) => {
        if (res.avatar) this.postAuthor.avatar = res.avatar;
        this.postAuthor.firstName = res.firstName;
        this.postAuthor.lastName = res.lastName;
        this.postAuthor.userName = res.userName;
        this.postDataAssigned.next(true);
      });
    });
  }
}
