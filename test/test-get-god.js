const chai = require('chai');
const chaiHttp = require('chai-http');
const { PORT, DATABASE_URL, TEST_DATABASE_URL } = require('../config');
const {app, runServer, closeServer} = require('../server');
const sampleGod = {
  "Assassin": false,
  "Guardian": false,
  "Hunter": false,
  "Mage": false,
  "Warrior": true
}

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
  
  it('should be a JSON response, status 200, with a warrior', function() {
    return chai.request(app)
      .post('/random3')
      .send(sampleGod)
      .then(function(res) {
        expect(res).to.be.json
        .and.to.have.status(200);
        res.body.gods.class.should.not.include("Assassin")
        res.body.gods.class.should.not.include("Hunter")
        res.body.gods.class.should.not.include("Guardian")
        res.body.gods.class.should.not.include("Mage")
        res.body.gods.class.should.include("Warrior")
      });
  });
});