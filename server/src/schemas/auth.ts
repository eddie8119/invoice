export interface RegisterSchema {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginSchema {
  email: string;
  password: string;
}
