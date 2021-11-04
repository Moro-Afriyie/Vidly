const express = require("express");
const router = express.Router();
const Customer = require("../models/customersModels");

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

router.post("/", (req, res) => {
  if (!req.body.name) {
    return res.status(400).send("Enter a valid customer ");
  }
  const customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });
  customer.save();
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
