const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');
app.use(express.json());
app.use(express.static('public'));
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { PORT, DATABASE_URL, CLIENT_ORIGIN } = require('./config');
const { Build } = require('./builds-model');
const jwtAuth = passport.authenticate('jwt', { session: false });
const cors = require('cors');

app.use(cors({
        origin: CLIENT_ORIGIN
    })
);

router.put('/:id', (req, res) => {
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
});

router.delete('/:id', (req, res) => {
  Build
    .findByIdAndRemove(req.params.id)
    .then(build => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});
  

module.exports = { router }