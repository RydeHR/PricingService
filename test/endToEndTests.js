const chai = require('chai');
const assert = require('assert');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server/index.js');

chai.use(chaiHttp);

var endpoint = 10;

describe ('/GET multiplier', () => {
  it ('should return a number', (done) => {
  	chai.request(server).get(`/multiplier/${endpoint}`).end((err,  res) => {
	    console.log('RES BODY IS', res.body)
      var resBody = typeof res.body;
      resBody.should.equal('number');
      done();
    });
    
  });  
  it ('should send back a status code of 200 on success', (done) => {
  	chai.request(server).get(`/multiplier/${endpoint}`).end((err,  res) => {
  	  res.should.have.status(200);
      done();
    });

  });

  it ('should send back a status code of 404 when area code is out of bounds', (done) => {
  	chai.request(server).get('/multiplier/284').end((err,  res) => {
  	  res.should.have.status(404);
      done();
    }); 
  });
})

describe ('/POST market', () => {
  it ('should return a number', (done) => {
    let market = {
      "areacode": endpoint, 
      "drivers": 50,
      "riders": 90
    }
    chai.request(server)
    .post('/market')
    .send(market)
    .end((err,  res) => {
      res.should.have.status(201);
    })
    done();
  })

  it ('should have inserted into the DB', (done) => {
    chai.request(server).get(`/multiplier/${endpoint}`).end((err, res) => {
      var resBody = typeof res.body;
      resBody.should.equal('number');
      done();
    })
  })
})
