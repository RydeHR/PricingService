const AWS = require('aws-sdk');
const axios = require('axios');
const path = require('path');
const Consumer = require('sqs-consumer');

var credentials = new AWS.SharedIniFileCredentials();
AWS.config.credentials = credentials;
// AWS.config.loadFromPath(path.join(__dirname + '/../config.json'));
AWS.config.update({region: 'us-west-1'});

var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

consumeSQSMessages = function(endpoint, postRoute) {
  const sqsConsumer = Consumer.create({
      queueUrl: `https://sqs.us-west-1.amazonaws.com/627311198652/${endpoint}`,
      region: 'us-west-1',
    handleMessage: (message, done) => {      
      console.log('IN CONSUME', message.Body);
      var body = JSON.parse(message.Body);
      axios.post(`http://localhost:3000/${postRoute}`, body).then((response) => console.log(response.statusText)).catch((err) => console.log(err))
      done();
    }
  });
  sqsConsumer.on('error', (err) => {
    console.error('consumer error', err);
  });

  sqsConsumer.start();
}


module.exports = {
  consumeSQSMessages
}



// getSQSMessageAndPost = function(endpoint, postRoute) {
//   console.log('in get message')
//   var sqsQueueUrl = `https://sqs.us-west-1.amazonaws.com/627311198652/${endpoint}`;
//   sqs.receiveMessage({
//     QueueUrl: sqsQueueUrl,
//     MaxNumberOfMessages: 1, // how many messages do we wanna retrieve?
//     VisibilityTimeout: 10, // seconds - how long we want a lock on this job
//     WaitTimeSeconds: 0 // seconds - how long should we wait for a message?
//   }, function(err, data) {
//    // If there are any messages to get
//    if (data.Messages) {
//       // Get the first message (should be the only one since we said to only get one above)
//       var message = data.Messages[0];
//       var body = JSON.parse(message.Body);
//       // Now this is where you'd do something with this message
//       console.log(body);  // whatever you wanna do
//       axios.post(`http://localhost:3000/${postRoute}`, body).then((response) => console.log(response.statusText)).catch((err) => console.log(err))
//       removeFromQueue(message, sqsQueueUrl);

//       // Clean up after yourself... delete this message from the queue, so it's not executed again
//        // We'll do this in a second
//    }
//   });
// }

// getQueueAttributes = function(endpoint) {
//   var sqsQueueUrl = `https://sqs.us-west-1.amazonaws.com/627311198652/${endpoint}`;
//   sqs.getQueueAttributes({
//     QueueUrl: sqsQueueUrl,
//     AttributeNames: ['ApproximateNumberOfMessages']
//   }, function (err, result) {
//       if (err) { 
//         console.log(err); 
//       } else { 
//         console.log(result.Attributes.ApproximateNumberOfMessages);
//         return result.Attributes.ApproximateNumberOfMessages; 
//       }
//   });
// }

// var removeFromQueue = function(message, url) {
//    sqs.deleteMessage({
//       QueueUrl: url,
//       ReceiptHandle: message.ReceiptHandle
//    }, function(err, data) {
//       // If we errored, tell us that we did
//       err && console.log(err);
//    });
// };
//   var params = {
//     AttributeNames: ['SentTimestamp'],
//     MaxNumberOfMessages: 1,
//     QueueUrl: 'https://sqs.us-west-1.amazonaws.com/627311198652/EventsToPricing',
//     VisibilityTimeout: 0,
//     WaitTimeSeconds: 0
//   }
//   sqs.receiveMessage(params, function (err, data) {
//       if (err) { 
//         console.log(err);
//       } else { 
//         console.log('in send post history after push', data);
//         axios.post('/history', data).then(function(response) {
//           console.log(response);
//         }).catch(function (err) {
//           console.log(err);
//         })
//       }
//   });

// getSQSMessageFromEvent = function() {
//   var sqsQueueUrl = 'https://sqs.us-west-1.amazonaws.com/627311198652/EventsToPricing';
//   sqs.receiveMessage({
//     QueueUrl: sqsQueueUrl,
//     MaxNumberOfMessages: 1, // how many messages do we wanna retrieve?
//     VisibilityTimeout: 60, // seconds - how long we want a lock on this job
//     WaitTimeSeconds: 3 // seconds - how long should we wait for a message?
//   }, function(err, data) {
//    // If there are any messages to get
//    if (data.Messages) {
//       // Get the first message (should be the only one since we said to only get one above)
//       var message = data.Messages[0];
//       var body = JSON.parse(message.Body);
//       // Now this is where you'd do something with this message
//       console.log(body);  // whatever you wanna do
//       axios.post('http://localhost:3000/market', body).then((response) => console.log(response.statusText)).catch((err) => console.log(err))
//       removeFromQueue(message);
//       // Clean up after yourself... delete this message from the queue, so it's not executed again
//        // We'll do this in a second
//    }
//   });
// }

// getSQSMessageFromLoc = function() {
//   var sqsQueueUrl = 'https://sqs.us-west-1.amazonaws.com/627311198652/LocationToPricing';
//   sqs.receiveMessage({
//     QueueUrl: sqsQueueUrl,
//     MaxNumberOfMessages: 1, // how many messages do we wanna retrieve?
//     VisibilityTimeout: 60, // seconds - how long we want a lock on this job
//     WaitTimeSeconds: 3 // seconds - how long should we wait for a message?
//   }, function(err, data) {
//    // If there are any messages to get
//    if (data.Messages) {
//       // Get the first message (should be the only one since we said to only get one above)
//       var message = data.Messages[0];
//       var body = JSON.parse(message.Body);
//       // Now this is where you'd do something with this message
//       console.log(body);  // whatever you wanna do
//       axios.post('http://localhost:3000/market', body).then((response) => console.log(response.statusText)).catch((err) => console.log(err))
//       removeFromQueue(message);
//       // Clean up after yourself... delete this message from the queue, so it's not executed again
//        // We'll do this in a second
    
//    }
//   });
// }
