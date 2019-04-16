const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));
require('dotenv').config();
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { PORT, DATABASE_URL, CLIENT_ORIGIN } = require('./config');
const { God } = require('./god-model');
const { Item } = require('./item-model');

const cors = require('cors');
const rando = "Math.floor(Math.random() * Math.floor(gods.length-1))"

app.use(cors({
        origin: CLIENT_ORIGIN
    })
);

let randomGod = (req,res) => {
    let classes = [];
    for (var key in req.body) {
      if (req.body[key] === true) {
        classes.push(key).toString()
      }
    }
    console.log(classes);
    God    
    .find({class: {$in: classes}})
    .then(gods => {
        
        res.json({
            gods: gods[Math.floor(Math.random() * Math.floor(gods.length-1))]
        });
      })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
    });
  }

  module.exports = { randomGod }