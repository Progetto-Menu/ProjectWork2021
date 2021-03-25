import { TraduttoreController } from "../controller/TraduttoreController";
import { Traduttore } from "../model/Traduttore";
import { JSONUtils } from "../utils/JSONUtils";

const router = require("express").Router();

module.exports = router;

const traduttoreController: TraduttoreController = new TraduttoreController();
const jwt = require('jsonwebtoken');
const secret = "chiave-segreta";
const tokenExpSec = 60 * 60;

router.post("/login", async (req: any, res: any) => {
    const json = req.body;

    const email = JSONUtils.getProperty(json, "email", "");
    const password = JSONUtils.getProperty(json, "password", "");
    const clientToken = JSONUtils.getProperty(json, "token", "");

    if (email == "" || password == "") return res.send({ "error": "Errore" });

    if (clientToken == "") {
        return Promise.resolve(traduttoreController.login(email, password))
            .then((result: Traduttore) => {
                const token = jwt.sign({
                    sub: result.id,
                    iat: Math.floor(Date.now() / 1000),
                    exp: Math.floor(Date.now() / 1000) + tokenExpSec
                }, secret/*, { algorithm: 'RS256' }*/);
                return res.send({ "token": token });
            }).catch((error) => {
                console.log(error);
                return res.send({ "token": null });
            })
    }
    else {
        jwt.verify(clientToken, secret, function (err: any, decoded: any) {
            if (err) return res.send({ "token": null });
            if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "token": null });

            return Promise.resolve(traduttoreController.get(decoded.sub))
                .then((result) => {
                    return result == null ? res.send({ "token": null }) : res.send({ "token": clientToken });
                }).catch((error) => {
                    return res.send({ "token": null });
                });
        });
    }



})

router.post("/register", async (req: any, res: any) => {

    const json = req.body;

    const nome = JSONUtils.getProperty(json, "nome", "");
    const cognome = JSONUtils.getProperty(json, "cognome", "");
    const email = JSONUtils.getProperty(json, "email", "");
    const password = JSONUtils.getProperty(json, "password", "");
    const revisore = JSONUtils.getProperty(json, "revisore", false);
    const numero_token = JSONUtils.getProperty(json, "numero_token", 0);

    if(nome == "" || cognome == "" || email == "" || password == "" ) return res.send({"error": "Errore"});

    const traduttore: Traduttore = {
        id: 0,
        nome: nome,
        cognome: cognome,
        email: email,
        password: password,
        revisore: revisore,
        numero_token: numero_token,
    }

    return Promise.resolve(traduttoreController.create(traduttore))
        .then((result) => {
            return res.send(result);
        }).catch((error) => {
            return res.send(error);
        })
})