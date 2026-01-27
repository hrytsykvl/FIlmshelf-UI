import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { WatchlistService } from './watchlist.service';
import { Router } from '@angular/router';
import {
  DEFAULT_WATCHLIST_ID_KEY,
  WATCHLIST_KEY,
} from '../constants/constants';
import { AuthenticationResponse } from '../models/authentication-response';
import { GoogleToken } from '../models/google-token';
import { saveAuthTokens } from '../helpers/auth-helper';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  private googleLoggedIn = false;
  private googleUser: SocialUser | null = null;

  constructor(
    private authService: SocialAuthService,
    private accountService: AccountService,
    private watchlistService: WatchlistService,
    private router: Router
  ) {}

  initGoogleAuthState(initializeNotifications: any): void {
    this.authService.authState.subscribe((user: SocialUser) => {
      if (this.googleUser == null) {
        this.googleUser = user;
        this.googleLoggedIn = user != null;
        if (this.googleLoggedIn) {
          this.handleGoogleLogin(user.idToken, initializeNotifications);
        }
      }
    });
  }

  loginWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.authService.signOut();
    this.googleUser = null;
    this.googleLoggedIn = false;
  }

  private handleGoogleLogin(
    idToken: string,
    initializeNotifications: any
  ): void {
    const googleToken = new GoogleToken(idToken);

    this.accountService.googleLogin(googleToken).subscribe({
      next: (response: AuthenticationResponse) => {
        saveAuthTokens(
          response.token,
          response.refreshToken,
          response.refreshTokenExpirationDate
        );

        this.watchlistService.checkWatchlistsMovies().subscribe({
          next: (response) => {
            localStorage.setItem(WATCHLIST_KEY, JSON.stringify(response));
            localStorage.setItem(
              DEFAULT_WATCHLIST_ID_KEY,
              JSON.stringify(response[0].watchlistId)
            );
          },
        });

        this.router.navigate(['/movies'], { replaceUrl: true });
        initializeNotifications();
      },
      error: (error) => {
        console.error('Google Login Error:', error);
      },
    });
  }
}
