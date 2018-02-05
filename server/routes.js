const Router = require('koa-router');
const router = new Router();
const db = require('../database/csIndex.js');
const mongo = require('../database/mongoIndex.js');
const algos = require('../algorithms/surgeAlgorithm.js');

// let holdingObj = algos.populateObj();

router.get('/', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'hello, world!'
  };
})

router.get('/requests/:areacode', async (ctx) => {
  // console.log(Number(ctx.req.url.split('/')[2]));
  // console.log()
  let areaCode = Number(ctx.req.url.split('/')[2])
  try {
    var outcome = await db.getRequestsByAreaCode(areaCode);
    // console.log(outcome);
    // THIS IS FOR INTERNAL (ALGORITHM) USE ONLY
    ctx.body = outcome.rows;	
  }	catch (err) {
  	console.log(err);
  }
});

router.get('/average/:areacode', async (ctx) => {
  // console.log(Number(ctx.req.url.split('/')[2]));
  let areaCode = Number(ctx.req.url.split('/')[2])
  try {
    var outcome = await db.getAverageSuccessByAreaCode(areaCode);
    console.log('outcome is', outcome);
    // THIS IS FOR INTERNAL (ALGORITHM) USE ONLY
    ctx.body = outcome; 
  } catch (err) {
    console.log(err);
  }
});

router.get('/avgmultiplier/:areacode', async (ctx) => {
  // console.log(Number(ctx.req.url.split('/')[2]));
  let areaCode = Number(ctx.req.url.split('/')[2])
  try {
    var outcome = await db.getAverageMultiplierByAreaCode(areaCode);
    // console.log(outcome);
    // THIS IS FOR INTERNAL (ALGORITHM) USE ONLY
    ctx.body = outcome; 
  } catch (err) {
    console.log(err);
  }
});

router.post('/history', async (ctx) => {
  try {
    // console.log(ctx.request.body);
    // THIS IS WHAT DILLON IS POSTING TO
    var outcome = await db.insertRequest(ctx.request.body);
  	// console.log(outcome);
    ctx.status = 201;
  } catch (err) {
  	console.log(err);
  }
})

router.get('/multiplier/:areacode', async (ctx) => {
  let areacode = Number(ctx.req.url.split('/')[2]);
  console.log(areacode);
  try {
    var result = await mongo.getSurgeByArea(areacode);
    ctx.body = result[0].multiplier;
    // THIS IS THE MULTIPLIER TO SEND BACK TO MARK, MARK'S ROUTE
    ctx.status = 200;
  } catch(err) {
    console.log(err);
  }
})

router.post('/market', async (ctx) => {
  let params = ctx.request.body;
  // these will be currentDrivers, currentRiders, surgeZone
  // send off request to surgeAlgorithm for current 
  console.log('params are', params);
  var outcome = await algos.getSurgeByAreaCode(params.areacode, params.drivers, params.riders)
  console.log('outcome is', outcome);
  
  mongo.updateSurge({ areacode: params.areacode, multiplier: outcome});
  
})

router.post('/multiplier', async (ctx) => {

  // post to multiplier with 'areacode', 'currentSurge' each time jackie posts to /market
  // console.log('params are', params);
  // THIS IS AN INTERNAL ROUTE ONLY
  try {
    var outcome = await mongo.save(params)
  } catch(err) {
    console.log(err);
  }
})
//
module.exports = router;