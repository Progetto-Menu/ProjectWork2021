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
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<Traduttore[]> {
        throw new Error("Method not implemented.");
    }
    
}