export class ActorMovie {
    id: number;
    title: string;
    posterPath: string;
    role: string;

    constructor(
        id: number, 
        title: string, 
        posterPath: string, 
        role: string
    ) {
        this.id = id;
        this.title = title;
        this.posterPath = posterPath;
        this.role = role;
    }
}
