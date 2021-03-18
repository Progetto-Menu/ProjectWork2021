import { config, sql } from "../database/DbConfig";

export class Amministratore {
    readonly id: number;
    readonly nome: string;
    readonly cognome: string;
    readonly email: string;
    readonly password: string;

    static readonly db_table_name = "amministratori";
    static readonly db_id = "Id";
    static readonly db_nome = "Nome";
    static readonly db_cognome = "Cognome";
    static readonly db_email = "Email";
    static readonly db_password = "Password";

    constructor(id: number, nome: string, cognome: string, email: string, password: string) {
        this.id = id
        this.nome = nome
        this.cognome = cognome
        this.email = email
        this.password = password
    }

    
}