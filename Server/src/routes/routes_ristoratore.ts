import { RistoratoreController } from "../controller/RistoratoreController";

const router = require("express").Router();

module.exports = router;

const ristoratoreController: RistoratoreController = new RistoratoreController();

router.post("/login")

router.get("/all", (req:any, res:any) =>{
    ristoratoreController.getAll();
})

router.get("/view/:id", (req:any, res:any) =>{
    ristoratoreController.get(1);
})

router.put("/update/:id", (req:any, res:any) =>{
    ristoratoreController.update(req.body.ristoratore)
})

router.delete("/delete/:id", (req:any, res:any) =>{
    ristoratoreController.delete(req.body.ristoratore);
})

router.post("/create", (req:any, res:any) =>{
    ristoratoreController.create(req.body.ristoratore);
})