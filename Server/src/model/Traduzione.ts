import { config, sql } from "../database/DbConfig";
import { CustomTraduzione } from "./custom/CustomTraduzione";
import { StatoTraduzione } from "./custom/StatoTraduzione";
import { Lingua } from "./Lingua";
import { Stringa } from "./Stringa";
import { StringaTradotta } from "./StringaTradotta";

export class Traduzione {
    readonly id: number;
    readonly stato: number;
    readonly testo: string;
    readonly id_stringa: number;
    readonly id_lingua: number;
    readonly id_revisore: number;
    readonly id_traduttore: number;

    static readonly db_table_name = "traduzioni";
    static readonly db_id = "Id";
    static readonly db_stato = "Stato";
    static readonly db_testo = "Testo";
    static readonly db_id_stringa = "IdStringa";
    static readonly db_id_lingua = "IdLingua";
    static readonly db_id_revisore = "IdRevisore";
    static readonly db_id_traduttore = "IdTraduttore";


    constructor(id: number, stato: number, testo: string, id_stringa: number, id_lingua: number, id_revisore: number, id_traduttore: number) {
        this.id = id
        this.stato = stato
        this.testo = testo
        this.id_stringa = id_stringa
        this.id_lingua = id_lingua
        this.id_revisore = id_revisore
        this.id_traduttore = id_traduttore
    }

    static convertToArrayOfTranslations(recordset: any): CustomTraduzione[] | null {
        const array: CustomTraduzione[] = [];

        for (let record of recordset) {
            array.push({
                id: record[Traduzione.db_id],
                codLingua: record[Lingua.db_cod_lingua],
                stato: record[Traduzione.db_stato],
                testo: record[Stringa.db_testo],
                testoTradotto: record["TestoTradotto"]
            });
        }
        return array;
    }

    static convertToArrayOfTranslations2(recordset: any): Traduzione[] {
        const array: Traduzione[] = [];

        for (let record of recordset) {
            array.push({
                id: record[Traduzione.db_id],
                stato: record[Traduzione.db_stato],
                testo: record[Traduzione.db_testo],
                id_lingua: record[Traduzione.db_id_lingua],
                id_revisore: record[Traduzione.db_id_revisore],
                id_stringa: record[Traduzione.db_id_stringa],
                id_traduttore: record[Traduzione.db_id_traduttore]
            });
        }
        return array;
    }

