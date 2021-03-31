import axios from "axios";
import { Users } from "./Users";

export class AuthUtils {
    static async isLoggedIn(token: string | null, user: Users) {
        switch (user) {
            case Users.TRADUTTORE:
                return axios.post("https://www.progettomenu.cloud/traduttori/auth", {
                    "token": token
                })
            case Users.RISTORATORE:
                return axios.post("https://www.progettomenu.cloud/ristoratori/auth", {
                    "token": token
                })
            case Users.AMMINISTRATORE:
                return axios.post("https://www.progettomenu.cloud/amministratori/auth", {
                    "token": token
                })
            default: break;
        }
    }
}