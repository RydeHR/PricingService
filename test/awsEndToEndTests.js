const chai = require('chai');
const assert = require('assert');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server/index.js');

/*** AWS ***/ 
const AWS = require('aws-sdk');

// Set the region 
AWS.config.loadFromPath(path.join(__dirname + '/../config.json'));
AWS.config.update({region: 'us-west-1'});

var sns = new AWS.SNS();

chai.use(chaiHttp);


// describe('/market', function() {

//   it ('should calculate a surge and publish it to the surge topic', async function() {
//   	var params = {
//   	  Message: JSON.stringify({default: result}),
//   	  MessageStructure: 'json',
//   	  TargetArn: 'arn:aws:sns:us-west-1:627311198652:Surge'
//   	}
  
//     sns.publish(params, function(err, data) {
//   	  if (err) {
//   	    console.log('error with SNS publish', err);
//   	  } else {
//   	    console.log('successful publish to SNS');
//   	  }
//     });
//   });

// });