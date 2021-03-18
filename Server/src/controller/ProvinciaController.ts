import { Provincia } from "../model/Provincia";
import { BasePresenter } from "./BaseController";

export class CittaController implements BasePresenter<Provincia>{
    async create(obj: Provincia): Promise<Provincia> {
        throw new Error("Method not implemented.");
    }
    async update(obj: Provincia): Promise<Provincia> {
        throw new Error("Method not implemented.");
    }
    async delete(obj: Provincia): Promise<Provincia> {
        throw new Error("Method not implemented.");
    }
    async get(id: number): Promise<Provincia> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<Provincia[]> {
        throw new Error("Method not implemented.");
    }
    
    
}