export type RegisterResponse = {
  success: boolean;
  results?: {
    message: string;
    user: {
      userName: string;
    };
    accessToken: string;
    refreshToken: string;
  };
  error?: {
    error: {
      statusCode: number;
      message: string;
    };
  };
};