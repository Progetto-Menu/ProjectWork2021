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

    const email = JSONUtils.getProperty(json, "email", null);
    const password = JSONUtils.getProperty(json, "password", null);
    const clientToken = JSONUtils.getProperty(json, "token", null);

    if (email == null || email == "" || password == null || password == "") return res.send({ "error": "Inserire email e password" });

    if (clientToken == null || clientToken == "") {
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

    const traduttore: Traduttore = {
        id: 0,
        nome: JSONUtils.getProperty(json, "nome", "X"),
        cognome: JSONUtils.getProperty(json, "cognome", "Y"),
        email: JSONUtils.getProperty(json, "email", "Y"),
        password: JSONUtils.getProperty(json, "password", "Y"),
        revisore: JSONUtils.getProperty(json, "revisore", false),
        numero_token: JSONUtils.getProperty(json, "numero_token", 0),
    }

    return Promise.resolve(traduttoreController.create(traduttore))
        .then((result) => {
            return res.send(result);
        }).catch((error) => {
            return res.send(error);
        })
})