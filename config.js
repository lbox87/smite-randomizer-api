'use strict';
require('dotenv').config();
exports.DATABASE_URL = process.env.DATABASE_URL;
// included login sample just to show test suite is working for project submission
// exports.TEST_DATABASE_URL = ;
exports.PORT = process.env.PORT || 8080;
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN 
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';