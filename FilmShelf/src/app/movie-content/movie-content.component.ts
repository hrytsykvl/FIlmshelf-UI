import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-movie-content',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './movie-content.component.html',
  styleUrl: './movie-content.component.css',
})
export class MovieContentComponent {}
