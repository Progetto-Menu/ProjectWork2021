import { TraduttoreController } from "../controller/TraduttoreController";
import { Traduttore } from "../model/Traduttore";
import { JSONUtils } from "../utils/JSONUtils";

const router = require("express").Router();

module.exports = router;

const traduttoreController: TraduttoreController = new TraduttoreController();

router.post("/login", async (req: any, res: any) => {

})

router.post("/register", async (req: any, res: any) => {

    const json = req.body;

    const traduttore: Traduttore = {
        id: 0,
        nome : JSONUtils.getProperty(json, "nome", "X"),
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