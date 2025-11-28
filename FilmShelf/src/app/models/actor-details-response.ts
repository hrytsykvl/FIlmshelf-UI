import { ActorMovie } from "./actor-movie";

export class ActorDetailsResponse {
    name: string;
    birthDate: Date;
    bio: string;
    profilePath: string;
    movies: ActorMovie[];

    constructor(
        name: string,
        birthDate: Date,
        bio: string,
        profilePath: string,
        movies: ActorMovie[]
    ) {
        this.name = name;
        this.birthDate = birthDate;
        this.bio = bio;
        this.profilePath = profilePath;
        this.movies = movies;
    }
}
