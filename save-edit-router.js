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
const { Build } = require('./saved-build-model');

const cors = require('cors');

app.use(cors({
        origin: CLIENT_ORIGIN
    })
);

let buildUpdate = (req, res) => {
  console.log(req.body)
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).json({ message: message });
  }

  const toUpdate = {};
  const updateableFields = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6','image1', 'image2', 'image3', 'image4', 'image5', 'image6'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

    Build
    .findByIdAndUpdate(req.params.id, { $set: toUpdate })
    .then(character => {
      res.status(204).json(character.serialize());
    })
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
};
  

  module.exports = { buildUpdate }