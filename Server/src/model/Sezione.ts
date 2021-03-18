export class Sezione {
    readonly id: number;
    readonly ordinamento: number;
    readonly id_titolo: number;
    readonly id_sottotitolo: number;
    readonly id_menu: number;


    static readonly db_id = "Id";
    static readonly db_ordinamento = "Ordinamento";
    static readonly db_id_titolo = "IdTitolo";
    static readonly db_id_sottotitolo = "IdSottotitolo";
    static readonly db_id_menu = "IdMenu";


    constructor(id: number, ordinamento: number, id_titolo: number, id_sottotitolo: number, id_menu: number) {
        this.id = id
        this.ordinamento = ordinamento
        this.id_titolo = id_titolo
        this.id_sottotitolo = id_sottotitolo
        this.id_menu = id_menu
    }

}