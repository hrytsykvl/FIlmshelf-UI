import { PopularMovie } from './popular-movie';

export class MovieNotification {
  popularMovies: PopularMovie[];

  constructor(popularMovies: PopularMovie[]) {
    this.popularMovies = popularMovies;
  }
}
