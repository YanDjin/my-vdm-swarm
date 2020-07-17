const {userModelOptions} = require('../models/user');

const userTransformation = {
    'Civilite': userModelOptions.civility
}

module.exports = userTransformation;