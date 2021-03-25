const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes_amministratore = require("./src/routes/routes_amministratore");
const routes_traduttore = require("./src/routes/routes_traduttore");


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/amministratori", routes_amministratore);
app.use("/traduttori", routes_traduttore);



const server = app.listen(8081, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log("Server listening http://[%s]:%s", host, port);
})
