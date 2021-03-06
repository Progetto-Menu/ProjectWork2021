import { Citta } from "../model/Citta";
import { BasePresenter } from "./BaseController";

export class CittaController implements BasePresenter<Citta>{
    async create(obj: Citta): Promise<Citta> {
        throw new Error("Method not implemented.");
    }
    async update(obj: Citta): Promise<Citta> {
        throw new Error("Method not implemented.");
    }
    async delete(obj: Citta): Promise<Citta> {
        throw new Error("Method not implemented.");
    }
    async get(id: number): Promise<Citta> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<Citta[]> {
        throw new Error("Method not implemented.");
    }

    async getCitiesByProvinceId(id_provincia: number){
        return await Citta.getCitiesByProvinceId(id_provincia);
    }

}