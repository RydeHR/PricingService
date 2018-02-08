const cass = require('../database/csIndex.js');
// const mongo = require('../database/mongoIndex.js');
// does initial load from Cassandra DB 

// reads in data from the SQS Queue from Jackie
// reads in data from the Post Queue from Dillon

var getAreaCodeSuccess = async function(areacode) {
  return await cass.getAverageSuccessByAreaCode(areacode).then((result) => {
  	return result;
  });
}

var getSurgeByAreaCode = async function(areacode,  drivers, riders) {
  var adjustFactor;
  var multiplyFactor = await getAreaCodeSuccess(areacode);
  // console.log('multiply factor is', multiplyFactor);
  if (riders / drivers > 1.35) {
  	// charge very high
  	adjustFactor = Number(((Math.random() + 1) * 5).toFixed(1))
  }
  else if (riders / drivers > 1.25) {
  	adjustFactor = Number(((Math.random() + 1) * 2.5).toFixed(1))
  }
  else if (riders / drivers > 1.1) {
  	// charge somewhat high
  	adjustFactor = Number(((Math.random() + 1) * 1.5).toFixed(1))
  }
  else if (riders / drivers > 0.9) {
  	adjustFactor = Number(((Math.random() + 1)).toFixed(1))
  } else {
  	// no surge
  	adjustFactor = 1; 
  }

  if (multiplyFactor > 0.767) {
  	// charge a higher multiplier
  	return 1.25 * adjustFactor
  }
  else if (multiplyFactor > 0.763) {
  	// charge a medium multiplier
  	return 1 * adjustFactor;
  } else {
  	// charge a lower multiplier
    if (adjustFactor * 0.85 < 1) {
      return 1;
    } else {
  	  return 0.85 * adjustFactor;
    }
  }
}

module.exports = {
  getSurgeByAreaCode
}