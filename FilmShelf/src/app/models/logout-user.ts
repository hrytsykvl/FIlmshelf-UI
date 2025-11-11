export class LogoutUser {
    refreshToken: string;

    constructor(refreshToken: string){
        this.refreshToken = refreshToken
    }
}