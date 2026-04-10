import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LlmProvider, MovieService } from '../services/movie.service';
import { MovieResponse } from '../models/movie-response';
import { LlmRecommendation } from '../models/llm-recommendation';
import { MovieComponent } from '../movie/movie.component';
import { checkMoviesInWatchlist } from '../helpers/watchlist-helper';

interface RecommendationMethod {
  value: string;
  label: string;
  description: string;
  llmProvider?: LlmProvider;
}

type ViewMode = 'grid' | 'detailed';

@Component({
  selector: 'app-recommendation-feed',
  standalone: true,
  imports: [CommonModule, FormsModule, MovieComponent],
  templateUrl: './recommendation-feed.component.html',
  styleUrl: './recommendation-feed.component.scss',
})
export class RecommendationFeedComponent implements OnInit {
  recommendedMovies: MovieResponse[] = [];
  llmRecommendations: LlmRecommendation[] = [];
  movieWatchlistStatus: { [key: number]: boolean } = {};
  isLoading = false;
  errorMessage = '';

  selectedMethod = 'llm';
  viewMode: ViewMode = 'grid';

  readonly methods: RecommendationMethod[] = [
    {
      value: 'llm',
      label: 'Claude (AI reasoning)',
      description: 'Claude-based with per-movie reasoning',
      llmProvider: 'claude',
    },
    {
      value: 'ml',
      label: 'Matrix Factorization (ML.NET)',
      description: 'Matrix factorization model',
    },
    {
      value: 'content',
      label: 'Content-based',
      description: 'Genres, director and actors similarity',
    },
    {
      value: 'user-cf',
      label: 'User Collaborative Filtering',
      description: 'Pearson correlation between users',
    },
    {
      value: 'embedding',
      label: 'Azure Embeddings',
      description: 'Azure OpenAI embeddings + Azure AI Search vector similarity',
    },
    {
      value: 'llama',
      label: 'Llama (local Ollama)',
      description: 'Locally-hosted Llama model with per-movie reasoning',
      llmProvider: 'ollama',
    },
  ];

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.loadRecommendations();
  }

  get availableMethods(): RecommendationMethod[] {
    return this.viewMode === 'detailed'
      ? this.methods.filter((m) => !!m.llmProvider)
      : this.methods;
  }

  get selectedMethodDescription(): string {
    return (
      this.methods.find((m) => m.value === this.selectedMethod)?.description ??
      ''
    );
  }

  setViewMode(mode: ViewMode): void {
    if (this.viewMode === mode) {
      return;
    }
    this.viewMode = mode;

    if (mode === 'detailed') {
      const current = this.methods.find((m) => m.value === this.selectedMethod);
      if (!current?.llmProvider) {
        this.selectedMethod = 'llm';
      }
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
    this.movieService.retrieveRecommendedMovies(this.selectedMethod).subscribe({
      next: (movies) => {
        this.recommendedMovies = movies;
        this.movieWatchlistStatus = checkMoviesInWatchlist(
          movies.map((movie) => movie.id)
        );
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching recommended movies:', error);
        this.errorMessage =
          'Failed to load recommendations. Please try a different method.';
        this.isLoading = false;
      },
    });
  }

  private loadLlmRecommendations(): void {
    const provider =
      this.methods.find((m) => m.value === this.selectedMethod)?.llmProvider ??
      'claude';

    this.movieService.retrieveLlmRecommendations(provider).subscribe({
      next: (items) => {
        this.llmRecommendations = items;
        this.movieWatchlistStatus = checkMoviesInWatchlist(
          items.map((item) => item.movie.id)
        );
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching LLM recommendations:', error);
        this.errorMessage =
          'Failed to load detailed recommendations. Please try again.';
        this.isLoading = false;
      },
    });
  }
}
