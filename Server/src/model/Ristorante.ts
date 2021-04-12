import { config, sql } from "../database/DbConfig";
import { Citta } from "./Citta";
import { Provincia } from "./Provincia";

export class Ristorante {
    readonly id: number;
    readonly nome: string;
    readonly indirizzo: string;
    readonly civico: string;
    readonly id_citta: number;
    readonly id_ristoratore: number;


    static readonly db_table_name = "ristoranti";
    static readonly db_id = "Id";
    static readonly db_nome = "Nome";
    static readonly db_indirizzo = "Indirizzo";
    static readonly db_civico = "Civico";
    static readonly db_id_citta = "Id_Citta";
    static readonly db_id_ristoratore = "Id_Ristoratore";


    constructor(id: number, nome: string, indirizzo: string, civico: string, id_citta: number, id_ristoratore: number) {
        this.id = id
        this.nome = nome
        this.indirizzo = indirizzo
        this.civico = civico
        this.id_citta = id_citta
        this.id_ristoratore = id_ristoratore
    }

    static convertToArray(recordset: any): Ristorante[] {
        const array: Ristorante[] = [];

        for (let record of recordset) {
            array.push({
                id: record[Ristorante.db_id],
                nome: record[Ristorante.db_nome],
                civico: record[Ristorante.db_civico],
                id_citta: record[Ristorante.db_id_citta],
                id_ristoratore: record[Ristorante.db_id_ristoratore],
                indirizzo: record[Ristorante.db_indirizzo]
            });
        }
        return array;
    }

    static async getRestaurantsByCityId(id_citta: number) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                const request: any = await transaction.request()
                    .input(Ristorante.db_id_citta, id_citta)
                    .query(`SELECT * FROM ${Ristorante.db_table_name} where ${Ristorante.db_id_citta} = @${Ristorante.db_id_citta};`,
                        (err: any, result: any) => {
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                transaction.commit((err: any) => {
                                    if (!err) {
                                        resolve(this.convertToArray(result.recordset));
                                    }
                                });
                            }
                        });
            });
        });
    }

    static async getRestaurantsByRestaurateurId(id_ristoratore: number) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                const request: any = await transaction.request()
                    .input(Ristorante.db_id_ristoratore, id_ristoratore)
                    .query(`SELECT ${Ristorante.db_table_name}.*, ${Citta.db_table_name}.${Citta.db_nome} as Citta, ${Provincia.db_table_name}.${Provincia.db_sigla} as Provincia FROM ${Ristorante.db_table_name}
                        INNER JOIN ${Citta.db_table_name} ON ${Citta.db_table_name}.${Citta.db_id} = ${Ristorante.db_table_name}.${Ristorante.db_id_citta}
                        INNER JOIN ${Provincia.db_table_name} ON ${Citta.db_table_name}.${Citta.db_id_provincia} = ${Provincia.db_table_name}.${Provincia.db_id}
                        where ${Ristorante.db_id_ristoratore} = @${Ristorante.db_id_ristoratore};`,
                        (err: any, result: any) => {
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                transaction.commit((err: any) => {
                                    if (!err) {
                                        const array: any[] = [];

                                        for (let record of result.recordset) {
                                            array.push({
                                                id: record[Ristorante.db_id],
                                                nome: record[Ristorante.db_nome],
                                                civico: record[Ristorante.db_civico],
                                                id_citta: record[Ristorante.db_id_citta],
                                                id_ristoratore: record[Ristorante.db_id_ristoratore],
                                                indirizzo: record[Ristorante.db_indirizzo],
                                                citta: record["Citta"],
                                                provincia: record["Provincia"]
                                            });
                                        }

                                        console.log(array);

                                        resolve(array);
                                    }
                                });
                            }
                        });
            });
        });
    }

}