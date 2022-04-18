export type UserProfile = {
  numberOfFollowers?: number;
  numberOfFollowings?: number;
  numberOfPosts?: number;
  firstName?: string;
  lastName?: string;
  userName?: string;
  country?: string;
  liveIn?: string;
  dateOfBirth?: string;
  gender?: string;
  cover?: string;
  avatar?: string;
  socialMedia?: SocialWithLinks;
};

export type EditInfo = {
  firstName?: string;
  lastName?: string;
  country?: string;
  liveIn?: string;
  dateOfBirth?: string;
  gender?: string;
  socialMedia?: SocialWithLabels;
};

type SocialWithLinks = {
  link: string;
  userName?: string;
  label: 'facebook' | 'instagram' | 'youtube' | 'tiktok';
}[];

type SocialWithLabels = {
  userName: string;
  label: string;
}[];

export type SocialLinks = {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
};

export type GetUserInfoResponse = {
  success: boolean;
  results: UserInfo;
};

export type UserInfo = {
  firstName: string;
  lastName: string;
  userName: string;
  avatar: string;
};