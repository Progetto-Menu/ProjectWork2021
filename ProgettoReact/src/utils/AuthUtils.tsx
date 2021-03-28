import axios from "axios";
import { Users } from "./Users";

export class AuthUtils {
    static async isLoggedIn(token: string | null, user: Users) {
        switch (user) {
            case Users.TRADUTTORE:
                return await axios.post("http://localhost:8081/traduttori/auth", {
                    "token": token
                })
            case Users.RISTORATORE:
                break;
            case Users.AMMINISTRATORE:
                break;
            default: break;
        }
    }
}