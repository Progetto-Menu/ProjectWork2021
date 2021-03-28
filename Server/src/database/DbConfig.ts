export const sql = require('mssql');
export const config = {
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    server: process.env.MSSQL_SERVER,
    database: process.env.MSSQL_DATABASE,
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
        instanceName: process.env.MSSQL_INSTANCE_NAME
    }
}