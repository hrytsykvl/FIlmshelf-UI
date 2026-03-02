export class MovieResponse {
  id: number;
  title: string;
  posterPath: string;

  constructor(id: number, title: string, posterPath: string) {
    this.id = id;
    this.title = title;
    this.posterPath = posterPath;
  }
}
