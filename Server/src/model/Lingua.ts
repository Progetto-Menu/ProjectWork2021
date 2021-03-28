export class Lingua {
    readonly id: number;
    readonly cod_lingua: string;

    static readonly db_table_name = "lingue";
    static readonly db_id = "Id";
    static readonly db_cod_lingua = "Cod_Lingua";

    constructor(id: number, cod_lingua: string) {
        this.id = id
        this.cod_lingua = cod_lingua
    }


}