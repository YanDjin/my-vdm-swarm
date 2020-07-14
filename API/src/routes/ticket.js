const express = require("express");
// const mongoose = require('mongoose');
const validationMiddleware = require('../middleware/validation');
const transformationMiddleware = require('../middleware/transformation');
const validationSchema = require('../validation/ticket');
const ticketTransformation = require('../transformation/ticket');
const {TicketModel} = require('../models/ticket');

const router = express.Router();

router.post("/", validationMiddleware(validationSchema), transformationMiddleware(ticketTransformation), (req, res) => {
    const ticket = new TicketModel({
        ...req.body
    });
    ticket.save().then(dbres => {
        res.json({message: 'ticket saved successfully'});
    }).catch(dberr => {
        res.status(500).json({message: "internal server error"});
    });
});

module.exports = router;
