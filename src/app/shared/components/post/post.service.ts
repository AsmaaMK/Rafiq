import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { environment } from 'src/environments/environment';
import { UserInfoService } from '../../../modules/main/modules/profile/services/user-info.service';
import {
  Post,
  GetPostResponse,
  MediaType,
  PostMedia,
  GetPostsResponse,
  GetNewsfeedResponse,
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
  private url = `${environment.apiUrl}/api/v1/users`;

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private userInfoService: UserInfoService
  ) {}

  createPost(postData: any) {
    return this.http.post(
      `${this.url}/${this.userInfoService.myUserName.value}/posts`,
      postData,
      {
        headers: headers,
      }
    );
  }

  getPostById(postId: string): Observable<Post> {
    return this.http
      .get<GetPostResponse>(
        `${this.url}/${this.userInfoService.myUserName.value}/posts/${postId}`
      )
      .pipe(map((res) => res.post));
  }

  getInitialPosts(userName: string): Observable<Post[]> {
    return this.http
      .get<GetPostsResponse>(`${this.url}/${userName}/posts`)
      .pipe(map((res) => res.posts));
  }

  getMorePosts(userName: string, postId: string): Observable<Post[]> {
    return this.http
      .get<GetPostsResponse>(
        `${this.url}/${userName}/posts/morePosts/${postId}`
      )
      .pipe(map((res) => res.posts));
  }

  getNewsfeed(): Observable<Post[]> {
    return this.http
      .get<GetNewsfeedResponse>(`${environment.apiUrl}/api/v1/newsFeed`)
      .pipe(map((res) => res.newsFeed));
  }

  classifyPostMedia(postFiles: string[]): PostMedia {
    const mediaType: MediaType = postFiles[0].startsWith(
      'https://res.cloudinary.com/elaraby/image'
    )
      ? 'images'
      : 'video';

    return {
      type: mediaType,
      files: postFiles,
    };
  }

  getIsLiked(postId: string) {
    return this.http
      .get<any>(
        `${this.url}/${this.userInfoService.myUserName.value}/posts/${postId}/isLiked`,
        { headers: headers }
      )
      .pipe(map((res) => res.results));
  }

  like(postId: string) {
    this.http
      .put(
        `${this.url}/${this.userInfoService.myUserName.value}/posts/${postId}/like`,
        null
      )
      .subscribe();
  }

  unLike(postId: string) {
    this.http
      .delete(
        `${this.url}/${this.userInfoService.myUserName.value}/posts/${postId}/like`
      )
      .subscribe();
  }

  share(postId: string, postText: FormData) {
    const shareHeaders = new HttpHeaders();
    shareHeaders
      .append('Access-Control-Allow-Origin', '*')
      .append(
        'Access-Control-Allow-Methods',
        'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      );
    return this.http.post<any>(
      `${this.url}/${this.userInfoService.myUserName.value}/posts/${postId}/share`,
      postText,
      {
        headers: shareHeaders,
      }
    );
  }

  getLikes(postId: string) {
    return this.http
      .get<any>(
        `${this.url}/${this.userInfoService.myUserName.value}/posts/${postId}/likes`,
        {
          headers: headers,
        }
      )
      .pipe(map((res) => res.results.likes));
  }

  deletePost(postId: string) {
    return this.http.delete(
      `${this.url}/${this.userInfoService.myUserName.value}/posts/${postId}`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
      }
    );
  }

  addComment(postId: string, comment: string) {
    return this.http.post<any>(
      `${this.url}/${this.userInfoService.myUserName.value}/posts/${postId}/comments`,
      {
        text: comment,
      },
      { headers: headers }
    );
  }

  getComments(postId: string, numberOfComments: number) {
    return this.http
      .get<any>(
        `${this.url}/${this.userInfoService.myUserName.value}/posts/${postId}/comments?limit=1,${numberOfComments}`,
        {
          headers: headers,
        }
      )
      .pipe(map((res) => res.comments));
  }

  likeComment(postId: string, commentId: string) {
    return this.http.put(
      `${this.url}/${this.userInfoService.myUserName.value}/posts/${postId}/comments/${commentId}/like`,
      null,
      {
        headers: headers,
      }
    );
  }

  unlikeComment(postId: string, commentId: string) {
    return this.http.delete(
      `${this.url}/${this.userInfoService.myUserName.value}/posts/${postId}/comments/${commentId}/like`,
      {
        headers: headers,
      }
    );
  }

  deleteComment(postId: string, commentId: string) {
    return this.http.delete(
      `${this.url}/${this.userInfoService.myUserName.value}/posts/${postId}/comments/${commentId}`,
      {
        headers: headers,
      }
    );
  }

  increaseNumberOfViews(userName: string, postId: string) {
    this.http
      .post(`${this.url}/${userName}/posts/${postId}/views`, null, {
        headers: headers,
      })
      .subscribe();
  }
}
