/* import { Router } from "express";
import {itemService, getServices, createService, deleteService} from "../controllers/services.controller";
import { asureAuth } from "../middlewares/authenticated"; */

const { Router } = require('express');
const {itemService, getServices, createService, deleteService, toggleService, updateService} = require('../controllers/services.controller');
const { asureAuth } = require('../middlewares/authenticated');


const router = Router();


router.get("/", [asureAuth], getServices);
router.get("/items", asureAuth, itemService);

router.patch("/toggle/:id", asureAuth, toggleService);
router.patch("/update/:id", asureAuth, updateService);

router.post("/create", asureAuth, createService);

router.delete("/delete/:id", asureAuth, deleteService)

//router.get("/all", asureAuth, all)


module.exports = router;