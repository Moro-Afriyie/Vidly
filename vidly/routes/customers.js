const express = require("express");
const router = express.Router();
const { Customer, validateCustomer } = require("../models/customersModels");

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find({}).sort("name");
    res.send(customers);
  } catch (error) {
    res.send("an error occured");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).send("The customer you entered does not exist ");
    }
    res.send(customer);
  } catch (error) {
    res.status(404).send("The customer you entered does not exist ");
  }
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });
  await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone,
    },
    { new: true }
  );
  if (!customer) {
    return res.status(404).send("The customer you entered does not exist ");
  }
  res.status(200).send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) {
    return res.status(404).send("The customer you entered does not exist ");
  }
  res.status(200).send("customer deleted succesfully");
});

module.exports = router;
