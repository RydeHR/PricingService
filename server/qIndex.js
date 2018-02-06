const Koa = require('koa');
const indexRoutes = require('./routes');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const PORT = process.env.PORT || 3000;


const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-west-1'});

var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
var sns = new AWS.SNS();

const sendPriceToClientQ = 'https://sqs.us-west-1.amazonaws.com/627311198652/RidePricingToClient';
const sendSurgeToClientQ = 'https://sqs.us-west-1.amazonaws.com/627311198652/SurgePricingToClient';
const getSurgeReqFromClientQ = 'https://sqs.us-west-1.amazonaws.com/627311198652/SurgeClientToPricing';
const getPriceReqFromClientQ = 'https://sqs.us-west-1.amazonaws.com/627311198652/RideClientToPricing';
const getDemandFromLocationQ = 'https://sqs.us-west-1.amazonaws.com/627311198652/LocationToPricing';
const getHistoryFromEventsQ = 'https://sqs.us-west-1.amazonaws.com/627311198652/EventsToPricing';


let snsSubscribe = function() {
	
}

// const send = (url, body) => {
//   let sendParams = {
//     messageBody: body,
//     queueUrl: url
//   };
//   sqs.sendMessage(sendParams, (err, data) => {
//   	if (err) {
//   	  console.log('error sending message:', err);
//   	} else {
//   	  console.log('success', data.MessageId);
//   	}
//   })
// }

// let handleSurgeReqFromClient = function() {
  
// }









app.use(bodyParser());
app.use(indexRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
