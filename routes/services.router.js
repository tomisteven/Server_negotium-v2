/* import { Router } from "express";
import {itemService, getServices, createService, deleteService} from "../controllers/services.controller";
import { asureAuth } from "../middlewares/authenticated"; */

const { Router } = require('express');
const {itemService, getServices, createService, deleteService} = require('../controllers/services.controller');
const { asureAuth } = require('../middlewares/authenticated');


const router = Router();


router.get("/", [asureAuth], getServices);
router.get("/items", asureAuth, itemService);

router.post("/create", asureAuth, createService);

router.delete("/delete/:id", asureAuth, deleteService)

//router.get("/all", asureAuth, all)


module.exports = router;