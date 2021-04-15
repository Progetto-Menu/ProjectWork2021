export class StorageUtils{

    static readonly token_key = "token"
    static readonly user_type = "user_type"

    static get(key: string): string | null {
        return localStorage.getItem(key)
    }

    static set(key:string, value: string | null){
        if(value == null){
            this.remove(key);
        }
        else{
            localStorage.setItem(key, value);
        }
    }

    static remove(key:string){
        localStorage.removeItem(key);
    }
}