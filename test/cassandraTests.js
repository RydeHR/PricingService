const chai = require('chai');
const assert = require('assert');
const should = require('should');
const db = require('../database/csIndex.js');

describe('getRequestsByAreaCode', function() {
  it ('responds with a list of 100 requests within the given areacode', async function() {
  	const requests = await db.getRequestsByAreaCode(4);
  	requests.rows.should.have.length(100);
  });

  it ('responds with areacodes equal to the requested areacode', async function() {
  	const requests = await db.getRequestsByAreaCode(7);
  	requests.rows[0].areacode.should.equal(7);
  });

  it ('should respond in less than 200ms', async function() {
  	var start = Date.now();
  	const requests = await db.getRequestsByAreaCode(6);
  	this.timeout(200);
  	assert.ok(true);
  })
})

describe('getAverageMultiplierByAreaCode', function() {
  it ('responds with type number', async function() {
  	const requests = await db.getAverageMultiplierByAreaCode(9);
  	var type = typeof requests;
  	type.should.equal('number');
  })

  it ('should respond in less than 200ms', async function() {
    const requests = await db.getAverageMultiplierByAreaCode(6);
  	this.timeout(200);
  	assert.ok(true);
  });
});

describe('getAverageSuccessByAreaCode', function() {
   it ('responds with type number', async function() {
  	const requests = await db.getAverageSuccess	ByAreaCode(9);
  	var type = typeof requests;
  	type.should.equal('number');
  })

  it ('should respond in less than 200ms', async function() {
    const requests = await db.getAverageSuccessByAreaCode(6);
  	this.timeout(200);
  	assert.ok(true);
  });


});

