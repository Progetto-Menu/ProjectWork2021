import { Stringa } from "../model/Stringa";
import { BasePresenter } from "./BaseController";

export class StringaController implements BasePresenter<Stringa> {
    async create(obj: Stringa): Promise<Stringa> {
        throw new Error("Method not implemented.");
    }
    async update(obj: Stringa): Promise<Stringa> {
        throw new Error("Method not implemented.");
    }
    async delete(obj: Stringa): Promise<Stringa> {
        throw new Error("Method not implemented.");
    }
    async get(id: number): Promise<Stringa> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<Stringa[]> {
        throw new Error("Method not implemented.");
    }
    

}