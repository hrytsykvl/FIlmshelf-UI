export class WatchlistMovie {
    id: number;
    title: string;
    posterPath: string;
    averageRating: number;

    constructor(
        id: number, 
        title: string, 
        posterPath: string, 
        averageRating: number
    ) {
        this.id = id;
        this.title = title;
        this.posterPath = posterPath;
        this.averageRating = averageRating;
    }
}
