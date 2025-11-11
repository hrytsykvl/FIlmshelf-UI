export class ForgotPassword {
    email: string;
    resetPasswordUrl: string;

    constructor(email: string, resetPasswordUrl: string) {
        this.email = email;
        this.resetPasswordUrl = resetPasswordUrl;
    }
}
