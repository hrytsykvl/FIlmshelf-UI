export class WatchlistCheck {
  watchlistId: number;
  movieIds: number[];

  constructor(
    movieIds: number[], 
    watchlistId: number
  ) {
    this.movieIds = movieIds;
    this.watchlistId = watchlistId;
  }
}
