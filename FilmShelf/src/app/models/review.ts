import { ReviewResponse } from './review-response';

export class Review {
  id: number;
  content: string;
  userId: number;
  movieId: number;
  rating: number;
  createdAt: Date;
  userName: string;
  movieTitle: string;
  responses: ReviewResponse[] = [];

  constructor(
    id: number,
    content: string,
    userId: number,
    movieId: number,
    rating: number,
    createdAt: Date,
    userName: string,
    movieTitle: string,
    responses: ReviewResponse[] = []
  ) {
    this.id = id;
    this.content = content;
    this.userId = userId;
    this.movieId = movieId;
    this.rating = rating;
    this.createdAt = createdAt;
    this.userName = userName;
    this.movieTitle = movieTitle;
    this.responses = responses;
  }
}
