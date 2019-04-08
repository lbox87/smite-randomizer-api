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

  app.get('/random', (req, res) => {
    God
    //   .aggregate([{$sample: {size:1}}])
    .find()
    //   .then( gods => {
        //   console.log(gods[Math.floor(Math.random() * Math.floor(gods.length-1))])
        //   console.log(res.body)
        //   res.json(god => god.serialize())
        // res.json({this: true})
        // })
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