export class ReviewAddRequest {
  content: string;
  movieId: number;
  rating: number;

  constructor(content: string, movieId: number, rating: number) {
    this.content = content;
    this.movieId = movieId;
    this.rating = rating;
  }
}
