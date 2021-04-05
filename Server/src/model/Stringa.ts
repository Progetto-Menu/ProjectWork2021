export class Stringa {
    readonly id: number;
    readonly testo: string;

    static readonly db_table_name="stringhe"
    static readonly db_id = "Id";
    static readonly db_testo = "Testo";


    constructor(id: number, testo: string) {
        this.id = id
        this.testo = testo
    }

}