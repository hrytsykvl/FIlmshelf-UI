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
