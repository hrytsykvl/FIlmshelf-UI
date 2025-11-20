import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieResponse } from '../models/movie-response';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
  movie = input.required<MovieResponse>();
  movieClicked = output<number>();

  onMovieClicked() {
    if (this.movie) {
      this.movieClicked.emit(this.movie().id);
    }
  }
}
