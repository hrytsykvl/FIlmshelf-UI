import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../services/account.service';
import { LogoutUser } from '../models/logout-user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
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
