const mongoose = require('mongoose');

// equivalent of integer options in the database
const civility = {0: 'Monsieur', 1: 'Madame'};

const schema = new mongoose.Schema({
    Email: {type: String, required: true, unique: true},
    Password: {type: String, required: true, min: 6, max: 255},
    Civilite: {type: Number, required: true, integer: true},
    Nom: {type: String, required: true},
    Prenom: {type: String, required: true},
    Age: {type: Number, required: true, integer: true},
    // Role: {type: Number, required: true}
})

module.exports = {
    UserModel: mongoose.model('User', schema, 'users'),
    userModelOptions: {civility}
};