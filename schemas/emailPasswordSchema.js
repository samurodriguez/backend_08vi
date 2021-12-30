const Joi = require("joi");

const emailPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "[description] is required",
    "string.empty": "[description] is required",
  }),
  password: Joi.string().min(5).max(30).required(),
});

module.exports = emailPasswordSchema;
