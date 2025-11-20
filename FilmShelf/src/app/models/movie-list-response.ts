import { MovieResponse } from "./movie-response";

export class MovieListResponse {
    movieList: MovieResponse[];
    totalPages: number;

    constructor(movieList: MovieResponse[], totalPages: number) {
        this.movieList = movieList;
        this.totalPages = totalPages;
    }
}
