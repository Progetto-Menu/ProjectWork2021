export class TokenUtils{

    static readonly token_key = "token"
    static getToken(): string | null {
        return localStorage.getItem(TokenUtils.token_key)
    }

    static setToken(token: string){
        localStorage.setItem(TokenUtils.token_key, token);
    }
}