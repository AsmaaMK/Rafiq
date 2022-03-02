export type RefreshAccessTokenResponse = {
  success: boolean;
  results?: {
    message: string;
    accessToken: string;
    refreshToken: string;
  };
  error?: {
    error: {
      statusCode: number;
      message: string;
    };
  };
}