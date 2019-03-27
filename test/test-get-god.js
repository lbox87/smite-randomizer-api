const chai = require('chai');
const chaiHttp = require('chai-http');
const { PORT, DATABASE_URL, TEST_DATABASE_URL } = require('../config');
const {app, runServer, closeServer} = require('../server');

require('dotenv').config();
const expect = chai.expect;
chai.use(chaiHttp);

describe('Test Get God Router', function() {
  before(function() {
    return runServer(DATABASE_URL);
  });

  after(function() {
    return closeServer();
  });
  
  it('should have status 200', function() {
    return chai.request(app)
      .get('/gods')
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });

  it('should have status 200 for random', function() {
    return chai.request(app)
      .get('/random')
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });

});