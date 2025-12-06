import { WatchlistMovie } from "./watchlist-movie";

export class WatchlistResponse {
    movies: WatchlistMovie[];
    id: number;
    title: string;
    totalMovies: number;
    updatedAt: Date;

    constructor(
        movies: WatchlistMovie[],
        id: number,
        title: string, 
        totalMovies: number, 
        updatedAt: Date
    ) {
        this.movies = movies;
        this.id = id;
        this.title = title;
        this.totalMovies = totalMovies;
        this.updatedAt = updatedAt;
    }
}
