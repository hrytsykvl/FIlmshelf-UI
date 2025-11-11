import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/register-user';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginUser } from '../models/login-user';
import { AuthenticationResponse } from '../models/authentication-response';
import { API_URL_FORGOT_PASSWORD, API_URL_LOGIN, API_URL_LOGOUT, API_URL_REGISTER, API_URL_RESET_PASSWORD, API_URL_TOKEN } from '../constants/api.urls';
import { LogoutUser } from '../models/logout-user';
import { PasswordResponse } from '../models/password-response';
import { ResetPassword } from '../models/reset-password';
import { ForgotPassword } from '../models/forgot-password';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public isLoggedIn: boolean | null = null;

  constructor(private httpClient: HttpClient) { }

  public register(registerUser: RegisterUser): Observable<AuthenticationResponse> {
    return this.httpClient.post<AuthenticationResponse>(API_URL_REGISTER, registerUser).pipe(
      catchError(this.handleError)
    );
  }

  public login(loginUser: LoginUser): Observable<AuthenticationResponse> {
    return this.httpClient.post<AuthenticationResponse>(API_URL_LOGIN, loginUser).pipe(
      catchError(this.handleError)
    );
  }

  public forgotPassword(forgotPassword: ForgotPassword) : Observable<PasswordResponse> {
    return this.httpClient.post<PasswordResponse>(API_URL_FORGOT_PASSWORD, forgotPassword).pipe(
      catchError(this.handleError)
    );
  }

  public resetPassword(resetPassword: ResetPassword): Observable<PasswordResponse> {
    return this.httpClient.post<PasswordResponse>(API_URL_RESET_PASSWORD, resetPassword).pipe(
      catchError(this.handleError)
    );
  }

  public logout(logoutUser: LogoutUser): Observable<void> {
    return this.httpClient.post<void>(API_URL_LOGOUT, logoutUser).pipe(
      catchError(this.handleError)
    );
  } 

  public generateNewToken(): Observable<AuthenticationResponse> {
    const token = localStorage["token"];
    const refreshToken = localStorage["refreshToken"];

    return this.httpClient.post<AuthenticationResponse>(API_URL_TOKEN, { token: token, refreshToken: refreshToken}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
  
    if (error.status === 400 || error.status === 401) {
      if (error.error.errors) {
        const fieldErrors = Object.values(error.error.errors).flat();
  
        if (fieldErrors.length > 0) {
          errorMessage = Array.from(new Set(fieldErrors)).join(' ');
        }
      } else if (error.error.title) {
        errorMessage = error.error.title;
      }
    } else {
      errorMessage = error.statusText;
    }
  
    return throwError(() => new Error(errorMessage));
  }
  
}
