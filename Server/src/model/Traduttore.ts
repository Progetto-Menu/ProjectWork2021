import { config, sql } from "../database/DbConfig";

export class Traduttore {
    readonly id: number;
    readonly nome: string;
    readonly cognome: string;
    readonly email: string;
    readonly password: string;
    readonly revisore: boolean;
    readonly numero_token: number;
    readonly creato_il?: Date;
    readonly modificato_il?: Date;
    readonly cancellato_il?: Date;


    static readonly db_table_name = "traduttori";
    static readonly db_id = "Id";
    static readonly db_nome = "Nome";
    static readonly db_cognome = "Cognome";
    static readonly db_email = "Email";
    static readonly db_password = "Password";
    static readonly db_revisore = "Revisore";
    static readonly db_numero_token = "NumeroToken";
    static readonly db_creato_il = "CreatoIl";
    static readonly db_modificato_il = "ModificatoIl";
    static readonly db_cancellato_il = "EliminatoIl";


    constructor(id: number, nome: string, cognome: string, email: string, password: string, revisore: boolean, numero_token: number, creato_il: Date, modificato_il: Date, cancellato_il: Date) {
        this.id = id
        this.nome = nome
        this.cognome = cognome
        this.email = email
        this.password = password
        this.revisore = revisore
        this.numero_token = numero_token
        this.creato_il = creato_il
        this.modificato_il = modificato_il
        this.cancellato_il = cancellato_il
    }

    static async insert(traduttore: Traduttore) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(Traduttore.db_nome, traduttore.nome)
                    .input(Traduttore.db_cognome, traduttore.cognome)
                    .input(Traduttore.db_email, traduttore.email)
                    .input(Traduttore.db_password, traduttore.password)
                    .input(Traduttore.db_revisore, traduttore.revisore)
                    .input(Traduttore.db_numero_token, traduttore.numero_token)
                    .input(Traduttore.db_creato_il, traduttore.creato_il ?? new Date())
                    .input(Traduttore.db_modificato_il, traduttore.modificato_il ?? new Date())
                    .input(Traduttore.db_cancellato_il, traduttore.cancellato_il ?? null)
                    .query(`INSERT INTO ${Traduttore.db_table_name} (
                        ${Traduttore.db_nome},
                        ${Traduttore.db_cognome},
                        ${Traduttore.db_email},
                        ${Traduttore.db_password},
                        ${Traduttore.db_revisore},
                        ${Traduttore.db_numero_token},
                        ${Traduttore.db_creato_il},
                        ${Traduttore.db_modificato_il},
                        ${Traduttore.db_cancellato_il}) VALUES (
                            @${Traduttore.db_nome},
                            @${Traduttore.db_cognome},
                            @${Traduttore.db_email},
                            @${Traduttore.db_password},
                            @${Traduttore.db_revisore},
                            @${Traduttore.db_numero_token},
                            @${Traduttore.db_creato_il},
                            @${Traduttore.db_modificato_il},
                            @${Traduttore.db_cancellato_il});
                        SELECT * FROM ${Traduttore.db_table_name} where ${Traduttore.db_id} = (SELECT SCOPE_IDENTITY());`,
                        (err: any, result: any) => {
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                transaction.commit((err: any) => {
                                    if (!err) {
                                        const resultTraduttore: Traduttore = {
                                            id: result.recordset[0][Traduttore.db_id],
                                            nome: result.recordset[0][Traduttore.db_nome],
                                            cognome: result.recordset[0][Traduttore.db_cognome],
                                            email: result.recordset[0][Traduttore.db_email],
                                            password: result.recordset[0][Traduttore.db_password],
                                            revisore: result.recordset[0][Traduttore.db_revisore],
                                            numero_token: result.recordset[0][Traduttore.db_numero_token],
                                            creato_il: result.recordset[0][Traduttore.db_creato_il],
                                            modificato_il: result.recordset[0][Traduttore.db_modificato_il],
                                            cancellato_il: result.recordset[0][Traduttore.db_cancellato_il]
                                        }
                                        resolve(resultTraduttore);
                                    }
                                });
                            }
                        });
            });
        });
    }

}