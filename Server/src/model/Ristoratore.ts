export class Ristoratore {
    readonly id: number;
    readonly nome: string;
    readonly cognome: string;
    readonly email: string;
    readonly password: string;
    readonly creato_il: Date;
    readonly modificato_il: Date;
    readonly cancallato_il: Date;

    static readonly db_id = "Id";
    static readonly db_nome = "Nome";
    static readonly db_cognome = "Cognome";
    static readonly db_email = "Email";
    static readonly db_password = "Password";
    static readonly db_creato_il = "CreatoIl";
    static readonly db_modificato_il = "ModificatoIl";
    static readonly db_cancallato_il = "CancellatoIl";


    constructor(id: number, nome: string, cognome: string, email: string, password: string, creato_il: Date, modificato_il: Date, cancallato_il: Date) {
        this.id = id
        this.nome = nome
        this.cognome = cognome
        this.email = email
        this.password = password
        this.creato_il = creato_il
        this.modificato_il = modificato_il
        this.cancallato_il = cancallato_il
    }



}