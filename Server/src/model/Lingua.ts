import { config, sql } from "../database/DbConfig";

export class Lingua {
    readonly id: number;
    readonly nome: string;
    readonly cod_lingua: string;

    static readonly db_table_name = "lingue";
    static readonly db_id = "Id";
    static readonly db_nome = "Nome";
    static readonly db_cod_lingua = "Cod_Lingua";

    constructor(id: number, nome: string, cod_lingua: string) {
        this.id = id
        this.nome = nome;
        this.cod_lingua = cod_lingua
    }


    static convertToLanguage(record:any): Lingua | null{
        return record != null ? {
            id: record[Lingua.db_id],
            nome: record[Lingua.db_nome],
            cod_lingua: record[Lingua.db_cod_lingua],
        } : null;
    }

    static convertToArrayOfLanguages(recordset:any): Lingua[] | null{
        const array: Lingua[] = [];

        for(let record of recordset){
            array.push({
                id: record[Lingua.db_id],
                nome: record[Lingua.db_nome],
                cod_lingua: record[Lingua.db_cod_lingua],
            });
        }
        return array;
    }


    static async getAllLanguages() {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .query(`SELECT * FROM ${Lingua.db_table_name};`,
                        (err: any, result: any) => {
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                transaction.commit((err: any) => {
                                    if (!err) {
                                        resolve(this.convertToArrayOfLanguages(result.recordset));
                                    }
                                });
                            }
                        });
            });
        });
    }



}