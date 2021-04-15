import axios from "axios";
import { CustomMenuDaTradurre } from "../model/CustomMenuDaTradurre";
import { FilterMenu } from "../model/FilterMenu";
import { Menu } from "../model/Menu";
import { Restaurant } from "../model/Restaurant";
import { Traduttore } from "../model/Traduttore";
import { API_SERVER } from "./AppConstants";
import { StorageUtils } from "./StorageUtils";
import { strings } from "./Strings";
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

    static async register(user: Users, email: string, password: string, nome: string, cognome: string) {
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

    static async requestOtp(user: Users, email: string) {
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

    static async verifyOtp(user: Users, value: string) {
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

    static async getUser(user: Users) {
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

    static async updateUser(user: Users, nome: string, cognome: string) {
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

    static async changeEmail(user: Users, email: string) {
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

    static async getAllLanguagesUnknown() {
        let url = API_SERVER + "/traduttori/profile/languages/unknown";
        return axios.post(url, {
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async getAllLanguagesKnown() {
        let url = API_SERVER + "/traduttori/profile/languages/known";
        return axios.post(url, {
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async setLanguageForTranslator(id_lingua: number) {
        let url = API_SERVER + "/traduttori/profile/languages/add";
        return axios.post(url, {
            lingua: id_lingua,
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async removeLanguageForTranslator(id_lingua: number) {
        let url = API_SERVER + "/traduttori/profile/languages/remove";
        return axios.post(url, {
            lingua: id_lingua,
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async getAllTranslations() {
        let url = API_SERVER + "/traduttori/profile/translations/all";
        return axios.post(url, {
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async getAllTranslationsInProgress() {
        let url = API_SERVER + "/traduttori/home/translations/progress/all";
        return axios.post(url, {
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async getTranslationsToReview() {
        let url = API_SERVER + "/traduttori/home/translations/review";
        return axios.post(url, {
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async sendTranslation(id_translation: number, text_translated: string) {
        let url = API_SERVER + "/traduttori/home/translations/update";
        return axios.post(url, {
            id_translation: id_translation,
            text_translated: text_translated,
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async approveTranslation(id_translation: number) {
        let url = API_SERVER + "/traduttori/home/translations/approve";
        return axios.post(url, {
            id_translation: id_translation,
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async discardTranslation(id_translation: number) {
        let url = API_SERVER + "/traduttori/home/translations/discard";
        return axios.post(url, {
            id_translation: id_translation,
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async getProvinces(user: Users) {
        let url = API_SERVER;
        switch (user) {
            case Users.TRADUTTORE:
                url += "/traduttori/translations/provinces/all";
                break;
            case Users.RISTORATORE:
                url += "/ristoratori/home/provinces/all";
                break;
            case Users.AMMINISTRATORE:
                break;
            case Users.CLIENTE:
                url += "/utenti/home/provinces/all";
                break;
            default: break;
        }
        return axios.post(url, {
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async getCitiesByProvinceId(user: Users, id_provincia: number) {
        let url = API_SERVER;
        switch (user) {
            case Users.TRADUTTORE:
                url += "/traduttori/translations/province/cities/all";
                break;
            case Users.RISTORATORE:
                url += "/ristoratori/home/province/cities/all";
                break;
            case Users.AMMINISTRATORE:
                break;
            case Users.CLIENTE:
                url += "/utenti/home/province/cities/all";
                break;
            default: break;
        }
        return axios.post(url, {
            id_provincia: id_provincia,
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async getRestaurantsByCityId(user: Users, id_citta: number) {
        let url = API_SERVER; 
        switch (user) {
            case Users.TRADUTTORE:
                url += "/traduttori/translations/province/city/restaurants";
                break;
            case Users.RISTORATORE:
                break;
            case Users.AMMINISTRATORE:
                break;
            case Users.CLIENTE:
                url += "/utenti/home/province/city/restaurants";
                break;
            default: break;
        }
        return axios.post(url, {
            id_citta: id_citta,
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async getMenus(user: Users, filtermenu: FilterMenu) {
        let url = API_SERVER; 
        switch (user) {
            case Users.TRADUTTORE:
                url += "/traduttori/translations/menu";
                break;
            case Users.RISTORATORE:
                break;
            case Users.AMMINISTRATORE:
                break;
            case Users.CLIENTE:
                url += "/utenti/translations/menu";
                break;
            default: break;
        }
        return axios.post(url, {
            id_ristorante: filtermenu.restaurant_id,
            id_citta: filtermenu.city_id,
            id_provincia: filtermenu.province_id,
            cod_lingua: strings.getLanguage(),
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async setStringsToTranslate(menu: CustomMenuDaTradurre) {
        let url = API_SERVER + "/traduttori/translations/menu/strings-to-translate";
        return axios.post(url, {
            id_menu: menu.id_menu,
            id_lingua: menu.id_lingua,
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async getRestaurants() {
        let url = API_SERVER + "/ristoratori/restaurants/all";
        return axios.post(url, {
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async createRestaurant(ristorante: Restaurant) {
        let url = API_SERVER + "/ristoratori/restaurants/add";
        return axios.post(url, {
            id_citta: ristorante.id_citta,
            indirizzo: ristorante.indirizzo,
            civico: ristorante.civico,
            nome: ristorante.nome,
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async updateRestaurant(ristorante: Restaurant) {
        let url = API_SERVER + "/ristoratori/restaurants/update";
        return axios.post(url, {
            id: ristorante.id,
            id_citta: ristorante.id_citta,
            indirizzo: ristorante.indirizzo,
            civico: ristorante.civico,
            nome: ristorante.nome,
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async deleteRestaurant(ristorante: Restaurant) {
        let url = API_SERVER + "/ristoratori/restaurants/delete";
        return axios.post(url, {
            id: ristorante.id,
            id_citta: ristorante.id_citta,
            indirizzo: ristorante.indirizzo,
            civico: ristorante.civico,
            nome: ristorante.nome,
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async getAllLanguagesInWhichMenuCanBeTranslated(id_menu: number) {
        let url = API_SERVER + "/ristoratori/menus/languages/can-be-translated";
        return axios.post(url, {
            id_menu: id_menu,
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async getAllLanguagesInWhichMenuMustBeTranslated(id_menu: number) {
        let url = API_SERVER + "/traduttori/profile/languages/must-be-translated";
        return axios.post(url, {
            id_menu: id_menu,
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async createMenu(menu: Menu) {
        let url = API_SERVER + "/ristoratori/menus/add";
        return axios.post(url, {
            menu: menu,
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async getMenusRestaurateur() {
        let url = API_SERVER + "/ristoratori/menus/all";
        return axios.post(url, {
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async getTranslatorsNotRevisers(){
        let url = API_SERVER + "/amministratori/translators-not-revisers/all";
        return axios.post(url, {
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }

    static async promoteTranslator(translator: Traduttore){
        let url = API_SERVER + "/amministratori/translators-not-revisers/promote";
        return axios.post(url, {
            id_traduttore: translator.id,
            token: StorageUtils.get(StorageUtils.token_key)
        })
    }
}