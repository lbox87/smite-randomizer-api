'use strict';
const mongoose = require('mongoose');
const { DATABASE_URL } = require('../config');
mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
require('dotenv').config();

const godSchema = mongoose.Schema({
  class: { type: String, required: true },
  name: { type: String, required: true },
});

godSchema.methods.serialize = function () {
  return {
    id: this._id,
    class: this.class,
    name: this.name,
  };
};

const God = mongoose.model('God', godSchema);

module.exports = { God };