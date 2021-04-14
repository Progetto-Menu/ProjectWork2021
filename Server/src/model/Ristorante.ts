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

    static convertToRistorante(record:any): Ristorante | null{
        return record != null ? {
            id: record[Ristorante.db_id],
            nome: record[Ristorante.db_nome],
            civico: record[Ristorante.db_civico],
            id_citta: record[Ristorante.db_id_citta],
            id_ristoratore: record[Ristorante.db_id_ristoratore],
            indirizzo: record[Ristorante.db_indirizzo]
        } : null;
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
                    .query(`SELECT ${Ristorante.db_table_name}.*, ${Citta.db_table_name}.${Citta.db_id_provincia}, ${Citta.db_table_name}.${Citta.db_nome} as Citta, ${Provincia.db_sigla} FROM ${Ristorante.db_table_name}
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
                                                id_provincia: record[Citta.db_id_provincia],
                                                provincia: record[Provincia.db_sigla],
                                                citta: record["Citta"]
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

    static async insert(ristorante: Ristorante) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(Ristorante.db_nome, ristorante.nome)
                    .input(Ristorante.db_civico, ristorante.civico)
                    .input(Ristorante.db_indirizzo, ristorante.indirizzo)
                    .input(Ristorante.db_id_citta, ristorante.id_citta)
                    .input(Ristorante.db_id_ristoratore, ristorante.id_ristoratore)
                    .query(`INSERT INTO ${Ristorante.db_table_name} (
                        ${Ristorante.db_nome},
                        ${Ristorante.db_civico},
                        ${Ristorante.db_indirizzo},
                        ${Ristorante.db_id_citta},
                        ${Ristorante.db_id_ristoratore}) VALUES (
                            @${Ristorante.db_nome},
                            @${Ristorante.db_civico},
                            @${Ristorante.db_indirizzo},
                            @${Ristorante.db_id_citta},
                            @${Ristorante.db_id_ristoratore});
                        SELECT * FROM ${Ristorante.db_table_name} where ${Ristorante.db_id} = (SELECT SCOPE_IDENTITY());`,
                        (err: any, result: any) => {
                            console.log(err)
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                transaction.commit((err: any) => {
                                    if (!err) {
                                        resolve(this.convertToRistorante(result.recordset[0]));
                                    }
                                });
                            }
                        });
            });
        });
    }

    static async update(ristorante: Ristorante) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(Ristorante.db_id, ristorante.id)
                    .input(Ristorante.db_nome, ristorante.nome)
                    .input(Ristorante.db_civico, ristorante.civico)
                    .input(Ristorante.db_indirizzo, ristorante.indirizzo)
                    .input(Ristorante.db_id_citta, ristorante.id_citta)
                    .input(Ristorante.db_id_ristoratore, ristorante.id_ristoratore)
                    .query(`UPDATE ${Ristorante.db_table_name}
                        SET ${Ristorante.db_nome} = @${Ristorante.db_nome},
                        ${Ristorante.db_civico} = @${Ristorante.db_civico},
                        ${Ristorante.db_indirizzo} = @${Ristorante.db_indirizzo},
                        ${Ristorante.db_id_citta} = @${Ristorante.db_id_citta},
                        ${Ristorante.db_id_ristoratore} = @${Ristorante.db_id_ristoratore}
                        WHERE ${Ristorante.db_id} = @${Ristorante.db_id};
                        SELECT * FROM ${Ristorante.db_table_name} where ${Ristorante.db_id} = @${Ristorante.db_id};`,
                        (err: any, result: any) => {
                            console.log(err)
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                transaction.commit((err: any) => {
                                    if (!err) {
                                        resolve(this.convertToRistorante(result.recordset[0]));
                                    }
                                });
                            }
                        });
            });
        });
    }

    static async delete(ristorante: Ristorante) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(Ristorante.db_id, ristorante.id)
                    .query(`DELETE FROM ${Ristorante.db_table_name} WHERE ${Ristorante.db_id} = @${Ristorante.db_id};`,
                        (err: any, result: any) => {
                            console.log(err)
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                transaction.commit((err: any) => {
                                    if (!err) {
                                        resolve(true);
                                    }
                                });
                            }
                        });
            });
        });
    }

}