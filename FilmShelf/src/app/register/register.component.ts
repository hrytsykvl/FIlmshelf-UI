import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { CompareValidation } from '../validators/custom-validator';
import { AuthenticationResponse } from '../models/authentication-response';
import { ERROR_MESSAGES } from '../constants/messages';
import { WatchlistService } from '../services/watchlist.service';
import { saveAuthTokens } from '../helpers/auth-helper';
import {
  DEFAULT_WATCHLIST_ID_KEY,
  WATCHLIST_KEY,
} from '../constants/constants';
import { AppComponent } from '../app.component';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { GoogleAuthService } from '../services/google-auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, GoogleSigninButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isRegisterFormSubmitted: boolean = false;
  isRegisterInProgress: boolean = false;
  errorMessage: string | null = null;
  validationErrorMessages = ERROR_MESSAGES;
  lastAttemptedData: any = null;

  constructor(
    private googleAuthService: GoogleAuthService,
    private accountService: AccountService,
    private watchlistService: WatchlistService,
    private router: Router,
    private appComponent: AppComponent
  ) {
    this.registerForm = new FormGroup(
      {
        personName: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required]),
        confirmationPassword: new FormControl(null, [Validators.required]),
      },
      {
        validators: [CompareValidation('password', 'confirmationPassword')],
      }
    );
  }

  ngOnInit(): void {
    this.googleAuthService.initGoogleAuthState(
      this.initializeNotifications.bind(this)
    );
  }

  get personNameControl(): FormControl | null {
    return this.registerForm.controls['personName'] as FormControl;
  }

  get emailControl(): FormControl | null {
    return this.registerForm.controls['email'] as FormControl;
  }

  get passwordControl(): FormControl | null {
    return this.registerForm.controls['password'] as FormControl;
  }

  get confirmationPasswordControl(): FormControl | null {
    return this.registerForm.controls['confirmationPassword'] as FormControl;
  }

  hasFormChanged(): boolean {
    const currentFormData = this.registerForm.value;
    return (
      JSON.stringify(currentFormData) !== JSON.stringify(this.lastAttemptedData)
    );
  }

  initializeNotifications() {
    this.appComponent.initializeNotifications(true);
  }

  registerSubmitted() {
    this.isRegisterFormSubmitted = true;
    this.errorMessage = null;

    if (!this.hasFormChanged()) {
      return;
    }

    if (this.registerForm.valid) {
      this.isRegisterInProgress = true;
      this.lastAttemptedData = this.registerForm.value;

      this.accountService.register(this.registerForm.value).subscribe({
        next: (response: AuthenticationResponse) => {
          this.isRegisterFormSubmitted = false;
          this.isRegisterInProgress = false;

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

          this.router.navigate(['/movies']);
          this.registerForm.reset();
          this.lastAttemptedData = null;
          this.initializeNotifications();
        },
        error: (error) => {
          this.errorMessage = error.message;
          this.isRegisterInProgress = false;
        },
      });
    } else {
      this.lastAttemptedData = this.registerForm.value;
    }
  }
}
