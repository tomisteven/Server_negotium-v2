/* import { Router } from "express";
import { asureAuth } from "../middlewares/authenticated";
import { createRecordatorio, getRecordatorios, updateRecordatorio, deleteRecordatorio } from "../controllers/recordatorios.controller"; */

const { Router } = require("express");
const { asureAuth } = require("../middlewares/authenticated");
const { createRecordatorio, getRecordatorios, updateRecordatorio, deleteRecordatorio, toggleRecordatorio } = require("../controllers/recordatorios.controller");



const router = Router();


router.get("/", [asureAuth], getRecordatorios);

router.post("/create", [asureAuth], createRecordatorio);

router.patch("/update/:id", [asureAuth], updateRecordatorio);
router.patch("/toggle/:id", [asureAuth], toggleRecordatorio);

router.delete("/delete/:id", [asureAuth], deleteRecordatorio);



module.exports = router;