'use strict';
require('dotenv').config();
exports.DATABASE_URL = process.env.DATABASE_URL;
// included login sample just to show test suite is working for project submission
// exports.TEST_DATABASE_URL = ;
exports.PORT = process.env.PORT || 8080;
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN 
// module.exports = {
//     CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000'
//     DATABASE_URL: process.env.DATABASE_URL;
//     PORT: process.env.PORT || 8080;
// };