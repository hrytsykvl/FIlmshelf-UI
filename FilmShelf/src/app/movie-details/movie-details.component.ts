import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetailsResponse } from '../models/movie-details-response';
import { CommonModule } from '@angular/common';
import { ActorComponent } from '../actor/actor.component';
import { WatchlistService } from '../services/watchlist.service';
import { updateMovieInWatchlist } from '../helpers/watchlist-helper';
import { AccountService } from '../services/account.service';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, ActorComponent, NgHeroiconsModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit {
  movieDetails: MovieDetailsResponse | null = null;
  inWatchlist: boolean = false;
  movieId!: number;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private watchlistService: WatchlistService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.movieId = Number(params.get('id'));

      this.checkIfInWatchlist(this.movieId);

      this.movieService.findMovie(this.movieId).subscribe({
        next: (response: MovieDetailsResponse) => {
          this.movieDetails = response;
        },
      });
    });

    this.route.queryParamMap.subscribe((queryParams) => {
      const triggerWatchlist = queryParams.get('triggerWatchlist');
      if (triggerWatchlist === 'true') {
        this.toggleWatchlist();
      }
    });
  }

  checkIfInWatchlist(movieId: number): void {
    const storedWatchlist = JSON.parse(
      localStorage.getItem('watchlist') || '[]'
    );
    this.inWatchlist = storedWatchlist.includes(movieId);
  }

  toggleWatchlist(): void {
    if (!this.accountService.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.inWatchlist) {
      this.watchlistService.removeMovieFromWatchlist(this.movieId).subscribe({
        next: () => {
          this.inWatchlist = false;
          updateMovieInWatchlist(this.movieId, this.inWatchlist);
        },
      });
    } else {
      this.watchlistService.addMovieToWatchlist(this.movieId).subscribe({
        next: () => {
          this.inWatchlist = true;
          updateMovieInWatchlist(this.movieId, this.inWatchlist);
        },
      });
    }
  }

  onActorClick(actorId: number) {
    this.router.navigate(['/actor', actorId]);
  }
}
