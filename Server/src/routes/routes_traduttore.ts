import { LinguaController } from "../controller/LinguaController";
import { TraduttoreController } from "../controller/TraduttoreController";
import { ProvinciaController } from "../controller/ProvinciaController";
import { OtpTraduttore } from "../model/OtpTraduttore";
import { Traduttore } from "../model/Traduttore";
import { EmailUtils } from "../utils/EmailUtils";
import { JSONUtils } from "../utils/JSONUtils";
import { JwtUtils } from "../utils/JwtUtils";
import { CittaController } from "../controller/CittaController";
import { Citta } from "../model/Citta";
import { Numeric } from "mssql";
import { RistoranteController } from "../controller/RistoranteController";
import { MenuController } from "../controller/MenuController";

const router = require("express").Router();

module.exports = router;

const traduttoreController: TraduttoreController = new TraduttoreController();
const lingueController: LinguaController = new LinguaController();
const provinceController : ProvinciaController = new ProvinciaController();
const cittaController: CittaController = new CittaController();
const ristoranteController: RistoranteController = new RistoranteController();
const menuController = new MenuController();


router.post("/login", async (req: any, res: any) => {
    const json = req.body;

    const email = JSONUtils.getProperty(json, "email", "");
    const password = JSONUtils.getProperty(json, "password", "");

    if (email == "" || password == "") return res.send({ "token": null });

    return Promise.resolve(traduttoreController.login(email, password))
        .then((result: Traduttore) => {
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

        return Promise.resolve(traduttoreController.get(decoded.sub))
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
    const revisore = JSONUtils.getProperty(json, "revisore", false);
    const numero_token = JSONUtils.getProperty(json, "numero_token", 0);
    const crypto = require("crypto").createHash("sha256");

    if (nome == "" || cognome == "" || email == "" || password == "") return res.send({ "error": "Errore" });

    const traduttore: Traduttore = {
        id: 0,
        nome: nome,
        cognome: cognome,
        email: email,
        password: crypto.update(password).digest("hex"),
        revisore: revisore,
        numero_token: numero_token,
        validato: false
    }

    return Promise.resolve(traduttoreController.create(traduttore))
        .then((result) => {
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

router.post("/verify-email", async (req: any, res: any) => {

    const json = req.body;

    const email = JSONUtils.getProperty(json, "email", "");
    const token = JSONUtils.getProperty(json, "token", "")

    if (email == "" || token == "") return res.send({ "result": "error" });

    JwtUtils.JWT.verify(token, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({ "result": "error" });
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "result": "error" });

        return traduttoreController.get(decoded.sub)
            .then((result) => {
                const codice = generateCode();

                const otp: OtpTraduttore = {
                    id: 0,
                    valore: codice,
                    valido: true,
                    id_traduttore: result.id
                }

                return Promise.resolve(traduttoreController.saveOtp(otp)).then((result) => {
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
                        return res.send({ "result": "error" });
                    })

                }).catch((error) => {
                    return res.send({ "result": "error" });
                })



            }).catch((error) => {
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

        return Promise.resolve(traduttoreController.get(decoded.sub))
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

        return Promise.resolve(traduttoreController.get(decoded.sub))
            .then((result) => {
                return Promise.resolve(traduttoreController.changeEmail(result.email, emailNuova)).then(() => {
                    return res.send({ "result": "OK" });
                }).catch(() => {
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

        return Promise.resolve(traduttoreController.get(decoded.sub))
            .then((result) => {
                return Promise.resolve(traduttoreController.checkOtp(valoreOtp, result.id)).then((result) => {
                    return Promise.resolve(traduttoreController.invalidateAllOtp(decoded.sub)).then(() => {
                        return Promise.resolve(traduttoreController.setValidated(decoded.sub)).then(() => {
                            return res.send({ "result": "OK" });
                        }).catch((e) => {
                            console.log(e);
                            return res.send({ "result": "error" });
                        })
                    }).catch((e) => {
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

function generateCode(): string {
    const min = 0;
    const max = 100000;
    let result = (Math.floor(Math.random() * (max - min)) + min).toString();

    while (result.length < 5) {
        result = "0" + result;
    }

    return result;

}


router.post("/profile", async (req: any, res: any) => {
    const json = req.body;

    const clientToken = JSONUtils.getProperty(json, "token", "");

    JwtUtils.JWT.verify(clientToken, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({ "result": "error" });
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "result": "error" });

        return Promise.resolve(traduttoreController.get(decoded.sub))
            .then((result) => {
                return res.send(result);
            }).catch((error) => {
                return res.send({ "result": "error" });
            });
    });
})

router.post("/profile/update", async (req: any, res: any) => {
    const json = req.body;

    const clientToken = JSONUtils.getProperty(json, "token", "");
    const nome = JSONUtils.getProperty(json, "nome", "");
    const cognome = JSONUtils.getProperty(json, "cognome", "")

    JwtUtils.JWT.verify(clientToken, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({ "result": "error" });
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "result": "error" });

        return Promise.resolve(traduttoreController.get(decoded.sub))
            .then((result) => {
                const newTraduttore: Traduttore = {
                    id: result.id,
                    nome: nome,
                    cognome: cognome,
                    email: result.email,
                    password: result.password,
                    numero_token: result.numero_token,
                    revisore: result.revisore,
                    validato: result.validato,
                    creato_il: result.creato_il,
                    modificato_il: new Date(),
                    cancellato_il: result.cancellato_il
                }
                traduttoreController.update(newTraduttore).then((resultUpdate)=>{
                    return res.send({ "result": resultUpdate });
                }).catch(()=>{
                    return res.send({ "result": "error" });
                })
                
            }).catch((error) => {
                return res.send({ "result": "error" });
            });
    });
})

router.post("/profile/languages/unknown", async (req: any, res: any) => {
    const json = req.body;

    const clientToken = JSONUtils.getProperty(json, "token", "");

    JwtUtils.JWT.verify(clientToken, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({ "result": "error" });
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "result": "error" });

        return Promise.resolve(traduttoreController.get(decoded.sub))
            .then((result) => {
                return Promise.resolve(traduttoreController.getAllLanguagesThatAreUnknownByTranslator(result.id)).then((result) => {
                    return res.send({ "result": result });
                }).catch((error) => {
                    console.error(error);
                    return res.send({ "result": "error" });
                })

            }).catch((error) => {
                console.error(error);
                return res.send({ "result": "error" });
            });
    });
})

router.post("/profile/languages/known", async (req: any, res: any) => {
    const json = req.body;

    const clientToken = JSONUtils.getProperty(json, "token", "");

    JwtUtils.JWT.verify(clientToken, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({ "result": "error" });
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "result": "error" });

        return Promise.resolve(traduttoreController.get(decoded.sub))
            .then((result) => {
                return Promise.resolve(traduttoreController.getAllLanguagesThatAreKnownByTranslator(result.id)).then((result) => {
                    return res.send({ "result": result });
                }).catch((error) => {
                    console.error(error);
                    return res.send({ "result": "error" });
                })

            }).catch((error) => {
                console.error(error);
                return res.send({ "result": "error" });
            });
    });
})

router.post("/profile/languages/add", async (req: any, res: any) => {
    const json = req.body;

    const lingua = JSONUtils.getProperty(json, "lingua", "");
    const clientToken = JSONUtils.getProperty(json, "token", "");

    if (lingua === "") return res.send({ "result": "error" });

    let id_lingua: number = -1;

    try {
        id_lingua = parseInt(lingua);
    } catch {
        return res.send({ "result": "error" });
    }

    JwtUtils.JWT.verify(clientToken, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({ "result": "error" });
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "result": "error" });

        return Promise.resolve(traduttoreController.get(decoded.sub))
            .then((result) => {
                return Promise.resolve(traduttoreController.setLanguageForTranslator(result.id, id_lingua)).then((result) => {
                    return res.send({"result": "OK"});
                }).catch((error) => {
                    console.error(error);
                    return res.send({ "result": "error" });
                })

            }).catch((error) => {
                console.error(error);
                return res.send({ "result": "error" });
            });
    });
})

router.post("/profile/languages/remove", async (req: any, res: any) => {
    const json = req.body;

    const lingua = JSONUtils.getProperty(json, "lingua", "");
    const clientToken = JSONUtils.getProperty(json, "token", "");

    if (lingua === "") return res.send({ "result": "error" });

    let id_lingua: number = -1;

    try {
        id_lingua = parseInt(lingua);
    } catch {
        return res.send({ "result": "error" });
    }

    JwtUtils.JWT.verify(clientToken, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({ "result": "error" });
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "result": "error" });

        return Promise.resolve(traduttoreController.get(decoded.sub))
            .then((result) => {
                return Promise.resolve(traduttoreController.removeLanguageForTranslator(result.id, id_lingua)).then((result) => {
                    return res.send({"result": "OK"});
                }).catch((error) => {
                    console.error(error);
                    return res.send({ "result": "error" });
                })

            }).catch((error) => {
                console.error(error);
                return res.send({ "result": "error" });
            });
    });
})


