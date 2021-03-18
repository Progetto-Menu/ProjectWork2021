import { LinguaTraduttore } from "../model/LinguaTraduttore";
import { BasePresenter } from "./BaseController";

export class LinguaTraduttoreController implements BasePresenter<LinguaTraduttore>{
    async create(obj: LinguaTraduttore): Promise<LinguaTraduttore> {
        throw new Error("Method not implemented.");
    }
    async update(obj: LinguaTraduttore): Promise<LinguaTraduttore> {
        throw new Error("Method not implemented.");
    }
    async delete(obj: LinguaTraduttore): Promise<LinguaTraduttore> {
        throw new Error("Method not implemented.");
    }
    async get(id: number): Promise<LinguaTraduttore> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<LinguaTraduttore[]> {
        throw new Error("Method not implemented.");
    }



}