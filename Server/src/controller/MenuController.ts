import { Menu } from "../model/Menu";
import { BasePresenter } from "./BaseController";

export class MenuController implements BasePresenter<Menu>{
    async create(obj: Menu): Promise<Menu> {
        throw new Error("Method not implemented.");
    }
    async update(obj: Menu): Promise<Menu> {
        throw new Error("Method not implemented.");
    }
    async delete(obj: Menu): Promise<Menu> {
        throw new Error("Method not implemented.");
    }
    async get(id: number): Promise<Menu> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<Menu[]> {
        throw new Error("Method not implemented.");
    }

    async getMenusToTranslateByProvinceId(id_provincia: number, id_traduttore: number) {
        return await Menu.getMenusToTranslateByProvinceId(id_provincia, id_traduttore);
    }

    async getMenusToTranslateByCityId(id_citta: number, id_traduttore: number) {
        return await Menu.getMenusToTranslateByCityId(id_citta, id_traduttore);
    }

    async getMenusToTranslateByRestaurantId(id_ristorante: number, id_traduttore: number) {
        return await Menu.getMenusToTranslateByRestaurantId(id_ristorante, id_traduttore);
    }

    async setStringsToTranslate(id_menu: number, id_lingua: number, id_traduttore: number){
        return await Menu.setStringsToTranslate(id_menu, id_lingua, id_traduttore);
    }

}