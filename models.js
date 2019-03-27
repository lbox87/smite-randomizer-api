'use strict';

const mongoose = require('mongoose');
const { PORT, DATABASE_URL } = require('./config');
mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
require('dotenv').config();

const savedBuildSchema = mongoose.Schema({
  filler: { type: String, required: true },
  filler2: { type: String, required: true },
  filler3: { type: String, required: true },
  filler4: { type: Number, required: true },
});

savedBuildSchema.methods.serialize = function () {
  return {
    id: this._id,
    filler: this.filler,
    filler2: this.filler2,
    filler3: this.filler3,
    filler4: this.filler4,
  };
};

const Build = mongoose.model('Build', savedBuildSchema);

module.exports = { Build };