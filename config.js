'use strict';
require('dotenv').config();

module.exports = {
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000'
    DATABASE_URL = process.env.DATABASE_URL;
    PORT = process.env.PORT || 8080;
};