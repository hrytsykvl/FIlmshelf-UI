export class ResetPassword {
    email: string;
    token: string;
    password: string;

    constructor(email: string, token: string, password: string) {
        this.email = email;
        this.token = token;
        this.password = password;
    }
}
