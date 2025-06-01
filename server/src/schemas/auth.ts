export interface RegisterSchema {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginSchema {
  email: string;
  password: string;
}
