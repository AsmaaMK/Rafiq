export type UserInfo = {
  numberOfFollowers: number;
  numberOfFollowings: number;
  firstName: string;
  lastName: string;
  userName: string;
  country: string;
  dateOfBirth: string;
  gender: string;
  cover: string;
  avatar: string;
  numberOfPosts?: number; // TODO: make it required
  livesIn?: string;
  socialLinks?: {
    link: string;
    icon: string;
    label: string;
  }[];
};