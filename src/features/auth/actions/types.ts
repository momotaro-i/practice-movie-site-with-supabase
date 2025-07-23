export type LoginFormData = {
  email: string;
  password: string;
};

export type SignupFormData = {
  email: string;
  password: string;
};

export type AuthActionResult = {
  success: boolean;
  error?: string;
};
