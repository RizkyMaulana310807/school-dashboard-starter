export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface AuthPayload {
  userId: string;
  email: string;
}