import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { CompareValidation } from '../validators/custom-validator';
import { AuthenticationResponse } from '../models/authentication-response';
import { ERROR_MESSAGES } from '../constants/error-messages';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  isRegisterFormSubmitted: boolean = false;
  isRegisterInProgress: boolean = false;
  errorMessage: string | null = null;
  validationErrorMessages = ERROR_MESSAGES;
  lastAttemptedData: any = null;

  constructor(private accountService: AccountService, private router: Router){
    this.registerForm = new FormGroup({
      personName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      confirmationPassword: new FormControl(null, [Validators.required]),
    },
      {
        validators: [CompareValidation("password", "confirmationPassword")]
      });
  }

  get personNameControl() : FormControl | null {
    return this.registerForm.controls["personName"] as FormControl;
  }

  get emailControl() : FormControl | null {
    return this.registerForm.controls["email"] as FormControl;
  }

  get passwordControl() : FormControl | null {
    return this.registerForm.controls["password"] as FormControl;
  }

  get confirmationPasswordControl() : FormControl | null {
    return this.registerForm.controls["confirmationPassword"] as FormControl;
  }

  hasFormChanged(): boolean {
    const currentFormData = this.registerForm.value;
    return JSON.stringify(currentFormData) !== JSON.stringify(this.lastAttemptedData);
  }

  registerSubmitted() {
    this.isRegisterFormSubmitted = true;
    this.errorMessage = null;

    if (!this.hasFormChanged()) {
      return;
    }

    if(this.registerForm.valid){
      this.isRegisterInProgress = true;
      this.lastAttemptedData = this.registerForm.value;

      this.accountService.register(this.registerForm.value).subscribe({
        next: (response: AuthenticationResponse) => {
          this.isRegisterFormSubmitted = false;
          this.isRegisterInProgress = false;
          this.accountService.isLoggedIn = true;

          localStorage.setItem("token", response.token);
          localStorage.setItem("refreshToken", response.refreshToken);
          localStorage.setItem("refreshTokenExpirationDate", response.refreshTokenExpirationDate.toString());

          this.router.navigate([ '/movies' ]);
          this.registerForm.reset();
          this.lastAttemptedData = null;
        },
        error: (error) => {
          this.errorMessage = error.message;
          this.isRegisterInProgress = false;
        }
      });
    } else {
      this.lastAttemptedData = this.registerForm.value;
    }
  }
}
