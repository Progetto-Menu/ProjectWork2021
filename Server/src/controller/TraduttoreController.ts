import { Lingua } from "../model/Lingua";
import { OtpTraduttore } from "../model/OtpTraduttore";
import { Traduttore } from "../model/Traduttore";
import { Traduzione } from "../model/Traduzione";
import { BasePresenter } from "./BaseController";

export class TraduttoreController implements BasePresenter<Traduttore> {
    async create(obj: Traduttore): Promise<Traduttore> {
        return await Traduttore.insert(obj);
    }
    async update(obj: Traduttore): Promise<Traduttore> {
        return await Traduttore.update(obj);
    }
    async delete(obj: Traduttore): Promise<Traduttore> {
        throw new Error("Method not implemented.");
    }
    async get(id: number): Promise<Traduttore> {
        return await Traduttore.getTraduttoreById(id);
    }
    async getAll(): Promise<Traduttore[]> {
        throw new Error("Method not implemented.");
    }

    async login(email: string, password: string): Promise<any> {
        const hash = require("crypto").createHash("sha256");
        const traduttore: Traduttore | null = await Traduttore.getTraduttoreByEmail(email);
        if (traduttore == null || traduttore.password != hash.update(password).digest("hex")) throw new Error("Credenziali Sbagliate");
        return traduttore;
        //return SHA256(password)
        //if(traduttore.password.toUpperCase() != SHA256(password).)
    }

    async saveOtp(otp: OtpTraduttore) {
        return await Traduttore.saveOtp(otp);
    }

    async checkOtp(value: string, id_traduttore: number) {
        return await Traduttore.checkOtp(value, id_traduttore);
    }

    async invalidateAllOtp(id_traduttore: number) {
        return await Traduttore.invalidateAllOtp(id_traduttore);
    }

    async setValidated(id: number) {
        return await Traduttore.setValidated(id);
    }

    async changeEmail(emailVecchia: string, emailNuova: string) {
        return await Traduttore.changeEmail(emailVecchia, emailNuova);
    }

    async getAllLanguagesThatAreUnknownByTranslator(id: number) {
        return await Lingua.getAllLanguagesThatAreUnknownByTranslator(id);
    }

    async getAllLanguagesThatAreKnownByTranslator(id: number) {
        return await Lingua.getAllLanguagesThatAreKnownByTranslator(id);
    }

    async setLanguageForTranslator(id_traduttore: number, id_lingua: number) {
        return await Traduttore.setLanguage(id_traduttore, id_lingua);
    }

    async removeLanguageForTranslator(id_traduttore: number, id_lingua: number) {
        return await Traduttore.removeLanguage(id_traduttore, id_lingua);
    }

    async getAllTranslations(id: number) {
        return await Traduzione.getAllTranslationByTranslatorId(id)
    }

    async getAllTranslationsInProgress(id: number) {
        return await Traduzione.getAllTranslationInProgressByTranslatorId(id)
    }

    async getTranslationsToReview(id_traduttore: number) {
        return await Traduzione.getTranslationToReview(id_traduttore)
    }

    async updateTranslation(id: number, text_translated: string) {
        return await Traduzione.updateTranslation(id, text_translated)
    }

    async approveTranslation(id_translation: number, id_reviser: number){
        return await Traduzione.approveTranslation(id_translation, id_reviser);
    }

    async discardTranslation(id_translation: number, id_reviser: number){
        return await Traduzione.discardTranslation(id_translation, id_reviser);
    }

    async getTranslatorsNotRevisers(){
        return await Traduttore.getTranslatorsNotRevisers();
    }

    async promoteTranslator(id_traduttore: number){
        return await Traduttore.promoteTranslator(id_traduttore);
    }

}