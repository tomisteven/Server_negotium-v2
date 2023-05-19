const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

class PaymentService {
  async createPayment(req, res, data) {
    const url = "https://api.mercadopago.com/checkout/preferences";
    const { id_token } = req.params;
    const { product, price } = req.query;
    const precio = parseInt(price);
     const body = {
      payer_email: "",
      items: [
        {
          title: product,
          description: "Negotium Subscription",
          picture_url:
            "https://res.cloudinary.com/ds5uizeqg/image/upload/v1684429646/logo_clasico_mgsuf3.png",
          category_id: "Subscripcion",
          quantity: 1,
          unit_price: precio,
        },
      ],
      back_urls: {
        failure: "/failure",
        pending: "/pending",
        success: "http://localhost:3000/admin/planes",
      },
    };

    const users = await data.find();
    const user = users.find((user) => user._id == id_token);
    if (user) {
      const payment = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      });
      return payment.data;
    } else {
      res.status(404).json({ error: "User not found" });
    }
  }

  async createSubscription(req, res, User) {
    const url = "https://api.mercadopago.com/preapproval";

    const { id_token } = req.params;
    const users = await User.find();
    const user = users.find((user) => user._id == id_token);
    const { tipo, price } = req.query;
    console.log(tipo, price, user.email);

    const body = {
      reason: tipo,
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: price,
        currency_id: "ARS",
      },
      back_url: "https://tomsteven.netlify.app/",
      payer_email: user.email,
    };

    if (user) {
      const subscription = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      });

      return subscription.data;
    } else {
      res.status(404).json({ error: "User not found" });
    }
  }
}

module.exports = PaymentService;
