const chai = require('chai');
const assert = require('assert');

const priceCalc = require('../algorithms/pricingCalculation.js');

describe('pricing calculation', function() {
  it ('should return a type number', function() {
  	var result = priceCalc.pricingCalculation(['60.5387', '-131.5378'], ['60.5387', '-131.5678'], 2.1)
  	assert.equal(typeof result, 'number');
  });

  it ('should apply the surge multiplier to the distance travelled', function() {
  	var resultWithMultiplier = priceCalc.pricingCalculation(['31.6732', '-131.5378'], ['31.6932', '-131.5678'], 1.8);
  	var resultNoMultiplier = priceCalc.pricingCalculation(['31.6732', '-131.5378'], ['31.6932', '-131.5678'], 1);
  	assert.equal((resultWithMultiplier/1.8).toFixed(2), resultNoMultiplier.toFixed(2));
  });

  it ('should return null for invalid coordinates', function() {
  	var result = priceCalc.pricingCalculation(['1800', '2003'], ['290', '32'], 1);
  	assert.equal(result, null);
  });

  it ('should return 0 for the same coordinates', function() {
  	var result = priceCalc.pricingCalculation(['0', '0'], ['0', '0'], 2);
  	assert.equal(result, 0);
  });

  it ('should handle invalid types of coordinates by returning null', function() {
  	var result = priceCalc.pricingCalculation(['this', 'is'], ['1.2', '2.2'], 1);
  	assert.equal(result, null);
  })

})