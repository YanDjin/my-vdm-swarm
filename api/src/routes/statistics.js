const express = require("express");
const inverseTransformation = require('../middleware/inverseTransformation');

const validationSchema = require('../validation/ticket');
const ticketTransformation = require('../transformation/ticket');
const userTransformation = require('../transformation/user');
const {TicketModel} = require('../models/ticket');
const {ClientModel} = require('../models/client');
const {UserModel} = require('../models/user');

const router = express.Router();

router.get('/', async (req, res) => {
    let tickets = await TicketModel.find().lean();
    let clients = await ClientModel.find().lean();
    let users = await UserModel.find().select('-Password').lean();
    inverseTransformation(tickets, ticketTransformation);
    inverseTransformation(users, userTransformation);
    res.json({tickets, clients, users});
})

module.exports = router;