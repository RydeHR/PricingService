const path = require('path');
// const PORT = process.env.PORT || 3000;
const mongo = require('../database/mongoIndex.js');
const cass = require('../database/csIndex.js');
const priceCalc = require('../algorithms/pricingCalculation.js');
const AWS = require('aws-sdk');

// Set the region 

var credentials = new AWS.SharedIniFileCredentials();
AWS.config.credentials = credentials;

// AWS.config.loadFromPath(path.join(__dirname + '/../config.json'));
AWS.config.update({region: 'us-west-1'});

// var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
var sns = new AWS.SNS();

sendSurgeByAreaCode = async (areacode) => {
  var result = await mongo.getSurgeByArea(areacode);
  // var resultObj = {"price": result}
  var params = {
  	Message: JSON.stringify({default: result}),
  	MessageStructure: 'json',
  	TargetArn: 'arn:aws:sns:us-west-1:627311198652:Surge'
  }
  
  sns.publish(params, function(err, data) {
  	if (err) {
  	  console.log('error with SNS publish', err);
  	} else {
  	  console.log('successful publish to SNS');
  	}
  });
}

sendPriceAfterRequest = async (params) => {
	var outcome = await priceCalc.pricingCalculation(params.fromLoc, params.toLoc, params.multiplier);
  var params = {
  	Message: JSON.stringify({default: outcome}),
  	MessageStructure: 'json',
  	TargetArn: 'arn:aws:sns:us-west-1:627311198652:Pricing'
  }
  sns.publish(params, function(err, data) {
  	if (err) {
  	  console.log('error with SNS publish', err);
  	} else {
  	  console.log('successful publish to SNS');
  	}
  });
}
  
module.exports = {
  sendSurgeByAreaCode,
  sendPriceAfterRequest,
}







// const rideClientToPricing = 'https://sqs.us-west-1.amazonaws.com/627311198652/RidePricingToClient';
// const sendSurgeToClientQ = 'https://sqs.us-west-1.amazonaws.com/627311198652/SurgePricingToClient';
// const getPriceReqFromClientQ = 'https://sqs.us-west-1.amazonaws.com/627311198652/RideClientToPricing';
// const getDemandFromLocationQ = 'https://sqs.us-west-1.amazonaws.com/627311198652/LocationToPricing';
// const getHistoryFromEventsQ = 'https://sqs.us-west-1.amazonaws.com/627311198652/EventsToPricing';
