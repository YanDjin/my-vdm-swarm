const express = require("express");
// const mongoose = require('mongoose');
const validationMiddleware = require('../middleware/validation');
const transformationMiddleware = require('../middleware/transformation');
const validationSchema = require('../validation/ticket');
const ticketTransformation = require('../transformation/ticket');
const {TicketModel, addFields} = require('../models/ticket');
const {ClientModel} = require('../models/client');

const router = express.Router();

const saveTicket = (ticket, res) => {
    ticket.save().then(dbres => {
        res.json({message: 'ticket saved successfully'});
    }).catch(dberr => {
        res.status(500).json({message: "internal server error"});
    });
}

router.post("/", validationMiddleware(validationSchema), transformationMiddleware(ticketTransformation), (req, res) => {
    const {prices} = addFields;
    for (let i = 0; i < req.body.Reservation.length; i++) {
        let price;
        if (prices[req.body.Reservation[i].Tarif]) price = prices[req.body.Reservation[i].Tarif];
        else price = prices[parseInt(req.body.Reservation[i].Tarif)];
        req.body.Reservation[i].Price = price;
    }
    const ticket = new TicketModel({...req.body});
    ClientModel.findOne({"Email": req.body.Acheteur.Email}).exec((err, foundClient) => {
        if (err) console.error(err);
        const clientGame = {...req.body.Game};
        clientGame['Reservation'] = [...req.body.Reservation];
        if (foundClient) {
            foundClient.Games.push(clientGame);
            foundClient.save().then(dbres => {
                saveTicket(ticket, res);
            }).catch(dberr => {
                res.status(500).json({message: "internal server error"});
            });
        } else {
            const clientData = {...req.body.Acheteur};
            clientData['Games'] = [{...clientGame}];
            const client = new ClientModel({...clientData});
            client.save().then(dbres => {
                saveTicket(ticket, res);
            }).catch(dberr => {
                res.status(500).json({message: "internal server error"});
            });
        }
    })
});

module.exports = router;
