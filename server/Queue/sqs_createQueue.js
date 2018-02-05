// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
// aws.config.update({

// })

var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
sqs.createQueue(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.QueueUrl);
  }
});

// Create an SQS service object
var params = {
  QueueName: 'Pricing',
  Attributes: {
    'DelaySeconds': '60',
    'MessageRetentionPeriod': '86400'
  }
};

sqs.createQueue(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.QueueUrl);
  }
});