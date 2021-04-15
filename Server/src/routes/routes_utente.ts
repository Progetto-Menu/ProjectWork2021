import { CittaController } from "../controller/CittaController";
import { MenuController } from "../controller/MenuController";
import { ProvinciaController } from "../controller/ProvinciaController";
import { RistoranteController } from "../controller/RistoranteController";
import { JSONUtils } from "../utils/JSONUtils";

const router = require("express").Router();

module.exports = router;

const menuController = new MenuController();
const cittaController = new CittaController();
const provinceController = new ProvinciaController();
const ristoranteController = new RistoranteController();


router.post("/home/provinces/all", async (req: any, res: any) => {
    const json = req.body;

    return Promise.resolve(provinceController.getAll()).then((result) => {
        return res.send({ "result": result });
    }).catch((error) => {
        console.error(error);
        return res.send({ "result": "error" });
    })
})

router.post("/home/province/cities/all", async (req: any, res: any) => {
    const json = req.body;

    const id_provincia = JSONUtils.getProperty(json, "id_provincia", "");

    if (!Number.isInteger(id_provincia)) return res.send({ "result": "error" });

    return Promise.resolve(cittaController.getCitiesByProvinceId(id_provincia)).then((result) => {
        return res.send({ "result": result });
    }).catch((error) => {
        console.error(error);
        return res.send({ "result": "error" });
    })
})

router.post("/home/province/city/restaurants", async (req: any, res: any) => {
    const json = req.body;

    const clientToken = JSONUtils.getProperty(json, "token", "");
    const id_citta = JSONUtils.getProperty(json, "id_citta", "");

    if (!Number.isInteger(id_citta)) return res.send({ "result": "error" });

    return Promise.resolve(ristoranteController.getRestaurantsByCityId(id_citta)).then((result) => {
        return res.send({ "result": result });
    }).catch((error) => {
        console.error(error);
        return res.send({ "result": "error" });
    })
})

router.post("/translations/menu", async (req: any, res: any) => {
    const json = req.body;

    const id_citta = JSONUtils.getProperty(json, "id_citta", null);
    const id_provincia = JSONUtils.getProperty(json, "id_provincia", null);
    const id_ristorante = JSONUtils.getProperty(json, "id_ristorante", null);
    const cod_lingua = JSONUtils.getProperty(json, "cod_lingua", "");

    if (id_provincia === null || !Number.isInteger(id_provincia)) return res.send({ "result": "error" });
    if (id_citta !== null && !Number.isInteger(id_citta)) return res.send({ "result": "error" });
    if (id_ristorante !== null && !Number.isInteger(id_ristorante)) return res.send({ "result": "error" });
    if (cod_lingua === "") return res.send({ "result": "error" });

    if (id_citta === null) {
        return Promise.resolve(menuController.getMenusByProvinceId(id_provincia, cod_lingua)).then((result) => {
            return res.send({ "result": result });
        }).catch((error) => {
            console.error(error);
            return res.send({ "result": "error" });
        })
    } else if (id_ristorante === null) {
        return Promise.resolve(menuController.getMenusByCityId(id_citta, cod_lingua)).then((result) => {
            return res.send({ "result": result });
        }).catch((error) => {
            console.error(error);
            return res.send({ "result": "error" });
        })
    } else {
        return Promise.resolve(menuController.getMenusByRestaurantId(id_ristorante, cod_lingua)).then((result) => {
            return res.send({ "result": result });
        }).catch((error) => {
            console.error(error);
            return res.send({ "result": "error" });
        })
    }

})