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
const { randomGod } = require('./random-god-router');
const { randomBuild } = require('./random-item-router');
const { saveBuild } = require('./saved-build-router');
const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const { Build } = require('./saved-build-model');

app.use(morgan('common'));
passport.use(localStrategy);
passport.use(jwtStrategy);



const jwtAuth = passport.authenticate('jwt', { session: false });

const cors = require('cors');
app.use(cors({
        origin: CLIENT_ORIGIN
    })
);

app.use('/users/', usersRouter);
app.use('/auth/', authRouter);


// A protected endpoint which needs a valid JWT to access it
app.post('/protected', jwtAuth, (req, res) => {
  console.log(req.body)
  let userNow = req.body.user;
    Build
      .find({user: userNow})
      .then(builds => {
        console.log(builds)
        res.json({
          data: builds.map(
            (builds) => builds.serialize())
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });

// app.post('/auth/login')
app.post('/items2', randomBuild);
app.post('/random3', randomGod);
app.post('/save', saveBuild);

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