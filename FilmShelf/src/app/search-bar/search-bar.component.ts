import {
  Component,
  inject,
  input,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MovieResponse } from '../models/movie-response';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { MovieService } from '../services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  placeholder = input<string>('Search movies...');
  movieSelected = output<MovieResponse>();

  private movieService = inject(MovieService);

  searchControl = new FormControl('');
  movies: WritableSignal<MovieResponse[]> = signal([]);

  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((query: string | null) => {
        const trimmed = query?.trim();
        if (trimmed) {
          this.searchSubject.next(trimmed);
        } else {
          this.movies.set([]);
        }
      });

    this.searchSubject
      .pipe(
        debounceTime(300),
        switchMap((query) => this.movieService.searchMovies(query)),
        takeUntil(this.destroy$)
      )
      .subscribe((results) => {
        this.movies.set(results);
      });
  }

  selectMovie(movie: MovieResponse): void {
    this.movieSelected.emit(movie);
    this.searchControl.setValue(movie.title);
    this.movies.set([]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
