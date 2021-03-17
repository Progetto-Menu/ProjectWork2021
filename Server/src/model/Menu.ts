export class Menu {
    readonly id: number;
    readonly pubblico: boolean;
    readonly creato_il: Date;
    readonly modificato_il: Date;
    readonly cancellato_il: Date;
    readonly id_ristorante: number;
    readonly id_titolo: number;
    readonly id_sottotitolo: number;

    static readonly db_id = "Id";
    static readonly db_pubblico = "Pubblico";
    static readonly db_creato_il = "CreatoIl";
    static readonly db_modificato_il = "ModificatoIl";
    static readonly db_cancellato_il = "CancellatoIl";
    static readonly db_id_ristorante = "IdRistorante";
    static readonly db_id_titolo = "IdTitolo";
    static readonly db_id_sottotitolo = "IdSottotitolo";


    constructor(id: number, pubblico: boolean, creato_il: Date, modificato_il: Date, cancellato_il: Date, id_ristorante: number, id_titolo: number, id_sottotitolo: number) {
        this.id = id
        this.pubblico = pubblico
        this.creato_il = creato_il
        this.modificato_il = modificato_il
        this.cancellato_il = cancellato_il
        this.id_ristorante = id_ristorante
        this.id_titolo = id_titolo
        this.id_sottotitolo = id_sottotitolo
    }

}