const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'] })


client.connect(function(err) {
  if (err) {
  	console.log(err)
  }
});


let getRequestsByAreaCode = function(areacode) {
  let query = `SELECT * FROM nick.pricing4 WHERE areacode = ${areacode} LIMIT 100`;
  return client.execute(query).then((result) => result);
}

let getRequestsByHour = function(areacode, hourstart, hourend) {
  let query = `SELECT * FROM nick.pricing4 WHERE areacode = ${areacode} AND date_time >= ${hourstart} AND date_time < ${hourend} LIMIT 10000`;
  return client.execute(query).then((result) => result);
}

let getAverageSuccessByAreaCode = function(areacode) {
  let query = `SELECT sum(success) FROM nick.pricing4 WHERE areacode = ${areacode}`;
  return client.execute(query).then((result) => {
    // console.log('here', result)
    // console.log(result)
    var sumCount = result.rows[0]['system.sum(success)'];
    let query2 = `SELECT COUNT(*) from nick.pricing4 WHERE areacode = ${areacode}`;
    return client.execute(query2).then((result) => {
      // console.log('sumcount + result', sumCount)
      
      result = result.rows[0]['count']
      // console.log(result);
      result = result.toString();
      // console.log(sumCount / Number(result));
      return sumCount / Number(result);
    })
  });
}

let getAverageMultiplierByAreaCode = function(areacode) {
  let query = `SELECT sum(multiplier) FROM nick.pricing4 WHERE areacode = ${areacode}`;
  return client.execute(query).then((result) => {
    // console.log(result)
    var sumCount = result.rows[0]['system.sum(multiplier)'].toString();
    // console.log(sumCount);
    let query2 = `SELECT COUNT(*) from nick.pricing4 WHERE areacode = ${areacode}`;
    return client.execute(query2).then((result) => {
      // console.log('sumcount + result', sumCount)
      
      result = result.rows[0]['count']
      // console.log(result);
      result = result.toString();
      // console.log(sumCount / Number(result));
      return sumCount / Number(result);
    })
  });
}

let insertRequest = function(params) {
  // console.log('PARAMS', params);
  // console.log(params.areacode)
  let query = `INSERT INTO nick.pricing4 (areacode, date_time, multiplier, success, uid) VALUES (${params.areacode}, '${params.date_time}', ${params.multiplier}, ${params.success}, ${params.uid})`
  // console.log('post query is', query);
  // let query = `INSERT INTO nick.pricing2 (areacode, date_time, multiplier, success, uid) VALUES (${params.areacode}, '${params.date_time}', ${params.multiplier}, '${params.success}', ${params.uid})`

  return client.execute(query).then((result) => result);
}

module.exports = {

	getRequestsByAreaCode,
  getAverageSuccessByAreaCode,
  getAverageMultiplierByAreaCode,
  insertRequest

}
