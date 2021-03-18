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


}