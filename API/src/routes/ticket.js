const express = require("express");
// const mongoose = require('mongoose');
const validationMiddleware = require('../middleware/validation');
const transformationMiddleware = require('../middleware/transformation');
const validationSchema = require('../validation/ticket');
const ticketTransformation = require('../transformation/ticket');
const {TicketModel, ticketModelOptions} = require('../models/ticket');

const router = express.Router();

router.post("/", validationMiddleware(validationSchema), transformationMiddleware(ticketTransformation), (req, res) => {
    const ticket = new TicketModel({
        // _id: new mongoose.Types.ObjectId(),
        ...req.body
    });
    ticket.save().then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
    res.json({message: req.body});
});

module.exports = router;