    static async getAllTranslationByTranslatorId(id: number) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(Traduzione.db_id_traduttore, id)
                    .query(`SELECT ${Traduzione.db_table_name}.${Traduzione.db_id}, ${Traduzione.db_table_name}.${Traduzione.db_stato}, ${Lingua.db_table_name}.${Lingua.db_cod_lingua}, ${Stringa.db_table_name}.${Stringa.db_testo}, ${Traduzione.db_table_name}.${Traduzione.db_testo} as TestoTradotto FROM ${Traduzione.db_table_name}
                    INNER JOIN ${Lingua.db_table_name} ON ${Lingua.db_table_name}.${Lingua.db_id} = ${Traduzione.db_table_name}.${Traduzione.db_id_lingua}
                    INNER JOIN ${Stringa.db_table_name} ON ${Stringa.db_table_name}.${Stringa.db_id} = ${Traduzione.db_table_name}.${Traduzione.db_id_stringa}
                    WHERE ${Traduzione.db_table_name}.${Traduzione.db_id_traduttore} = @${Traduzione.db_id_traduttore}`,
                        (err: any, result: any) => {
                            console.log(err, result);
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                transaction.commit((err: any) => {
                                    if (!err) {
                                        console.log(result)
                                        resolve(this.convertToArrayOfTranslations(result.recordset));
                                    }
                                });
                            }
                        });
            });
        });
    }

    static async getAllTranslationInProgressByTranslatorId(id: number) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(Traduzione.db_id_traduttore, id)
                    .query(`SELECT ${Traduzione.db_table_name}.${Traduzione.db_id}, ${Traduzione.db_table_name}.${Traduzione.db_stato}, ${Lingua.db_table_name}.${Lingua.db_cod_lingua}, ${Stringa.db_table_name}.${Stringa.db_testo}, ${Traduzione.db_table_name}.${Traduzione.db_testo} as TestoTradotto FROM ${Traduzione.db_table_name}
                    INNER JOIN ${Lingua.db_table_name} ON ${Lingua.db_table_name}.${Lingua.db_id} = ${Traduzione.db_table_name}.${Traduzione.db_id_lingua}
                    INNER JOIN ${Stringa.db_table_name} ON ${Stringa.db_table_name}.${Stringa.db_id} = ${Traduzione.db_table_name}.${Traduzione.db_id_stringa}
                    WHERE ${Traduzione.db_table_name}.${Traduzione.db_id_traduttore} = @${Traduzione.db_id_traduttore} AND ${Traduzione.db_table_name}.${Traduzione.db_stato} = ${StatoTraduzione.IN_CORSO.toString()}`,
                        (err: any, result: any) => {
                            console.log(err, result);
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                transaction.commit((err: any) => {
                                    if (!err) {
                                        console.log(result)
                                        resolve(this.convertToArrayOfTranslations(result.recordset));
                                    }
                                });
                            }
                        });
            });
        });
    }

    static async getTranslationToReview(id_traduttore: number) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(Traduzione.db_id_traduttore, id_traduttore)
                    .query(`SELECT ${Traduzione.db_table_name}.${Traduzione.db_id}, ${Traduzione.db_table_name}.${Traduzione.db_stato}, ${Lingua.db_table_name}.${Lingua.db_cod_lingua}, ${Stringa.db_table_name}.${Stringa.db_testo}, ${Traduzione.db_table_name}.${Traduzione.db_testo} as TestoTradotto FROM ${Traduzione.db_table_name}
                    INNER JOIN ${Lingua.db_table_name} ON ${Lingua.db_table_name}.${Lingua.db_id} = ${Traduzione.db_table_name}.${Traduzione.db_id_lingua}
                    INNER JOIN ${Stringa.db_table_name} ON ${Stringa.db_table_name}.${Stringa.db_id} = ${Traduzione.db_table_name}.${Traduzione.db_id_stringa}
                    WHERE ${Traduzione.db_table_name}.${Traduzione.db_stato} = ${StatoTraduzione.DA_REVISIONARE.toString()} AND ${Traduzione.db_table_name}.${Traduzione.db_id_traduttore} != @${Traduzione.db_id_traduttore}`,
                        (err: any, result: any) => {
                            console.log(err, result);
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                transaction.commit((err: any) => {
                                    if (!err) {
                                        console.log(result)
                                        resolve(this.convertToArrayOfTranslations(result.recordset));
                                    }
                                });
                            }
                        });
            });
        });
    }

    static async updateTranslation(id: number, text_translated: string) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(Traduzione.db_id, id)
                    .input(Traduzione.db_testo, text_translated)
                    .query(`UPDATE ${Traduzione.db_table_name} SET ${Traduzione.db_testo} = @${Traduzione.db_testo}, ${Traduzione.db_stato} = ${StatoTraduzione.DA_REVISIONARE.toString()} WHERE ${Traduzione.db_id} = @${Traduzione.db_id}`,
                        (err: any, result: any) => {
                            console.log(err, result);
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                transaction.commit((err: any) => {
                                    if (!err) {
                                        console.log(result)
                                        resolve(true);
                                    }
                                });
                            }
                        });
            });
        });
    }

    static async approveTranslation(id_translation: number, id_reviser:number) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                transaction.request().input(Traduzione.db_id, id_translation)
                    .query(`SELECT * FROM ${Traduzione.db_table_name} WHERE ${Traduzione.db_id} = @${Traduzione.db_id} AND ${Traduzione.db_stato}=${StatoTraduzione.DA_REVISIONARE.toString()};`,
                        (err1: any, result1: any) => {
                            console.log(err1, result1);
                            if (err1) {
                                transaction.rollback();
                                reject(err1);
                            }
                            else {
                                if (result1.recordset.length === 1) {

                                    const translation: Traduzione = this.convertToArrayOfTranslations2(result1.recordset)[0]
                                    transaction.request()
                                        .input(StringaTradotta.db_id_lingua, translation.id_lingua)
                                        .input(StringaTradotta.db_id_stringa, translation.id_stringa)
                                        .query(`SELECT * FROM ${StringaTradotta.db_table_name} WHERE ${StringaTradotta.db_id_lingua} = @${StringaTradotta.db_id_lingua} AND ${StringaTradotta.db_id_stringa} = @${StringaTradotta.db_id_stringa}`, (err2: any, result2: any) => {
                                            console.log(err2, result2);
                                            if (err2) {
                                                transaction.rollback();
                                                reject(err2);
                                            } else {
                                                if (result2.recordset.length === 0) { //AGGIUNGI NELLA TABELLA STRINGHE TRADOTTE E SEGNA COME APPROVATA LA TRADUZIONE
                                                    transaction.request()
                                                        .input(StringaTradotta.db_id_lingua, translation.id_lingua)
                                                        .input(StringaTradotta.db_id_stringa, translation.id_stringa)
                                                        .input(StringaTradotta.db_testo, translation.testo)
                                                        .query(`INSERT INTO ${StringaTradotta.db_table_name} (
                                                            ${StringaTradotta.db_id_lingua},
                                                            ${StringaTradotta.db_id_stringa},
                                                            ${StringaTradotta.db_testo}
                                                        ) VALUES (
                                                            @${StringaTradotta.db_id_lingua},
                                                            @${StringaTradotta.db_id_stringa},
                                                            @${StringaTradotta.db_testo}
                                                        );`, (err4: any, result4: any) => {
                                                            console.log(err4, result4);
                                                            if (err4) {
                                                                transaction.rollback();
                                                                reject(err4);
                                                            }
                                                            else {
                                                                transaction.request()
                                                                    .input(Traduzione.db_stato, StatoTraduzione.APPROVATA.toString())
                                                                    .input(Traduzione.db_id, translation.id)
                                                                    .input(Traduzione.db_id_revisore, id_reviser)
                                                                    .query(`UPDATE ${Traduzione.db_table_name} SET ${Traduzione.db_stato} = @${Traduzione.db_stato}, ${Traduzione.db_id_revisore} = @${Traduzione.db_id_revisore} WHERE ${Traduzione.db_id} = @${Traduzione.db_id}`, (err5: any, result5: any) => {
                                                                        console.log(err5, result5);
                                                                        if (err5) {
                                                                            transaction.rollback();
                                                                            reject(err5);
                                                                        } else {
                                                                            transaction.commit((err: any) => {
                                                                                if (!err) {
                                                                                    resolve(true);
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                            }
                                                        })
                                                } else { // SEGNA COME APPROVATA E SCARTATA LA TRADUZIONE
                                                    transaction.request()
                                                        .input(Traduzione.db_stato, StatoTraduzione.APPROVATA_SCARTATA.toString())
                                                        .input(Traduzione.db_id, id_translation)
                                                        .input(Traduzione.db_id_revisore, id_reviser)
                                                        .query(`UPDATE ${Traduzione.db_table_name} SET ${Traduzione.db_stato} = @${Traduzione.db_stato}, ${Traduzione.db_id_revisore} = @${Traduzione.db_id_revisore} WHERE ${Traduzione.db_id} = @${Traduzione.db_id}`, (err3: any, result3: any) => {
                                                            console.log(err3, result3);
                                                            if (err3) {
                                                                transaction.rollback();
                                                                reject(err3);
                                                            } else {
                                                                transaction.commit((err: any) => {
                                                                    if (!err) {
                                                                        resolve(true);
                                                                    }
                                                                })
                                                            }
                                                        })
                                                }
                                            }
                                        })
                                }
                                else {
                                    transaction.commit((err: any) => {
                                        if (!err) {
                                            resolve(true);
                                        }
                                    })
                                }
                            }
                        });
            });
        });

    }

    static async discardTranslation(id_translation: number, id_reviser: number) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                transaction.request().input(Traduzione.db_id, id_translation)
                    .query(`SELECT * FROM ${Traduzione.db_table_name} WHERE ${Traduzione.db_id} = @${Traduzione.db_id} AND ${Traduzione.db_stato}=${StatoTraduzione.DA_REVISIONARE.toString()};`,
                        (err1: any, result1: any) => {
                            console.log(err1, result1);
                            if (err1) {
                                transaction.rollback();
                                reject(err1);
                            }
                            else {
                                if (result1.recordset.length === 1) {
                                    transaction.request()
                                    .input(Traduzione.db_stato, StatoTraduzione.SCARTATA.toString())
                                    .input(Traduzione.db_id, id_translation)
                                    .input(Traduzione.db_id_revisore, id_reviser)
                                    .query(`UPDATE ${Traduzione.db_table_name} SET ${Traduzione.db_stato} = @${Traduzione.db_stato}, ${Traduzione.db_id_revisore} = @${Traduzione.db_id_revisore} WHERE ${Traduzione.db_id} = @${Traduzione.db_id}`, (err3: any, result3: any) => {
                                        if (err3) {
                                            transaction.rollback();
                                            reject(err3);
                                        } else {
                                            transaction.commit((err: any) => {
                                                if (!err) {
                                                    resolve(true);
                                                }
                                            })
                                        }
                                    })
                                }
                                else {
                                    transaction.commit((err: any) => {
                                        if (!err) {
                                            resolve(true);
                                        }
                                    })
                                }
                            }
                        });
            });
        });


    }

}