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

    static convertToAmministratore(record: any): Amministratore | null {
        return record != null ? {
            id: record[Amministratore.db_id],
            nome: record[Amministratore.db_nome],
            cognome: record[Amministratore.db_cognome],
            email: record[Amministratore.db_email],
            password: record[Amministratore.db_password]
        } : null;
    }

    static async getAmministratoreById(id: number) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>(async (resolve, reject) => {
            try {
                await transaction.begin();
                const result: Amministratore | null = this.convertToAmministratore((await transaction.request()
                    .input(Amministratore.db_id, id)
                    .query(`SELECT * FROM ${Amministratore.db_table_name} WHERE ${Amministratore.db_id} = @${Amministratore.db_id};`)).recordset[0])
                await transaction.commit();
                resolve(result);

            } catch (err) {
                transaction.rollback();
                reject(err);
            }
        });
    }

    static async getAmministratoreByEmail(email: string) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>(async (resolve, reject) => {
            try {
                await transaction.begin();
                const result: Amministratore | null = this.convertToAmministratore((await transaction.request()
                    .input(Amministratore.db_email, email)
                    .query(`SELECT * FROM ${Amministratore.db_table_name} WHERE ${Amministratore.db_email} = @${Amministratore.db_email};`)).recordset[0])
                await transaction.commit();
                resolve(result);

            } catch (err) {
                transaction.rollback();
                reject(err);
            }
        });
    }


}