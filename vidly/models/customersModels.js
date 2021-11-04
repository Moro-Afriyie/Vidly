const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  isGold: { type: Boolean, required: true, default: false },
  name: { type: String, required: true },
  phone: { type: String, required: true },
});

const Customer = mongoose.model("Customers", customerSchema);

const validateCustomer = (customer) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(5).max(50).required(),

    phone: Joi.string().min(5).max(50).required(),

    isGold: Joi.boolean(),
  });

  return schema.validate(customer);
};

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;
