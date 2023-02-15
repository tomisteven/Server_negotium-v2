/* import  {Router}  from "express";
import {getMe, getAll, updateUser,deleteUser, getMembresiaActive, getMembresiaInactive, createUser, createUrlLogin
} from "../controllers/user.controller";
import multipart from "connect-multiparty";
import {asureAuth} from "../middlewares/authenticated";
import cloudinaryConfig from "../utils/cludinary"; */

const Router = require("express");
const {getMe, getAll, updateUser,deleteUser, getMembresiaActive, getMembresiaInactive, createUser, createUrlLogin} = require("../controllers/user.controller");
const multipart = require("connect-multiparty");
const {asureAuth} = require("../middlewares/authenticated");
const cloudinaryConfig = require("../utils/cludinary");


const router = Router();

const md_upload = multipart({uploadDir: "src/uploads/avatar"});

router.get("/user/me",[asureAuth], getMe);
router.get("/users",[asureAuth] , getAll);
router.get("/users/actives", [asureAuth], getMembresiaActive);
router.get("/users/inactive", [asureAuth], getMembresiaInactive);

router.post("/user", [asureAuth, md_upload], createUser);

router.patch("/user/:id", [asureAuth, md_upload, cloudinaryConfig], updateUser);

router.delete("/user/:id", [asureAuth], deleteUser);

router.get("/createurl", asureAuth, createUrlLogin)

module.exports = router;