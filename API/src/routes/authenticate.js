const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const mongoose = require('mongoose');

const validationMiddleware = require('../middleware/validation');
const validationSchema = require('../validation/authenticate');
const {UserModel} = require('../models/user');

const router = express.Router();

router.post("/", validationMiddleware(validationSchema), (req, res) => {
    UserModel.findOne({"Email": req.body.Email}).exec((err, foundUser) => {
        if (err) console.error(err);
        if (foundUser){
            bcrypt.compare(req.body.Password, foundUser.Password, (err, valide) => {
                if (err) console.error(err);
                if (valide) {
                    const token = jwt.sign({
                        id: foundUser._id,
                        email: foundUser.Email,
                        name: foundUser.Nom,
                        lastname: foundUser.Prenom
                    }, process.env.NODE_JWT_SECRET, { expiresIn: process.env.NODE_JWT_DURATION || (60 * 60) })
                    res.json({message: 'user authenticated successfully', token});
                } else {
                    res.status(400).json({message: 'user cannot be authenticated'});
                }
            })
        } else {
            res.status(400).json({message: 'user cannot be authenticated'});
        }
    });
});

module.exports = router;
