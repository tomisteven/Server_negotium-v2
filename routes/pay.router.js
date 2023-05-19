const express = require("express");
const router = express.Router();

const PaymentController = require("../controllers/paymentController");
const PaymentServices = require("./Services/PaymentService");
const PaymentInstance = new PaymentController(new PaymentServices());

/* GET home page. */

router.get("/", (req, res) => {
    res.json({ message: "Bienvenido a la API de Mercado Pago" });
});

router.get("/payment/:id_token",   (req, res) => {
  PaymentInstance.getPaymentLink(req, res);
});

router.get("/subscription/:id_token",(req, res) => {
  PaymentInstance.getSubscriptionLink(req, res);
});

module.exports = router;
