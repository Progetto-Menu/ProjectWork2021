export class OtpRistoratore {
    readonly id: number;
    readonly valore: string;
    readonly creato_il?: Date;
    readonly scade_il?: Date;
    readonly valido: boolean;
    readonly id_ristoratore: number;

    static readonly db_table_name = "otp_ristoratori";
    static readonly db_id = "Id";
    static readonly db_valore = "Valore";
    static readonly db_creato_il = "CreatoIl";
    static readonly db_scade_il = "ScadeIl";
    static readonly db_valido = "Valido";
    static readonly db_id_ristoratore = "IdRistoratore";


    constructor(id: number, valore: string, creato_il: Date, scade_il: Date, valido: boolean,  id_ristoratore: number) {
        this.id = id
        this.valore = valore;
        this.creato_il = creato_il;
        this.scade_il = scade_il;
        this.valido = valido;
        this.id_ristoratore = id_ristoratore;
    }

}