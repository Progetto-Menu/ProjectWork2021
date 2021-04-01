import { config, sql } from "../database/DbConfig";
import { OtpRistoratore } from "./OtpRistoratore";

export class Ristoratore {
    readonly id: number;
    readonly nome: string;
    readonly cognome: string;
    readonly email: string;
    readonly password: string;
    readonly validato: boolean;
    readonly creato_il?: Date;
    readonly modificato_il?: Date;
    readonly cancellato_il?: Date;

    static readonly db_table_name="ristoratori"

    static readonly db_id = "Id";
    static readonly db_nome = "Nome";
    static readonly db_cognome = "Cognome";
    static readonly db_email = "Email";
    static readonly db_password = "Password";
    static readonly db_validato = "Validato";
    static readonly db_creato_il = "CreatoIl";
    static readonly db_modificato_il = "ModificatoIl";
    static readonly db_cancellato_il = "CancellatoIl";


    constructor(id: number, nome: string, cognome: string, email: string, password: string, validato: boolean, creato_il: Date, modificato_il: Date, cancallato_il: Date) {
        this.id = id
        this.nome = nome
        this.cognome = cognome
        this.email = email
        this.password = password
        this.validato = validato
        this.creato_il = creato_il
        this.modificato_il = modificato_il
        this.cancellato_il = cancallato_il
    }

    static convertToRistoratore(record: any): Ristoratore | null{
        return record != null ? {
            id: record[Ristoratore.db_id],
            nome: record[Ristoratore.db_nome],
            cognome: record[Ristoratore.db_cognome],
            email: record[Ristoratore.db_email],
            password: record[Ristoratore.db_password],
            validato: parseInt(record[Ristoratore.db_validato]) === 1,
            creato_il: record[Ristoratore.db_creato_il],
            modificato_il: record[Ristoratore.db_modificato_il],
            cancellato_il: record[Ristoratore.db_cancellato_il]
        } : null;
    }

