export class Provincia {
    readonly id: number;
    readonly sigla: string;
    readonly nome: string;

    static readonly db_id = "Id";
    static readonly db_sigla = "Sigla";
    static readonly db_nome = "Nome";


    constructor(id: number, sigla: string, nome: string) {
        this.id = id
        this.sigla = sigla
        this.nome = nome
    }

}