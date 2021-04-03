import { config, sql } from "../database/DbConfig";
import { OtpTraduttore } from "./OtpTraduttore";

export class Traduttore {
    readonly id: number;
    readonly nome: string;
    readonly cognome: string;
    readonly email: string;
    readonly password: string;
    readonly revisore: boolean;
    readonly numero_token: number;
    readonly validato: boolean;
    readonly creato_il?: Date;
    readonly modificato_il?: Date;
    readonly cancellato_il?: Date;


    static readonly db_table_name = "traduttori";
    static readonly db_id = "Id";
    static readonly db_nome = "Nome";
    static readonly db_cognome = "Cognome";
    static readonly db_email = "Email";
    static readonly db_password = "Password";
    static readonly db_revisore = "Revisore";
    static readonly db_numero_token = "NumeroToken";
    static readonly db_validato = "Validato";
    static readonly db_creato_il = "CreatoIl";
    static readonly db_modificato_il = "ModificatoIl";
    static readonly db_cancellato_il = "EliminatoIl";


    constructor(id: number, nome: string, cognome: string, email: string, password: string, revisore: boolean, validato:boolean, numero_token: number, creato_il: Date, modificato_il: Date, cancellato_il: Date) {
        this.id = id
        this.nome = nome
        this.cognome = cognome
        this.email = email
        this.password = password
        this.revisore = revisore
        this.numero_token = numero_token
        this.validato = validato;
        this.creato_il = creato_il
        this.modificato_il = modificato_il
        this.cancellato_il = cancellato_il
    }

    static convertToTraduttore(record:any): Traduttore | null{
        return record != null ? {
            id: record[Traduttore.db_id],
            nome: record[Traduttore.db_nome],
            cognome: record[Traduttore.db_cognome],
            email: record[Traduttore.db_email],
            password: record[Traduttore.db_password],
            revisore: record[Traduttore.db_revisore],
            numero_token: record[Traduttore.db_numero_token],
            validato: parseInt(record[Traduttore.db_validato]) === 1,
            creato_il: record[Traduttore.db_creato_il],
            modificato_il: record[Traduttore.db_modificato_il],
            cancellato_il: record[Traduttore.db_cancellato_il]
        } : null;
    }

