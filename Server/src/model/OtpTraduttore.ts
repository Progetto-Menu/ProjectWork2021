export class OtpTraduttore {
    readonly id: number;
    readonly valore: string;
    readonly creato_il?: Date;
    readonly scade_il?: Date;
    readonly valido: boolean;
    readonly id_traduttore: number;

    static readonly db_table_name = "otp_traduttori";
    static readonly db_id = "Id";
    static readonly db_valore = "Valore";
    static readonly db_creato_il = "CreatoIl";
    static readonly db_scade_il = "ScadeIl";
    static readonly db_valido = "Valido";
    static readonly db_id_traduttore = "IdTraduttore";


    constructor(id: number, valore: string, creato_il: Date, scade_il: Date, valido: boolean, id_traduttore: number) {
        this.id = id
        this.valore = valore;
        this.creato_il = creato_il;
        this.scade_il = scade_il;
        this.valido = valido;
        this.id_traduttore = id_traduttore;
    }

}