'use strict';

const mongoose = require('mongoose');
const { PORT, DATABASE_URL } = require('../config');
mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
require('dotenv').config();

const savedBuildSchema = mongoose.Schema({
  user: { type: String, required: true },
  god: { type: String, required: true },
  image: { type: String, required: true },
  item1: { type: String, required: true },
  item2: { type: String, required: true },
  item3: { type: String, required: true },
  item4: { type: String, required: true },
  item5: { type: String, required: true },
  item6: { type: String, required: true },
  image1: { type: String, required: true },
  image2: { type: String, required: true },
  image3: { type: String, required: true },
  image4: { type: String, required: true },
  image5: { type: String, required: true },
  image6: { type: String, required: true },
});

savedBuildSchema.methods.serialize = function () {
  return {
    id: this._id,
    user: this.user,
    god: this.god,
    image: this.image,
    item1: this.item1,
    item2: this.item2,
    item3: this.item3,
    item4: this.item4,
    item5: this.item5,
    item6: this.item6,
    image1: this.image1,
    image2: this.image2,
    image3: this.image3,
    image4: this.image4,
    image5: this.image5,
    image6: this.image6
    // itemsAvailable: this.itemsAvailable,
    // image: this.image,
  };
};

const Build = mongoose.model('Build', savedBuildSchema);

module.exports = { Build };