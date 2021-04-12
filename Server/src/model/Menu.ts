import { config, sql } from "../database/DbConfig";
import { Citta } from "./Citta";
import { CustomMenuDaTradurre } from "./custom/CustomMenuDaTradurre";
import { StatoTraduzione } from "./custom/StatoTraduzione";
import { Lingua } from "./Lingua";
import { LinguaTraduttore } from "./LinguaTraduttore";
import { MenuLingua } from "./MenuLingua";
import { Piatto } from "./Piatto";
import { Provincia } from "./Provincia";
import { Ristorante } from "./Ristorante";
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
                        SELECT ${Ristorante.db_table_name}.${Ristorante.db_nome} AS NomeRistorante, ${Ristorante.db_table_name}.${Ristorante.db_indirizzo}, ${Ristorante.db_table_name}.${Ristorante.db_civico}, ${Citta.db_table_name}.${Citta.db_nome} AS Citta, ${Provincia.db_table_name}.${Provincia.db_sigla}, ${Menu.db_table_name}.${Menu.db_id}, ${MenuLingua.db_table_name}.${MenuLingua.db_id_lingua}, ${Lingua.db_table_name}.${Lingua.db_cod_lingua}
                        FROM ${Menu.db_table_name}
                        INNER JOIN ${MenuLingua.db_table_name} ON ${Menu.db_table_name}.${Menu.db_id} = ${MenuLingua.db_table_name}.${MenuLingua.db_id_menu}
                        INNER JOIN ${Lingua.db_table_name} ON ${Lingua.db_table_name}.${Lingua.db_id} = ${MenuLingua.db_table_name}.${MenuLingua.db_id_lingua}
                        INNER JOIN ${Ristorante.db_table_name} ON ${Ristorante.db_table_name}.${Ristorante.db_id} = ${Menu.db_table_name}.${Menu.db_id_ristorante}
                        INNER JOIN ${Citta.db_table_name} ON ${Citta.db_table_name}.${Citta.db_id} = ${Ristorante.db_table_name}.${Ristorante.db_id_citta}
                        INNER JOIN ${Provincia.db_table_name} ON ${Provincia.db_table_name}.${Provincia.db_id} = ${Citta.db_table_name}.${Citta.db_id_provincia}
                        INNER JOIN (
                            SELECT DISTINCT IdMenu FROM (SELECT * FROM(SELECT ${Menu.db_table_name}.${Menu.db_id} as IdMenu, ${Menu.db_id_titolo} as IdStringa FROM ${Menu.db_table_name}
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
                            WHERE ${StringaTradotta.db_table_name}.${StringaTradotta.db_id} IS NULL
                        ) AS T3 ON T3.IdMenu = ${Menu.db_table_name}.${Menu.db_id}
                        WHERE ${MenuLingua.db_table_name}.${MenuLingua.db_id_lingua} IN (SELECT ${LinguaTraduttore.db_id_lingua} FROM ${LinguaTraduttore.db_table_name} WHERE ${LinguaTraduttore.db_id_traduttore} = @${LinguaTraduttore.db_id_traduttore})`,
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
                        SELECT ${Ristorante.db_table_name}.${Ristorante.db_nome} AS NomeRistorante, ${Ristorante.db_table_name}.${Ristorante.db_indirizzo}, ${Ristorante.db_table_name}.${Ristorante.db_civico}, ${Citta.db_table_name}.${Citta.db_nome} AS Citta, ${Provincia.db_table_name}.${Provincia.db_sigla}, ${Menu.db_table_name}.${Menu.db_id}, ${MenuLingua.db_table_name}.${MenuLingua.db_id_lingua}, ${Lingua.db_table_name}.${Lingua.db_cod_lingua}
                        FROM ${Menu.db_table_name}
                        INNER JOIN ${MenuLingua.db_table_name} ON ${Menu.db_table_name}.${Menu.db_id} = ${MenuLingua.db_table_name}.${MenuLingua.db_id_menu}
                        INNER JOIN ${Lingua.db_table_name} ON ${Lingua.db_table_name}.${Lingua.db_id} = ${MenuLingua.db_table_name}.${MenuLingua.db_id_lingua}
                        INNER JOIN ${Ristorante.db_table_name} ON ${Ristorante.db_table_name}.${Ristorante.db_id} = ${Menu.db_table_name}.${Menu.db_id_ristorante}
                        INNER JOIN ${Citta.db_table_name} ON ${Citta.db_table_name}.${Citta.db_id} = ${Ristorante.db_table_name}.${Ristorante.db_id_citta}
                        INNER JOIN ${Provincia.db_table_name} ON ${Provincia.db_table_name}.${Provincia.db_id} = ${Citta.db_table_name}.${Citta.db_id_provincia}
                        INNER JOIN (
                            SELECT DISTINCT IdMenu FROM (SELECT * FROM(SELECT ${Menu.db_table_name}.${Menu.db_id} as IdMenu, ${Menu.db_id_titolo} as IdStringa FROM ${Menu.db_table_name}
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
                            WHERE ${StringaTradotta.db_table_name}.${StringaTradotta.db_id} IS NULL
                        ) AS T3 ON T3.IdMenu = ${Menu.db_table_name}.${Menu.db_id}
                        WHERE ${MenuLingua.db_table_name}.${MenuLingua.db_id_lingua} IN (SELECT ${LinguaTraduttore.db_id_lingua} FROM ${LinguaTraduttore.db_table_name} WHERE ${LinguaTraduttore.db_id_traduttore} = @${LinguaTraduttore.db_id_traduttore})`,
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
                        SELECT ${Ristorante.db_table_name}.${Ristorante.db_nome} AS NomeRistorante, ${Ristorante.db_table_name}.${Ristorante.db_indirizzo}, ${Ristorante.db_table_name}.${Ristorante.db_civico}, ${Citta.db_table_name}.${Citta.db_nome} AS Citta, ${Provincia.db_table_name}.${Provincia.db_sigla}, ${Menu.db_table_name}.${Menu.db_id}, ${MenuLingua.db_table_name}.${MenuLingua.db_id_lingua}, ${Lingua.db_table_name}.${Lingua.db_cod_lingua}
                        FROM ${Menu.db_table_name}
                        INNER JOIN ${MenuLingua.db_table_name} ON ${Menu.db_table_name}.${Menu.db_id} = ${MenuLingua.db_table_name}.${MenuLingua.db_id_menu}
                        INNER JOIN ${Lingua.db_table_name} ON ${Lingua.db_table_name}.${Lingua.db_id} = ${MenuLingua.db_table_name}.${MenuLingua.db_id_lingua}
                        INNER JOIN ${Ristorante.db_table_name} ON ${Ristorante.db_table_name}.${Ristorante.db_id} = ${Menu.db_table_name}.${Menu.db_id_ristorante}
                        INNER JOIN ${Citta.db_table_name} ON ${Citta.db_table_name}.${Citta.db_id} = ${Ristorante.db_table_name}.${Ristorante.db_id_citta}
                        INNER JOIN ${Provincia.db_table_name} ON ${Provincia.db_table_name}.${Provincia.db_id} = ${Citta.db_table_name}.${Citta.db_id_provincia}
                        INNER JOIN (
                            SELECT DISTINCT IdMenu FROM (SELECT * FROM(SELECT ${Menu.db_table_name}.${Menu.db_id} as IdMenu, ${Menu.db_id_titolo} as IdStringa FROM ${Menu.db_table_name}
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
                            WHERE ${StringaTradotta.db_table_name}.${StringaTradotta.db_id} IS NULL
                        ) AS T3 ON T3.IdMenu = ${Menu.db_table_name}.${Menu.db_id}
                        WHERE ${MenuLingua.db_table_name}.${MenuLingua.db_id_lingua} IN (SELECT ${LinguaTraduttore.db_id_lingua} FROM ${LinguaTraduttore.db_table_name} WHERE ${LinguaTraduttore.db_id_traduttore} = @${LinguaTraduttore.db_id_traduttore})`,
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
                    INNER JOIN menu_lingue ON T1.IdMenu = menu_lingue.IdMenu
                    LEFT JOIN stringhe_tradotte ON stringhe_tradotte.IdStringa = T1.IdStringa
                    WHERE stringhe_tradotte.Id IS NULL AND menu_lingue.IdLingua = @${MenuLingua.db_id_lingua}`,
                        (err: any, result: any) => {
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                let params : string = ""
                                for(let i = 0; i < result.recordset.length; i++){
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
                                    ) VALUES ` + params, (err2:any, result2:any)=>{
                                        if (err2) {
                                            transaction.rollback();
                                            reject(err2);
                                        }
                                        else{
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

}