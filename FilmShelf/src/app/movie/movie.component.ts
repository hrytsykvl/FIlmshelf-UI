import { Component, Input, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieResponse } from '../models/movie-response';
import { WatchlistService } from '../services/watchlist.service';
import { Router, RouterLink } from '@angular/router';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';
import { updateMovieInWatchlist } from '../helpers/watchlist-helper';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, NgHeroiconsModule, RouterLink],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export class MovieComponent {
  movie = input.required<MovieResponse>();
  role = input<string>();
  rating = input<number>();
  movieClicked = output<number>();
  @Input() inWatchlist: boolean = false;

  constructor(private watchlistService: WatchlistService) {}

  onMovieClicked() {
    if (this.movie) {
      this.movieClicked.emit(this.movie().id);
    }
  }

  removeFromWatchlist(movieId: number) {
    this.watchlistService.removeMovieFromWatchlist(movieId).subscribe({
      next: () => {
        this.inWatchlist = false;
        updateMovieInWatchlist(movieId, this.inWatchlist);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