router.post("/profile/translations/all", async (req: any, res: any) => {
    const json = req.body;

    const clientToken = JSONUtils.getProperty(json, "token", "");

    JwtUtils.JWT.verify(clientToken, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({ "result": "error" });
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "result": "error" });

        return Promise.resolve(traduttoreController.get(decoded.sub))
            .then((result) => {
                return Promise.resolve(traduttoreController.getAllTranslations(result.id)).then((result) => {
                    console.log(result)
                    return res.send({ "result": result });
                }).catch((error) => {
                    console.error(error);
                    return res.send({ "result": "error" });
                })

            }).catch((error) => {
                console.error(error);
                return res.send({ "result": "error" });
            });
    });
})


router.post("/home/translations/progress/all", async (req: any, res: any) => {
    const json = req.body;

    const clientToken = JSONUtils.getProperty(json, "token", "");

    JwtUtils.JWT.verify(clientToken, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({ "result": "error" });
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "result": "error" });

        return Promise.resolve(traduttoreController.get(decoded.sub))
            .then((result) => {
                return Promise.resolve(traduttoreController.getAllTranslationsInProgress(result.id)).then((result) => {
                    console.log(result)
                    return res.send({ "result": result });
                }).catch((error) => {
                    console.error(error);
                    return res.send({ "result": "error" });
                })

            }).catch((error) => {
                console.error(error);
                return res.send({ "result": "error" });
            });
    });
})

