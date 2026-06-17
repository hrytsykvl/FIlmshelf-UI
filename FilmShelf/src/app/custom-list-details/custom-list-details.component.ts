import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchlistService } from '../services/watchlist.service';
import { WatchlistResponse } from '../models/watchlist-response';
import { MovieComponent } from '../movie/movie.component';
import { CommonModule } from '@angular/common';
import { checkMoviesInWatchlist } from '../helpers/watchlist-helper';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';
import { FormsModule } from '@angular/forms';
import { WATCHLIST_KEY } from '../constants/constants';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-custom-list-details',
  standalone: true,
  imports: [MovieComponent, CommonModule, NgHeroiconsModule, FormsModule, TranslatePipe],
  templateUrl: './custom-list-details.component.html',
  styleUrl: './custom-list-details.component.scss',
})
export class CustomListDetailsComponent implements OnInit {
  watchlist = signal<WatchlistResponse | null>(null);
  watchlistId: number = 0;
  movieWatchlistStatus: { [movieId: number]: boolean } = {};
  isEditingTitle: boolean = false;
  newTitle: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private watchlistService: WatchlistService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.watchlistId = Number(params.get('id'));
    });

    this.watchlistService.retrieveWatchlist(this.watchlistId).subscribe({
      next: (response: WatchlistResponse) => {
        this.watchlist.set(response);
        this.newTitle = response.title;
        this.movieWatchlistStatus = checkMoviesInWatchlist(
          this.watchlist()?.movies.map((movie) => movie.id) ?? []
        );
      },
    });
  }

  enableTitleEdit() {
    this.isEditingTitle = true;
  }

  cancelTitleEdit() {
    this.isEditingTitle = false;
    this.newTitle = this.watchlist()?.title || '';
  }

  saveTitle() {
    const updatedTitle = this.newTitle.trim();
    if (!updatedTitle || !this.watchlist()) return;

    this.watchlistService
      .updateWatchlist({ title: updatedTitle }, this.watchlistId)
      .subscribe({
        next: () => {
          const updatedWatchlist = this.watchlist();
          if (updatedWatchlist) {
            updatedWatchlist.title = updatedTitle;
            this.watchlist.set(updatedWatchlist);

            const localWatchlists = JSON.parse(
              localStorage.getItem(WATCHLIST_KEY) || '[]'
            );
            const targetWatchlist = localWatchlists.find(
              (list: { watchlistId: number }) =>
                list.watchlistId === this.watchlistId
            );

            if (targetWatchlist) {
              targetWatchlist.title = updatedTitle;
              localStorage.setItem(
                WATCHLIST_KEY,
                JSON.stringify(localWatchlists)
              );
            }
          }
          this.isEditingTitle = false;
        }
      });
  }

  onMovieRemoved(movieId: number) {
    const watchlist = this.watchlist();
    if (watchlist && watchlist.movies) {
      watchlist.movies = watchlist.movies.filter(
        (movie) => movie.id !== movieId
      );

      if (watchlist.totalMovies) {
        watchlist.totalMovies--;
      }
    }
  }

  onMovieClick(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }
}
