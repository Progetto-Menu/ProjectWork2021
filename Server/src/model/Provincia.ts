import { config, sql } from "../database/DbConfig";

export class Provincia {
    readonly id: number;
    readonly sigla: string;
    readonly nome: string;

    static readonly db_table_name = "province";
    static readonly db_id = "Id";
    static readonly db_sigla = "Sigla";
    static readonly db_nome = "Nome";


    constructor(id: number, sigla: string, nome: string) {
        this.id = id
        this.sigla = sigla
        this.nome = nome
    }

    static convertToProvinceArray(recordset:any): Provincia[]{
        const array: Provincia[] = [];

        for (let record of recordset) {
            array.push({
                id: record[Provincia.db_id],
                sigla: record[Provincia.db_sigla],
                nome: record[Provincia.db_nome]
            });
        }
        return array;
    }

    static async getAll() {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .query(`SELECT * FROM ${Provincia.db_table_name};`,
                        (err: any, result: any) => {
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                transaction.commit((err: any) => {
                                    if (!err) {
                                        resolve(this.convertToProvinceArray(result.recordset));
                                    }
                                });
                            }
                        });
            });
        });
    }

}