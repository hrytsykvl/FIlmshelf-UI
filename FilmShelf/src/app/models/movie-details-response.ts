import { CastMember } from "./cast-member";

export class MovieDetailsResponse {
    title: string;
    director: string;
    genres: string[];
    overview: string;
    releaseDate: Date;
    runtime: number;
    posterPath: string;
    averageRating: number;
    cast: CastMember[];

    constructor(
        title: string,
        director: string,
        genres: string[], 
        overview: string, 
        releaseDate: Date, 
        runtime: number, 
        posterPath: string, 
        averageRating: number, 
        cast: CastMember[]
    ) {
        this.title = title;
        this.director = director;
        this.genres = genres;
        this.overview = overview;
        this.releaseDate = releaseDate;
        this.runtime = runtime;
        this.posterPath = posterPath;
        this.averageRating = averageRating;
        this.cast = cast;
    }
}
