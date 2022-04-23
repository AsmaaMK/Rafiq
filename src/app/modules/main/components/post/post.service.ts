import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { environment } from 'src/environments/environment';
import {
  GetUserInfoResponse,
  UserInfo,
} from '../../modules/profile/models/user-info';
import { UserInfoService } from '../../modules/profile/services/user-info.service';
import {
  Post,
  GetPostResponse,
  PostData,
  PostMedia,
  CommentsResponse,
} from './post';

const headers = new HttpHeaders();
headers
  .append('content-type', 'application/json')
  .append('Access-Control-Allow-Origin', '*')
  .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url = `${environment.apiUrl}/api/v1/users/${this.userInfoService.myUserName.value}/posts`;

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
    isLiked: false,
  };

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private userInfoService: UserInfoService
  ) {}

  createPost(postData: any) {
    return this.http.post(this.url, postData, {
      headers: headers,
    });
  }

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

  getIsLiked(postId: string) {
    return this.http
      .get<any>(`${this.url}/${postId}/isLiked`, { headers: headers })
      .pipe(map((res) => res.results));
  }

  like(postId: string) {
    this.http.put(`${this.url}/${postId}/like`, null).subscribe();
  }

  unLike(postId: string) {
    this.http.delete(`${this.url}/${postId}/like`).subscribe();
  }

  share(postId: string, postText: FormData) {
    const shareHeaders = new HttpHeaders;
    shareHeaders
      .append('Access-Control-Allow-Origin', '*')
      .append(
        'Access-Control-Allow-Methods',
        'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      );
    return this.http.post<any>(`${this.url}/${postId}/share`, postText, {
      headers: shareHeaders
    });
  }

  getLikes(postId: string) {
    return this.http
      .get<any>(`${this.url}/${postId}/likes`, {
        headers: headers,
      })
      .pipe(map((res) => res.results.likes));
  }

  deletePost(postId: string) {
    return this.http.delete(`${this.url}/${postId}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    });
  }

  addComment(postId: string, comment: string) {
    return this.http.post<any>(
      `${this.url}/${postId}/comments`,
      {
        text: comment,
      },
      { headers: headers }
    );
  }

  getComments(postId: string, numberOfComments: number) {
    return this.http
      .get<any>(`${this.url}/${postId}/comments?limit=1,${numberOfComments}`, {
        headers: headers,
      })
      .pipe(map((res) => res.comments));
  }

  likeComment(postId: string, commentId: string) {
    return this.http.put(`${this.url}/${postId}/comments/${commentId}/like`, null, {
      headers: headers,
    });
  }

  unlikeComment(postId: string, commentId: string) {
    return this.http.delete(`${this.url}/${postId}/comments/${commentId}/like`, {
      headers: headers,
    });
  }

  deleteComment(postId: string, commentId: string) {
    return this.http.delete(`${this.url}/${postId}/comments/${commentId}`, {
      headers: headers,
    });
  }
}
