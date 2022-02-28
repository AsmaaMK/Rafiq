export type ResetPasswordRequest = {
  resetToken: string | null;
  password: string;
  confirmPassword: string;
};