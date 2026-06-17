import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationResponse } from '../models/authentication-response';
import { ERROR_MESSAGES } from '../constants/messages';
import { WatchlistService } from '../services/watchlist.service';
import { saveAuthTokens } from '../helpers/auth-helper';
import {
  DEFAULT_WATCHLIST_ID_KEY,
  WATCHLIST_KEY,
} from '../constants/constants';
import { SignalRService } from '../services/signal-r.service';
import { AppComponent } from '../app.component';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { GoogleAuthService } from '../services/google-auth.service';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleSigninButtonModule, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoginFormSubmitted: boolean = false;
  isLoginInProgress: boolean = false;
  errorMessage: string | null = null;
  validationErrorMessages = ERROR_MESSAGES;
  lastAttemptedData: any = null;

  constructor(
    private googleAuthService: GoogleAuthService,
    private accountService: AccountService,
    private router: Router,
    private watchlistService: WatchlistService,
    private appComponent: AppComponent
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.googleAuthService.initGoogleAuthState(
      this.initializeNotifications.bind(this)
    );
  }

  get emailControl(): FormControl | null {
    return this.loginForm.controls['email'] as FormControl;
  }

  get passwordControl(): FormControl | null {
    return this.loginForm.controls['password'] as FormControl;
  }

  hasFormChanged(): boolean {
    const currentFormData = this.loginForm.value;
    return (
      JSON.stringify(currentFormData) !== JSON.stringify(this.lastAttemptedData)
    );
  }

  initializeNotifications() {
    this.appComponent.initializeNotifications(true);
  }

  loginSubmitted() {
    this.isLoginFormSubmitted = true;
    this.errorMessage = null;

    if (!this.hasFormChanged()) {
      return;
    }

    if (this.loginForm.valid) {
      this.isLoginInProgress = true;
      this.lastAttemptedData = this.loginForm.value;

      this.accountService.login(this.loginForm.value).subscribe({
        next: (response: AuthenticationResponse) => {
          this.isLoginFormSubmitted = false;
          this.isLoginInProgress = false;

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
          this.loginForm.reset();
          this.lastAttemptedData = null;
          this.initializeNotifications();
        },

        error: (error) => {
          this.errorMessage = error.message;
          this.isLoginInProgress = false;
        },
      });
    } else {
      this.lastAttemptedData = this.loginForm.value;
    }
  }
}
