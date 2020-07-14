const express = require("express");
const bcrypt = require("bcrypt");
// const mongoose = require('mongoose');

const validationMiddleware = require('../middleware/validation');
const transformationMiddleware = require('../middleware/transformation');
const validationSchema = require('../validation/user');
const userTransformation = require('../transformation/user');
const {UserModel} = require('../models/user');

const router = express.Router();

router.post("/", validationMiddleware(validationSchema), transformationMiddleware(userTransformation), (req, res) => {
    UserModel.findOne({"Email": req.body.Email}).exec((err, foundUser) => {
        if (err) console.error(err);
        if (foundUser) {
            res.status(400).json({message: 'user with same email exists'});
        } else {
            bcrypt.hash(req.body.Password, parseInt(process.env.NODE_PASS_BCRYPT_ROUNDS) || 10, (err, hashed) => {
                if (err) console.error(err);
                if (hashed) {
                    req.body.Password = hashed;
                    const user = new UserModel({
                        ...req.body
                    });
                    user.save().then(dbres => {
                        res.json({message: 'user registered successfully'});
                    }).catch(dberr => {
                        res.status(500).json({message: "internal server error"});
                    });
                }
            })
        }
    });
});

module.exports = router;
