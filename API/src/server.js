const express = require("express");
const bodyParser = require("body-parser");
const Joi = require("@hapi/joi");
const mongoose = require('mongoose');

// routes imports
const ticketRoute = require("./routes/ticket.js");

const app = express();

// mongodb connection
mongoose.connect('mongodb://vdm-database:27017/vdm', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('successful connection to the database');
}).catch((err) => {
    console.log('failed connection to the database');
    console.log(err);
});

// parse body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({message: "working api"});
});

app.use("/ticket", ticketRoute);

app.listen(8000, () => {
    console.log("api is running on port 8000");
});
