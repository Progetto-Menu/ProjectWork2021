const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");
const routes_amministratore = require("./src/routes/routes_amministratore");
const routes_traduttore = require("./src/routes/routes_traduttore");
const routes_ristoratori = require("./src/routes/routes_ristoratore");


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/amministratori", routes_amministratore);
app.use("/traduttori", routes_traduttore);
app.use("/ristoratori", routes_ristoratori);


const privateKey = fs.readFileSync(process.env.LETSENCRYPT_PRIVKEY);
const certificate = fs.readFileSync(process.env.LETSENCRYPT_CERT);
const ca = fs.readFileSync(process.env.LETSENCRYPT_CHAIN);

https.createServer({
    key: privateKey,
    cert: certificate,
    ca: ca
}, app).listen(443);