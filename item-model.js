'use strict';

const mongoose = require('mongoose');
const { PORT, DATABASE_URL } = require('./config');
mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
require('dotenv').config();

const itemSchema = mongoose.Schema({
  group: { type: String, required: true },
  classification: { type: String, required: true },
  name: { type: String, required: true },
//   image: { type: String, required: true },
});

itemSchema.methods.serialize = function () {
  return {
    id: this._id,
    group: this.group,
    classification: this.classification,
    name: this.name,
    // image: this.image,
  };
};

const Item = mongoose.model('Item', itemSchema);

module.exports = { Item };