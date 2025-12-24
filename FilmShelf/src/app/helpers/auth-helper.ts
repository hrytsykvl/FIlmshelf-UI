import { JwtHelperService } from '@auth0/angular-jwt';
import {
  REFRESH_TOKEN_EXPIRATION_KEY,
  REFRESH_TOKEN_KEY,
  TOKEN_KEY,
} from '../constants/constants';

export function saveAuthTokens(
  token: string,
  refreshToken: string,
  refreshTokenExpirationDate: Date
): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(
    REFRESH_TOKEN_EXPIRATION_KEY,
    refreshTokenExpirationDate.toString()
  );
}

export function getUserIdFromToken(jwtHelper: JwtHelperService): number | null {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  const decodedToken = jwtHelper.decodeToken(token);

  return decodedToken.sub ? parseInt(decodedToken.sub, 10) : null;
}
