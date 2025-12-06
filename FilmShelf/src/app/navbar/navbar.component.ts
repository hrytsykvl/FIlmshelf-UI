import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../services/account.service';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgHeroiconsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(public accountService: AccountService, private router: Router) {}

  onLogOutClicked() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      this.accountService.logout().subscribe({
        next: () => {
          localStorage.clear();
          this.router.navigate(['/login']);
        },

        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
