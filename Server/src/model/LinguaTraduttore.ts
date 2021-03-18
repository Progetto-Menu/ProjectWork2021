export class LinguaTraduttore {
    readonly id_lingua: number;
    readonly id_traduttore: number;

    static readonly db_id_lingua = "IdLingua";
    static readonly db_id_traduttore = "IdTraduttore";


    constructor(id_lingua: number, id_traduttore: number) {
        this.id_lingua = id_lingua
        this.id_traduttore = id_traduttore
    }

}