import { Citta } from "../model/Citta";
import { Lingua } from "../model/Lingua";
import { BasePresenter } from "./BaseController";

export class LinguaController implements BasePresenter<Lingua>{
    async create(obj: Lingua): Promise<Lingua> {
        throw new Error("Method not implemented.");
    }
    async update(obj: Lingua): Promise<Lingua> {
        throw new Error("Method not implemented.");
    }
    async delete(obj: Lingua): Promise<Lingua> {
        throw new Error("Method not implemented.");
    }
    async get(id: number): Promise<Lingua> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<Lingua[]> {
        return await Lingua.getAllLanguages();
    }
    
}