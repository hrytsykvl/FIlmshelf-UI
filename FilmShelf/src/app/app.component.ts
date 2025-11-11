import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RegisterComponent } from "./register/register.component";
import { AccountService } from './services/account.service';
import { LogoutUser } from './models/logout-user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FilmShelf';

  constructor(public accountService: AccountService, private router: Router) { }

  onLogOutClicked() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const logoutUser = new LogoutUser(refreshToken);
      
      this.accountService.logout(logoutUser).subscribe({
        next: () => {
          this.accountService.isLoggedIn = null;
          localStorage.clear();
          
          this.router.navigate([ '/login' ]);
        },

        error: (error) => {
          console.log(error);
        }
      });
    }
  }
}
