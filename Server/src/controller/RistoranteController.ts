import { Ristorante } from "../model/Ristorante";
import { BasePresenter } from "./BaseController";

export class RistoranteController implements BasePresenter<Ristorante>{
    async create(obj: Ristorante): Promise<Ristorante> {
        throw new Error("Method not implemented.");
    }
    async update(obj: Ristorante): Promise<Ristorante> {
        throw new Error("Method not implemented.");
    }
    async delete(obj: Ristorante): Promise<Ristorante> {
        throw new Error("Method not implemented.");
    }
    async get(id: number): Promise<Ristorante> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<Ristorante[]> {
        throw new Error("Method not implemented.");
    }
    

}