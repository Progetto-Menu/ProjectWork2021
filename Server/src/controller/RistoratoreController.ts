import { OtpRistoratore } from "../model/OtpRistoratore";
import { Ristoratore } from "../model/Ristoratore";
import { BasePresenter } from "./BaseController";

export class RistoratoreController implements BasePresenter<Ristoratore> {
    async create(obj: Ristoratore): Promise<Ristoratore> {
        return await Ristoratore.insert(obj);
    }
    async update(obj: Ristoratore): Promise<Ristoratore> {
        throw new Error("Method not implemented.");
    }
    async delete(obj: Ristoratore): Promise<Ristoratore> {
        throw new Error("Method not implemented.");
    }
    async get(id: number): Promise<Ristoratore> {
        return await Ristoratore.getRistoratoreById(id);
    }
    async getAll(): Promise<Ristoratore[]> {
        throw new Error("Method not implemented.");
    }

    async login(email:string, password:string): Promise<any>{
        const hash = require("crypto").createHash("sha256");
        const ristoratore : Ristoratore | null = await Ristoratore.getRistoratoreByEmail(email);
        if(ristoratore == null || ristoratore.password != hash.update(password).digest("hex")) throw new Error("Credenziali Sbagliate");
        return ristoratore;
        //return SHA256(password)
        //if(traduttore.password.toUpperCase() != SHA256(password).)
    }

    async saveOtp(otp:OtpRistoratore){
        return await Ristoratore.saveOtp(otp);
    }

    async checkOtp(value: string, id_ristoratore: number){
        return await Ristoratore.checkOtp(value, id_ristoratore);
    }

    async invalidateAllOtp(id_ristoratore: number){
        return await Ristoratore.invalidateAllOtp(id_ristoratore);
    }

    async setValidated(id: number){
        return await Ristoratore.setValidated(id);
    }

    async changeEmail(emailVecchia: string, emailNuova: string){
        return await Ristoratore.changeEmail(emailVecchia, emailNuova);
    }
   
}