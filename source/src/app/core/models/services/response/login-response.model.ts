export class LoginResponse {
    constructor(refreshToken:string, accessToken:string, tokenType:string) {
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;
        this.tokenType = tokenType;
    }

    refreshToken: string;
    accessToken: string;
    tokenType: string;
    
}