/*
import { Router } from "express";
import { get, newMessage } from "../controllers/supportMessages.controller.js";
import { tokTom } from "../middlewares/authenticated";
 */

const { Router } = require('express');
const { get, newMessage } = require('../controllers/supportMessages.controller');
const { tokTom } = require('../middlewares/authenticated');

const router = Router();

router.get("/", tokTom , get)
router.post("/new", newMessage)


module.exports = router;