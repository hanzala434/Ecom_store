const mongoose = require("mongoose");

const CreditCardSchema = new mongoose.Schema(
  {
    userId: String,
    cardNumber: String,
    cardName: String,
    expMonth: String,
    expYear: String,
    cvv: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("CreditCard", CreditCardSchema);