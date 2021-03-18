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
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<Amministratore[]> {
        throw new Error("Method not implemented.");
    }


}