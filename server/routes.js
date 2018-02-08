const Router = require('koa-router');
const router = new Router();
const db = require('../database/csIndex.js');
const mongo = require('../database/mongoIndex.js');
const surgeCalc = require('../algorithms/surgeAlgorithm.js');
const priceCalc = require('../algorithms/pricingCalculation.js');
const snsRouter = require('./snsHelpers.js');
const sqsRouter = require('./sqsHelpers.js');

sqsRouter.consumeSQSMessages('LocationToPricing', 'market');
sqsRouter.consumeSQSMessages('EventsToPricing', 'history');

router.post('/price', async (ctx) => {
  
    let params = ctx.request.body;
    snsRouter.sendPriceAfterRequest(params);
    // expecting fromLoc/toLoc to be in form ['lat', 'long']
    ctx.status = 201;
});

router.post('/history', async (ctx) => {
    // THIS IS WHAT DILLON IS POSTING TO
    var outcome = await db.insertRequest(ctx.request.body);
    // console.log(outcome);
    ctx.status = 201;
});

router.post('/market', async (ctx) => {
    // needs to SUBSCRIBE to SNS 
    // console.log('here')

    let params = ctx.request.body;
    let outcome = await surgeCalc.getSurgeByAreaCode(params.areacode, params.drivers, params.riders);
    mongo.updateSurge({ areacode: params.areacode, multiplier: outcome});
    // update current surge in MongoDB
    // snsRouter.sendSurgeByAreaCode(areacode);
    // send surge by area code
    ctx.body = 'success';
    ctx.status = 201;
})

router.get('/average/:areacode', async (ctx) => {
  // THIS IS FOR TESTING HOW FAST THE ALGORITHM GETS DATA FROM CASSANDRA - NOT FUNCTIONAL
  let areaCode = Number(ctx.req.url.split('/')[2])
  try {
    var outcome = await db.getAverageSuccessByAreaCode(areaCode);
    ctx.body = outcome; 
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;


// pullMessagesFromSQS('LocationToPricing', 'market');
// pullMessagesFromSQS('EventsToPricing', 'history');


// let pullMessagesFromSQS = async function(endpoint, postRoute) {
//   // let messagesInQueue = await sqsRouter.getQueueAttributes(endpoint);
//   // console.log(endpoint, messagesInQueue);
//   // while (messagesInQueue > 0) {
//     // setInterval(() => sqsRouter.getSQSMessageAndPost(endpoint, postRoute), 5000);
//     sqsRouter.getSQSMessageAndPost(endpoint, postRoute);
//     // messagesInQueue--;
//   // }
// }


// router.post('/history', async (ctx) => {
//   try {
//     // refactor this in order to SUBSCRIBE to SNS 
//     // console.log(ctx.request.body);
//     // THIS IS WHAT DILLON IS POSTING TO
//     var outcome = await db.insertRequest(ctx.request.body);
//     // console.log(outcome);
//     ctx.status = 201;
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.get('/multiplier/:areacode', async (ctx) => {
//   let areacode = Number(ctx.req.url.split('/')[2]);
//   snsRouter.sendSurgeByAreaCode(areacode);
// });

// router.get('/multiplier/:areacode', async (ctx) => {
//   let areacode = Number(ctx.req.url.split('/')[2]);
//   try {
//     var result = await mongo.getSurgeByArea(areacode);
//     // in order to get this request, jackie mustve already posted the
//     // console.log('result in areacode', result);
//     // THIS IS THE MULTIPLIER TO SEND BACK TO MARK, MARK'S ROUTE
//     // if (!pet) return ctx.throw('cannot find that pet', 404);
//     // console.log('RESULT IS', result)
//     if (!result) {
//       // console.log('here, failed')
//       return ctx.throw('cannot find that area code', 404) 
//     } else { 
//       ctx.status = 200;
//       ctx.body = result;
//       return result;
//     }
//   } catch(err) {
//     console.log('here in error', err);
//   }
// })

// router.post('/market', async (ctx) => {
//   try {
//     let params = ctx.request.body;
//     // these will be currentDrivers, currentRiders, surgeZone
//     // send off request to surgeAlgorithm for current 
//     // console.log('params are', params);
//     var outcome = await surgeCalc.getSurgeByAreaCode(params.areacode, params.drivers, params.riders);
//     // console.log('outcome is', outcome);
    
//     mongo.updateSurge({ areacode: params.areacode, multiplier: outcome});
//     // send to mark?
//     ctx.body = 'success';
//     ctx.status = 201;
//   } catch (err) {
//     console.log(err);
//   }
// })

// router.post('/price', async (ctx) => {
//   try {
//     let params = ctx.request.body;
//     // expecting fromLoc/toLoc to be in form ['lat', 'long']
//     var outcome = await priceCalc.pricingCalculation(params.fromLoc, params.toLoc, params.multiplier);
//     ctx.status = 200;
//     ctx.body = outcome;
//     // console.log('outcome is', outcome)
//     return outcome;
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.get('/multiplier/:areacode', async (ctx) => {
//   let areacode = Number(ctx.req.url.split('/')[2]);
//   try {
//     var result = await mongo.getSurgeByArea(areacode);
//     ctx.body = result[0].multiplier;
//     // THIS IS THE MULTIPLIER TO SEND BACK TO MARK, MARK'S ROUTE
//     ctx.status = 200;
//     return result[0].multiplier;
//   } catch(err) {
//     console.log(err);
//   }
// })


// router.get('/avgmultiplier/:areacode', async (ctx) => {
//   // console.log(Number(ctx.req.url.split('/')[2]));
//   let areaCode = Number(ctx.req.url.split('/')[2])
//   try {
//     var outcome = await db.getAverageMultiplierByAreaCode(areaCode);
//     // console.log(outcome);
//     // THIS IS FOR INTERNAL (ALGORITHM) USE ONLY
//     ctx.body = outcome; 
//   } catch (err) {
//     console.log(err);
//   }
// });


// router.post('/multiplier', async (ctx) => {

//   // post to multiplier with 'areacode', 'currentSurge' each time jackie posts to /market
//   // console.log('params are', params);
//   // THIS IS AN INTERNAL ROUTE ONLY
//   try {
//     var outcome = await mongo.save(params);
//   } catch(err) {
//     console.log(err);
//   }
// })

// router.get('/requests/:areacode', async (ctx) => {
//   // console.log(Number(ctx.req.url.split('/')[2]));
//   // console.log()
//   let areaCode = Number(ctx.req.url.split('/')[2])
//   try {
//     var outcome = await db.getRequestsByAreaCode(areaCode);
//     // console.log(outcome);
//     // THIS IS FOR INTERNAL (ALGORITHM) USE ONLY
//     ctx.body = outcome.rows;  
//   } catch (err) {
//     console.log(err);
//   }
// });
