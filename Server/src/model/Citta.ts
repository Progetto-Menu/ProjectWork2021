import { config, sql } from "../database/DbConfig";

export class Citta {
    readonly id: number;
    readonly nome: string;
    readonly id_provincia: number;

    static readonly db_table_name = "citta";
    static readonly db_id = "Id";
    static readonly db_nome = "Nome";
    static readonly db_id_provincia = "Id_Provincia";


    constructor(id: number, nome: string, id_provincia: number) {
        this.id = id
        this.nome = nome
        this.id_provincia = id_provincia
    }

    static async insert(citta: Citta) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                const request: any = await transaction.request()
                    .input(Citta.db_nome, citta.nome)
                    .input(Citta.db_id_provincia, citta.id_provincia)
                    .query(`INSERT INTO ${Citta.db_table_name} (
                    ${Citta.db_nome},
                    ${Citta.db_id_provincia}) VALUES (
                        @${Citta.db_nome},
                        @${Citta.db_id_provincia}});
                    SELECT * FROM ${Citta.db_table_name} where ${Citta.db_id} = (SELECT SCOPE_IDENTITY());`,
                        (err: any, result: any) => {
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                transaction.commit((err: any) => {
                                    if (!err) {
                                        const resultCitta: Citta = {
                                            id: result.recordset[0][Citta.db_id],
                                            nome: result.recordset[0][Citta.db_nome],
                                            id_provincia: result.recordset[0][Citta.db_id_provincia],
                                        }
                                        resolve(resultCitta);
                                    }
                                });
                            }
                        });
            });
        });
    }
}