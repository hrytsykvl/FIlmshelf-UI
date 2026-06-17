import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { ForgotPassword } from '../models/forgot-password';
import { PasswordResponse } from '../models/password-response';
import { URL_RESET_PASSWORD } from '../constants/reset-password.url';
import { ERROR_MESSAGES } from '../constants/messages';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isSubmitted: boolean = false;
  message: string | null = null;
  errorMessage: string | null = null;
  validationErrorMessages = ERROR_MESSAGES;

  constructor(private accountService: AccountService, private router: Router) {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  get emailControl(): FormControl | null {
    return this.forgotPasswordForm.controls['email'] as FormControl;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.forgotPasswordForm.valid) {
      const forgotPassword: ForgotPassword = {
        email: this.forgotPasswordForm.value.email,
        resetPasswordUrl: URL_RESET_PASSWORD,
      };

      this.accountService.forgotPassword(forgotPassword).subscribe({
        next: (response: PasswordResponse) => {
          this.message = response.message;
        },
        error: (error) => {
          this.errorMessage = error.message;
        },
      });
    }
  }
}
