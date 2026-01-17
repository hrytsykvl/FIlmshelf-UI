import { ReviewResponse } from './review-response';

export class CustomNotification {
  id: number;
  createdAt: Date;
  isRead: boolean;
  userId: number;
  movieId?: number;
  movieTitle?: string;
  moviePoster?: string;
  reviewResponse?: ReviewResponse;

  constructor(
    id: number,
    createdAt: Date,
    isRead: boolean,
    userId: number,
    movieId: number,
    movieTitle: string,
    moviePoster: string,
    reviewResponse: ReviewResponse
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.isRead = isRead;
    this.userId = userId;
    this.movieId = movieId;
    this.movieTitle = movieTitle;
    this.moviePoster = moviePoster;
    this.reviewResponse = reviewResponse;
  }
}
