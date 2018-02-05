const mongoose = require('mongoose');
require('dotenv/config');
mongoose.connect(process.env.MONGO_DB || 'mongodb://localhost/thesis');

let Schema = mongoose.Schema;

let surgeSchema = new Schema({
  areacode: Number,
  multiplier: Number
});

let surgeList = mongoose.model('surgeList', surgeSchema);

let save = (params) => {
  var newSurgeEntry = new surgeList({ areacode: params.areacode, multiplier: params.multiplier});
  newSurgeEntry.save(function(err) {
  	if (err) {
  	  console.log(err);
  	}
  });
}

// var query = {'username':req.user.username};
// req.newData.username = req.user.username;
// MyModel.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
//     if (err) return res.send(500, { error: err });
//     return res.send("succesfully saved");
// });

let updateSurge = (params) => {
  var query = {'areacode': params.areacode};
  surgeList.findOneAndUpdate(query, {'areacode': params.areacode, 'multiplier': params.multiplier}).then((result) => {
    console.log(result);
  })
}

let getSurgeByArea = (areacode) => {
  // console.log('here', areacode)
  return surgeList.find({"areacode": areacode}).then((result) => {
  	console.log(result)
  	return result;
  });
  // query.select('multiplier');
  // query.exec(callback)
}

var listObj = new surgeList({"areacode": 7, "surge": 2.2});
listObj.save(function(err) {
  if (err) {
    console.log(err);
  }
})
// surgeList.insert({"areacode": 7, "surge" : 2.2})
module.exports = {
  getSurgeByArea,
  updateSurge,
  save
}