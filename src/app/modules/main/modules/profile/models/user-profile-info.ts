import { BehaviorSubject } from "rxjs";

export interface UserProfileInfo {
  following?: BehaviorSubject<boolean>;

  personalImageURL: string;
  coverImageURL: string;

  name: string;
  username: string;

  numberOfPosts: number;
  numberOfFollowers: number;
  from: string;
  livesIn: string;

  socialLinks: {
    link: string;
    icon: string;
  }[];
}