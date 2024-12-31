import { UserRole } from 'src/user/user.schema';

export interface AccessTokenPayload {
  id: string;
  iat: number;
  exp: number;
  role: UserRole;
}

export interface RefreshTokenPayload {
  id: string;
  iat: number;
  exp: number;
}
