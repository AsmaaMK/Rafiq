export type ResetPasswordResponse = {
  success: boolean;
  results?: {
    message: string;
  };
  error?: {
    error: {
      statusCode: number;
      message: string;
    };
  };
};
