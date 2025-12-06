import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, EMPTY, throwError } from 'rxjs';
import { AccountService } from '../services/account.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  const token = localStorage.getItem('token');
  const refreshTokenExpirationDate = localStorage.getItem('refreshTokenExpirationDate');

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401) {
          const isExpired = refreshTokenExpirationDate &&
           new Date(refreshTokenExpirationDate) <= new Date();
           
          if (isExpired) {
            alert('Your session has expired. Redirecting to login page.');
            accountService.$refreshTokenExpired.next(true);
            router.navigate(['/login']);
          } else {
            accountService.$refreshToken.next(true);
          }
        }
        return EMPTY;
      })
    );
  }
  return next(req);
};
