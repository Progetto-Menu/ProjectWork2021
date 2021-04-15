import { AmministratoreController } from "../controller/AmministratoreController";
import { TraduttoreController } from "../controller/TraduttoreController";
import { Amministratore } from "../model/Amministratore";
import { JSONUtils } from "../utils/JSONUtils";
import { JwtUtils } from "../utils/JwtUtils";

const router = require("express").Router();

module.exports = router;

const amministratoreController: AmministratoreController = new AmministratoreController();
const traduttoriController = new TraduttoreController();

router.post("/login", async (req: any, res: any) => {
    const json = req.body;

    const email = JSONUtils.getProperty(json, "email", "");
    const password = JSONUtils.getProperty(json, "password", "");

    if (email == "" || password == "") return res.send({ "token": null });

    return Promise.resolve(amministratoreController.login(email, password))
        .then((result: Amministratore) => {
            const token = JwtUtils.JWT.sign({
                sub: result.id,
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + JwtUtils.TOKEN_EXP_SEC
            }, JwtUtils.PRIVATE_KEY, { algorithm: 'RS256' });
            return res.send({ "token": token });
        }).catch((error) => {
            console.log(error);
            return res.send({ "token": null });
        })

})

router.post("/auth", async (req: any, res: any) => {
    const json = req.body;

    const clientToken = JSONUtils.getProperty(json, "token", "");

    JwtUtils.JWT.verify(clientToken, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({ "token": null });
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "token": null });

        return Promise.resolve(amministratoreController.get(decoded.sub))
            .then((result) => {
                console.log(result)
                return result == null ? res.send({ "token": null }) : res.send({ "token": clientToken });
            }).catch((error) => {
                console.log(error)
                return res.send({ "token": null });
            });
    });

})

router.post("/translators-not-revisers/all", async (req: any, res: any) => {
    const json = req.body;

    const clientToken = JSONUtils.getProperty(json, "token", "");

    JwtUtils.JWT.verify(clientToken, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({"result" : "error"})
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({"result" : "error"})

        return Promise.resolve(amministratoreController.get(decoded.sub))
            .then((result) => {
                return Promise.resolve(traduttoriController.getTranslatorsNotRevisers()).then((result)=>{
                    return res.send({"result" : result})
                }).catch(()=>{
                    return res.send({"result" : "error"})
                })
            }).catch((error) => {
                return res.send({"result" : "error"})
            });
    });

})

router.post("/translators-not-revisers/promote", async (req: any, res: any) => {
    const json = req.body;

    const clientToken = JSONUtils.getProperty(json, "token", "");
    const id_traduttore = JSONUtils.getProperty(json, "id_traduttore", "");

    if(!Number.parseInt(id_traduttore)) return res.send({"result" : "error"});

    JwtUtils.JWT.verify(clientToken, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({"result" : "error"})
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({"result" : "error"})

        return Promise.resolve(amministratoreController.get(decoded.sub))
            .then((result) => {
                return Promise.resolve(traduttoriController.promoteTranslator(id_traduttore)).then((result)=>{
                    return res.send({"result" : "OK"})
                }).catch(()=>{
                    return res.send({"result" : "error"})
                })
            }).catch((error) => {
                return res.send({"result" : "error"})
            });
    });

})