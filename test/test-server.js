const chai = require('chai');
const chaiHttp = require('chai-http');
const api = "https://vast-fjord-13474.herokuapp.com/"
const {app, runServer, closeServer} = require('../server');

const should = chai.should();
chai.use(chaiHttp);

describe('API', function() {
  before(function () {
    this.enableTimeouts(false) 
    return runServer(DATABASE_URL);
  });

  after(function () {
    return closeServer();
  });

  it('should 200 on GET requests', function() {
    return chai.request(app)
      .get(api)
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        // done();
      })
      // .catch(done)
      ;
      
  });
});