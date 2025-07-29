export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  country: string;
}

export type UserPublic = Omit<User, "password">;

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

export interface UserStats {
  totalUsers: number;
  adminCount: number;
  userCount: number;
}
