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

let updateSurge = (params) => {
  var query = {'areacode': params.areacode};
  surgeList.findOneAndUpdate(query, { $set: {'areacode': params.areacode, 'multiplier': params.multiplier} }, {upsert: true, returnNewDocument: true}).then((result) => {
    // console.log(result);
    return result;
  })
}

let getSurgeByArea = (areacode) => {
  return surgeList.find({"areacode": areacode}).then((result) => {
    // console.log('result in getSurgeByArea', result);
    if (result.length > 0) {
      return result[0].multiplier;  
    } else {
      return undefined;
    }
  	
  });
}

module.exports = {
  getSurgeByArea,
  updateSurge,
  save
}















// var query = {'username':req.user.username};
// req.newData.username = req.user.username;
// MyModel.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
//     if (err) return res.send(500, { error: err });
//     return res.send("succesfully saved");
// });

// db.scores.findOneAndUpdate(
//    { "name" : "A.B. Abracus" },
//    { $set: { "name" : "A.B. Abracus", "assignment" : 5}, $inc : { "points" : 5 } },
//    { sort: { "points" : 1 }, upsert:true, returnNewDocument : true }
// );





// var listObj = new surgeList({"areacode": 8, "multiplier": 2.2});
// listObj.save(function(err) {
//   if (err) {
//     console.log(err);
//   }
// })

// surgeList.getSurgeByArea(8);
// surgeList.insert({"areacode": 7, "surge" : 2.2})