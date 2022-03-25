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