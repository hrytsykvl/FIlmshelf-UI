import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPassword } from '../models/reset-password';
import { PasswordResponse } from '../models/password-response';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  token: string | null = null;
  email: string | null = null;

  constructor(
    private accountService: AccountService,
     private route: ActivatedRoute,
     private router: Router
  ) {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl({ value: '', disabled: true }),
      password: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || null;
      this.email = params['email'] || null;

      if (this.email) {
        this.resetPasswordForm.get('email')?.setValue(this.email);
      } else {
        this.errorMessage = "Invalid or expired reset link.";
      }
    });
  }

  onResetPasswordSubmit() {
    if (this.resetPasswordForm.valid && this.token && this.email) {
      const password = this.resetPasswordForm.value.password;
      const resetPassword = new ResetPassword(this.email, this.token, password);

      this.accountService.resetPassword(resetPassword).subscribe({
        next: (response: PasswordResponse) => {
          this.successMessage = response.message;
          this.errorMessage = null;

          this.router.navigate(['/login']);
        },
        error: (error) =>{
          this.errorMessage = error.message;
          this.successMessage = null;
        }
      });
    }
  }
}
