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

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export interface LoginResponse {
  message: string;
  user: User; 
  token: string;
  role: string;
  status: string;
}