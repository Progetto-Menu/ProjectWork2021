export class Traduzione {
    readonly id: number;
    readonly stato: number;
    readonly testo: string;
    readonly id_stringa: number;
    readonly id_lingua: number;
    readonly id_revisore: number;
    readonly id_traduttore: number;

    static readonly db_id = "Id";
    static readonly db_stato = "Stato";
    static readonly db_testo = "Testo";
    static readonly db_id_stringa = "IdStringa";
    static readonly db_id_lingua = "IdLingua";
    static readonly db_id_revisore = "IdRevisore";
    static readonly db_id_traduttore = "IdTraduttore";


    constructor(id: number, stato: number, testo: string, id_stringa: number, id_lingua: number, id_revisore: number, id_traduttore: number) {
        this.id = id
        this.stato = stato
        this.testo = testo
        this.id_stringa = id_stringa
        this.id_lingua = id_lingua
        this.id_revisore = id_revisore
        this.id_traduttore = id_traduttore
    }



}