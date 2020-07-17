const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

require('dotenv').config(); // register env variables in the system

// routes imports
const ticketRoute = require("./routes/ticket");
const registerRoute = require("./routes/register");
const authenticateRoute = require("./routes/authenticate");
const statisticsRoute = require("./routes/statistics");
const authorizationMiddleware = require('./middleware/authorization');

const app = express();

// mongodb connection function with recursive setTimeout to retry after 2sec if connection fails
const connectToDatabase = () => {
  console.log('trying to connect to the database');
  mongoose.connect(process.env.NODE_MONGO_DATABASE_URL || 'mongodb://vdm-database-mongos:27017/vdm', {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }).then(() => {
      console.log('successful connection to the database');
  }).catch((err) => {
      console.log('failed connection to the database');
      setTimeout(connectToDatabase, 2000);
      console.log(err);
  });
}
connectToDatabase();

// parse body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({message: "working api"});
});

app.use("/ticket", ticketRoute);
app.use("/register", registerRoute);
app.use("/authenticate", authenticateRoute);

app.use(authorizationMiddleware()); // from this point, you must be authenticated to access the routes below

app.use("/statistics", statisticsRoute);

app.listen(8000, () => {
    console.log("api is running on port 8000");
});
