/* import { getFiles } from "../utils/images";
import Router from "express";
import { createPdf, getPDFs, deletePdf, get} from "../controllers/pdf.controller";
import { asureAuth } from "../middlewares/authenticated";
import multipart from "connect-multiparty";
import cloudinaryConfig from "../utils/cludinary"; */

const { getFiles } = require("../utils/images");
const Router = require("express");
const { createPdf, getPDFs, deletePdf, get} = require("../controllers/pdf.controller");
const  auth  = require("../middlewares/authenticated");
const multipart = require("connect-multiparty");
const cloudinaryConfig = require("../utils/cludinary");


const router = Router();
const md_upload = multipart({uploadDir: "./uploads"});


router.post("/add", [auth.asureAuth, cloudinaryConfig, md_upload], createPdf); //http://localhost:3000/pdf/create
router.get("/added", [auth.asureAuth], createPdf); //http://localhost:3000/pdf/create
router.get("/pdf/:id", [auth.asureAuth], get); //http://localhost:3000/pdf/get/5f9f1b0b0b9b2c1e1c8c1b5a
router.get("/get", [auth.asureAuth], getPDFs); //http://localhost:3000/pdf/get
router.delete("/delete/:id", [auth.asureAuth], deletePdf); //http://localhost:3000/pdf/delete/5f9f1b0b0b9b2c1e1c8c1b5a



module.exports = router;