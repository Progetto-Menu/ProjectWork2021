import { AmministratoreController } from "../controller/AmministratoreController";
import { Amministratore } from "../model/Amministratore";
import { JSONUtils } from "../utils/JSONUtils";

const router = require("express").Router();

module.exports = router;

const amministratoreController: AmministratoreController = new AmministratoreController();

router.get("/all", (req: any, res: any) => {
    return res.send("ciao");
    //amministratoreController.getAll();
})

router.get("/view/:id", (req: any, res: any) => {
    return res.send("ciao");
    //amministratoreController.get(1);
})

router.put("/update/:id", (req: any, res: any) => {
    return res.send("ciao");
    //amministratoreController.update(req.body.ristoratore)
})

router.delete("/delete/:id", (req: any, res: any) => {
    return res.send("ciao");
    //amministratoreController.delete(req.body.ristoratore);
})

router.post("/create", (req: any, res: any) => {
    const requestObject: Object = req.body;

    const amministratore: Amministratore = {
        id: 0,
        nome: JSONUtils.getProperty(requestObject, "nome", "X"),
        cognome: JSONUtils.getProperty(requestObject, "cognome", "Y"),
        email: JSONUtils.getProperty(requestObject, "email", "X@gmail.com"),
        password: JSONUtils.getProperty(requestObject, "password", "XYZ"),
    }

    return Promise.resolve(amministratoreController.create(amministratore)).then((result) => {
        return res.send(result);
    }).catch((error) => {
        return res.send("Errore");
    });
})