const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");
const routes_amministratore = require("./src/routes/routes_amministratore");
const routes_traduttore = require("./src/routes/routes_traduttore");


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/amministratori", routes_amministratore);
app.use("/traduttori", routes_traduttore);


const privateKey = fs.readFileSync( '/etc/letsencrypt/live/www.progettomenu.cloud/privkey.pem' );
const certificate = fs.readFileSync( '/etc/letsencrypt/live/www.progettomenu.cloud/cert.pem' );

https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(443);