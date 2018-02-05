require('newrelic');
const Koa = require('koa');
const indexRoutes = require('./routes');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const PORT = process.env.PORT || 3000;
// AWS

// var params = {
//   QueueName: 'SQS_QUEUE_NAME',
//   Attributes: {
//     'DelaySeconds': '60',
//     'MessageRetentionPeriod': '86400'
//   }
// };

// sqs.sendMessage(params, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.MessageId);
//   }
// });

// var params = {
//  DelaySeconds: 10,
//  MessageAttributes: {
//   "Multiplier": {
//     DataType: "Number",
//     StringValue: "3.7"
//    },
//   "Area": {
//     DataType: "Number",
//     StringValue: "15"
//    }
//  },
//  MessageBody: "Information about surge price in a given area",
//  QueueUrl: "https://sqs.us-west-1.amazonaws.com/627311198652/requestHistory"
// };


// var queueURL = "https://sqs.us-west-1.amazonaws.com/627311198652/requestHistory";

// var params = {
//  AttributeNames: [
//     "SentTimestamp"
//  ],
//  MaxNumberOfMessages: 1,
//  MessageAttributeNames: [
//     "All"
//  ],
//  QueueUrl: queueURL,
//  VisibilityTimeout: 0,
//  WaitTimeSeconds: 0
// };

// sqs.receiveMessage(params, function(err, data) {
//   if (err) {
//     console.log("Receive Error", err);
//   } else if (data.Messages) {
//     var deleteParams = {
//       QueueUrl: queueURL,
//       ReceiptHandle: data.Messages[0].ReceiptHandle
//     };
//     // console.log(data.Messages[0].MessageAttributes.Area.StringValue)
//     sqs.deleteMessage(deleteParams, function(err, data) {
//       if (err) {
//         console.log("Delete Error", err);
//       } else {
//         console.log("Message Deleted", data);
//       }
//     });
//   }
// });

app.use(bodyParser());
app.use(indexRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;




