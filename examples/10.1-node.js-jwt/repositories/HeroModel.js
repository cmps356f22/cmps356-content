const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  text: String
});

const heroSchema = new mongoose.Schema({
    name: String,
    heroType: String,
    quotes: [{ type: quoteSchema }]
});

module.exports = mongoose.model('Hero', heroSchema);