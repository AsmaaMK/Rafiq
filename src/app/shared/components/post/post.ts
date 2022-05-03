import { PostService } from "./post.service";

type PostData = {
  postId: string;
  authorInfo: {
    userName: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  content: {
    text: string;
    media: PostMedia;
  };
  isLiked: boolean;
  numberOfLikes: number;
  numberOfComments: number;
  isShared: boolean;
  sharedSource: {
    authorInfo: {
      userName: string;
      firstName: string;
      lastName: string;
      avatar: string;
    };
    postId: string;
    content: {
      text: string;
      media: PostMedia;
    };
    deleted: boolean;
  };
};

type Post = {
  _id: string;
  authorInfo: {
    userName: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  content: {
    text: string;
    files: string[];
  };
  isLiked: boolean;
  numberOfLikes: number;
  numberOfComments: number;
  isShared: boolean;
  sharedSource: {
    authorInfo: {
      userName: string;
      firstName: string;
      lastName: string;
      avatar: string;
    };
    postId: string;
  };
};

type GetPostResponse = {
  post: Post;
};

type GetPostsResponse = {
  posts: Post[];
}

type MediaType = 'images' | 'video' | 'noFiles';

type PostMedia = {
  files: string[];
  type: MediaType;
};

type PostComment = {
  id: string;
  user: {
    firstName: string;
    lastName: string;
    userName: string;
    avatar: string;
  };
  text: string;
  isLiked: boolean;
  numberOfLikes: number;
};

type CommentsResponse = {
  _id: string;
  author: string;
  content: {
    text: string;
    files: [];
    _id: string;
  };
  isLiked: boolean;
  numberOfLikes: number;
};

class POST {
  postData: PostData = {
    postId: '',
    authorInfo: {
      userName: '',
      firstName: '',
      lastName: '',
      avatar: '',
    },
    content: {
      text: '',
      media: {
        files: [],
        type: 'images',
      },
    },
    numberOfComments: 0,
    numberOfLikes: 0,
    isShared: false,
    sharedSource: {
      authorInfo: {
        userName: '',
        firstName: '',
        lastName: '',
        avatar: '',
      },
      postId: '',
      content: {
        text: '',
        media: {
          type: 'images',
          files: [],
        },
      },
      deleted: false,
    },
    isLiked: true,
  };

  constructor(res: Post, private postService: PostService) {
    this.preparePostData(res);
  }

  preparePostData(res: Post) {
    this.postData.postId = res._id;
    this.postData.authorInfo = res.authorInfo;
    this.postData.content.text = res.content.text;

    if (res.content.files.length)
      this.postData.content.media = this.postService.classifyPostMedia(
        res.content.files
      );
    else this.postData.content.media = { type: 'noFiles', files: [] };

    this.postData.isShared = res.isShared;
    this.postData.numberOfLikes = res.numberOfLikes;
    this.postData.numberOfComments = res.numberOfComments;
    this.postData.isLiked = res.isLiked;

    if (res.isShared) {
      this.postData.sharedSource.postId = res.sharedSource.postId;
      this.postData.sharedSource.authorInfo = res.sharedSource.authorInfo;

      this.postService
        .getPostById(res.sharedSource.postId)
        .subscribe((sharedPostRes) => {
          this.postData.sharedSource.content.text = sharedPostRes.content.text;

          if (sharedPostRes.content.files.length)
            this.postData.sharedSource.content.media =
              this.postService.classifyPostMedia(sharedPostRes.content.files);
          else
            this.postData.sharedSource.content.media = {
              type: 'noFiles',
              files: [],
            };
        }, err => {
          this.postData.sharedSource.deleted = true;
        });
    }
  }
}

export {
  Post,
  GetPostResponse,
  MediaType,
  PostComment,
  PostMedia,
  CommentsResponse,
  PostData,
  GetPostsResponse,
  POST
};
