/* import  {Router}  from "express";
//importamos el controlador
import {
    register,
    login,
    refreshToken
} from "../controllers/auth.controller";
import multipart from "connect-multiparty";
import configCloudinary from "../utils/cludinary"; */

const Router = require("express");
//importamos el controlador
const {register, login, refreshToken} = require("../controllers/auth.controller");
const multipart = require("connect-multiparty");
const {configCloudinary} = require("../utils/cludinary");



const router = Router();
const md_upload = multipart({uploadDir: "./uploads"});;


//rutas de la api
router.post("/register" ,register);
router.post("/login", login);
router.post("/refresh_access_token", refreshToken);




module.exports = router;