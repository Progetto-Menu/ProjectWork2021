import { config, sql } from "../database/DbConfig";
import { CustomTraduzione } from "./custom/CustomTraduzione";
import { Lingua } from "./Lingua";
import { Stringa } from "./Stringa";

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
                codLingua: record[Lingua.db_cod_lingua],
                stato: record[Traduzione.db_stato],
                testo: record[Stringa.db_testo],
                testoTradotto: record["TestoTradotto"]
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
                    .query(`SELECT ${Traduzione.db_table_name}.${Traduzione.db_stato}, ${Lingua.db_table_name}.${Lingua.db_cod_lingua}, ${Stringa.db_table_name}.${Stringa.db_testo}, ${Traduzione.db_table_name}.${Traduzione.db_testo} as TestoTradotto FROM ${Traduzione.db_table_name}
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

}