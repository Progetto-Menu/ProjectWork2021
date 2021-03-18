export class Piatto {
    readonly id: number;
    readonly prezzo: number;
    readonly ordinamento: number;
    readonly id_titolo: number;
    readonly id_descrizione: number;


    static readonly db_id = "Id";
    static readonly db_prezzo = "Prezzo";
    static readonly db_ordinamento = "Ordinamento";
    static readonly db_id_titolo = "IdTitolo";
    static readonly db_id_descrizione = "IdDescrizione";


    constructor(id: number, prezzo: number, ordinamento: number, id_titolo: number, id_descrizione: number) {
        this.id = id
        this.prezzo = prezzo
        this.ordinamento = ordinamento
        this.id_titolo = id_titolo
        this.id_descrizione = id_descrizione
    }

}