const Joi = require("@hapi/joi");

const authenticationSchema = Joi.object({
      Email: Joi.string().email().required(),
      Password: Joi.string().pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/).min(6).max(255).required()
  })
;

module.exports = authenticationSchema;