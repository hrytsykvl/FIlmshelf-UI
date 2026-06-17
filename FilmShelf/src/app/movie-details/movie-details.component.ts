import { Component, OnInit, effect } from '@angular/core';
import { MovieService } from '../services/movie.service';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { MovieDetailsResponse } from '../models/movie-details-response';
import { CommonModule } from '@angular/common';
import { ActorComponent } from '../actor/actor.component';
import { WatchlistService } from '../services/watchlist.service';
import {
  checkMoviesInWatchlist,
  updateMovieInWatchlist,
} from '../helpers/watchlist-helper';
import { AccountService } from '../services/account.service';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';
import {
  DEFAULT_WATCHLIST_ID_KEY,
  WATCHLIST_KEY,
} from '../constants/constants';
import { LanguageService } from '../services/language.service';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    CommonModule,
    ActorComponent,
    NgHeroiconsModule,
    RouterLink,
    RouterOutlet,
    TranslatePipe,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  movieDetails: MovieDetailsResponse | null = null;
  inWatchlist: boolean = false;
  movieId!: number;
  showListDropdown: boolean = false;
  userLists: {
    watchlistId: number;
    title: string;
    movieIds: number[];
  }[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private watchlistService: WatchlistService,
    private accountService: AccountService,
    private router: Router,
    private languageService: LanguageService
  ) {
    effect(() => {
      const _ = this.languageService.language();
      if (this.movieId) {
        this.loadMovieDetails();
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.movieId = Number(params.get('id'));

      const statusMap = checkMoviesInWatchlist([this.movieId]);
      this.inWatchlist = statusMap[this.movieId] || false;

      this.loadMovieDetails();
    });

    this.route.queryParamMap.subscribe((queryParams) => {
      const triggerWatchlist = queryParams.get('triggerWatchlist');
      if (triggerWatchlist === 'true') {
        this.toggleWatchlist();
      }
    });

    this.loadUserLists();
  }

  private loadMovieDetails(): void {
    this.movieService.findMovie(this.movieId, this.languageService.language()).subscribe({
      next: (response: MovieDetailsResponse) => {
        this.movieDetails = response;
      },
    });
  }

  toggleWatchlist(): void {
    if (!this.accountService.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    const defaultWatchlistId = JSON.parse(
      localStorage.getItem(DEFAULT_WATCHLIST_ID_KEY)!
    );

    if (this.inWatchlist) {
      this.watchlistService.removeMovieFromWatchlist(this.movieId).subscribe({
        next: () => {
          this.inWatchlist = false;
          updateMovieInWatchlist(
            this.movieId,
            this.inWatchlist,
            defaultWatchlistId
          );
        },
      });
    } else {
      this.watchlistService.addMovieToWatchlist(this.movieId).subscribe({
        next: () => {
          this.inWatchlist = true;
          updateMovieInWatchlist(
            this.movieId,
            this.inWatchlist,
            defaultWatchlistId
          );
        },
      });
    }
  }

  toggleListDropdown(): void {
    if (!this.accountService.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    this.showListDropdown = !this.showListDropdown;
  }

  loadUserLists(): void {
    const storedLists = JSON.parse(localStorage.getItem(WATCHLIST_KEY) || '[]');
    const defaultWatchlistId = JSON.parse(
      localStorage.getItem(DEFAULT_WATCHLIST_ID_KEY)!
    );

    this.userLists = storedLists.filter(
      (list: any) => list.watchlistId !== defaultWatchlistId
    );
  }

  toggleMovieInList(watchlistId: number): void {
    const list = this.userLists.find(
      (list) => list.watchlistId === watchlistId
    );

    if (list) {
      const isMovieInList = list.movieIds.includes(this.movieId);

      if (isMovieInList) {
        const index = list.movieIds.indexOf(this.movieId);
        list.movieIds.splice(index, 1);
        updateMovieInWatchlist(this.movieId, false, watchlistId);

        this.watchlistService
          .removeMovieFromWatchlist(this.movieId, watchlistId)
          .subscribe();
      } else {
        list.movieIds.push(this.movieId);
        updateMovieInWatchlist(this.movieId, true, watchlistId);

        this.watchlistService
          .addMovieToWatchlist(this.movieId, watchlistId)
          .subscribe();
      }
    }
  }

  getFormattedTime(time: number): string {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    return this.languageService.translate('movieDetails.runtime', {
      hours,
      minutes,
    });
  }

  navigateToList(event: Event, listId: number): void {
    event.stopPropagation();
    this.router.navigate([`/list/${listId}`]);
  }

  onActorClick(actorId: number) {
    this.router.navigate(['/actor', actorId]);
  }
}
