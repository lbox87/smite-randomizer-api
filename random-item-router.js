const express = require('express');
const app = express();
const router = express.Router();
app.use(express.json());
app.use(express.static('public'));
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { PORT, DATABASE_URL, CLIENT_ORIGIN } = require('./config');
const { Item } = require('./item-model');

const cors = require('cors');

app.use(cors({
        origin: CLIENT_ORIGIN
    })
);

router.post('/build', (req, res) => {
    let itemFilters = [];
    console.log(req.body.god)
    if (req.body.god === "Ratatoskr") {
      itemFilters.push("physicalAll", "all", "allMageHunterAssassin", "physicalMelee", "physicalRatatoskr")
    }
    else if (req.body.class === "Assassin") {
      itemFilters.push("physicalAll", "physicalBoots", "all", "allMageHunterAssassin", "physicalMelee")
    }
    else if (req.body.class === "Guardian") {
      itemFilters.push("magicalAll", "magicalBoots", "all", "allWarriorGuardian")
    }
    else if (req.body.class === "Hunter") {
      itemFilters.push("physicalAll", "physicalBoots", "all", "allMageHunterAssassin")
    }
    else if (req.body.class === "Mage") {
      itemFilters.push("magicalAll", "magicalBoots", "all", "allMageHunterAssassin")
    }
    else {
      // warriors
      itemFilters.push("physicalAll", "physicalBoots", "all", "allWarriorGuardian", "physicalMelee")
    }
    console.log("the curent item filters are " + itemFilters)
    Item
      .find({classification: {$in: itemFilters}})
      .then(items => {
        let boots = [];
        let nonBoots = [];
        for (let i = 0; i < items.length; i++) {
          if (items[i].classification === "physicalRatatoskr"){
          boots.push(items[i]);
          
          }
          else if ((items[i].classification === "physicalBoots") || (items[i].classification === "magicalBoots")){
          boots.push(items[i])
          }
          else {nonBoots.push(items[i])}
        }
        let build = {
          item1: {},
          item2: {},
          item3: {},
          item4: {},
          item5: {},
          item6: {}
        }
        console.log(boots)
        for (var key in build){
          if ( key === "item1") {
            build[key] = boots[Math.floor(Math.random() * boots.length)];
            // console.log(key + " is " + build[key])
          }
          else {
            build[key] = nonBoots[Math.floor(Math.random() * nonBoots.length)];
            for (let i = 0; i < nonBoots.length; i++) {
              if( nonBoots[i] === build[key] ) {
                // console.log(nonBoots[i] + " was removed")
                nonBoots.splice(i, 1);
                // console.log(key + " is " + build[key])
              }
            }
          }
        }
        // console.log(build.item1)
        // console.log("the current build is" + build)
  
        res.json({
          item1: build.item1,
          item2: build.item2,
          item3: build.item3,
          item4: build.item4,
          item5: build.item5,
          item6: build.item6
        });
        res.status(200)
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  })

  router.post('/reroll', (req, res) => {
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
  })

  module.exports = { router }