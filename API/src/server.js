const express = require("express");
const bodyParser = require("body-parser");
const Joi = require("@hapi/joi");
const mongoose = require('mongoose');

require('dotenv').config(); // register env variables in the system

// routes imports
const ticketRoute = require("./routes/ticket");
const registerRoute = require("./routes/register");
const authenticateRoute = require("./routes/authenticate");
const authorizationMiddleware = require('./middleware/authorization');

const app = express();

// mongodb connection
mongoose.connect('mongodb://vdm-database-mongos:27017/vdm', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('successful connection to the database');
}).catch((err) => {
    console.log('failed connection to the database');
    console.log(err);
});

app.use((req, res, next) => {
  console.log('--------', req, '---------');
  next();
});

// parse body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({message: "working api"});
});

app.use("/ticket", ticketRoute);
app.use("/register", registerRoute);
app.use("/authenticate", authenticateRoute);

app.use(authorizationMiddleware());

app.use("/lalala", authenticateRoute);

app.listen(8000, () => {
    console.log("api is running on port 8000");
});
