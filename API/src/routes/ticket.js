const express = require("express");
// const mongoose = require('mongoose');
const validationMiddleware = require('../middleware/validation');
const transformationMiddleware = require('../middleware/transformation');
const validationSchema = require('../validation/ticket');
const ticketTransformation = require('../transformation/ticket');
const {TicketModel} = require('../models/ticket');

const router = express.Router();

router.post("/", validationMiddleware(validationSchema), transformationMiddleware(ticketTransformation), (req, res) => {
    // TicketModel.findOne({"Acheteur.Email": "kathryne.devyn@gogole.com"}).exec((err, ticket) => {
    //     if (err) {
    //         console.error(err);
    //     }
    //     if (ticket) {
    //         res.status(400).json({message: 'user email exists'});
    //     } else {
    //         res.json({message: req.body});
    //     }
    // });
    const ticket = new TicketModel({
        ...req.body
    });
    ticket.save().then(res => {
        res.json({message: 'ticket saved successfully'});
    }).catch(err => {
        res.status(500).json({message: "internal server error"});
    });
});

module.exports = router;