router.post("/home/translations/review", async (req: any, res: any) => {
    const json = req.body;

    const clientToken = JSONUtils.getProperty(json, "token", "");

    JwtUtils.JWT.verify(clientToken, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({ "result": "error" });
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "result": "error" });

        return Promise.resolve(traduttoreController.get(decoded.sub))
            .then((result) => {
                return Promise.resolve(traduttoreController.getTranslationsToReview(result.id)).then((result) => {
                    console.log(result)
                    return res.send({ "result": result });
                }).catch((error) => {
                    console.error(error);
                    return res.send({ "result": "error" });
                })

            }).catch((error) => {
                console.error(error);
                return res.send({ "result": "error" });
            });
    });
})

router.post("/home/translations/update", async (req: any, res: any) => {
    const json = req.body;

    const clientToken = JSONUtils.getProperty(json, "token", "");
    const idTranslation = JSONUtils.getProperty(json, "id_translation", "");
    const textTranslated = JSONUtils.getProperty(json, "text_translated", "");

    if(!Number.isInteger(idTranslation)) return res.send({ "result": "error" });

    JwtUtils.JWT.verify(clientToken, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({ "result": "error" });
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "result": "error" });

        return Promise.resolve(traduttoreController.get(decoded.sub))
            .then((result) => {
                return Promise.resolve(traduttoreController.updateTranslation(idTranslation, textTranslated)).then((result) => {
                    console.log(result)
                    return res.send({ "result": "OK" });
                }).catch((error) => {
                    console.error(error);
                    return res.send({ "result": "error" });
                })

            }).catch((error) => {
                console.error(error);
                return res.send({ "result": "error" });
            });
    });
})


