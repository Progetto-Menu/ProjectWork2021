import { RistoratoreController } from "../controller/RistoratoreController";
import { OtpRistoratore } from "../model/OtpRistoratore";
import { Ristoratore } from "../model/Ristoratore";
import { EmailUtils } from "../utils/EmailUtils";
import { JSONUtils } from "../utils/JSONUtils";
import { JwtUtils } from "../utils/JwtUtils";

const router = require("express").Router();

module.exports = router;

const ristoratoreController: RistoratoreController = new RistoratoreController();

router.post("/login", async (req: any, res: any) => {
    const json = req.body;

    const email = JSONUtils.getProperty(json, "email", "");
    const password = JSONUtils.getProperty(json, "password", "");

    if (email == "" || password == "") return res.send({ "token": null });

    return Promise.resolve(ristoratoreController.login(email, password))
        .then((result: Ristoratore) => {
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

        return Promise.resolve(ristoratoreController.get(decoded.sub))
            .then((result) => {
                console.log(result)
                return result == null ? res.send({ "token": null }) : res.send({ "token": clientToken, "uservalid": result.validato });
            }).catch((error) => {
                console.log(error)
                return res.send({ "token": null });
            });
    });

})

router.post("/register", async (req: any, res: any) => {

    const json = req.body;

    const nome = JSONUtils.getProperty(json, "nome", "");
    const cognome = JSONUtils.getProperty(json, "cognome", "");
    const email = JSONUtils.getProperty(json, "email", "");
    const password = JSONUtils.getProperty(json, "password", "");
    const crypto = require("crypto").createHash("sha256");

    if (nome == "" || cognome == "" || email == "" || password == "") return res.send({ "error": "Errore" });

    const ristoratore: Ristoratore = {
        id: 0,
        nome: nome,
        cognome: cognome,
        email: email,
        password: crypto.update(password).digest("hex"),
        validato: false
    }

    return Promise.resolve(ristoratoreController.create(ristoratore))
        .then((result) => {
            const token = JwtUtils.JWT.sign({
                sub: result.id,
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + JwtUtils.TOKEN_EXP_SEC
            }, JwtUtils.PRIVATE_KEY, { algorithm: 'RS256' });
            return res.send({ "token": token });
        }).catch((error) => {
            return res.send({ "token": null });
        })
})

router.post("/verify-email", async (req: any, res: any) => {

    const json = req.body;

    const email = JSONUtils.getProperty(json, "email", "");
    const token = JSONUtils.getProperty(json, "token", "")

    if (email == "" || token == "")return res.send({ "result": "error" });

    JwtUtils.JWT.verify(token, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        console.log(err);
        if (err) return res.send({ "result": "error" });
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "result": "error" });

        return ristoratoreController.get(decoded.sub)
            .then((result) => {
                const codice = generateCode();

                const otp: OtpRistoratore = {
                    id: 0,
                    valore: codice,
                    valido: true,
                    id_ristoratore: result.id
                }

                return Promise.resolve(ristoratoreController.saveOtp(otp)).then((result) => {
                    const emailOptions = {
                        from: EmailUtils.EMAIL,
                        to: email,
                        subject: 'OTP',
                        text: codice
                    };

                    console.log(emailOptions);

                    return new Promise((resolve, reject) => {
                        EmailUtils.TRANSPORTER.sendMail(emailOptions, function (error: any, info: any) {
                            console.log(error, info)
                            if (error) {
                                reject();
                            } else {
                                resolve(true)
                            }
                        });
                    }).then((result) => {
                        return res.send({ "result": "OK" });
                    }).catch((e) => {
                        console.log(e);
                        return res.send({ "result": "error" });
                    })

                }).catch((error) => {
                    console.log(error);
                    return res.send({ "result": "error" });
                })



            }).catch((error) => {
                console.log(error);
                return res.send({ "result": "error" });
            });
    });








})

router.post("/emailbytoken", async (req: any, res: any) => {
    const json = req.body;

    const clientToken = JSONUtils.getProperty(json, "token", "");

    JwtUtils.JWT.verify(clientToken, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({ "token": null });
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "token": null });

        return Promise.resolve(ristoratoreController.get(decoded.sub))
            .then((result) => {
                console.log(result)
                return result == null ? res.send({ "token": null }) : res.send({ "token": clientToken, "email": result.email });
            }).catch((error) => {
                console.log(error)
                return res.send({ "token": null });
            });
    });
})

router.post("/change-email", async (req: any, res: any) => {
    const json = req.body;

    const clientToken = JSONUtils.getProperty(json, "token", "");
    const emailNuova = JSONUtils.getProperty(json, "email", "");

    JwtUtils.JWT.verify(clientToken, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({ "result": "error" });
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "error": "Errore" });

        return Promise.resolve(ristoratoreController.get(decoded.sub))
            .then((result) => {
                return Promise.resolve(ristoratoreController.changeEmail(result.email, emailNuova)).then(()=>{
                    return res.send({ "result": "OK" });
                }).catch(()=>{
                    return res.send({ "result": "error" });
                })
            }).catch((error) => {
                return res.send({ "result": "error" });
            });
    });
})


router.post("/validate-email", async (req: any, res: any) => {
    const json = req.body;

    const clientToken = JSONUtils.getProperty(json, "token", "");
    const valoreOtp = JSONUtils.getProperty(json, "otp", "");

    JwtUtils.JWT.verify(clientToken, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({ "result": "error" });
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "result": "error" });

        return Promise.resolve(ristoratoreController.get(decoded.sub))
            .then((result) => {
                return Promise.resolve(ristoratoreController.checkOtp(valoreOtp, result.id)).then((result) => {
                    return Promise.resolve(ristoratoreController.invalidateAllOtp(decoded.sub)).then(() => {
                        return Promise.resolve(ristoratoreController.setValidated(decoded.sub)).then(() => {
                            return res.send({ "result": "OK" });
                        }).catch((e) => {
                            console.log(e);
                            return res.send({ "result": "error" });
                        })
                    }).catch((e)=>{
                        console.log(e);
                        return res.send({ "result": "error" });
                    })

                }).catch((e) => {
                    console.log(e);
                    return res.send({ "result": "error" });
                })

            }).catch((error) => {
                return res.send({ "result": "error" });
            });
    });
})

router.post("/profile", async (req: any, res: any) => {
    const json = req.body;

    const clientToken = JSONUtils.getProperty(json, "token", "");

    JwtUtils.JWT.verify(clientToken, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({ "result": "error" });
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "result": "error" });

        return Promise.resolve(ristoratoreController.get(decoded.sub))
            .then((result) => {
                return res.send(result);
            }).catch((error) => {
                return res.send({ "result": "error" });
            });
    });
})

function generateCode(): string {
    const min = 0;
    const max = 100000;
    let result = (Math.floor(Math.random() * (max - min)) + min).toString();

    while (result.length < 5) {
        result = "0" + result;
    }

    return result;

}
