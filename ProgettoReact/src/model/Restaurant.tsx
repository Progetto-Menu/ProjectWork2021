import { Address } from "./Address";

export interface Restaurant{
    readonly id: number;
    readonly nome: string;
    readonly indirizzo: string;
    readonly civico: string;
    readonly id_citta: number;
    readonly id_ristoratore: number;
    readonly citta: string
    readonly provincia: string
}