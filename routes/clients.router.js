const Router = require("express");
const {getAllClients, getClientConDeuda, getClientSinDeuda,createClient, getServicesOfClient, getClient, addServiceFuture,updateClient, deleteClient, deleteServiceClient, addService,deleteServiceFutureClient, updateUsernamePassword, loginClient, getServicesFuturesOfClient, urlLoginClient, clientesConDeudaItem, clientesSinDeudaItem, getClientX, addDeuda, deleteDeuda, completeServiceFuture, allServicesOfAllClients } = require("../controllers/client.controller");
const { asureAuth, tokenClient } = require("../middlewares/authenticated");
const multipart = require("connect-multiparty");
const nodemailer = require('nodemailer');

const md_upload = multipart({uploadDir: "./uploads"});;
const router = Router();



/* enviar email */


router.get("/all/services", [asureAuth], allServicesOfAllClients);

router.post("/create", [asureAuth], createClient);
router.post("/create/futureservice/:id", asureAuth, addServiceFuture);
router.post("/create/service/:id", [asureAuth], addService); //addService
router.post("/login/:id", loginClient);

router.patch("/create/deuda/:id", [asureAuth], addDeuda);
router.patch("/delete/deuda/:id", [asureAuth], deleteDeuda);
router.patch("/complete/futureservice/:id/:id_service", [asureAuth], completeServiceFuture);
router.patch("/update/:id", [asureAuth], updateClient);
router.patch("/update/username/:id", [asureAuth], updateUsernamePassword);

router.get("/all",[asureAuth], getAllClients);
router.get("/:id", [asureAuth], getClient);
router.get("/clientes/deudores", [asureAuth], getClientConDeuda);
router.get("/clientes/sinDeuda", [asureAuth], getClientSinDeuda);
router.get("/servicios/:id", [asureAuth], getServicesOfClient);
router.get("/futureservices/:id", [asureAuth], getServicesFuturesOfClient);
router.get("/url/get", [asureAuth], urlLoginClient)
router.get("/item/deudores", [asureAuth], clientesConDeudaItem)
router.get("/item/nodeudores", [asureAuth], clientesSinDeudaItem)
router.get("/genero/x", [asureAuth], getClientX)

router.delete("/delete/:id", [asureAuth], deleteClient);
router.delete("/delete/service/:id/:service_id", [asureAuth], deleteServiceClient);
router.delete("/delete/servicefuture/:id/:service_id", [asureAuth], deleteServiceFutureClient);



module.exports = router;
