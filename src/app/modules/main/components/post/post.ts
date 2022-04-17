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
};

type GetPostResponse = {
  post: Post;
};

type PostData = {
  auther: {
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
};

type PostMedia = {
  images: string[];
  video: string;
};

type GetPostAuthorResponse = {
  success: boolean;
  results: PostAuthor;
};

type PostAuthor = {
  firstName: string;
  lastName: string;
  userName: string;
  avatar: string;
};

export {
  Post,
  GetPostResponse,
  PostData,
  PostMedia,
  PostAuthor,
  GetPostAuthorResponse,
};
