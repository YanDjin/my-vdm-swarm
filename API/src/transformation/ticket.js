const {ticketModelOptions} = require('../models/ticket');

const ticketTransformation = {
    'Civilite': ticketModelOptions.civility,
    'VR': ticketModelOptions.simpleChoice,
    'Tarif': ticketModelOptions.tarifs
}

module.exports = ticketTransformation;