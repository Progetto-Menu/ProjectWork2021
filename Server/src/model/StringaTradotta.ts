export class StringaTradotta {
    readonly id: number;
    readonly testo: string;
    readonly id_stringa: number;
    readonly id_lingua: number;


    static readonly db_id = "Id";
    static readonly db_testo = "Testo";
    static readonly db_id_stringa = "IdStringa";
    static readonly db_id_lingua = "IdLingua";


    constructor(id: number, testo: string, id_stringa: number, id_lingua: number) {
        this.id = id
        this.testo = testo
        this.id_stringa = id_stringa
        this.id_lingua = id_lingua
    }

}