import { Ristoratore } from "../model/Ristoratore";
import { BasePresenter } from "./BaseController";

export class RistoratoreController implements BasePresenter<Ristoratore> {
    async create(obj: Ristoratore): Promise<Ristoratore> {
        throw new Error("Method not implemented.");
    }
    async update(obj: Ristoratore): Promise<Ristoratore> {
        throw new Error("Method not implemented.");
    }
    async delete(obj: Ristoratore): Promise<Ristoratore> {
        throw new Error("Method not implemented.");
    }
    async get(id: number): Promise<Ristoratore> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<Ristoratore[]> {
        throw new Error("Method not implemented.");
    }
   
}