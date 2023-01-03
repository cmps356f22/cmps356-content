const mongoose = require('mongoose');

const user = mongoose.Schema({
        sub: String,  //sub : Subject - Identifier for the User at the Issuer e.g., Google
        given_name: {type: String},
        family_name: {type: String},
        email: {type: String},
        password: {type: String},
        gender: String,
        picture: String,    //user picture
        oidProvider: {type: String, default: "local"},
        role: {type: String, default: "Contributor"}
    }
);

module.exports = mongoose.model('User', user);