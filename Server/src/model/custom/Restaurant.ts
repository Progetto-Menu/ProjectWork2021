export interface Restaurant{
    readonly id: number;
    readonly nome: string;
    readonly indirizzo: string;
    readonly civico: string;
    readonly id_citta: number;
    readonly citta?: string;
    readonly id_ristoratore: number;
    readonly id_provincia: number
    readonly provincia?: string
}