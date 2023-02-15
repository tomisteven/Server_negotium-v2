/* import { Router} from "express";
import {testCloudinary, getNews, deleteNew } from "../controllers/publicaciones.controller";
import multipart from "connect-multiparty";
import { asureAuth } from "../middlewares/authenticated";
import cloudinaryConfig from "../utils/cludinary";
 */

const { Router } = require('express');
const { createPublicacionAndImage,getNews, deleteNew } = require('../controllers/publicaciones.controller');
const multipart = require('connect-multiparty');
const { asureAuth } = require('../middlewares/authenticated');
const cloudinaryConfig = require('../utils/cludinary');


const router = Router();
const multipartMiddleware = multipart({uploadDir: './uploads'});


router.post('/create',[ cloudinaryConfig, asureAuth, multipartMiddleware], createPublicacionAndImage)
router.get('/get', [asureAuth], getNews)
router.delete('/delete/:id', [asureAuth, cloudinaryConfig], deleteNew)

module.exports = router;