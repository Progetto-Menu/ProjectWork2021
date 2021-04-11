import axios from "axios";
import { useHistory } from "react-router";
import { CustomTraduzione } from "../model/CustomTraduzione";
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
                url += "/traduttori/profile/update";
                break;
            case Users.RISTORATORE:
                url += "/ristoratori/profile/update";
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

    static async getAllLanguagesUnknown(){
        let url = API_SERVER + "/traduttori/profile/languages/unknown";
        return axios.post(url, {
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async getAllLanguagesKnown(){
        let url = API_SERVER + "/traduttori/profile/languages/known";
        return axios.post(url, {
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async setLanguageForTranslator(id_lingua: number){
        let url = API_SERVER + "/traduttori/profile/languages/add";
        return axios.post(url, {
            lingua: id_lingua,
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async removeLanguageForTranslator(id_lingua: number){
        let url = API_SERVER + "/traduttori/profile/languages/remove";
        return axios.post(url, {
            lingua: id_lingua,
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async getAllTranslations(){
        let url = API_SERVER + "/traduttori/profile/translations/all";
        return axios.post(url, {
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async getAllTranslationsInProgress(){
        let url = API_SERVER + "/traduttori/home/translations/progress/all";
        return axios.post(url, {
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async getTranslationsToReview(){
        let url = API_SERVER + "/traduttori/home/translations/review";
        return axios.post(url, {
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async sendTranslation(id_translation: number, text_translated: string){
        let url = API_SERVER + "/traduttori/home/translations/update";
        return axios.post(url, {
            id_translation: id_translation,
            text_translated: text_translated,
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async approveTranslation(id_translation: number){
        let url = API_SERVER + "/traduttori/home/translations/approve";
        return axios.post(url, {
            id_translation: id_translation,
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async discardTranslation(id_translation: number){
        let url = API_SERVER + "/traduttori/home/translations/discard";
        return axios.post(url, {
            id_translation: id_translation,
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async getProvinces(){
        let url = API_SERVER + "/traduttori/translations/provinces/all";
        return axios.post(url, {
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async getCitiesByProvinceId(id_provincia: number){
        let url = API_SERVER + "/traduttori/translations/province/cities/all";
        return axios.post(url, {
            id_provincia: id_provincia,
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async getRestaurantsByCityId(id_citta: number){
        let url = API_SERVER + "/traduttori/translations/province/city/restaurants";
        return axios.post(url, {
            id_citta: id_citta,
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }
}