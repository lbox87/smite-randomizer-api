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

app.use(cors({
        origin: CLIENT_ORIGIN
    })
);

let randomItem = (req, res) => {
    let itemFilters = [];
    const assassins = ['Ratatoskr', 'Arachne', 'Awilix', 'Bakasura', 'Bastet', 'Camazotz', 'Da Ji', 'Fenrir', 'Hun Batz', 'Kali', 'Loki', 'Mercury', 'Ne Zha', 'Nemesis', 'Pele', 'Ravana', 'Serqet', 'Susano', 'Thanatos', 'Thor'];
    const guardians = ['Ares', 'Artio', 'Athena', 'Bacchus', 'Cabrakan', 'Cerberus', 'Fafnir', 'Ganesha', 'Geb', 'Khepri', 'Kumbhakarna', 'Kuzenbo', 'Sobek', 'Sylvanus', 'Terra', 'Xing Tian', 'Ymir'];
    const mages = ['Agni', 'Ah Puch', 'Anubis', 'Ao Kuang', 'Aphrodite', 'Baron Samedi', "Chang'e", 'Chronos', 'Discordia', 'Freya', 'Hades', 'He Bo', 'Hel', 'Hera', 'Isis', 'Janus', 'Kukulkan', 'Nox', 'Nu Wa', 'Poseidon', 'Ra', 'Raijin', 'Scylla', 'Sol', 'The Morrigan', 'Thoth', 'Vulcan', 'Zeus', 'Zhong Kui'];
    const warriors = ['Achilles', 'Amaterasu', 'Bellona', 'Chaac', 'Cu Chulainn', 'Erlang Shen', 'Guan Yu', 'Hercules', 'King Arthur', 'Nike', 'Odin', 'Osiris', 'Sun Wukong', 'Tyr', 'Vamana'];
    const hunters = ['Ah Muzen Cab', 'Anhur', 'Apollo', 'Artemis', 'Cernunnos', 'Chernobog', 'Chiron', 'Cupid', 'Hachiman', 'Hou Yi', 'Izanami', 'Jing Wei', 'Medusa', 'Neith', 'Rama', 'Skadi', 'Ullr', 'Xbalanque'];
    console.log(req.body.god)

    if (assassins.includes(req.body.god)) {
      itemFilters.push("physicalAll", "all", "allMageHunterAssassin", "physicalMelee")
    }
    else if (guardians.includes(req.body.god)) {
      itemFilters.push("magicalAll", "all", "allWarriorGuardian")
    }
    else if (hunters.includes(req.body.god)) {
      itemFilters.push("physicalAll", "all", "allMageHunterAssassin")
    }
    else if (mages.includes(req.body.god)) {
      itemFilters.push("magicalAll", "all", "allMageHunterAssassin")
    }
    else {
      // warriors
      itemFilters.push("physicalAll", "all", "allWarriorGuardian", "physicalMelee")
    }
    console.log("the curent item filters are " + itemFilters)
    Item
      .find({classification: {$in: itemFilters}})
    
      .then(item => {
        
        res.json({
            item:item[Math.floor(Math.random() * Math.floor(item.length-1))]
            // test: "test"
        });
      })
      .then(console.log(res.body))
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  }

  module.exports = { randomItem }