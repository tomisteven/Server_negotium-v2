const User = require("../models/user");


class PaymentController {
  constructor(substriptionService) {
    this.subscriptionService = substriptionService;
  }

  // crear link de pago
  async getPaymentLink(req, res) {
    try {
      const payment = await this.subscriptionService.createPayment(req, res, User);
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error);
    }
  }

  // Subscription mensual anual
  async getSubscriptionLink(req, res) {
    try {
      const subscription = await this.subscriptionService.createSubscription(
        req,
        res,
        User
      );
      res.status(200).json(subscription);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error);
    }
  }
}

module.exports = PaymentController;
