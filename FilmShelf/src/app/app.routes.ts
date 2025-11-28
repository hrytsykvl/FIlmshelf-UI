import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ActorDetailsComponent } from './actor-details/actor-details.component';

export const routes: Routes = [
    { path: "register", component: RegisterComponent},
    { path: "login", component: LoginComponent},
    { path: "forgot-password", component: ForgotPasswordComponent},
    { path: "reset", component: ResetPasswordComponent },
    { path: "movies", component: MoviesComponent },
    { path: "movie/:id", component: MovieDetailsComponent },
    { path: "actor/:id", component: ActorDetailsComponent },
    { path: "**", redirectTo: "" }
];
