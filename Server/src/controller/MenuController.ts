import { CustomMenu } from "../model/custom/CustomMenu";
import { Menu } from "../model/Menu";
import { MenuLingua } from "../model/MenuLingua";
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

    async getAllLanguagesInWhichMenuCanBeTranslated(id_menu: number){
        return await MenuLingua.getAllLanguagesInWhichMenuCanBeTranslated(id_menu)
    }

    async insert(menu: CustomMenu){
        return await Menu.insert(menu);
    }

    async getMenusByRestaurateurId(id_restaurateur: number){
        return await Menu.getMenusByRestaurateurId(id_restaurateur);
    }

    async getMenusByProvinceId(id_provincia: number, cod_lingua: string){
        return await Menu.getMenusByProvinceId(id_provincia, cod_lingua);
    }

    async getMenusByCityId(id_citta: number, cod_lingua: string){
        return await Menu.getMenusByCityId(id_citta, cod_lingua);
    }

    async getMenusByRestaurantId(id_ristorante: number, cod_lingua: string){
        return await Menu.getMenusByRestaurantId(id_ristorante, cod_lingua);
    }

}