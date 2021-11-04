const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  isGold: { type: Boolean, required: true, default: false },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

const Customer = mongoose.model("Customers", customerSchema);

module.exports = Customer;
