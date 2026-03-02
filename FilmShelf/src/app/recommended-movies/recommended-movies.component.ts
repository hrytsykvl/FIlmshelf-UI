import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieComponent } from '../movie/movie.component';
import { checkMoviesInWatchlist } from '../helpers/watchlist-helper';

@Component({
  selector: 'app-recommended-movies',
  standalone: true,
  imports: [CommonModule, MovieComponent],
  templateUrl: './recommended-movies.component.html',
  styleUrl: './recommended-movies.component.scss',
})
export class RecommendedMoviesComponent implements OnInit {
  recommendedMovies: any[] = [];
  movieWatchlistStatus: { [key: number]: boolean } = {};

  ngOnInit(): void {
    this.movieService.retrieveRecommendedMovies().subscribe({
      next: (movies) => {
        this.recommendedMovies = movies;
        debugger;
        this.movieWatchlistStatus = checkMoviesInWatchlist(
          this.recommendedMovies.map((movie) => movie.id)
        );
      },
      error: (error) => {
        console.error('Error fetching recommended movies:', error);
      },
    });
  }

  constructor(private movieService: MovieService, private router: Router) {}

  onMovieClick(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }
}
