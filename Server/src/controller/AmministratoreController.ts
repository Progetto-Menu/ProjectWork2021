import { Amministratore } from "../model/Amministratore";
import { BasePresenter } from "./BaseController";
import { sql, config } from "../database/DbConfig";

export class AmministratoreController implements BasePresenter<Amministratore>{
    async create(obj: Amministratore): Promise<Amministratore> {
        throw new Error("Method not implemented.");
    }
    async update(obj: Amministratore): Promise<Amministratore> {
        throw new Error("Method not implemented.");
    }
    async delete(obj: Amministratore): Promise<Amministratore> {
        throw new Error("Method not implemented.");
    }
    async get(id: number): Promise<Amministratore> {
        return await Amministratore.getAmministratoreById(id);
    }
    async getAll(): Promise<Amministratore[]> {
        throw new Error("Method not implemented.");
    }

    async login(email: string, password: string): Promise<any> {
        const hash = require("crypto").createHash("sha256");
        const amministratore: Amministratore | null = await Amministratore.getAmministratoreByEmail(email);
        if (amministratore == null || amministratore.password != hash.update(password).digest("hex")) throw new Error("Credenziali Sbagliate");
        return amministratore;
    }


}