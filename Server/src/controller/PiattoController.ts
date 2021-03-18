import { Piatto } from "../model/Piatto";
import { BasePresenter } from "./BaseController";

export class PiattoController implements BasePresenter<Piatto>{
    async create(obj: Piatto): Promise<Piatto> {
        throw new Error("Method not implemented.");
    }
    async update(obj: Piatto): Promise<Piatto> {
        throw new Error("Method not implemented.");
    }
    async delete(obj: Piatto): Promise<Piatto> {
        throw new Error("Method not implemented.");
    }
    async get(id: number): Promise<Piatto> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<Piatto[]> {
        throw new Error("Method not implemented.");
    }
    

}