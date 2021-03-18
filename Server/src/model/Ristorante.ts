export class Ristorante {
    readonly id: number;
    readonly nome: string;
    readonly indirizzo: string;
    readonly civico: string;
    readonly id_citta: number;
    readonly id_ristoratore: number;


    static readonly db_id = "Id";
    static readonly db_nome = "Nome";
    static readonly db_indirizzo = "Indirizzo";
    static readonly db_civico = "Civico";
    static readonly db_id_citta = "IdCitta";
    static readonly db_id_ristoratore = "IdRistorante";


    constructor(id: number, nome: string, indirizzo: string, civico: string, id_citta: number, id_ristoratore: number) {
        this.id = id
        this.nome = nome
        this.indirizzo = indirizzo
        this.civico = civico
        this.id_citta = id_citta
        this.id_ristoratore = id_ristoratore
    }

}