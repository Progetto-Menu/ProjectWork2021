import { Traduttore } from "../model/Traduttore";
import { BasePresenter } from "./BaseController";

export class TraduttoreController implements BasePresenter<Traduttore> {
    async create(obj: Traduttore): Promise<Traduttore> {
        return await Traduttore.insert(obj);
    }
    async update(obj: Traduttore): Promise<Traduttore> {
        throw new Error("Method not implemented.");
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

    async login(email:string, password:string): Promise<any>{
        const hash = require("crypto").createHash("sha256");
        const traduttore : Traduttore | null = await Traduttore.getTraduttoreByEmail(email);
        if(traduttore == null || traduttore.password != hash.update(password).digest("hex")) throw new Error("Credenziali Sbagliate");
        return traduttore;
        //return SHA256(password)
        //if(traduttore.password.toUpperCase() != SHA256(password).)
    }
    
}