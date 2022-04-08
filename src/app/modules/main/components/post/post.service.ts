import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { environment } from 'src/environments/environment';
import { UserInfoService } from '../../modules/profile/services/user-info.service';
import { Post, GetPostResponse, PostData, PostMedia } from './post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  myUserName = this.tokenStorageService.getUsername();
  private url = `${environment.apiUrl}/api/v1/users/${this.myUserName}/posts`;

  initialPostData: PostData = {
    auther: {
      name: '',
      avatar: '',
    },
    content: {
      text: '',
      media: {
        images: [],
        video: '',
      },
    },
    numberOfComments: 0,
    numberOfLikes: 0,
    shared: false,
    sharedFrom: '',
  };

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private userInfoService: UserInfoService
  ) {}

  getPostById(postId: string): Observable<Post> {
    return this.http
      .get<GetPostResponse>(`${this.url}/${postId}`)
      .pipe(map((res) => res.post));
  }

  classifyPostMedia(postFiles: string[]): PostMedia {
    const videoUrl = 'https://res.cloudinary.com/elaraby/video';
    const imageUrl = 'https://res.cloudinary.com/elaraby/image';

    let media: PostMedia = {
      images: [],
      video: '',
    };

    for (let file of postFiles) {
      if (file.startsWith(imageUrl)) {
        media.images?.push(file);
      } else if (file.startsWith(videoUrl)) {
        media.video = file;
      }
    }

    return media;
  }
}
