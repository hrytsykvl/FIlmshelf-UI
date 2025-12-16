import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ActorDetailsComponent } from './actor-details/actor-details.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { CustomListsComponent } from './custom-lists/custom-lists.component';
import { CreateListComponent } from './create-list/create-list.component';
import { CustomListDetailsComponent } from './custom-list-details/custom-list-details.component';

export const routes: Routes = [
    { path: "register", component: RegisterComponent},
    { path: "login", component: LoginComponent},
    { path: "forgot-password", component: ForgotPasswordComponent},
    { path: "reset", component: ResetPasswordComponent },
    { path: "movies", component: MoviesComponent },
    { path: "movie/:id", component: MovieDetailsComponent },
    { path: "actor/:id", component: ActorDetailsComponent },
    { path: "watchlist", component: WatchlistComponent},
    { path: "lists", component: CustomListsComponent },
    { path: "list/:id", component: CustomListDetailsComponent },
    { path: "create-list", component: CreateListComponent },
    { path: "**", redirectTo: "" }
];
