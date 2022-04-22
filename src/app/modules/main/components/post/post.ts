type Post = {
  _id: string;
  content: {
    text: string;
    files: string[];
  };
  author: string;
  likes: string[];
  comments: string[];
  shares: [];
  shared: boolean;
  sharedSource?: {
    author: string;
    postId: string;
  };
  numberOfLikes: number;
  numberOfComments: number;
  isLiked: boolean;
};

type GetPostResponse = {
  post: Post;
};

type PostData = {
  auther?: {
    name: string;
    avatar?: string;
  };
  content: {
    text: string;
    media: PostMedia;
  };
  shared: boolean;
  sharedFrom?: string;
  numberOfLikes: number;
  numberOfComments: number;
  isLiked: boolean;
};

type PostMedia = {
  images: string[];
  video: string;
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
  PostData,
  PostMedia,
  PostComment,
  CommentsResponse,
};
