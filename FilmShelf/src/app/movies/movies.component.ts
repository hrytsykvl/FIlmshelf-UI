import { Component, OnInit, effect } from '@angular/core';
import { MovieListResponse } from '../models/movie-list-response';
import { MovieService } from '../services/movie.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieComponent } from '../movie/movie.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { checkMoviesInWatchlist } from '../helpers/watchlist-helper';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MovieResponse } from '../models/movie-response';
import { LanguageService } from '../services/language.service';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    CommonModule,
    MovieComponent,
    PaginationComponent,
    SearchBarComponent,
    TranslatePipe,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements OnInit {
  page: MovieListResponse | null = null;
  currentPage: number = 1;
  totalPages?: number;
  movieWatchlistStatus: { [key: number]: boolean } = {};
  searchQuery: string = '';

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private languageService: LanguageService
  ) {
    effect(() => {
      const _ = this.languageService.language();
      if (this.currentPage) {
        this.loadPage(this.currentPage);
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const page = Number(params['page']) || 1;
      this.currentPage = page;
      this.loadPage(page);
    });
  }

  loadPage(pageNumber: number): void {
    this.movieService.page(pageNumber, this.languageService.language()).subscribe({
      next: (response) => {
        this.page = response;
        this.currentPage = pageNumber;
        this.totalPages = response.totalPages;

        this.movieWatchlistStatus = checkMoviesInWatchlist(
          this.page.movieList.map((movie) => movie.id)
        );

        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { page: pageNumber },
          queryParamsHandling: 'merge',
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onPageChange(pageNumber: number): void {
    this.loadPage(pageNumber);
  }

  onMovieClick(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }

  onSearchMovieSelected(movie: MovieResponse): void {
    this.router.navigate(['/movie', movie.id]);
  }
}
