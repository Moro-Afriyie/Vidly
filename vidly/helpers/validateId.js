const Joi = require("joi");

const validateId = (movie) => {
  const schema = Joi.object({
    Id: Joi.objectId(),
  });

  return schema.validate(movie);
};

module.exports.validateId = validateId;
