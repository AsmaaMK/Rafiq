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

export {
  Post,
  GetPostResponse,
  MediaType,
  PostComment,
  PostMedia,
  CommentsResponse,
  PostData
};
