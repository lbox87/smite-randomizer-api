const express = require('express');
const app = express();
const router = express.Router();
app.use(express.json());
app.use(express.static('public'));
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { PORT, DATABASE_URL, CLIENT_ORIGIN } = require('../config');
const { God } = require('./god-model');

const cors = require('cors');

app.use(cors({
        origin: CLIENT_ORIGIN
    })
);

router.post('/', (req,res) => {
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
        
        res.status(200).json({
            gods: gods[Math.floor(Math.random() * Math.floor(gods.length))]
        });
      })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
    });
  })

  module.exports = { router }