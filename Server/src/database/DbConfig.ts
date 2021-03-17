export const sql = require('mssql');
export const config = {
    user: 'traduzioni',
    password: '12345678',
    server: 'localhost',
    database: 'db_traduzioni',
    options:{
        encrypt: true,
        enableArithAbort: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    port: 1730,
    dialect: "mssql",
    dialectOptions: {
        instanceName: "SQLEXPRESS"
    }
}