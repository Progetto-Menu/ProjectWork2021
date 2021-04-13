import { Ristorante } from "../model/Ristorante";
import { BasePresenter } from "./BaseController";

export class RistoranteController implements BasePresenter<Ristorante>{
    async create(obj: Ristorante): Promise<Ristorante> {
        return await Ristorante.insert(obj);
    }
    async update(obj: Ristorante): Promise<Ristorante> {
        return await Ristorante.update(obj);
    }
    async delete(obj: Ristorante): Promise<Ristorante> {
        return await Ristorante.delete(obj)
    }
    async get(id: number): Promise<Ristorante> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<Ristorante[]> {
        throw new Error("Method not implemented.");
    }
    
    async getRestaurantsByCityId(id_citta: number){
        return await Ristorante.getRestaurantsByCityId(id_citta);
    }

    async getRestaurantsByRestaurateurId(id_ristoratore: number){
        return await Ristorante.getRestaurantsByRestaurateurId(id_ristoratore)
    }

}