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
  isLiked: boolean;
};

type PostMedia = {
  images: string[];
  video: string;
};


export {
  Post,
  GetPostResponse,
  PostData,
  PostMedia
};
