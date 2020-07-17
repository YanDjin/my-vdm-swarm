const Joi = require("@hapi/joi");
const {ticketModelOptions} = require('../models/ticket');

// allowed options
const {civility, simpleChoice} = ticketModelOptions;

const ticketSchema = Joi.object({
    Acheteur: {
        Civilite: Joi.string().valid(...Object.values(civility)).required(),
        Nom: Joi.string().min(3).max(255).required(),
        Prenom: Joi.string().min(3).max(255).required(),
        Age: Joi.number().integer().min(4).max(120).required(),
        Email: Joi.string().email().required()
    },
    Game: {
        Nom: Joi.string().min(3).max(255).required(),
        Jour: Joi.date().required(),
        Horaire: Joi.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(), // time regex
        VR: Joi.string().valid(...Object.values(simpleChoice)).required()
    },
    Reservation: Joi.array().items(
      {
          Spectateur: {
              Civilite: Joi.string().valid(...Object.values(civility)).required(),
              Nom: Joi.string().min(3).max(255).required(),
              Prenom: Joi.string().min(3).max(255).required(),
              Age: Joi.number().integer().min(1).max(120).required()
          },
          Tarif: Joi.string().min(3).max(255).required()
      }
    )
});

module.exports = ticketSchema;