router.post("/home/translations/approve", async (req: any, res: any) => {
    const json = req.body;

    const clientToken = JSONUtils.getProperty(json, "token", "");
    const idTranslation = JSONUtils.getProperty(json, "id_translation", "");

    if(!Number.isInteger(idTranslation)) return res.send({ "result": "error" });

    JwtUtils.JWT.verify(clientToken, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({ "result": "error" });
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "result": "error" });

        return Promise.resolve(traduttoreController.get(decoded.sub))
            .then((result) => {
                return Promise.resolve(traduttoreController.approveTranslation(idTranslation, result.id)).then((result) => {
                    console.log(result)
                    return res.send({ "result": "OK" });
                }).catch((error) => {
                    //console.error(error);
                    return res.send({ "result": "error" });
                })

            }).catch((error) => {
                console.error(error);
                return res.send({ "result": "error" });
            });
    });
})

router.post("/home/translations/discard", async (req: any, res: any) => {
    const json = req.body;

    const clientToken = JSONUtils.getProperty(json, "token", "");
    const idTranslation = JSONUtils.getProperty(json, "id_translation", "");

    if(!Number.isInteger(idTranslation)) return res.send({ "result": "error" });

    JwtUtils.JWT.verify(clientToken, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({ "result": "error" });
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "result": "error" });

        return Promise.resolve(traduttoreController.get(decoded.sub))
            .then((result) => {
                return Promise.resolve(traduttoreController.discardTranslation(idTranslation, result.id)).then((result) => {
                    console.log(result)
                    return res.send({ "result": "OK" });
                }).catch((error) => {
                    console.error(error);
                    return res.send({ "result": "error" });
                })

            }).catch((error) => {
                console.error(error);
                return res.send({ "result": "error" });
            });
    });
})

router.post("/translations/provinces/all", async (req: any, res: any) => {
    const json = req.body;

    const clientToken = JSONUtils.getProperty(json, "token", "");

    JwtUtils.JWT.verify(clientToken, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({ "result": "error" });
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "result": "error" });

        return Promise.resolve(traduttoreController.get(decoded.sub))
            .then((result) => {
                return Promise.resolve(provinceController.getAll()).then((result) => {
                    return res.send({ "result": result });
                }).catch((error) => {
                    console.error(error);
                    return res.send({ "result": "error" });
                })

            }).catch((error) => {
                console.error(error);
                return res.send({ "result": "error" });
            });
    });
})

router.post("/translations/province/cities/all", async (req: any, res: any) => {
    const json = req.body;

    const clientToken = JSONUtils.getProperty(json, "token", "");
    const id_provincia = JSONUtils.getProperty(json, "id_provincia", "");

    if(!Number.isInteger(id_provincia)) return res.send({ "result": "error" });

    JwtUtils.JWT.verify(clientToken, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({ "result": "error" });
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "result": "error" });

        return Promise.resolve(traduttoreController.get(decoded.sub))
            .then((result) => {
                return Promise.resolve(cittaController.getCitiesByProvinceId(id_provincia)).then((result) => {
                    return res.send({ "result": result });
                }).catch((error) => {
                    console.error(error);
                    return res.send({ "result": "error" });
                })

            }).catch((error) => {
                console.error(error);
                return res.send({ "result": "error" });
            });
    });
})

