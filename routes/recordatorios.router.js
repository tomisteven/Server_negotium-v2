

const { Router } = require("express");
const { asureAuth } = require("../middlewares/authenticated");
const { createRecordatorio, getRecordatorios, updateRecordatorio, deleteRecordatorio, toggleRecordatorio,completeAllAlerts, deleteAllRecordatorios } = require("../controllers/recordatorios.controller");



const router = Router();


router.get("/", [asureAuth], getRecordatorios);

router.post("/create", [asureAuth], createRecordatorio);

router.patch("/update/:id", [asureAuth], updateRecordatorio);
router.patch("/toggle/:id", [asureAuth], toggleRecordatorio);

router.delete("/delete/:id", [asureAuth], deleteRecordatorio);
router.delete("/all", [asureAuth], deleteAllRecordatorios);

router.patch("/complete/all", [asureAuth],completeAllAlerts)


module.exports = router;