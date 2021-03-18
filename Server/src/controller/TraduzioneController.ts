import { Traduzione } from "../model/Traduzione";
import { BasePresenter } from "./BaseController";

export class TraduzioneController implements BasePresenter<Traduzione> {
    async create(obj: Traduzione): Promise<Traduzione> {
        throw new Error("Method not implemented.");
    }
    async update(obj: Traduzione): Promise<Traduzione> {
        throw new Error("Method not implemented.");
    }
    async delete(obj: Traduzione): Promise<Traduzione> {
        throw new Error("Method not implemented.");
    }
    async get(id: number): Promise<Traduzione> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<Traduzione[]> {
        throw new Error("Method not implemented.");
    }
   

}