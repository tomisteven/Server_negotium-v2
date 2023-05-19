const axios = require("axios");
const dotenv = require('dotenv');
dotenv.config();

class PaymentService {
  async createPayment(req, res, data) {
    const url = "https://api.mercadopago.com/checkout/preferences";
    const {id_token} = req.params;
    const users = await data.find();
    const user = users.find((user) => user._id == id_token);
    if(user){
      const payment = await axios.post(url, req.body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      })
      return payment.data;
    }else{
      res.status(404).json({ error: "User not found" });
    }
  }

  async createSubscription(req, res, User) {
    const url = "https://api.mercadopago.com/preapproval";





    const { id_token } = req.params;
    const users = await User.find();
    const user = users.find((user) => user._id == id_token);
    const {tipo, price} = req.query
    console.log(tipo, price, user.email);

    const body = 	{
      reason: tipo ,
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: price,
        currency_id: "ARS"
      },
      back_url: "https://www.mercadolibre.com.ar/",
      payer_email: user.email
    }

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