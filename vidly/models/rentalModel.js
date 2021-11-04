const Joi = require("joi");
const mongoose = require("mongoose");

const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        isGold: { type: Boolean, default: false },
        name: { type: String, required: true },
        phone: { type: String, required: true },
      }),
      required: true,
    },
    movie: {
      type: new mongoose.Schema({
        title: { type: String, required: true, trim: true },
        dailyRentalRate: {
          type: Number,
          required: true,
          default: 0,
          min: 0,
          max: 500,
        },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateReturned: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
  })
);

const validateRental = (rental) => {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  });

  return schema.validate(rental);
};

module.exports = { validateRental, Rental };