router.post("/translations/province/city/restaurants", async (req: any, res: any) => {
    const json = req.body;

    const clientToken = JSONUtils.getProperty(json, "token", "");
    const id_citta = JSONUtils.getProperty(json, "id_citta", "");

    if(!Number.isInteger(id_citta)) return res.send({ "result": "error" });

    JwtUtils.JWT.verify(clientToken, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({ "result": "error" });
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "result": "error" });

        return Promise.resolve(traduttoreController.get(decoded.sub))
            .then((result) => {
                return Promise.resolve(ristoranteController.getRestaurantsByCityId(id_citta)).then((result) => {
                    return res.send({ "result": result });
                }).catch((error) => {
                    console.error(error);
                    return res.send({ "result": "error" });
                })

            }).catch((error) => {
                console.error(error);
                return res.send({ "result": "error" });
            });
    });
})

router.post("/translations/menu", async (req: any, res: any) => {
    const json = req.body;

    const clientToken = JSONUtils.getProperty(json, "token", "");
    const id_citta = JSONUtils.getProperty(json, "id_citta", null);
    const id_provincia = JSONUtils.getProperty(json, "id_provincia", null);
    const id_ristorante = JSONUtils.getProperty(json, "id_ristorante", null);

    if(id_provincia === null || !Number.isInteger(id_provincia)) return res.send({ "result": "error" });
    if(id_citta !== null && !Number.isInteger(id_citta)) return res.send({ "result": "error" });
    if(id_ristorante !== null && !Number.isInteger(id_ristorante)) return res.send({ "result": "error" });

    JwtUtils.JWT.verify(clientToken, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({ "result": "error" });
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "result": "error" });

        return Promise.resolve(traduttoreController.get(decoded.sub))
            .then((result) => {
                if(id_citta === null){
                    return Promise.resolve(menuController.getMenusToTranslateByProvinceId(id_provincia, result.id)).then((result) => {
                        return res.send({ "result": result });
                    }).catch((error) => {
                        console.error(error);
                        return res.send({ "result": "error" });
                    })
                } else if(id_ristorante === null){
                    return Promise.resolve(menuController.getMenusToTranslateByCityId(id_citta, result.id)).then((result) => {
                        return res.send({ "result": result });
                    }).catch((error) => {
                        console.error(error);
                        return res.send({ "result": "error" });
                    })
                } else {
                    return Promise.resolve(menuController.getMenusToTranslateByRestaurantId(id_ristorante, result.id)).then((result) => {
                        return res.send({ "result": result });
                    }).catch((error) => {
                        console.error(error);
                        return res.send({ "result": "error" });
                    })
                }
                

            }).catch((error) => {
                console.error(error);
                return res.send({ "result": "error" });
            });
    });
})

router.post("/translations/menu/strings-to-translate", async (req: any, res: any) => {
    const json = req.body;

    const clientToken = JSONUtils.getProperty(json, "token", "");
    const id_menu = JSONUtils.getProperty(json, "id_menu", "");
    const id_lingua = JSONUtils.getProperty(json, "id_lingua", "");

    if(!Number.isInteger(id_menu)) return res.send({ "result": "error" });
    if(!Number.isInteger(id_lingua)) return res.send({ "result": "error" });

    JwtUtils.JWT.verify(clientToken, JwtUtils.PUBLIC_KEY, function (err: any, decoded: any) {
        if (err) return res.send({ "result": "error" });
        if (decoded.exp - Math.floor(Date.now() / 1000) < 0) return res.send({ "result": "error" });

        return Promise.resolve(traduttoreController.get(decoded.sub))
            .then((result) => {
                return Promise.resolve(menuController.setStringsToTranslate(id_menu, id_lingua, result.id)).then(()=>{
                    return res.send({ "result": "OK" });
                }).catch((e)=>{
                    console.log(e);
                    res.send({ "result": "error" });
                })
                

            }).catch((error) => {
                console.error(error);
                return res.send({ "result": "error" });
            });
    });
})