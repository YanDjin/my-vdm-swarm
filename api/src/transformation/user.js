const {userModelOptions} = require('../models/user');

const ticketTransformation = {
    'Civilite': userModelOptions.civility
}

module.exports = ticketTransformation;