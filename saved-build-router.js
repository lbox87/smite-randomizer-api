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
const { Build } = require('./saved-build-model');

const cors = require('cors');

app.use(cors({
        origin: CLIENT_ORIGIN
    })
);

let saveBuild = (req,res) => {
  const requiredFields = ['user', 'god', 'item1', 'item2','item3','item4','item5','item6'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  Build
    .create({
      user: req.body.user,
      god: req.body.god,
      item1: req.body.item1,
      item2: req.body.item2,
      item3: req.body.item3,
      item4: req.body.item4,
      item5: req.body.item5,
      item6: req.body.item6
    })
    .then(build => {
      res.status(201).json(build.serialize());
      res.json({
        message: "Build Added"
      })
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
  //   let classes = [];
  //   for (var key in req.body) {
  //     if (req.body[key] === true) {
  //       classes.push(key).toString()
  //     }
  //   }
  //   console.log(classes);
  //   God    
  //   .find({class: {$in: classes}})
  //   .then(gods => {
        
  //       res.json({
  //           gods: gods[Math.floor(Math.random() * Math.floor(gods.length-1))]
  //       });
  //     })
  // .catch(err => {
  //   console.error(err);
  //   res.status(500).json({ message: 'Internal server error' });
  //   });
  }

  module.exports = { saveBuild }