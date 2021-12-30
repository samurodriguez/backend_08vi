const Joi = require("joi");

const createEntrySchema = Joi.object({
  place: Joi.string().min(1).max(50).required(),
  description: Joi.string().min(1).max(500).required(),
});

module.exports = createEntrySchema;
