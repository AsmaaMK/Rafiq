export interface UserInfoResponse {
  success: boolean;
  results: {
    firstName: string;
    lastName: string;
    numberOfPosts?: number; // TODO: make it required
    country: string;
    livesIn?: string;

    socialLinks?: {
      link: string;
      icon: string;
      label: string;
    }[];

    gender: string; // unused
    dateOfBirth: string; // unused
  };
}

export type UserInfo = {
  firstName: string;
  lastName: string;
  numberOfPosts?: number; // TODO: make it required
  country: string;
  livesIn?: string;

  socialLinks?: {
    link: string;
    icon: string;
    label: string;
  }[];
};

export type UserProfile = {
  numberOfFollowers: number;
  numberOfFollowings: number;
  firstName: string;
  lastName: string;
  userName: string;
  country: string;
  dateOfBirth: string;
  gender: string;
  cover: null | string;
  avatar: null | string;
  numberOfPosts?: number; // TODO: make it required
  livesIn?: string;
  socialLinks?: {
    link: string;
    icon: string;
    label: string;
  }[];
};