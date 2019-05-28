const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));
require('dotenv').config();

const morgan = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL, CLIENT_ORIGIN } = require('./config');
const { router: randomGod } = require('./gods/random-god-router');
const { router: randomItems } = require('./items/random-item-router');
const { router: builds } = require('./builds-router');
const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');

app.use(morgan('common'));
passport.use(localStrategy);
passport.use(jwtStrategy);

const cors = require('cors');
app.use(cors({
        origin: CLIENT_ORIGIN
    })
);

app.use('/users/', usersRouter);
app.use('/auth/', authRouter);
app.use('/random3', randomGod)
app.use('/items/', randomItems)
app.use('/builds/', builds)

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