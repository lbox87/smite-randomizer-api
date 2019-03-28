'use strict';

const mongoose = require('mongoose');
const { PORT, DATABASE_URL } = require('./config');
mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
require('dotenv').config();

const godSchema = mongoose.Schema({
  class: { type: String, required: true },
  name: { type: String, required: true },
//   itemsAvailable: { type: String, required: true },
//   image: { type: String, required: true },
});

godSchema.methods.serialize = function () {
  return {
    id: this._id,
    class: this.class,
    name: this.name,
    // itemsAvailable: this.itemsAvailable,
    // image: this.image,
  };
};

const God = mongoose.model('God', godSchema);

module.exports = { God };