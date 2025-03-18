export interface UserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  role: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  message: string;
  user: User; 
  token: string;
  role: string;
}