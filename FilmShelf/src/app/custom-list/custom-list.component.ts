import { Component, input, OnInit, output } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { CommonModule } from '@angular/common';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';
import { RouterLink } from '@angular/router';
import { CONFIRM_MESSAGES } from '../constants/messages';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-custom-list',
  standalone: true,
  imports: [CommonModule, NgHeroiconsModule, RouterLink],
  templateUrl: './custom-list.component.html',
  styleUrl: './custom-list.component.scss',
})
export class CustomListComponent implements OnInit {
  watchlistId = input.required<number>();
  title = input.required<string>();
  movieIds = input.required<number[]>();
  firstMoviePoster: string = '';
  deleteClicked = output<number>();

  constructor(
    private movieService: MovieService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    if (this.movieIds().length > 0) {
      this.movieService.findMovie(this.movieIds()[0]).subscribe({
        next: (response) => {
          this.firstMoviePoster = response.posterPath;
        },
      });
    }
  }

  onDeleteClicked() {
    const isConfirmed = confirm(this.languageService.translate('confirm.deleteList'));
    if (isConfirmed) {
      this.deleteClicked.emit(this.watchlistId());
    }
  }
}