    static async insert(ristoratore: Ristoratore) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(Ristoratore.db_nome, ristoratore.nome)
                    .input(Ristoratore.db_cognome, ristoratore.cognome)
                    .input(Ristoratore.db_email, ristoratore.email)
                    .input(Ristoratore.db_password, ristoratore.password)
                    .input(Ristoratore.db_validato, ristoratore.validato ? 1 : 0)
                    .input(Ristoratore.db_creato_il, ristoratore.creato_il ?? new Date())
                    .input(Ristoratore.db_modificato_il, ristoratore.modificato_il ?? new Date())
                    .input(Ristoratore.db_cancellato_il, ristoratore.cancellato_il ?? null)
                    .query(`INSERT INTO ${Ristoratore.db_table_name} (
                        ${Ristoratore.db_nome},
                        ${Ristoratore.db_cognome},
                        ${Ristoratore.db_email},
                        ${Ristoratore.db_password},
                        ${Ristoratore.db_validato},
                        ${Ristoratore.db_creato_il},
                        ${Ristoratore.db_modificato_il},
                        ${Ristoratore.db_cancellato_il}) VALUES (
                            @${Ristoratore.db_nome},
                            @${Ristoratore.db_cognome},
                            @${Ristoratore.db_email},
                            @${Ristoratore.db_password},
                            @${Ristoratore.db_validato},
                            @${Ristoratore.db_creato_il},
                            @${Ristoratore.db_modificato_il},
                            @${Ristoratore.db_cancellato_il});
                        SELECT * FROM ${Ristoratore.db_table_name} where ${Ristoratore.db_id} = (SELECT SCOPE_IDENTITY());`,
                        (err: any, result: any) => {
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                transaction.commit((err: any) => {
                                    if (!err) {
                                        resolve(this.convertToRistoratore(result.recordset[0]));
                                    }
                                });
                            }
                        });
            });
        });
    }

    static async getRistoratoreById(id: number) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(Ristoratore.db_id, id)
                    .query(`SELECT * FROM ${Ristoratore.db_table_name} WHERE ${Ristoratore.db_id} = @${Ristoratore.db_id};`,
                        (err: any, result: any) => {
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                transaction.commit((err: any) => {
                                    if (!err) {
                                        resolve(this.convertToRistoratore(result.recordset[0]));
                                    }
                                });
                            }
                        });
            });
        });
    }


    static async getRistoratoreByEmail(email: string) {
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(Ristoratore.db_email, email)
                    .query(`SELECT * FROM ${Ristoratore.db_table_name} WHERE ${Ristoratore.db_email} = @${Ristoratore.db_email};`,
                        (err: any, result: any) => {
                            if (err) {
                                transaction.rollback();
                                reject(err);
                            }
                            else {
                                transaction.commit((err: any) => {
                                    if (!err) {
                                        resolve(this.convertToRistoratore(result.recordset[0]));
                                    }
                                });
                            }
                        });
            });
        });
    }

    static async saveOtp(otp: OtpRistoratore){
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(OtpRistoratore.db_valore, otp.valore)
                    .input(OtpRistoratore.db_creato_il, otp.creato_il ?? new Date())
                    .input(OtpRistoratore.db_scade_il, otp.scade_il ?? new Date(new Date().getTime()+(1000*60*2)))
                    .input(OtpRistoratore.db_id_ristoratore, otp.id_ristoratore)
                    .input(OtpRistoratore.db_valido, otp.valido)
                    .query(`
                    UPDATE ${OtpRistoratore.db_table_name} SET ${OtpRistoratore.db_valido} = 0 WHERE ${OtpRistoratore.db_id_ristoratore} = @${OtpRistoratore.db_id_ristoratore};
                    INSERT INTO ${OtpRistoratore.db_table_name} (
                        ${OtpRistoratore.db_valore},
                        ${OtpRistoratore.db_creato_il},
                        ${OtpRistoratore.db_scade_il},
                        ${OtpRistoratore.db_id_ristoratore},
                        ${OtpRistoratore.db_valido}
                        ) VALUES (
                            @${OtpRistoratore.db_valore},
                            @${OtpRistoratore.db_creato_il},
                            @${OtpRistoratore.db_scade_il},
                            @${OtpRistoratore.db_id_ristoratore},
                            @${OtpRistoratore.db_valido});`,
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

    static async checkOtp(valore: string, id_ristoratore: number){
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(OtpRistoratore.db_valore, valore)
                    .input(OtpRistoratore.db_id_ristoratore, id_ristoratore)
                    .query(`
                    SELECT * FROM ${OtpRistoratore.db_table_name} WHERE ${OtpRistoratore.db_valido} = 1 and ${OtpRistoratore.db_valore}=@${OtpRistoratore.db_valore} and ${OtpRistoratore.db_id_ristoratore}=@${OtpRistoratore.db_id_ristoratore} and DATEDIFF(second, GETDATE(), ${OtpRistoratore.db_scade_il}) < 0;`,
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

    static async invalidateAllOtp(id_ristoratore: number){
        const pool = await sql.connect(config);
        const transaction = await pool.transaction();
        return new Promise<any>((resolve, reject) => {
            transaction.begin(async (err: any) => {
                await transaction.request()
                    .input(OtpRistoratore.db_id_ristoratore, id_ristoratore)
                    .query(`
                    UPDATE ${OtpRistoratore.db_table_name} SET ${OtpRistoratore.db_valido} = 0 WHERE ${OtpRistoratore.db_id_ristoratore} = @${OtpRistoratore.db_id_ristoratore};`,
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
                    .input(Ristoratore.db_id, id)
                    .query(`
                    UPDATE ${Ristoratore.db_table_name} SET ${Ristoratore.db_validato} = 1 WHERE ${Ristoratore.db_id} = @${Ristoratore.db_id};`,
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
                    UPDATE ${Ristoratore.db_table_name} SET ${Ristoratore.db_email} = @emailnuova WHERE ${Ristoratore.db_email} = @emailvecchia;`,
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