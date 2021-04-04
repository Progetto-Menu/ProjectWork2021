import axios from "axios";
import { useHistory } from "react-router";
import { API_SERVER } from "./AppConstants";
import { RouterUtils } from "./RouterUtils";
import { StorageUtils } from "./StorageUtils";
import { Users } from "./Users";

export class AjaxUtils {
    static async isLoggedIn(user: Users) {
        let url = API_SERVER;
        switch (user) {
            case Users.TRADUTTORE:
                url += "/traduttori/auth";
                break;
            case Users.RISTORATORE:
                url += "/ristoratori/auth";
                break;
            case Users.AMMINISTRATORE:
                url += "/amministratori/auth";
                break;
            default: break;
        }

        return axios.post(url, {
            "token": StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async login(user: Users, email: string, password: string) {
        let url = API_SERVER;
        switch (user) {
            case Users.TRADUTTORE:
                url += "/traduttori/login";
                break;
            case Users.RISTORATORE:
                url += "/ristoratori/login";
                break;
            case Users.AMMINISTRATORE:
                url += "/amministratori/login";
                break;
            default: break;
        }

        return axios.post(url, {
            email: email,
            password: password
        })
    }

    static async register(user: Users, email: string, password: string, nome: string, cognome: string){
        let url = API_SERVER;
        switch (user) {
            case Users.TRADUTTORE:
                url += "/traduttori/register";
                break;
            case Users.RISTORATORE:
                url += "/ristoratori/register";
                break;
            case Users.AMMINISTRATORE:
                url += "/amministratori/register";
                break;
            default: break;
        }
        return axios.post(url, {
            email: email,
            password: password,
            nome: nome,
            cognome: cognome
        })
    }

    static async requestOtp(user: Users, email: string){
        let url = API_SERVER;
        switch (user) {
            case Users.TRADUTTORE:
                url += "/traduttori/verify-email";
                break;
            case Users.RISTORATORE:
                url += "/ristoratori/verify-email";
                break;
            case Users.AMMINISTRATORE:
                break;
            default: break;
        }
        return axios.post(url, {
            email: email,
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async verifyOtp(user: Users, value: string){
        let url = API_SERVER;
        switch (user) {
            case Users.TRADUTTORE:
                url += "/traduttori/validate-email";
                break;
            case Users.RISTORATORE:
                url += "/ristoratori/validate-email";
                break;
            case Users.AMMINISTRATORE:
                break;
            default: break;
        }
        return axios.post(url, {
            token: StorageUtils.get(StorageUtils.token_key),
            otp: value
        })
    }

    static async getUser(user: Users){
        let url = API_SERVER;
        switch (user) {
            case Users.TRADUTTORE:
                url += "/traduttori/profile";
                break;
            case Users.RISTORATORE:
                url += "/ristoratori/profile";
                break;
            case Users.AMMINISTRATORE:
                break;
            default: break;
        }
        return axios.post(url, {
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async updateUser(user: Users, nome: string, cognome: string){
        let url = API_SERVER;
        switch (user) {
            case Users.TRADUTTORE:
                url += "/traduttori/profile";
                break;
            case Users.RISTORATORE:
                url += "/ristoratori/profile";
                break;
            case Users.AMMINISTRATORE:
                break;
            default: break;
        }
        return axios.post(url, {
            nome: nome,
            cognome: cognome,
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async changeEmail(user: Users, email: string){
        let url = API_SERVER;
        switch (user) {
            case Users.TRADUTTORE:
                url += "/traduttori/change-email";
                break;
            case Users.RISTORATORE:
                url += "/ristoratori/change-email";
                break;
            case Users.AMMINISTRATORE:
                break;
            default: break;
        }
        return axios.post(url, {
            token: StorageUtils.get(StorageUtils.token_key),
            email: email
        })
    }

    static async getAllLanguages(){
        let url = API_SERVER + "/traduttori/profile/all-languages";
        return axios.post(url, {
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }
}