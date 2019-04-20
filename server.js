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
app.get('/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'secret'
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