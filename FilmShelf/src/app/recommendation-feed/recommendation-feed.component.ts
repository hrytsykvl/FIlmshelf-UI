import { Component, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LlmProvider, MovieService } from '../services/movie.service';
import { MovieResponse } from '../models/movie-response';
import { LlmRecommendation } from '../models/llm-recommendation';
import { MovieComponent } from '../movie/movie.component';
import { checkMoviesInWatchlist } from '../helpers/watchlist-helper';
import { TranslatePipe } from '../pipes/translate.pipe';
import { LanguageService } from '../services/language.service';

interface RecommendationMethod {
  value: string;
  labelKey: string;
  descriptionKey: string;
  llmProvider?: LlmProvider;
}

type ViewMode = 'grid' | 'detailed';

@Component({
  selector: 'app-recommendation-feed',
  standalone: true,
  imports: [CommonModule, FormsModule, MovieComponent, TranslatePipe],
  templateUrl: './recommendation-feed.component.html',
  styleUrl: './recommendation-feed.component.scss',
})
export class RecommendationFeedComponent implements OnInit {
  recommendedMovies: MovieResponse[] = [];
  llmRecommendations: LlmRecommendation[] = [];
  movieWatchlistStatus: { [key: number]: boolean } = {};
  isLoading = false;
  errorMessage = '';

  selectedMethod = 'ml';
  viewMode: ViewMode = 'grid';

  readonly methods: RecommendationMethod[] = [
    {
      value: 'llm',
      labelKey: 'recommendationFeed.method.claude.label',
      descriptionKey: 'recommendationFeed.method.claude.description',
      llmProvider: 'claude',
    },
    {
      value: 'ml',
      labelKey: 'recommendationFeed.method.ml.label',
      descriptionKey: 'recommendationFeed.method.ml.description',
    },
    {
      value: 'content',
      labelKey: 'recommendationFeed.method.content.label',
      descriptionKey: 'recommendationFeed.method.content.description',
    },
    {
      value: 'user-cf',
      labelKey: 'recommendationFeed.method.userCf.label',
      descriptionKey: 'recommendationFeed.method.userCf.description',
    },
    {
      value: 'embedding',
      labelKey: 'recommendationFeed.method.embedding.label',
      descriptionKey: 'recommendationFeed.method.embedding.description',
    },
    {
      value: 'llama',
      labelKey: 'recommendationFeed.method.gpt.label',
      descriptionKey: 'recommendationFeed.method.gpt.description',
      llmProvider: 'ollama',
    },
  ];

  constructor(private movieService: MovieService, private router: Router, private languageService: LanguageService) {
    effect(() => {
      const _ = this.languageService.language();
      this.loadRecommendations();
    });
  }

  ngOnInit(): void {
    // initial load handled by effect
  }

  get availableMethods(): RecommendationMethod[] {
    return this.viewMode === 'detailed'
      ? this.methods.filter((m) => !!m.llmProvider)
      : this.methods.filter((m) => !m.llmProvider);
  }

  get selectedMethodDescription(): string {
    const key = this.methods.find((m) => m.value === this.selectedMethod)?.descriptionKey ?? '';
    return key ? this.languageService.translate(key) : '';
  }

  setViewMode(mode: ViewMode): void {
    if (this.viewMode === mode) {
      return;
    }
    this.viewMode = mode;

    const current = this.methods.find((m) => m.value === this.selectedMethod);
    if (mode === 'detailed' && !current?.llmProvider) {
      this.selectedMethod = 'llm';
    } else if (mode === 'grid' && current?.llmProvider) {
      this.selectedMethod = 'ml';
    }

    this.loadRecommendations();
  }

  onMethodChange(): void {
    this.loadRecommendations();
  }

  onMovieClick(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }

  trackByMovieId(_index: number, item: MovieResponse): number {
    return item.id;
  }

  trackByLlmMovieId(_index: number, item: LlmRecommendation): number {
    return item.movie.id;
  }

  private loadRecommendations(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.recommendedMovies = [];
    this.llmRecommendations = [];

    if (this.viewMode === 'detailed') {
      this.loadLlmRecommendations();
    } else {
      this.loadGridRecommendations();
    }
  }

  private loadGridRecommendations(): void {
    this.movieService.retrieveRecommendedMovies(this.selectedMethod, this.languageService.language()).subscribe({
      next: (movies) => {
        this.recommendedMovies = movies;
        this.movieWatchlistStatus = checkMoviesInWatchlist(
          movies.map((movie) => movie.id)
        );
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching recommended movies:', error);
        this.errorMessage = this.languageService.translate('recommendationFeed.error.grid');
        this.isLoading = false;
      },
    });
  }

  private loadLlmRecommendations(): void {
    const provider =
      this.methods.find((m) => m.value === this.selectedMethod)?.llmProvider ??
      'claude';

    this.movieService.retrieveLlmRecommendations(provider, this.languageService.language()).subscribe({
      next: (items) => {
        this.llmRecommendations = items;
        this.movieWatchlistStatus = checkMoviesInWatchlist(
          items.map((item) => item.movie.id)
        );
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching LLM recommendations:', error);
        this.errorMessage = this.languageService.translate('recommendationFeed.error.detailed');
        this.isLoading = false;
      },
    });
  }
}
