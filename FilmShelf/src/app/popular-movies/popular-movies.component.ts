import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { MovieListResponse } from '../models/movie-list-response';
import { MovieComponent } from '../movie/movie.component';
import { checkMoviesInWatchlist } from '../helpers/watchlist-helper';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-popular-movies',
  standalone: true,
  imports: [MovieComponent, CommonModule, TranslatePipe],
  templateUrl: './popular-movies.component.html',
  styleUrl: './popular-movies.component.scss',
})
export class PopularMoviesComponent implements OnInit {
  movies: MovieListResponse | null = null;
  movieWatchlistStatus: { [key: number]: boolean } = {};

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.movieService.retrievePopularMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.movieWatchlistStatus = checkMoviesInWatchlist(
          this.movies.movieList.map((movie) => movie.id)
        );
      },
    });
  }

  onMovieClick(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }
}
