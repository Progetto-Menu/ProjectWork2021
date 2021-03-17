import { StringaTradotta } from "../model/StringaTradotta";
import { BasePresenter } from "./BaseController";

export class StringaTradottaController implements BasePresenter<StringaTradotta> {
    async create(obj: StringaTradotta): Promise<StringaTradotta> {
        throw new Error("Method not implemented.");
    }
    async update(obj: StringaTradotta): Promise<StringaTradotta> {
        throw new Error("Method not implemented.");
    }
    async delete(obj: StringaTradotta): Promise<StringaTradotta> {
        throw new Error("Method not implemented.");
    }
    async get(id: number): Promise<StringaTradotta> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<StringaTradotta[]> {
        throw new Error("Method not implemented.");
    }
   

}