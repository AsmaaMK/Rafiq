export type GetAccessTokenResponse = {
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