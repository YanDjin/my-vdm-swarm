const mongoose = require('mongoose');

// equivalent of integer options in the database
const civility = {0: 'Monsieur', 1: 'Madame'};
const simpleChoice = {0: 'Oui', 1: 'Non'};
const tarifs = {0: 'Senior', 1: 'Tarif etudiant', 2: 'Plein tarif', 3: 'Tarif reduit'};
const prices = {0: 7, 1: 7, 2: 10, 3: 8};

const schema = new mongoose.Schema({
    Civilite: {type: Number, required: true, integer: true},
    Nom: {type: String, required: true},
    Prenom: {type: String, required: true},
    Age: {type: Number, required: true, integer: true},
    Email: {type: String, required: true},
    Games: [
        {
            Nom: String,
            Jour: Date,
            Horaire: String,
            VR: {type: Number, required: true, integer: true},
            Reservation: [
                {
                    Spectateur: {
                        Civilite: {type: Number, required: true, integer: true},
                        Nom: {type: String, required: true},
                        Prenom: {type: String, required: true},
                        Age: {type: Number, required: true, integer: true}
                    },
                    Tarif: {type: Number, required: true},
                    Price: {type: Number, required: true}
                }
            ]
        }
    ]
})

module.exports = {
    ClientModel: mongoose.model('Client', schema, 'clients'),
    clientModelOptions: {civility, simpleChoice, tarifs},
    addFields: {prices}
};