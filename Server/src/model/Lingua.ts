import { config, sql } from "../database/DbConfig";
import { LinguaTraduttore } from "./LinguaTraduttore";

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


    static convertToLanguage(record: any): Lingua | null {
        return record != null ? {
            id: record[Lingua.db_id],
            nome: record[Lingua.db_nome],
            cod_lingua: record[Lingua.db_cod_lingua],
        } : null;
    }

    static convertToArrayOfLanguages(recordset: any): Lingua[] | null {
        const array: Lingua[] = [];

        for (let record of recordset) {
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
        return new Promise<any>(async (resolve, reject) => {
            try{
                await transaction.begin();
                const req = transaction.request();
                const results = await req.query(`SELECT * FROM ${Lingua.db_table_name};`);
    
                await transaction.commit();
                resolve(this.convertToArrayOfLanguages(results.recordset));
            }catch(err){
                await transaction.rollback();
                reject(err);
            }
        });
    }


    static async getAllLanguagesThatAreUnknownByTranslator(id: number) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(LinguaTraduttore.db_id_traduttore, id)
                    .query(`SELECT * FROM ${Lingua.db_table_name} 
                    WHERE ${Lingua.db_id} NOT IN (SELECT ${LinguaTraduttore.db_id_lingua} FROM ${LinguaTraduttore.db_table_name} WHERE ${LinguaTraduttore.db_id_traduttore} = @${LinguaTraduttore.db_id_traduttore});`,
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

    static async getAllLanguagesThatAreKnownByTranslator(id: number) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(LinguaTraduttore.db_id_traduttore, id)
                    .query(`SELECT * FROM ${Lingua.db_table_name} 
                    WHERE ${Lingua.db_id} IN (SELECT ${LinguaTraduttore.db_id_lingua} FROM ${LinguaTraduttore.db_table_name} WHERE ${LinguaTraduttore.db_id_traduttore} = @${LinguaTraduttore.db_id_traduttore})
                    
                    ;`,
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