import { Component, signal } from '@angular/core';
import { WatchlistResponse } from '../models/watchlist-response';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchlistService } from '../services/watchlist.service';
import { MovieComponent } from '../movie/movie.component';
import { CommonModule } from '@angular/common';
import { WatchlistMovie } from '../models/watchlist-movie';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [MovieComponent, CommonModule],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css',
})
export class WatchlistComponent {
  watchlist = signal<WatchlistResponse | null>(null);
  sortedMovies: WatchlistMovie[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private watchlistService: WatchlistService
  ) {}

  ngOnInit(): void {
    this.watchlistService.retrieveWatchlist().subscribe({
      next: (response: WatchlistResponse) => {
        this.watchlist.set(response);
        this.applySorting();
      },
    });

    this.route.queryParams.subscribe(() => {
      this.applySorting();
    });
  }

  onMovieClick(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }

  sortMovies(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const sortBy = selectElement.value;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: sortBy },
      queryParamsHandling: 'merge',
    });
  }

  private applySorting(): void {
    const sortBy = this.route.snapshot.queryParamMap.get('sort');
    const movies = this.watchlist()?.movies ?? [];

    if (!movies.length) {
      this.sortedMovies = [...movies];
      return;
    }

    switch (sortBy) {
      case 'title':
        this.sortedMovies = [...movies].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
      case 'averageRating':
        this.sortedMovies = [...movies].sort(
          (a, b) => b.averageRating - a.averageRating
        );
        break;
      default:
        this.sortedMovies = [...movies];
    }
  }
}
