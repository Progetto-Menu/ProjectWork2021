import { config, sql } from "../database/DbConfig";
import { Citta } from "./Citta";
import { CustomMenu } from "./custom/CustomMenu";
import { CustomMenuDaTradurre } from "./custom/CustomMenuDaTradurre";
import { Dish } from "./custom/Dish";
import { Language } from "./custom/Language";
import { Section } from "./custom/Section";
import { StatoTraduzione } from "./custom/StatoTraduzione";
import { Lingua } from "./Lingua";
import { LinguaTraduttore } from "./LinguaTraduttore";
import { MenuLingua } from "./MenuLingua";
import { Piatto } from "./Piatto";
import { Provincia } from "./Provincia";
import { Ristorante } from "./Ristorante";
import { Ristoratore } from "./Ristoratore";
import { Sezione } from "./Sezione";
import { Stringa } from "./Stringa";
import { StringaTradotta } from "./StringaTradotta";
import { Traduttore } from "./Traduttore";
import { Traduzione } from "./Traduzione";

export class Menu {
    readonly id: number;
    readonly pubblico: boolean;
    readonly creato_il: Date;
    readonly modificato_il: Date;
    readonly cancellato_il: Date;
    readonly id_ristorante: number;
    readonly id_titolo: number;
    readonly id_sottotitolo: number;

    static readonly db_table_name = "menu"
    static readonly db_id = "Id";
    static readonly db_pubblico = "Pubblico";
    static readonly db_creato_il = "CreatoIl";
    static readonly db_modificato_il = "ModificatoIl";
    static readonly db_cancellato_il = "CancellatoIl";
    static readonly db_id_ristorante = "IdRistorante";
    static readonly db_id_titolo = "IdTitolo";
    static readonly db_id_sottotitolo = "IdSottotitolo";


    constructor(id: number, pubblico: boolean, creato_il: Date, modificato_il: Date, cancellato_il: Date, id_ristorante: number, id_titolo: number, id_sottotitolo: number) {
        this.id = id
        this.pubblico = pubblico
        this.creato_il = creato_il
        this.modificato_il = modificato_il
        this.cancellato_il = cancellato_il
        this.id_ristorante = id_ristorante
        this.id_titolo = id_titolo
        this.id_sottotitolo = id_sottotitolo
    }

    static convertToArray(recordset: any) {
        const array: CustomMenuDaTradurre[] = [];

        for (let record of recordset) {
            array.push({
                nome_ristorante: record["NomeRistorante"],
                indirizzo: record[Ristorante.db_indirizzo],
                civico: record[Ristorante.db_civico],
                citta: record["Citta"],
                sigla_provincia: record[Provincia.db_sigla],
                cod_lingua: record[Lingua.db_cod_lingua],
                id_lingua: record[MenuLingua.db_id_lingua],
                id_menu: record[Menu.db_id]
            });
        }
        return array;
    }

    static convertToArrayOfMenu(recordset: any) {
        const array: Menu[] = [];

        for (let record of recordset) {
            array.push({
                id: record[Menu.db_id],
                pubblico: record[Menu.db_pubblico],
                cancellato_il: record[Menu.db_cancellato_il],
                creato_il: record[Menu.db_creato_il],
                id_ristorante: record[Menu.db_id_ristorante],
                id_sottotitolo: record[Menu.db_id_sottotitolo],
                id_titolo: record[Menu.db_id_titolo],
                modificato_il: record[Menu.db_modificato_il]
            });
        }
        return array;
    }


