import { MovieResponse } from './movie-response';

export class LlmRecommendation {
  movie: MovieResponse;
  score: number;
  reason: string;

  constructor(movie: MovieResponse, score: number, reason: string) {
    this.movie = movie;
    this.score = score;
    this.reason = reason;
  }
}
