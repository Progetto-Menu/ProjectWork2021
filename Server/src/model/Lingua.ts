export class Lingua {
    readonly id: number;
    readonly nome: string;
    readonly cod_lingua: string;

    static readonly db_table_name = "lingue";
    static readonly db_id = "Id";
    static readonly db_nome = "Nome";
    static readonly db_cod_lingua = "Cod_Lingua";

    constructor(id: number, nome: string, cod_lingua: string) {
        this.id = id
        this.nome = nome
        this.cod_lingua = cod_lingua
    }


}