    static async insert(traduttore: Traduttore) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(Traduttore.db_nome, traduttore.nome)
                    .input(Traduttore.db_cognome, traduttore.cognome)
                    .input(Traduttore.db_email, traduttore.email)
                    .input(Traduttore.db_password, traduttore.password)
                    .input(Traduttore.db_revisore, traduttore.revisore)
                    .input(Traduttore.db_numero_token, traduttore.numero_token)
                    .input(Traduttore.db_validato, traduttore.validato ? 1 : 0)
                    .input(Traduttore.db_creato_il, traduttore.creato_il ?? new Date())
                    .input(Traduttore.db_modificato_il, traduttore.modificato_il ?? new Date())
                    .input(Traduttore.db_cancellato_il, traduttore.cancellato_il ?? null)
                    .query(`INSERT INTO ${Traduttore.db_table_name} (
                        ${Traduttore.db_nome},
                        ${Traduttore.db_cognome},
                        ${Traduttore.db_email},
                        ${Traduttore.db_password},
                        ${Traduttore.db_revisore},
                        ${Traduttore.db_numero_token},
                        ${Traduttore.db_validato},
                        ${Traduttore.db_creato_il},
                        ${Traduttore.db_modificato_il},
                        ${Traduttore.db_cancellato_il}) VALUES (
                            @${Traduttore.db_nome},
                            @${Traduttore.db_cognome},
                            @${Traduttore.db_email},
                            @${Traduttore.db_password},
                            @${Traduttore.db_revisore},
                            @${Traduttore.db_numero_token},
                            @${Traduttore.db_validato},
                            @${Traduttore.db_creato_il},
                            @${Traduttore.db_modificato_il},
                            @${Traduttore.db_cancellato_il});
                        SELECT * FROM ${Traduttore.db_table_name} where ${Traduttore.db_id} = (SELECT SCOPE_IDENTITY());`,
                        (err: any, result: any) => {
                            console.log(err)
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                transaction.commit((err: any) => {
                                    if (!err) {
                                        resolve(this.convertToTraduttore(result.recordset[0]));
                                    }
                                });
                            }
                        });
            });
        });
    }

    static async getTraduttoreById(id: number) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(Traduttore.db_id, id)
                    .query(`SELECT * FROM ${Traduttore.db_table_name} WHERE ${Traduttore.db_id} = @${Traduttore.db_id};`,
                        (err: any, result: any) => {
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                transaction.commit((err: any) => {
                                    if (!err) {
                                        resolve(this.convertToTraduttore(result.recordset[0]));
                                    }
                                });
                            }
                        });
            });
        });
    }


    static async getTraduttoreByEmail(email: string) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(Traduttore.db_email, email)
                    .query(`SELECT * FROM ${Traduttore.db_table_name} WHERE ${Traduttore.db_email} = @${Traduttore.db_email};`,
                        (err: any, result: any) => {
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                transaction.commit((err: any) => {
                                    if (!err) {
                                        resolve(this.convertToTraduttore(result.recordset[0]));
                                    }
                                });
                            }
                        });
            });
        });
    }

    static async saveOtp(otp: OtpTraduttore){
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(OtpTraduttore.db_valore, otp.valore)
                    .input(OtpTraduttore.db_creato_il, otp.creato_il ?? new Date())
                    .input(OtpTraduttore.db_scade_il, otp.scade_il ?? new Date(new Date().getTime()+(1000*60*2)))
                    .input(OtpTraduttore.db_id_traduttore, otp.id_traduttore)
                    .input(OtpTraduttore.db_valido, otp.valido)
                    .query(`
                    UPDATE ${OtpTraduttore.db_table_name} SET ${OtpTraduttore.db_valido} = 0 WHERE ${OtpTraduttore.db_id_traduttore} = @${OtpTraduttore.db_id_traduttore};
                    INSERT INTO ${OtpTraduttore.db_table_name} (
                        ${OtpTraduttore.db_valore},
                        ${OtpTraduttore.db_creato_il},
                        ${OtpTraduttore.db_scade_il},
                        ${OtpTraduttore.db_id_traduttore},
                        ${OtpTraduttore.db_valido}
                        ) VALUES (
                            @${OtpTraduttore.db_valore},
                            @${OtpTraduttore.db_creato_il},
                            @${OtpTraduttore.db_scade_il},
                            @${OtpTraduttore.db_id_traduttore},
                            @${OtpTraduttore.db_valido});`,
                        (err: any, result: any) => {
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                transaction.commit((err: any) => {
                                    if (!err) {
                                        resolve(true)
                                        //resolve(this.convertToTraduttore(result.recordset[0]));
                                    }
                                });
                            }
                        });
            });
        });
    }

    static async checkOtp(valore: string, id_traduttore: number){
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(OtpTraduttore.db_valore, valore)
                    .input(OtpTraduttore.db_id_traduttore, id_traduttore)
                    .query(`
                    SELECT * FROM ${OtpTraduttore.db_table_name} WHERE ${OtpTraduttore.db_valido} = 1 and ${OtpTraduttore.db_valore}=@${OtpTraduttore.db_valore} and ${OtpTraduttore.db_id_traduttore}=@${OtpTraduttore.db_id_traduttore} and DATEDIFF(second, GETDATE(), ${OtpTraduttore.db_scade_il}) < 0;`,
                        (err: any, result: any) => {
                            console.log(err,result);
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                transaction.commit((err: any) => {
                                    if (!err) {
                                        console.log(result)
                                        if(result.recordset[0]){
                                            resolve(true)
                                        }
                                        else{
                                            reject();
                                        }
                                        
                                        //resolve(this.convertToTraduttore(result.recordset[0]));
                                    }
                                });
                            }
                        });
            });
        });
    }

    static async invalidateAllOtp(id_traduttore: number){
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(OtpTraduttore.db_id_traduttore, id_traduttore)
                    .query(`
                    UPDATE ${OtpTraduttore.db_table_name} SET ${OtpTraduttore.db_valido} = 0 WHERE ${OtpTraduttore.db_id_traduttore} = @${OtpTraduttore.db_id_traduttore};`,
                        (err: any, result: any) => {
                            console.log(err,result);
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                transaction.commit((err: any) => {
                                    if (!err) {
                                        console.log(result)
                                        resolve(true)
                                        //resolve(this.convertToTraduttore(result.recordset[0]));
                                    }
                                });
                            }
                        });
            });
        });
    }

    static async setValidated(id: number){
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(Traduttore.db_id, id)
                    .query(`
                    UPDATE ${Traduttore.db_table_name} SET ${Traduttore.db_validato} = 1 WHERE ${Traduttore.db_id} = @${Traduttore.db_id};`,
                        (err: any, result: any) => {
                            console.log(err,result);
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                transaction.commit((err: any) => {
                                    if (!err) {
                                        console.log(result)
                                        resolve(true)
                                        //resolve(this.convertToTraduttore(result.recordset[0]));
                                    }
                                });
                            }
                        });
            });
        });
    }

    static async changeEmail(emailVecchia: string, emailNuova:string){
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input("emailvecchia", emailVecchia)
                    .input("emailnuova", emailNuova)
                    .query(`
                    UPDATE ${Traduttore.db_table_name} SET ${Traduttore.db_email} = @emailnuova WHERE ${Traduttore.db_email} = @emailvecchia;`,
                        (err: any, result: any) => {
                            console.log(err,result);
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                transaction.commit((err: any) => {
                                    if (!err) {
                                        console.log(result)
                                        resolve(true)
                                        //resolve(this.convertToTraduttore(result.recordset[0]));
                                    }
                                });
                            }
                        });
            });
        });
    }

}