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
const rando = "Math.floor(Math.random() * Math.floor(gods.length-1))"

app.use(cors({
        origin: CLIENT_ORIGIN
    })
);

app.get('/api/*', (req, res) => {
    res.json({ok: true});
  });

  app.get('/items', (req, res) => {
    Item
      .find()
      // .then(items => {
      //   res.json({
      //       items: items.map((item) => item.serialize())
      //   });
      // })
      .then(items => {
        res.json({
          items: items[Math.floor(Math.random() * Math.floor(items.length-1))]
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });

  // POST for filters
  app.get('/random2', (req, res) => {
  God.count().exec(function (err, count) {
    var random = Math.floor(Math.random() * count)
    God.findOne().skip(random)
        .then(god => {
            res.json({
              god: god.serialize()
            });
          })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });
})

app.post('/items2', (req, res) => {
  let itemFilters = [];
  console.log(req.body.god)
  if (req.body.god === "Ratatoskr") {
    itemFilters.push("physicalAll", "physicalBoots", "all", "allMageHunterAssassin", "physicalMelee", "physicalRatatoskr")
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
      res.json({
        item1: items[Math.floor(Math.random() * Math.floor(items.length-1))],
        item2: items[Math.floor(Math.random() * Math.floor(items.length-1))],
        item3: items[Math.floor(Math.random() * Math.floor(items.length-1))],
        item4: items[Math.floor(Math.random() * Math.floor(items.length-1))],
        item5: items[Math.floor(Math.random() * Math.floor(items.length-1))],
        item6: items[Math.floor(Math.random() * Math.floor(items.length-1))]
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.post('/random3', (req,res) => {
  let classes = [];
  for (var key in req.body) {
    if (req.body[key] === true) {
      classes.push(key).toString()
    }
  }
  console.log(classes);
  God    
  .find({class: {$in: classes}})
  .then(gods => {
      
      res.json({
          gods: gods[Math.floor(Math.random() * Math.floor(gods.length-1))]
      });
    })
.catch(err => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
  });
});

  app.get('/random', (req, res) => {
    God
    .find()
        .then(gods => {
            
            res.json({
                gods: gods[Math.floor(Math.random() * Math.floor(gods.length-1))]
            });
          })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });

  app.get('/gods', (req, res) => {
    God
      .find({class: 'Warrior'})
      .then(gods => {
        res.json({
            // gods: gods[Math.floor(Math.random() * Math.floor(gods.length-1))]
            gods:gods
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });

let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer }