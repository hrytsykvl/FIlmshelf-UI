export class WatchlistCheck {
  watchlistId: number;
  title: string;
  movieIds: number[];

  constructor(
    movieIds: number[], 
    title: string,
    watchlistId: number
  ) {
    this.movieIds = movieIds;
    this.title = title;
    this.watchlistId = watchlistId;
  }
}