    static async getMenusToTranslateByProvinceId(id_provincia: number, id_traduttore: number) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        const results = [];
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(Citta.db_id_provincia, id_provincia)
                    .input(LinguaTraduttore.db_id_traduttore, id_traduttore)
                    .query(`
                        SELECT ${Ristorante.db_table_name}.${Ristorante.db_nome} AS NomeRistorante, ${Ristorante.db_table_name}.${Ristorante.db_indirizzo}, ${Ristorante.db_table_name}.${Ristorante.db_civico}, ${Citta.db_table_name}.${Citta.db_nome} AS Citta, ${Provincia.db_table_name}.${Provincia.db_sigla}, ${Menu.db_table_name}.${Menu.db_id}, T3.${MenuLingua.db_id_lingua}, ${Lingua.db_table_name}.${Lingua.db_cod_lingua}
                        FROM ${Menu.db_table_name}
                        INNER JOIN ${Ristorante.db_table_name} ON ${Ristorante.db_table_name}.${Ristorante.db_id} = ${Menu.db_table_name}.${Menu.db_id_ristorante}
                        INNER JOIN ${Citta.db_table_name} ON ${Citta.db_table_name}.${Citta.db_id} = ${Ristorante.db_table_name}.${Ristorante.db_id_citta}
                        INNER JOIN ${Provincia.db_table_name} ON ${Provincia.db_table_name}.${Provincia.db_id} = ${Citta.db_table_name}.${Citta.db_id_provincia}
                        INNER JOIN (
                            SELECT menu_lingue.IdMenu, menu_lingue.IdLingua FROM (SELECT * FROM(SELECT ${Menu.db_table_name}.${Menu.db_id} as IdMenu, ${Menu.db_id_titolo} as IdStringa FROM ${Menu.db_table_name}
                            INNER JOIN ${Stringa.db_table_name} ON ${Menu.db_table_name}.${Menu.db_id_titolo} = ${Stringa.db_table_name}.${Stringa.db_id}
                            UNION
                            SELECT ${Menu.db_table_name}.${Menu.db_id}, ${Menu.db_id_sottotitolo} as IdStringa FROM ${Menu.db_table_name}
                            INNER JOIN ${Stringa.db_table_name} ON ${Menu.db_table_name}.${Menu.db_id_sottotitolo} = ${Stringa.db_table_name}.${Stringa.db_id}
                            UNION
                            SELECT ${Menu.db_table_name}.${Menu.db_id}, ${Sezione.db_table_name}.${Sezione.db_id_titolo} as IdStringa FROM ${Menu.db_table_name}
                            INNER JOIN ${Sezione.db_table_name} ON ${Sezione.db_table_name}.${Sezione.db_id_menu} = ${Menu.db_table_name}.${Menu.db_id}
                            INNER JOIN ${Stringa.db_table_name} ON ${Sezione.db_table_name}.${Sezione.db_id_titolo} = ${Stringa.db_table_name}.${Stringa.db_id}
                            UNION
                            SELECT ${Menu.db_table_name}.${Menu.db_id}, ${Sezione.db_table_name}.${Sezione.db_id_sottotitolo} as IdStringa FROM ${Menu.db_table_name}
                            INNER JOIN ${Sezione.db_table_name} ON ${Sezione.db_table_name}.${Sezione.db_id_menu} = ${Menu.db_table_name}.${Menu.db_id}
                            INNER JOIN ${Stringa.db_table_name} ON ${Sezione.db_table_name}.${Sezione.db_id_sottotitolo} = ${Stringa.db_table_name}.${Stringa.db_id}
                            UNION
                            SELECT ${Menu.db_table_name}.${Menu.db_id},${Piatto.db_table_name}.${Piatto.db_id_titolo} as IdStringa FROM ${Menu.db_table_name}
                            INNER JOIN ${Sezione.db_table_name} ON ${Sezione.db_table_name}.${Sezione.db_id_menu} = ${Menu.db_table_name}.${Menu.db_id}
                            INNER JOIN ${Piatto.db_table_name} ON ${Piatto.db_table_name}.${Piatto.db_id_sezione} = ${Sezione.db_table_name}.${Sezione.db_id}
                            INNER JOIN ${Stringa.db_table_name} ON ${Piatto.db_table_name}.${Piatto.db_id_titolo} = ${Stringa.db_table_name}.${Stringa.db_id}
                            UNION
                            SELECT ${Menu.db_table_name}.${Menu.db_id}, ${Piatto.db_table_name}.${Piatto.db_id_descrizione} as IdStringa FROM ${Menu.db_table_name}
                            INNER JOIN ${Sezione.db_table_name} ON ${Sezione.db_table_name}.${Sezione.db_id_menu} = ${Menu.db_table_name}.${Menu.db_id}
                            INNER JOIN ${Piatto.db_table_name} ON ${Piatto.db_table_name}.${Piatto.db_id_sezione} = ${Sezione.db_table_name}.${Sezione.db_id}
                            INNER JOIN ${Stringa.db_table_name} ON ${Piatto.db_table_name}.${Piatto.db_id_descrizione} = ${Stringa.db_table_name}.${Stringa.db_id}) AS T1
                            WHERE T1.IdMenu IN (SELECT ${Menu.db_table_name}.${Menu.db_id} FROM ${Menu.db_table_name} 
                            INNER JOIN ${MenuLingua.db_table_name} ON ${Menu.db_table_name}.${Menu.db_id} = ${MenuLingua.db_table_name}.${MenuLingua.db_id_menu} 
                            INNER JOIN ${LinguaTraduttore.db_table_name} ON ${LinguaTraduttore.db_table_name}.${LinguaTraduttore.db_id_lingua} = ${MenuLingua.db_table_name}.${MenuLingua.db_id_lingua}
                            INNER JOIN ${Lingua.db_table_name} ON ${LinguaTraduttore.db_table_name}.${LinguaTraduttore.db_id_lingua} = ${Lingua.db_table_name}.${Lingua.db_id}
                            INNER JOIN ${Ristorante.db_table_name} ON ${Ristorante.db_table_name}.${Ristorante.db_id} = ${Menu.db_table_name}.${Menu.db_id_ristorante}
                            INNER JOIN ${Citta.db_table_name} ON ${Ristorante.db_table_name}.${Ristorante.db_id_citta} = ${Citta.db_table_name}.${Citta.db_id}
                            WHERE ${LinguaTraduttore.db_table_name}.${LinguaTraduttore.db_id_traduttore} = @${LinguaTraduttore.db_id_traduttore} AND ${Citta.db_table_name}.${Citta.db_id_provincia} = @${Citta.db_id_provincia})
                            ) AS IdStringheMenu
                            LEFT JOIN ${StringaTradotta.db_table_name} ON ${StringaTradotta.db_table_name}.${StringaTradotta.db_id_stringa} = IdStringheMenu.IdStringa
                            RIGHT JOIN menu_lingue ON menu_lingue.IdLingua = stringhe_tradotte.IdLingua
                            WHERE ${StringaTradotta.db_table_name}.${StringaTradotta.db_id} IS NULL
                        ) AS T3 ON T3.IdMenu = ${Menu.db_table_name}.${Menu.db_id}
                        INNER JOIN lingue ON lingue.Id = T3.IdLingua
                        WHERE T3.${MenuLingua.db_id_lingua} IN (SELECT ${LinguaTraduttore.db_id_lingua} FROM ${LinguaTraduttore.db_table_name} WHERE ${LinguaTraduttore.db_id_traduttore} = @${LinguaTraduttore.db_id_traduttore})`,
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
                                        resolve(this.convertToArray(result.recordset));
                                    }
                                });
                            }
                        });
            });
        });
    }

    static async getMenusToTranslateByCityId(id_citta: number, id_traduttore: number) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        const results = [];
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(Ristorante.db_id_citta, id_citta)
                    .input(LinguaTraduttore.db_id_traduttore, id_traduttore)
                    .query(`
                        SELECT ${Ristorante.db_table_name}.${Ristorante.db_nome} AS NomeRistorante, ${Ristorante.db_table_name}.${Ristorante.db_indirizzo}, ${Ristorante.db_table_name}.${Ristorante.db_civico}, ${Citta.db_table_name}.${Citta.db_nome} AS Citta, ${Provincia.db_table_name}.${Provincia.db_sigla}, ${Menu.db_table_name}.${Menu.db_id}, T3.${MenuLingua.db_id_lingua}, ${Lingua.db_table_name}.${Lingua.db_cod_lingua}
                        FROM ${Menu.db_table_name}
                        INNER JOIN ${Ristorante.db_table_name} ON ${Ristorante.db_table_name}.${Ristorante.db_id} = ${Menu.db_table_name}.${Menu.db_id_ristorante}
                        INNER JOIN ${Citta.db_table_name} ON ${Citta.db_table_name}.${Citta.db_id} = ${Ristorante.db_table_name}.${Ristorante.db_id_citta}
                        INNER JOIN ${Provincia.db_table_name} ON ${Provincia.db_table_name}.${Provincia.db_id} = ${Citta.db_table_name}.${Citta.db_id_provincia}
                        INNER JOIN (
                            SELECT menu_lingue.IdMenu, menu_lingue.IdLingua FROM (SELECT * FROM(SELECT ${Menu.db_table_name}.${Menu.db_id} as IdMenu, ${Menu.db_id_titolo} as IdStringa FROM ${Menu.db_table_name}
                            INNER JOIN ${Stringa.db_table_name} ON ${Menu.db_table_name}.${Menu.db_id_titolo} = ${Stringa.db_table_name}.${Stringa.db_id}
                            UNION
                            SELECT ${Menu.db_table_name}.${Menu.db_id}, ${Menu.db_id_sottotitolo} as IdStringa FROM ${Menu.db_table_name}
                            INNER JOIN ${Stringa.db_table_name} ON ${Menu.db_table_name}.${Menu.db_id_sottotitolo} = ${Stringa.db_table_name}.${Stringa.db_id}
                            UNION
                            SELECT ${Menu.db_table_name}.${Menu.db_id}, ${Sezione.db_table_name}.${Sezione.db_id_titolo} as IdStringa FROM ${Menu.db_table_name}
                            INNER JOIN ${Sezione.db_table_name} ON ${Sezione.db_table_name}.${Sezione.db_id_menu} = ${Menu.db_table_name}.${Menu.db_id}
                            INNER JOIN ${Stringa.db_table_name} ON ${Sezione.db_table_name}.${Sezione.db_id_titolo} = ${Stringa.db_table_name}.${Stringa.db_id}
                            UNION
                            SELECT ${Menu.db_table_name}.${Menu.db_id}, ${Sezione.db_table_name}.${Sezione.db_id_sottotitolo} as IdStringa FROM ${Menu.db_table_name}
                            INNER JOIN ${Sezione.db_table_name} ON ${Sezione.db_table_name}.${Sezione.db_id_menu} = ${Menu.db_table_name}.${Menu.db_id}
                            INNER JOIN ${Stringa.db_table_name} ON ${Sezione.db_table_name}.${Sezione.db_id_sottotitolo} = ${Stringa.db_table_name}.${Stringa.db_id}
                            UNION
                            SELECT ${Menu.db_table_name}.${Menu.db_id},${Piatto.db_table_name}.${Piatto.db_id_titolo} as IdStringa FROM ${Menu.db_table_name}
                            INNER JOIN ${Sezione.db_table_name} ON ${Sezione.db_table_name}.${Sezione.db_id_menu} = ${Menu.db_table_name}.${Menu.db_id}
                            INNER JOIN ${Piatto.db_table_name} ON ${Piatto.db_table_name}.${Piatto.db_id_sezione} = ${Sezione.db_table_name}.${Sezione.db_id}
                            INNER JOIN ${Stringa.db_table_name} ON ${Piatto.db_table_name}.${Piatto.db_id_titolo} = ${Stringa.db_table_name}.${Stringa.db_id}
                            UNION
                            SELECT ${Menu.db_table_name}.${Menu.db_id}, ${Piatto.db_table_name}.${Piatto.db_id_descrizione} as IdStringa FROM ${Menu.db_table_name}
                            INNER JOIN ${Sezione.db_table_name} ON ${Sezione.db_table_name}.${Sezione.db_id_menu} = ${Menu.db_table_name}.${Menu.db_id}
                            INNER JOIN ${Piatto.db_table_name} ON ${Piatto.db_table_name}.${Piatto.db_id_sezione} = ${Sezione.db_table_name}.${Sezione.db_id}
                            INNER JOIN ${Stringa.db_table_name} ON ${Piatto.db_table_name}.${Piatto.db_id_descrizione} = ${Stringa.db_table_name}.${Stringa.db_id}) AS T1
                            WHERE T1.IdMenu IN (SELECT ${Menu.db_table_name}.${Menu.db_id} FROM ${Menu.db_table_name} 
                            INNER JOIN ${MenuLingua.db_table_name} ON ${Menu.db_table_name}.${Menu.db_id} = ${MenuLingua.db_table_name}.${MenuLingua.db_id_menu} 
                            INNER JOIN ${LinguaTraduttore.db_table_name} ON ${LinguaTraduttore.db_table_name}.${LinguaTraduttore.db_id_lingua} = ${MenuLingua.db_table_name}.${MenuLingua.db_id_lingua}
                            INNER JOIN ${Lingua.db_table_name} ON ${LinguaTraduttore.db_table_name}.${LinguaTraduttore.db_id_lingua} = ${Lingua.db_table_name}.${Lingua.db_id}
                            INNER JOIN ${Ristorante.db_table_name} ON ${Ristorante.db_table_name}.${Ristorante.db_id} = ${Menu.db_table_name}.${Menu.db_id_ristorante}
                            WHERE ${LinguaTraduttore.db_table_name}.${LinguaTraduttore.db_id_traduttore} = @${LinguaTraduttore.db_id_traduttore} AND ${Ristorante.db_table_name}.${Ristorante.db_id_citta} = @${Ristorante.db_id_citta})
                            ) AS IdStringheMenu
                            LEFT JOIN ${StringaTradotta.db_table_name} ON ${StringaTradotta.db_table_name}.${StringaTradotta.db_id_stringa} = IdStringheMenu.IdStringa
                            RIGHT JOIN menu_lingue ON menu_lingue.IdLingua = stringhe_tradotte.IdLingua
                            WHERE ${StringaTradotta.db_table_name}.${StringaTradotta.db_id} IS NULL
                        ) AS T3 ON T3.IdMenu = ${Menu.db_table_name}.${Menu.db_id}
                        INNER JOIN lingue ON lingue.Id = T3.IdLingua
                        WHERE T3.${MenuLingua.db_id_lingua} IN (SELECT ${LinguaTraduttore.db_id_lingua} FROM ${LinguaTraduttore.db_table_name} WHERE ${LinguaTraduttore.db_id_traduttore} = @${LinguaTraduttore.db_id_traduttore})`,
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
                                        resolve(this.convertToArray(result.recordset));
                                    }
                                });
                            }
                        });
            });
        });
    }

    static async getMenusToTranslateByRestaurantId(id_ristorante: number, id_traduttore: number) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        const results = [];
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(Menu.db_id_ristorante, id_ristorante)
                    .input(LinguaTraduttore.db_id_traduttore, id_traduttore)
                    .query(`
                        SELECT ${Ristorante.db_table_name}.${Ristorante.db_nome} AS NomeRistorante, ${Ristorante.db_table_name}.${Ristorante.db_indirizzo}, ${Ristorante.db_table_name}.${Ristorante.db_civico}, ${Citta.db_table_name}.${Citta.db_nome} AS Citta, ${Provincia.db_table_name}.${Provincia.db_sigla}, ${Menu.db_table_name}.${Menu.db_id}, T3.${MenuLingua.db_id_lingua}, ${Lingua.db_table_name}.${Lingua.db_cod_lingua}
                        FROM ${Menu.db_table_name}
                        INNER JOIN ${Ristorante.db_table_name} ON ${Ristorante.db_table_name}.${Ristorante.db_id} = ${Menu.db_table_name}.${Menu.db_id_ristorante}
                        INNER JOIN ${Citta.db_table_name} ON ${Citta.db_table_name}.${Citta.db_id} = ${Ristorante.db_table_name}.${Ristorante.db_id_citta}
                        INNER JOIN ${Provincia.db_table_name} ON ${Provincia.db_table_name}.${Provincia.db_id} = ${Citta.db_table_name}.${Citta.db_id_provincia}
                        INNER JOIN (
                            SELECT menu_lingue.IdMenu, menu_lingue.IdLingua FROM (SELECT * FROM(SELECT ${Menu.db_table_name}.${Menu.db_id} as IdMenu, ${Menu.db_id_titolo} as IdStringa FROM ${Menu.db_table_name}
                            INNER JOIN ${Stringa.db_table_name} ON ${Menu.db_table_name}.${Menu.db_id_titolo} = ${Stringa.db_table_name}.${Stringa.db_id}
                            UNION
                            SELECT ${Menu.db_table_name}.${Menu.db_id}, ${Menu.db_id_sottotitolo} as IdStringa FROM ${Menu.db_table_name}
                            INNER JOIN ${Stringa.db_table_name} ON ${Menu.db_table_name}.${Menu.db_id_sottotitolo} = ${Stringa.db_table_name}.${Stringa.db_id}
                            UNION
                            SELECT ${Menu.db_table_name}.${Menu.db_id}, ${Sezione.db_table_name}.${Sezione.db_id_titolo} as IdStringa FROM ${Menu.db_table_name}
                            INNER JOIN ${Sezione.db_table_name} ON ${Sezione.db_table_name}.${Sezione.db_id_menu} = ${Menu.db_table_name}.${Menu.db_id}
                            INNER JOIN ${Stringa.db_table_name} ON ${Sezione.db_table_name}.${Sezione.db_id_titolo} = ${Stringa.db_table_name}.${Stringa.db_id}
                            UNION
                            SELECT ${Menu.db_table_name}.${Menu.db_id}, ${Sezione.db_table_name}.${Sezione.db_id_sottotitolo} as IdStringa FROM ${Menu.db_table_name}
                            INNER JOIN ${Sezione.db_table_name} ON ${Sezione.db_table_name}.${Sezione.db_id_menu} = ${Menu.db_table_name}.${Menu.db_id}
                            INNER JOIN ${Stringa.db_table_name} ON ${Sezione.db_table_name}.${Sezione.db_id_sottotitolo} = ${Stringa.db_table_name}.${Stringa.db_id}
                            UNION
                            SELECT ${Menu.db_table_name}.${Menu.db_id},${Piatto.db_table_name}.${Piatto.db_id_titolo} as IdStringa FROM ${Menu.db_table_name}
                            INNER JOIN ${Sezione.db_table_name} ON ${Sezione.db_table_name}.${Sezione.db_id_menu} = ${Menu.db_table_name}.${Menu.db_id}
                            INNER JOIN ${Piatto.db_table_name} ON ${Piatto.db_table_name}.${Piatto.db_id_sezione} = ${Sezione.db_table_name}.${Sezione.db_id}
                            INNER JOIN ${Stringa.db_table_name} ON ${Piatto.db_table_name}.${Piatto.db_id_titolo} = ${Stringa.db_table_name}.${Stringa.db_id}
                            UNION
                            SELECT ${Menu.db_table_name}.${Menu.db_id}, ${Piatto.db_table_name}.${Piatto.db_id_descrizione} as IdStringa FROM ${Menu.db_table_name}
                            INNER JOIN ${Sezione.db_table_name} ON ${Sezione.db_table_name}.${Sezione.db_id_menu} = ${Menu.db_table_name}.${Menu.db_id}
                            INNER JOIN ${Piatto.db_table_name} ON ${Piatto.db_table_name}.${Piatto.db_id_sezione} = ${Sezione.db_table_name}.${Sezione.db_id}
                            INNER JOIN ${Stringa.db_table_name} ON ${Piatto.db_table_name}.${Piatto.db_id_descrizione} = ${Stringa.db_table_name}.${Stringa.db_id}) AS T1
                            WHERE T1.IdMenu IN (SELECT ${Menu.db_table_name}.${Menu.db_id} FROM ${Menu.db_table_name} 
                            INNER JOIN ${MenuLingua.db_table_name} ON ${Menu.db_table_name}.${Menu.db_id} = ${MenuLingua.db_table_name}.${MenuLingua.db_id_menu} 
                            INNER JOIN ${LinguaTraduttore.db_table_name} ON ${LinguaTraduttore.db_table_name}.${LinguaTraduttore.db_id_lingua} = ${MenuLingua.db_table_name}.${MenuLingua.db_id_lingua}
                            INNER JOIN ${Lingua.db_table_name} ON ${LinguaTraduttore.db_table_name}.${LinguaTraduttore.db_id_lingua} = ${Lingua.db_table_name}.${Lingua.db_id}
                            WHERE ${LinguaTraduttore.db_table_name}.${LinguaTraduttore.db_id_traduttore} = @${LinguaTraduttore.db_id_traduttore} AND ${Menu.db_table_name}.${Menu.db_id_ristorante} = @${Menu.db_id_ristorante})
                            ) AS IdStringheMenu
                            LEFT JOIN ${StringaTradotta.db_table_name} ON ${StringaTradotta.db_table_name}.${StringaTradotta.db_id_stringa} = IdStringheMenu.IdStringa
                            RIGHT JOIN menu_lingue ON menu_lingue.IdLingua = stringhe_tradotte.IdLingua
                            WHERE ${StringaTradotta.db_table_name}.${StringaTradotta.db_id} IS NULL
                        ) AS T3 ON T3.IdMenu = ${Menu.db_table_name}.${Menu.db_id}
                        INNER JOIN lingue ON lingue.Id = T3.IdLingua
                        WHERE T3.${MenuLingua.db_id_lingua} IN (SELECT ${LinguaTraduttore.db_id_lingua} FROM ${LinguaTraduttore.db_table_name} WHERE ${LinguaTraduttore.db_id_traduttore} = @${LinguaTraduttore.db_id_traduttore})`,
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
                                        resolve(this.convertToArray(result.recordset));
                                    }
                                });
                            }
                        });
            });
        });
    }


    static async setStringsToTranslate(id_menu: number, id_lingua: number, id_traduttore: number) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(Menu.db_id, id_menu)
                    .input(MenuLingua.db_id_lingua, id_lingua)
                    .query(`SELECT T1.IdStringa, menu_lingue.IdLingua FROM(SELECT menu.Id as IdMenu, IdTitolo as IdStringa FROM menu
                        INNER JOIN stringhe ON menu.IdTitolo = stringhe.Id
                        WHERE menu.Id = @${Menu.db_id}
                        UNION
                        SELECT menu.Id, IdSottotitolo as IdStringa FROM menu
                        INNER JOIN stringhe ON menu.IdSottotitolo = stringhe.Id
                        WHERE menu.Id = @${Menu.db_id}
                        UNION
                        SELECT menu.Id, sezioni.IdTitolo as IdStringa FROM menu
                        INNER JOIN sezioni ON sezioni.IdMenu = menu.Id
                        INNER JOIN stringhe ON sezioni.IdTitolo = stringhe.Id
                        WHERE menu.Id = @${Menu.db_id}
                        UNION
                        SELECT menu.Id, sezioni.IdSottotitolo as IdStringa FROM menu
                        INNER JOIN sezioni ON sezioni.IdMenu = menu.Id
                        INNER JOIN stringhe ON sezioni.IdSottotitolo = stringhe.Id
                        WHERE menu.Id = @${Menu.db_id}
                        UNION
                        SELECT menu.Id,piatti.IdTitolo as IdStringa FROM menu
                        INNER JOIN sezioni ON sezioni.IdMenu = menu.Id
                        INNER JOIN piatti ON piatti.IdSezione = sezioni.Id
                        INNER JOIN stringhe ON piatti.IdTitolo = stringhe.Id
                        WHERE menu.Id = @${Menu.db_id}
                        UNION
                        SELECT menu.Id, piatti.IdDescrizione as IdStringa FROM menu
                        INNER JOIN sezioni ON sezioni.IdMenu = menu.Id
                        INNER JOIN piatti ON piatti.IdSezione = sezioni.Id
                        INNER JOIN stringhe ON piatti.IdDescrizione = stringhe.Id
                        WHERE menu.Id = @${Menu.db_id}) AS T1
                        INNER JOIN menu_lingue ON menu_lingue.IdMenu = T1.IdMenu AND menu_lingue.IdLingua = @${MenuLingua.db_id_lingua}
                        WHERE T1.IdStringa NOT IN(
                            SELECT IdStringa FROM stringhe_tradotte WHERE IdLingua = @${MenuLingua.db_id_lingua}
                        )`,
                        (err: any, result: any) => {
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                let params: string = ""
                                for (let i = 0; i < result.recordset.length; i++) {
                                    params += `(${result.recordset[i]["IdStringa"]}, ${result.recordset[i]["IdLingua"]}, ${id_traduttore}, ${StatoTraduzione.IN_CORSO}, '')` + (i !== result.recordset.length - 1 ? "," : "")
                                }

                                transaction.request()
                                    .query(
                                        `INSERT INTO ${Traduzione.db_table_name} (
                                        ${Traduzione.db_id_stringa},
                                        ${Traduzione.db_id_lingua},
                                        ${Traduzione.db_id_traduttore},
                                        ${Traduzione.db_stato},
                                        ${Traduzione.db_testo}
                                    ) VALUES ` + params, (err2: any, result2: any) => {
                                        if (err2) {
                                            transaction.rollback();
                                            reject(err2);
                                        }
                                        else {
                                            transaction.commit((err: any) => {
                                                if (!err) {
                                                    resolve(true);
                                                }
                                            });
                                        }
                                    }
                                    )

                            }
                        });
            });
        });
    }

    static async insert(menu: CustomMenu) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>(async (resolve, reject) => {
            try {
                await transaction.begin();

                const id_stringa_menu_titolo: Stringa = (await transaction.request().input(Stringa.db_testo, menu.title)
                    .query(`INSERT INTO ${Stringa.db_table_name} (${Stringa.db_testo}) VALUES (@${Stringa.db_testo});
                        SELECT * FROM ${Stringa.db_table_name} where ${Stringa.db_id} = (SELECT SCOPE_IDENTITY());`)).recordset[0][Stringa.db_id];
                console.log(id_stringa_menu_titolo)

                const id_stringa_sottotitolo_menu: Stringa = (await transaction.request().input(Stringa.db_testo, menu.subtitle)
                    .query(`INSERT INTO ${Stringa.db_table_name} (${Stringa.db_testo}) VALUES (@${Stringa.db_testo});
                            SELECT * FROM ${Stringa.db_table_name} where ${Stringa.db_id} = (SELECT SCOPE_IDENTITY());`)).recordset[0][Stringa.db_id];
                console.log(id_stringa_sottotitolo_menu)

                const id_menu: Menu = (await transaction.request()
                    .input(Menu.db_id_titolo, id_stringa_menu_titolo)
                    .input(Menu.db_id_sottotitolo, id_stringa_sottotitolo_menu)
                    .input(Menu.db_pubblico, 0)
                    .input(Menu.db_creato_il,sql.DateTimeOffset, new Date())
                    .input(Menu.db_modificato_il,sql.DateTimeOffset, new Date())
                    .input(Menu.db_id_ristorante, menu.restaurant.id)
                    .query(`INSERT INTO ${Menu.db_table_name} (
                                    ${Menu.db_id_titolo},
                                    ${Menu.db_id_sottotitolo},
                                    ${Menu.db_pubblico},
                                    ${Menu.db_creato_il},
                                    ${Menu.db_modificato_il},
                                    ${Menu.db_id_ristorante}
                                ) VALUES (
                                    @${Menu.db_id_titolo},
                                    @${Menu.db_id_sottotitolo},
                                    @${Menu.db_pubblico},
                                    @${Menu.db_creato_il},
                                    @${Menu.db_modificato_il},
                                    @${Menu.db_id_ristorante}
                                );
                                    SELECT * FROM ${Menu.db_table_name} where ${Menu.db_id} = (SELECT SCOPE_IDENTITY());`)).recordset[0][Menu.db_id];
                console.log(id_menu)

                for (let i = 0; i < menu.languages.length; i++) {
                    await transaction.request().input(MenuLingua.db_id_lingua, menu.languages[i].id)
                        .input(MenuLingua.db_id_menu, id_menu)
                        .query(`INSERT INTO ${MenuLingua.db_table_name} (${MenuLingua.db_id_lingua}, ${MenuLingua.db_id_menu}) VALUES (@${MenuLingua.db_id_lingua}, @${MenuLingua.db_id_menu});`);
                }

                let id_stringa_sezione_titolo: Stringa;
                let id_stringa_sezione_sottotitolo: Stringa;
                for (let i = 0; i < menu.sections.length; i++) {

                    id_stringa_sezione_titolo = (await transaction.request().input(Stringa.db_testo, menu.sections[i].name)
                        .query(`INSERT INTO ${Stringa.db_table_name} (${Stringa.db_testo}) VALUES (@${Stringa.db_testo});
                        SELECT * FROM ${Stringa.db_table_name} where ${Stringa.db_id} = (SELECT SCOPE_IDENTITY());`)).recordset[0][Stringa.db_id];
                    console.log(id_stringa_sezione_titolo)

                    id_stringa_sezione_sottotitolo = (await transaction.request().input(Stringa.db_testo, menu.sections[i].subtitle)
                        .query(`INSERT INTO ${Stringa.db_table_name} (${Stringa.db_testo}) VALUES (@${Stringa.db_testo});
                        SELECT * FROM ${Stringa.db_table_name} where ${Stringa.db_id} = (SELECT SCOPE_IDENTITY());`)).recordset[0][Stringa.db_id];
                    console.log(id_stringa_sezione_sottotitolo)

                    let id_sezione: Sezione = (await transaction.request()
                        .input(Sezione.db_id_menu, id_menu)
                        .input(Sezione.db_id_titolo, id_stringa_sezione_titolo)
                        .input(Sezione.db_id_sottotitolo, id_stringa_sezione_sottotitolo)
                        .input(Sezione.db_ordinamento, 0)
                        .query(`INSERT INTO ${Sezione.db_table_name} (
                                    ${Sezione.db_id_menu},
                                    ${Sezione.db_id_titolo},
                                    ${Sezione.db_id_sottotitolo},
                                    ${Sezione.db_ordinamento}
                                ) VALUES (
                                    @${Sezione.db_id_menu},
                                    @${Sezione.db_id_titolo},
                                    @${Sezione.db_id_sottotitolo},
                                    @${Sezione.db_ordinamento}
                                );
                                    SELECT * FROM ${Sezione.db_table_name} where ${Sezione.db_id} = (SELECT SCOPE_IDENTITY());`)).recordset[0][Sezione.db_id];
                    console.log(id_sezione)
                    let id_stringa_piatto_titolo: Stringa;
                    let id_stringa_piatto_descrizione: Stringa;
                    for (let j = 0; j < menu.sections[i].dishes.length; j++) {
                        id_stringa_piatto_titolo = (await transaction.request().input(Stringa.db_testo, menu.sections[i].dishes[j].name)
                            .query(`INSERT INTO ${Stringa.db_table_name} (${Stringa.db_testo}) VALUES (@${Stringa.db_testo});
                        SELECT * FROM ${Stringa.db_table_name} where ${Stringa.db_id} = (SELECT SCOPE_IDENTITY());`)).recordset[0][Stringa.db_id];
                        console.log(id_stringa_piatto_titolo)

                        id_stringa_piatto_descrizione = (await transaction.request().input(Stringa.db_testo, menu.sections[i].dishes[j].description)
                            .query(`INSERT INTO ${Stringa.db_table_name} (${Stringa.db_testo}) VALUES (@${Stringa.db_testo});
                            SELECT * FROM ${Stringa.db_table_name} where ${Stringa.db_id} = (SELECT SCOPE_IDENTITY());`)).recordset[0][Stringa.db_id];
                        console.log(id_stringa_piatto_descrizione)

                        await transaction.request()
                            .input(Piatto.db_id_descrizione, id_stringa_piatto_descrizione)
                            .input(Piatto.db_id_sezione, id_sezione)
                            .input(Piatto.db_id_titolo, id_stringa_piatto_titolo)
                            .input(Piatto.db_ordinamento, 0)
                            .input(Piatto.db_prezzo, menu.sections[i].dishes[j].price)
                            .query(`INSERT INTO ${Piatto.db_table_name} (
                                        ${Piatto.db_id_descrizione},
                                        ${Piatto.db_id_sezione},
                                        ${Piatto.db_id_titolo},
                                        ${Piatto.db_ordinamento},
                                        ${Piatto.db_prezzo}
                                    ) VALUES (
                                        @${Piatto.db_id_descrizione},
                                        @${Piatto.db_id_sezione},
                                        @${Piatto.db_id_titolo},
                                        @${Piatto.db_ordinamento},
                                        @${Piatto.db_prezzo}
                                    );
                                        SELECT * FROM ${Piatto.db_table_name} where ${Piatto.db_id} = (SELECT SCOPE_IDENTITY());`);
                    }
                }

                await transaction.commit();
                resolve(true)
            } catch (err) {
                console.log(err);
                await transaction.rollback();
                reject(err);
            }

        });
    }

    static async getMenusByRestaurateurId(id_restaurateur: number) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>(async (resolve, reject) => {
            try {
                await transaction.begin();

                const menus: CustomMenu[] = [];

                const menusFromDb: any[] = (await transaction.request()
                    .input(Ristorante.db_id_ristoratore, id_restaurateur)
                    .query(`SELECT ${Menu.db_table_name}.*, t.Testo as titolo, s.Testo as sottotitolo FROM ${Menu.db_table_name}
                    INNER JOIN ${Ristorante.db_table_name} ON ${Ristorante.db_table_name}.${Ristorante.db_id} = ${Menu.db_table_name}.${Menu.db_id_ristorante}
                    INNER JOIN ${Stringa.db_table_name} AS t ON ${Menu.db_id_titolo} = t.${Stringa.db_id}
                    INNER JOIN ${Stringa.db_table_name} AS s ON ${Menu.db_id_sottotitolo} = s.${Stringa.db_id}
                    WHERE ${Ristorante.db_id_ristoratore} = @${Ristorante.db_id_ristoratore};`)).recordset;

                console.log("MENU FROM DB", menusFromDb);

                for (let i = 0; i < menusFromDb.length; i++) {

                    let sections: Section[] = []

                    let sectionsFromDb = (await transaction.request()
                        .input(Sezione.db_id_menu, menusFromDb[i][Menu.db_id])
                        .query(`SELECT ${Sezione.db_table_name}.*, titolo.Testo as titolo, sottotitolo.Testo as sottotitolo FROM ${Sezione.db_table_name}
                            INNER JOIN ${Stringa.db_table_name} AS titolo ON ${Sezione.db_id_titolo} = titolo.${Stringa.db_id}
                            INNER JOIN ${Stringa.db_table_name} AS sottotitolo ON ${Sezione.db_id_sottotitolo} = sottotitolo.${Stringa.db_id}
                            WHERE ${Sezione.db_id_menu} = @${Sezione.db_id_menu};`)).recordset

                    console.log(sectionsFromDb)

                    for (let j = 0; j < sectionsFromDb.length; j++) {
                        let dishes: Dish[] = [];
                        let dishesFromDb: any[] = (await transaction.request()
                            .input(Piatto.db_id_sezione, sectionsFromDb[j][Sezione.db_id])
                            .query(`SELECT ${Piatto.db_table_name}.*, titolo.Testo as titolo, descrizione.Testo as descrizione FROM ${Piatto.db_table_name}
                                INNER JOIN ${Stringa.db_table_name} AS titolo ON ${Piatto.db_id_titolo} = titolo.${Stringa.db_id}
                                INNER JOIN ${Stringa.db_table_name} AS descrizione ON ${Piatto.db_id_descrizione} = descrizione.${Stringa.db_id}
                                WHERE ${Piatto.db_id_sezione} = @${Piatto.db_id_sezione}`)).recordset

                        for (let k = 0; k < dishesFromDb.length; k++) {
                            dishes.push({
                                id: dishesFromDb[k][Piatto.db_id],
                                description: dishesFromDb[k]["descrizione"],
                                name: dishesFromDb[k]["titolo"],
                                price: dishesFromDb[k][Piatto.db_prezzo]
                            })
                        }

                        sections.push({
                            id: sectionsFromDb[j][Sezione.db_id],
                            dishes: dishes,
                            name: sectionsFromDb[j]["titolo"],
                            subtitle: sectionsFromDb[j]["sottotitolo"]
                        })
                    }

                    console.log(sections);

                    let languages: Language[] = [];

                    let languagesFromDb: any[] = (await transaction.request()
                        .input(MenuLingua.db_id_menu, menusFromDb[i][Menu.db_id])
                        .query(`SELECT ${Lingua.db_table_name}.* FROM ${MenuLingua.db_table_name}
                            INNER JOIN ${Lingua.db_table_name} ON ${Lingua.db_table_name}.${Lingua.db_id} = ${MenuLingua.db_table_name}.${MenuLingua.db_id_lingua}
                            WHERE ${MenuLingua.db_id_menu} = @${MenuLingua.db_id_menu};`)).recordset

                    for (let j = 0; j < languagesFromDb.length; j++) {
                        languages.push({
                            id: languagesFromDb[j][Lingua.db_id],
                            name: languagesFromDb[j][Lingua.db_nome],
                            sign: languagesFromDb[j][Lingua.db_cod_lingua]
                        })
                    }

                    console.log(languages);

                    let restaurant = (await transaction.request()
                        .input(Ristorante.db_id, menusFromDb[i][Menu.db_id_ristorante])
                        .query(`SELECT ${Ristorante.db_table_name}.*, ${Citta.db_table_name}.${Citta.db_nome} as Citta, ${Provincia.db_table_name}.${Provincia.db_nome} as Provincia FROM ${Ristorante.db_table_name}
                                INNER JOIN ${Citta.db_table_name} ON ${Citta.db_table_name}.${Citta.db_id} = ${Ristorante.db_table_name}.${Ristorante.db_id_citta}
                                INNER JOIN ${Provincia.db_table_name} ON ${Provincia.db_table_name}.${Provincia.db_id} = ${Citta.db_table_name}.${Citta.db_id_provincia}
                                WHERE ${Ristorante.db_table_name}.${Ristorante.db_id} = @${Ristorante.db_id};`)).recordset[0]

                    console.log(restaurant);

                    menus.push({
                        id: menusFromDb[i][Menu.db_id],
                        title: menusFromDb[i]["titolo"],
                        subtitle: menusFromDb[i]["sottotitolo"],
                        languages: languages,
                        sections: sections,
                        restaurant: {
                            id: restaurant[Ristorante.db_id],
                            civico: restaurant[Ristorante.db_civico],
                            id_citta: restaurant[Ristorante.db_id_citta],
                            id_provincia: restaurant[Ristorante.db_id_ristoratore],
                            id_ristoratore: restaurant[Ristorante.db_id_ristoratore],
                            indirizzo: restaurant[Ristorante.db_indirizzo],
                            nome: restaurant[Ristorante.db_nome],
                            citta: restaurant["Citta"],
                            provincia: restaurant["Provincia"]
                        }
                    })
                }

                await transaction.commit();
                resolve(menus)
            } catch (err) {
                console.log(err);
                await transaction.rollback();
                reject(err);
            }

        });
    }

    static async getMenusByProvinceId(id_provincia: number, cod_lingua: string){
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>(async (resolve, reject) => {
            try {
                await transaction.begin();

                const menus: CustomMenu[] = [];

                const lingua = Lingua.convertToLanguage((await transaction.request()
                    .input(Lingua.db_cod_lingua, cod_lingua)
                    .query(`SELECT * FROM ${Lingua.db_table_name} WHERE ${Lingua.db_cod_lingua} = @${Lingua.db_cod_lingua};`)).recordset[0]);
                
                if(lingua == null) throw new Error();

                const menusFromDb: any[] = (await transaction.request()
                    .input(Citta.db_id_provincia, id_provincia)
                    .input("id_lingua", lingua.id)
                    .query(`SELECT ${Menu.db_table_name}.*, ISNULL(titoloTradotto.testo, titolo.Testo) as titolo, ISNULL(sottotitoloTradotto.testo, sottotitolo.Testo) as sottotitolo FROM ${Menu.db_table_name}
                    INNER JOIN ${Ristorante.db_table_name} ON ${Ristorante.db_table_name}.${Ristorante.db_id} = ${Menu.db_table_name}.${Menu.db_id_ristorante}
                    INNER JOIN ${Stringa.db_table_name} AS titolo ON ${Menu.db_id_titolo} = titolo.${Stringa.db_id}
                    LEFT JOIN ${StringaTradotta.db_table_name} as titoloTradotto ON titolo.Id = titoloTradotto.IdStringa AND titoloTradotto.IdLingua = @id_lingua
                    INNER JOIN ${Stringa.db_table_name} AS sottotitolo ON ${Menu.db_id_sottotitolo} = sottotitolo.${Stringa.db_id}
                    LEFT JOIN ${StringaTradotta.db_table_name} as sottotitoloTradotto ON sottotitolo.Id = sottotitoloTradotto.IdStringa AND sottotitoloTradotto.IdLingua = @id_lingua
                    INNER JOIN ${Citta.db_table_name} ON ${Citta.db_table_name}.${Citta.db_id} = ${Ristorante.db_table_name}.${Ristorante.db_id_citta}
                    WHERE ${Citta.db_id_provincia} = @${Citta.db_id_provincia};`)).recordset;

                console.log("MENU FROM DB", menusFromDb);

                for (let i = 0; i < menusFromDb.length; i++) {

                    let sections: Section[] = []

                    let sectionsFromDb = (await transaction.request()
                        .input(Sezione.db_id_menu, menusFromDb[i][Menu.db_id])
                        .input("id_lingua", lingua.id)
                        .query(`SELECT ${Sezione.db_table_name}.*, ISNULL(titoloTradotto.testo, titolo.Testo) as titolo, ISNULL(sottotitoloTradotto.testo, sottotitolo.Testo) as sottotitolo FROM ${Sezione.db_table_name}
                            INNER JOIN ${Stringa.db_table_name} AS titolo ON ${Sezione.db_id_titolo} = titolo.${Stringa.db_id}
                            LEFT JOIN ${StringaTradotta.db_table_name} as titoloTradotto ON titolo.Id = titoloTradotto.IdStringa AND titoloTradotto.IdLingua = @id_lingua
                            INNER JOIN ${Stringa.db_table_name} AS sottotitolo ON ${Sezione.db_id_sottotitolo} = sottotitolo.${Stringa.db_id}
                            LEFT JOIN ${StringaTradotta.db_table_name} as sottotitoloTradotto ON sottotitolo.Id = sottotitoloTradotto.IdStringa AND sottotitoloTradotto.IdLingua = @id_lingua
                            WHERE ${Sezione.db_id_menu} = @${Sezione.db_id_menu};`)).recordset

                    console.log(sectionsFromDb)

                    for (let j = 0; j < sectionsFromDb.length; j++) {
                        let dishes: Dish[] = [];
                        let dishesFromDb: any[] = (await transaction.request()
                            .input(Piatto.db_id_sezione, sectionsFromDb[j][Sezione.db_id])
                            .input("id_lingua", lingua.id)
                            .query(`SELECT ${Piatto.db_table_name}.*, ISNULL(titoloTradotto.testo, titolo.Testo) as titolo, ISNULL(descrizioneTradotta.testo, descrizione.Testo) as descrizione FROM ${Piatto.db_table_name}
                                INNER JOIN ${Stringa.db_table_name} AS titolo ON ${Piatto.db_id_titolo} = titolo.${Stringa.db_id}
                                LEFT JOIN ${StringaTradotta.db_table_name} as titoloTradotto ON titolo.Id = titoloTradotto.IdStringa AND titoloTradotto.IdLingua = @id_lingua
                                INNER JOIN ${Stringa.db_table_name} AS descrizione ON ${Piatto.db_id_descrizione} = descrizione.${Stringa.db_id}
                                LEFT JOIN ${StringaTradotta.db_table_name} as descrizioneTradotta ON descrizione.Id = descrizioneTradotta.IdStringa AND descrizioneTradotta.IdLingua = @id_lingua
                                WHERE ${Piatto.db_id_sezione} = @${Piatto.db_id_sezione}`)).recordset

                        for (let k = 0; k < dishesFromDb.length; k++) {
                            dishes.push({
                                id: dishesFromDb[k][Piatto.db_id],
                                description: dishesFromDb[k]["descrizione"],
                                name: dishesFromDb[k]["titolo"],
                                price: dishesFromDb[k][Piatto.db_prezzo]
                            })
                        }

                        sections.push({
                            id: sectionsFromDb[j][Sezione.db_id],
                            dishes: dishes,
                            name: sectionsFromDb[j]["titolo"],
                            subtitle: sectionsFromDb[j]["sottotitolo"]
                        })
                    }

                    console.log(sections);

                    let languages: Language[] = [];

                    let languagesFromDb: any[] = (await transaction.request()
                        .input(MenuLingua.db_id_menu, menusFromDb[i][Menu.db_id])
                        .query(`SELECT ${Lingua.db_table_name}.* FROM ${MenuLingua.db_table_name}
                            INNER JOIN ${Lingua.db_table_name} ON ${Lingua.db_table_name}.${Lingua.db_id} = ${MenuLingua.db_table_name}.${MenuLingua.db_id_lingua}
                            WHERE ${MenuLingua.db_id_menu} = @${MenuLingua.db_id_menu};`)).recordset

                    for (let j = 0; j < languagesFromDb.length; j++) {
                        languages.push({
                            id: languagesFromDb[j][Lingua.db_id],
                            name: languagesFromDb[j][Lingua.db_nome],
                            sign: languagesFromDb[j][Lingua.db_cod_lingua]
                        })
                    }

                    console.log(languages);

                    let restaurant = (await transaction.request()
                        .input(Ristorante.db_id, menusFromDb[i][Menu.db_id_ristorante])
                        .query(`SELECT ${Ristorante.db_table_name}.*, ${Citta.db_table_name}.${Citta.db_nome} as Citta, ${Provincia.db_table_name}.${Provincia.db_nome} as Provincia FROM ${Ristorante.db_table_name}
                                INNER JOIN ${Citta.db_table_name} ON ${Citta.db_table_name}.${Citta.db_id} = ${Ristorante.db_table_name}.${Ristorante.db_id_citta}
                                INNER JOIN ${Provincia.db_table_name} ON ${Provincia.db_table_name}.${Provincia.db_id} = ${Citta.db_table_name}.${Citta.db_id_provincia}
                                WHERE ${Ristorante.db_table_name}.${Ristorante.db_id} = @${Ristorante.db_id};`)).recordset[0]

                    console.log(restaurant);

                    menus.push({
                        id: menusFromDb[i][Menu.db_id],
                        title: menusFromDb[i]["titolo"],
                        subtitle: menusFromDb[i]["sottotitolo"],
                        languages: languages,
                        sections: sections,
                        restaurant: {
                            id: restaurant[Ristorante.db_id],
                            civico: restaurant[Ristorante.db_civico],
                            id_citta: restaurant[Ristorante.db_id_citta],
                            id_provincia: restaurant[Ristorante.db_id_ristoratore],
                            id_ristoratore: restaurant[Ristorante.db_id_ristoratore],
                            indirizzo: restaurant[Ristorante.db_indirizzo],
                            nome: restaurant[Ristorante.db_nome],
                            citta: restaurant["Citta"],
                            provincia: restaurant["Provincia"]
                        }
                    })
                }

                await transaction.commit();
                resolve(menus)
            } catch (err) {
                console.log(err);
                await transaction.rollback();
                reject(err);
            }

        });
    }

    static async getMenusByCityId(id_citta: number, cod_lingua: string){
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>(async (resolve, reject) => {
            try {
                await transaction.begin();

                const menus: CustomMenu[] = [];

                const lingua = Lingua.convertToLanguage((await transaction.request()
                    .input(Lingua.db_cod_lingua, cod_lingua)
                    .query(`SELECT * FROM ${Lingua.db_table_name} WHERE ${Lingua.db_cod_lingua} = @${Lingua.db_cod_lingua};`)).recordset[0]);
                
                if(lingua == null) throw new Error();

                const menusFromDb: any[] = (await transaction.request()
                    .input(Ristorante.db_id_citta, id_citta)
                    .input("id_lingua", lingua.id)
                    .query(`SELECT ${Menu.db_table_name}.*, ISNULL(titoloTradotto.testo, titolo.Testo) as titolo, ISNULL(sottotitoloTradotto.testo, sottotitolo.Testo) as sottotitolo FROM ${Menu.db_table_name}
                    INNER JOIN ${Ristorante.db_table_name} ON ${Ristorante.db_table_name}.${Ristorante.db_id} = ${Menu.db_table_name}.${Menu.db_id_ristorante}
                    INNER JOIN ${Stringa.db_table_name} AS titolo ON ${Menu.db_id_titolo} = titolo.${Stringa.db_id}
                    LEFT JOIN ${StringaTradotta.db_table_name} as titoloTradotto ON titolo.Id = titoloTradotto.IdStringa AND titoloTradotto.IdLingua = @id_lingua
                    INNER JOIN ${Stringa.db_table_name} AS sottotitolo ON ${Menu.db_id_sottotitolo} = sottotitolo.${Stringa.db_id}
                    LEFT JOIN ${StringaTradotta.db_table_name} as sottotitoloTradotto ON sottotitolo.Id = sottotitoloTradotto.IdStringa AND sottotitoloTradotto.IdLingua = @id_lingua
                    WHERE ${Ristorante.db_id_citta} = @${Ristorante.db_id_citta};`)).recordset;

                console.log("MENU FROM DB", menusFromDb);

                for (let i = 0; i < menusFromDb.length; i++) {

                    let sections: Section[] = []

                    let sectionsFromDb = (await transaction.request()
                        .input(Sezione.db_id_menu, menusFromDb[i][Menu.db_id])
                        .input("id_lingua", lingua.id)
                        .query(`SELECT ${Sezione.db_table_name}.*, ISNULL(titoloTradotto.testo, titolo.Testo) as titolo, ISNULL(sottotitoloTradotto.testo, sottotitolo.Testo) as sottotitolo FROM ${Sezione.db_table_name}
                            INNER JOIN ${Stringa.db_table_name} AS titolo ON ${Sezione.db_id_titolo} = titolo.${Stringa.db_id}
                            LEFT JOIN ${StringaTradotta.db_table_name} as titoloTradotto ON titolo.Id = titoloTradotto.IdStringa AND titoloTradotto.IdLingua = @id_lingua
                            INNER JOIN ${Stringa.db_table_name} AS sottotitolo ON ${Sezione.db_id_sottotitolo} = sottotitolo.${Stringa.db_id}
                            LEFT JOIN ${StringaTradotta.db_table_name} as sottotitoloTradotto ON sottotitolo.Id = sottotitoloTradotto.IdStringa AND sottotitoloTradotto.IdLingua = @id_lingua
                            WHERE ${Sezione.db_id_menu} = @${Sezione.db_id_menu};`)).recordset

                    console.log(sectionsFromDb)

                    for (let j = 0; j < sectionsFromDb.length; j++) {
                        let dishes: Dish[] = [];
                        let dishesFromDb: any[] = (await transaction.request()
                            .input(Piatto.db_id_sezione, sectionsFromDb[j][Sezione.db_id])
                            .input("id_lingua", lingua.id)
                            .query(`SELECT ${Piatto.db_table_name}.*, ISNULL(titoloTradotto.testo, titolo.Testo) as titolo, ISNULL(descrizioneTradotta.testo, descrizione.Testo) as descrizione FROM ${Piatto.db_table_name}
                                INNER JOIN ${Stringa.db_table_name} AS titolo ON ${Piatto.db_id_titolo} = titolo.${Stringa.db_id}
                                LEFT JOIN ${StringaTradotta.db_table_name} as titoloTradotto ON titolo.Id = titoloTradotto.IdStringa AND titoloTradotto.IdLingua = @id_lingua
                                INNER JOIN ${Stringa.db_table_name} AS descrizione ON ${Piatto.db_id_descrizione} = descrizione.${Stringa.db_id}
                                LEFT JOIN ${StringaTradotta.db_table_name} as descrizioneTradotta ON descrizione.Id = descrizioneTradotta.IdStringa AND descrizioneTradotta.IdLingua = @id_lingua
                                WHERE ${Piatto.db_id_sezione} = @${Piatto.db_id_sezione}`)).recordset

                        for (let k = 0; k < dishesFromDb.length; k++) {
                            dishes.push({
                                id: dishesFromDb[k][Piatto.db_id],
                                description: dishesFromDb[k]["descrizione"],
                                name: dishesFromDb[k]["titolo"],
                                price: dishesFromDb[k][Piatto.db_prezzo]
                            })
                        }

                        sections.push({
                            id: sectionsFromDb[j][Sezione.db_id],
                            dishes: dishes,
                            name: sectionsFromDb[j]["titolo"],
                            subtitle: sectionsFromDb[j]["sottotitolo"]
                        })
                    }

                    console.log(sections);

                    let languages: Language[] = [];

                    let languagesFromDb: any[] = (await transaction.request()
                        .input(MenuLingua.db_id_menu, menusFromDb[i][Menu.db_id])
                        .query(`SELECT ${Lingua.db_table_name}.* FROM ${MenuLingua.db_table_name}
                            INNER JOIN ${Lingua.db_table_name} ON ${Lingua.db_table_name}.${Lingua.db_id} = ${MenuLingua.db_table_name}.${MenuLingua.db_id_lingua}
                            WHERE ${MenuLingua.db_id_menu} = @${MenuLingua.db_id_menu};`)).recordset

                    for (let j = 0; j < languagesFromDb.length; j++) {
                        languages.push({
                            id: languagesFromDb[j][Lingua.db_id],
                            name: languagesFromDb[j][Lingua.db_nome],
                            sign: languagesFromDb[j][Lingua.db_cod_lingua]
                        })
                    }

                    console.log(languages);

                    let restaurant = (await transaction.request()
                        .input(Ristorante.db_id, menusFromDb[i][Menu.db_id_ristorante])
                        .query(`SELECT ${Ristorante.db_table_name}.*, ${Citta.db_table_name}.${Citta.db_nome} as Citta, ${Provincia.db_table_name}.${Provincia.db_nome} as Provincia FROM ${Ristorante.db_table_name}
                                INNER JOIN ${Citta.db_table_name} ON ${Citta.db_table_name}.${Citta.db_id} = ${Ristorante.db_table_name}.${Ristorante.db_id_citta}
                                INNER JOIN ${Provincia.db_table_name} ON ${Provincia.db_table_name}.${Provincia.db_id} = ${Citta.db_table_name}.${Citta.db_id_provincia}
                                WHERE ${Ristorante.db_table_name}.${Ristorante.db_id} = @${Ristorante.db_id};`)).recordset[0]

                    console.log(restaurant);

                    menus.push({
                        id: menusFromDb[i][Menu.db_id],
                        title: menusFromDb[i]["titolo"],
                        subtitle: menusFromDb[i]["sottotitolo"],
                        languages: languages,
                        sections: sections,
                        restaurant: {
                            id: restaurant[Ristorante.db_id],
                            civico: restaurant[Ristorante.db_civico],
                            id_citta: restaurant[Ristorante.db_id_citta],
                            id_provincia: restaurant[Ristorante.db_id_ristoratore],
                            id_ristoratore: restaurant[Ristorante.db_id_ristoratore],
                            indirizzo: restaurant[Ristorante.db_indirizzo],
                            nome: restaurant[Ristorante.db_nome],
                            citta: restaurant["Citta"],
                            provincia: restaurant["Provincia"]
                        }
                    })
                }

                await transaction.commit();
                resolve(menus)
            } catch (err) {
                console.log(err);
                await transaction.rollback();
                reject(err);
            }

        });
    }

    static async getMenusByRestaurantId(id_ristorante: number, cod_lingua: string){
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>(async (resolve, reject) => {
            try {
                await transaction.begin();

                const menus: CustomMenu[] = [];

                const lingua = Lingua.convertToLanguage((await transaction.request()
                    .input(Lingua.db_cod_lingua, cod_lingua)
                    .query(`SELECT * FROM ${Lingua.db_table_name} WHERE ${Lingua.db_cod_lingua} = @${Lingua.db_cod_lingua};`)).recordset[0]);
                
                if(lingua == null) throw new Error();

                const menusFromDb: any[] = (await transaction.request()
                    .input(Menu.db_id_ristorante, id_ristorante)
                    .input("id_lingua", lingua.id)
                    .query(`SELECT ${Menu.db_table_name}.*, ISNULL(titoloTradotto.testo, titolo.Testo) as titolo, ISNULL(sottotitoloTradotto.testo, sottotitolo.Testo) as sottotitolo FROM ${Menu.db_table_name}
                    INNER JOIN ${Stringa.db_table_name} AS titolo ON ${Menu.db_id_titolo} = titolo.${Stringa.db_id}
                    LEFT JOIN ${StringaTradotta.db_table_name} as titoloTradotto ON titolo.Id = titoloTradotto.IdStringa AND titoloTradotto.IdLingua = @id_lingua
                    INNER JOIN ${Stringa.db_table_name} AS sottotitolo ON ${Menu.db_id_sottotitolo} = sottotitolo.${Stringa.db_id}
                    LEFT JOIN ${StringaTradotta.db_table_name} as sottotitoloTradotto ON sottotitolo.Id = sottotitoloTradotto.IdStringa AND sottotitoloTradotto.IdLingua = @id_lingua
                    WHERE ${Menu.db_id_ristorante} = @${Menu.db_id_ristorante};`)).recordset;

                console.log("MENU FROM DB", menusFromDb);

                for (let i = 0; i < menusFromDb.length; i++) {

                    let sections: Section[] = []

                    let sectionsFromDb = (await transaction.request()
                        .input(Sezione.db_id_menu, menusFromDb[i][Menu.db_id])
                        .input("id_lingua", lingua.id)
                        .query(`SELECT ${Sezione.db_table_name}.*, ISNULL(titoloTradotto.testo, titolo.Testo) as titolo, ISNULL(sottotitoloTradotto.testo, sottotitolo.Testo) as sottotitolo FROM ${Sezione.db_table_name}
                            INNER JOIN ${Stringa.db_table_name} AS titolo ON ${Sezione.db_id_titolo} = titolo.${Stringa.db_id}
                            LEFT JOIN ${StringaTradotta.db_table_name} as titoloTradotto ON titolo.Id = titoloTradotto.IdStringa AND titoloTradotto.IdLingua = @id_lingua
                            INNER JOIN ${Stringa.db_table_name} AS sottotitolo ON ${Sezione.db_id_sottotitolo} = sottotitolo.${Stringa.db_id}
                            LEFT JOIN ${StringaTradotta.db_table_name} as sottotitoloTradotto ON sottotitolo.Id = sottotitoloTradotto.IdStringa AND sottotitoloTradotto.IdLingua = @id_lingua
                            WHERE ${Sezione.db_id_menu} = @${Sezione.db_id_menu};`)).recordset

                    console.log(sectionsFromDb)

                    for (let j = 0; j < sectionsFromDb.length; j++) {
                        let dishes: Dish[] = [];
                        let dishesFromDb: any[] = (await transaction.request()
                            .input(Piatto.db_id_sezione, sectionsFromDb[j][Sezione.db_id])
                            .input("id_lingua", lingua.id)
                            .query(`SELECT ${Piatto.db_table_name}.*, ISNULL(titoloTradotto.testo, titolo.Testo) as titolo, ISNULL(descrizioneTradotta.testo, descrizione.Testo) as descrizione FROM ${Piatto.db_table_name}
                                INNER JOIN ${Stringa.db_table_name} AS titolo ON ${Piatto.db_id_titolo} = titolo.${Stringa.db_id}
                                LEFT JOIN ${StringaTradotta.db_table_name} as titoloTradotto ON titolo.Id = titoloTradotto.IdStringa AND titoloTradotto.IdLingua = @id_lingua
                                INNER JOIN ${Stringa.db_table_name} AS descrizione ON ${Piatto.db_id_descrizione} = descrizione.${Stringa.db_id}
                                LEFT JOIN ${StringaTradotta.db_table_name} as descrizioneTradotta ON descrizione.Id = descrizioneTradotta.IdStringa AND descrizioneTradotta.IdLingua = @id_lingua
                                WHERE ${Piatto.db_id_sezione} = @${Piatto.db_id_sezione}`)).recordset

                        for (let k = 0; k < dishesFromDb.length; k++) {
                            dishes.push({
                                id: dishesFromDb[k][Piatto.db_id],
                                description: dishesFromDb[k]["descrizione"],
                                name: dishesFromDb[k]["titolo"],
                                price: dishesFromDb[k][Piatto.db_prezzo]
                            })
                        }

                        sections.push({
                            id: sectionsFromDb[j][Sezione.db_id],
                            dishes: dishes,
                            name: sectionsFromDb[j]["titolo"],
                            subtitle: sectionsFromDb[j]["sottotitolo"]
                        })
                    }

                    console.log(sections);

                    let languages: Language[] = [];

                    let languagesFromDb: any[] = (await transaction.request()
                        .input(MenuLingua.db_id_menu, menusFromDb[i][Menu.db_id])
                        .query(`SELECT ${Lingua.db_table_name}.* FROM ${MenuLingua.db_table_name}
                            INNER JOIN ${Lingua.db_table_name} ON ${Lingua.db_table_name}.${Lingua.db_id} = ${MenuLingua.db_table_name}.${MenuLingua.db_id_lingua}
                            WHERE ${MenuLingua.db_id_menu} = @${MenuLingua.db_id_menu};`)).recordset

                    for (let j = 0; j < languagesFromDb.length; j++) {
                        languages.push({
                            id: languagesFromDb[j][Lingua.db_id],
                            name: languagesFromDb[j][Lingua.db_nome],
                            sign: languagesFromDb[j][Lingua.db_cod_lingua]
                        })
                    }

                    console.log(languages);

                    let restaurant = (await transaction.request()
                        .input(Ristorante.db_id, menusFromDb[i][Menu.db_id_ristorante])
                        .query(`SELECT ${Ristorante.db_table_name}.*, ${Citta.db_table_name}.${Citta.db_nome} as Citta, ${Provincia.db_table_name}.${Provincia.db_nome} as Provincia FROM ${Ristorante.db_table_name}
                                INNER JOIN ${Citta.db_table_name} ON ${Citta.db_table_name}.${Citta.db_id} = ${Ristorante.db_table_name}.${Ristorante.db_id_citta}
                                INNER JOIN ${Provincia.db_table_name} ON ${Provincia.db_table_name}.${Provincia.db_id} = ${Citta.db_table_name}.${Citta.db_id_provincia}
                                WHERE ${Ristorante.db_table_name}.${Ristorante.db_id} = @${Ristorante.db_id};`)).recordset[0]

                    console.log(restaurant);

                    menus.push({
                        id: menusFromDb[i][Menu.db_id],
                        title: menusFromDb[i]["titolo"],
                        subtitle: menusFromDb[i]["sottotitolo"],
                        languages: languages,
                        sections: sections,
                        restaurant: {
                            id: restaurant[Ristorante.db_id],
                            civico: restaurant[Ristorante.db_civico],
                            id_citta: restaurant[Ristorante.db_id_citta],
                            id_provincia: restaurant[Ristorante.db_id_ristoratore],
                            id_ristoratore: restaurant[Ristorante.db_id_ristoratore],
                            indirizzo: restaurant[Ristorante.db_indirizzo],
                            nome: restaurant[Ristorante.db_nome],
                            citta: restaurant["Citta"],
                            provincia: restaurant["Provincia"]
                        }
                    })
                }

                await transaction.commit();
                resolve(menus)
            } catch (err) {
                console.log(err);
                await transaction.rollback();
                reject(err);
            }

        });
    }

}