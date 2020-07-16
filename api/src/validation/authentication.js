const Joi = require("@hapi/joi");
const {userModelOptions} = require('../models/user');

// allowed options
const {civility} = userModelOptions;

const ticketSchema = Joi.object({
      Email: Joi.string().email().required(),
      Password: Joi.string().pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/).min(6).max(255).required(),
      Civilite: Joi.string().valid(...Object.values(civility)).required(),
      Nom: Joi.string().min(3).max(255).required(),
      Prenom: Joi.string().min(3).max(255).required(),
      Age: Joi.number().integer().min(16).max(120).required(),
  })
;

module.exports = ticketSchema;