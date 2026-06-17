import { Component, Input, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieResponse } from '../models/movie-response';
import { WatchlistService } from '../services/watchlist.service';
import { Router, RouterLink } from '@angular/router';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';
import { updateMovieInWatchlist } from '../helpers/watchlist-helper';
import { DEFAULT_WATCHLIST_ID_KEY } from '../constants/constants';
import { CONFIRM_MESSAGES } from '../constants/messages';
import { TranslatePipe } from '../pipes/translate.pipe';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, NgHeroiconsModule, RouterLink, TranslatePipe],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
})
export class MovieComponent {
  movie = input.required<MovieResponse>();
  role = input<string>();
  rating = input<number>();
  watchlistId = input<number>();
  movieClicked = output<number>();
  movieRemoved = output<number>();
  @Input() inWatchlist: boolean = false;

  constructor(
    private watchlistService: WatchlistService,
    private languageService: LanguageService
  ) {}

  onMovieClicked() {
    if (this.movie) {
      this.movieClicked.emit(this.movie().id);
    }
  }

  removeFromWatchlist(movieId: number, watchlistId?: number) {
    if (this.watchlistId()){
      const isConfirmed = confirm(
        this.languageService.translate('confirm.deleteMovieFromList')
      );
      if (!isConfirmed) {
        return;
      }
    }
    const watchlistIdToRemove =
      watchlistId ||
      JSON.parse(localStorage.getItem(DEFAULT_WATCHLIST_ID_KEY)!);

    this.watchlistService.removeMovieFromWatchlist(movieId, watchlistIdToRemove).subscribe({
      next: () => {
        this.inWatchlist = false;
        updateMovieInWatchlist(movieId, this.inWatchlist, watchlistIdToRemove);
        this.movieRemoved.emit(movieId);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
