export class AuthenticationResponse {
    isSuccess: boolean = false;
    errors: { [key: string]: string[] } = {};
    token: string = '';
    refreshToken: string = '';
    refreshTokenExpirationDate: Date = new Date();
}
