// Load the SDK for JavaScript
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-west-1'});

var sqs = new AWS.SQS({apiVersion: '2012-11-05'});


var params = {
 DelaySeconds: 10,
 MessageAttributes: {
  "Price": {
    DataType: "Number",
    StringValue: "10"
   },
  "SessionId": {
    DataType: "Number",
    StringValue: "8"
   }
 },
 MessageBody: "Pricing calculation",
 QueueUrl: "https://sqs.us-west-1.amazonaws.com/627311198652/RidePricingToClient"
};

sqs.sendMessage(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.MessageId);
  }
});