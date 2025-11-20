export class CastMember {
    id: number;
    name: string;
    character: string;
    profilePath: string;

    constructor(
        id: number, 
        name: string, 
        character: string, 
        profilePath: string
    ) {
        this.id = id;
        this.name = name;
        this.character = character;
        this.profilePath = profilePath;
    }
}
