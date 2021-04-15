import { config, sql } from "../database/DbConfig";
import { Lingua } from "./Lingua";
import { Menu } from "./Menu";

export class MenuLingua {
    readonly id_lingua: number;
    readonly id_menu: number;

    static readonly db_table_name = "menu_lingue";
    static readonly db_id_lingua = "IdLingua";
    static readonly db_id_menu = "IdMenu";

    constructor(id_lingua: number, id_menu: number) {
        this.id_lingua = id_lingua;
        this.id_menu = id_menu;
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


    static async getAllLanguagesInWhichMenuCanBeTranslated(id_menu: number) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                if (id_menu > 0) {
                    await transaction.request()
                        .input(MenuLingua.db_id_menu, id_menu)
                        .query(`SELECT ${Lingua.db_table_name}.* FROM ${Menu.db_table_name}
                                INNER JOIN ${MenuLingua.db_table_name}.${MenuLingua.db_id_menu} = ${Menu.db_table_name}.${Menu.db_id}
                                INNER JOIN ${Lingua.db_table_name}.${Lingua.db_id} =  ${MenuLingua.db_table_name}.${MenuLingua.db_id_lingua}
                                WHERE ${MenuLingua.db_table_name}.${MenuLingua.db_id_menu} = @${MenuLingua.db_id_menu};`,
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
                                            resolve(this.convertToArrayOfLanguages(result.recordset));
                                        }
                                    });
                                }
                            });
                } else {
                    await transaction.request()
                        .query(`SELECT * FROM ${Lingua.db_table_name};`,
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
                                            resolve(this.convertToArrayOfLanguages(result.recordset));
                                        }
                                    });
                                }
                            });
                }

            });
        });
    }

    static async getAllLanguagesInWhichMenuMustBeTranslated(id_menu: number) {

    }
}