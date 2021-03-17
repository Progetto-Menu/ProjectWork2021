import { Sezione } from "../model/Sezione";
import { BasePresenter } from "./BaseController";

export class SezioneController implements BasePresenter<Sezione> {
    async create(obj: Sezione): Promise<Sezione> {
        throw new Error("Method not implemented.");
    }
    async update(obj: Sezione): Promise<Sezione> {
        throw new Error("Method not implemented.");
    }
    async delete(obj: Sezione): Promise<Sezione> {
        throw new Error("Method not implemented.");
    }
    async get(id: number): Promise<Sezione> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<Sezione[]> {
        throw new Error("Method not implemented.");
    }
   
}