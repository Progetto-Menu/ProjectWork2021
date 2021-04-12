export class Piatto {
    readonly id: number;
    readonly prezzo: number;
    readonly ordinamento: number;
    readonly id_sezione: number;
    readonly id_titolo: number;
    readonly id_descrizione: number;


    static readonly db_table_name = "piatti"
    static readonly db_id = "Id";
    static readonly db_prezzo = "Prezzo";
    static readonly db_ordinamento = "Ordinamento";
    static readonly db_id_titolo = "IdTitolo";
    static readonly db_id_descrizione = "IdDescrizione";
    static readonly db_id_sezione = "IdSezione";


    constructor(id: number, prezzo: number, ordinamento: number, id_titolo: number, id_descrizione: number, id_sezione: number) {
        this.id = id
        this.prezzo = prezzo
        this.ordinamento = ordinamento
        this.id_titolo = id_titolo
        this.id_descrizione = id_descrizione
        this.id_sezione = id_sezione
    }

}