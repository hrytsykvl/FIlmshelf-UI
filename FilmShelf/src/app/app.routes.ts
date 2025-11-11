import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const routes: Routes = [
    { path: "register", component: RegisterComponent},
    { path: "login", component: LoginComponent},
    { path: "forgot-password", component: ForgotPasswordComponent},
    { path: 'reset', component: ResetPasswordComponent },
    { path: '**', redirectTo: '' }
];
