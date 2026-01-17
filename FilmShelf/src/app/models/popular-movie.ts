export class PopularMovie {
  id: number;
  title: string;
  posterPath: string;
  averageRating: number;
  releaseDate: Date;
  popularity: number;

  constructor(
    id: number,
    title: string,
    posterPath: string,
    averageRating: number,
    releaseDate: Date,
    popularity: number
  ) {
    this.id = id;
    this.title = title;
    this.posterPath = posterPath;
    this.averageRating = averageRating;
    this.releaseDate = releaseDate;
    this.popularity = popularity;
  }
}
