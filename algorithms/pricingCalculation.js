const Faker = require('faker');

let degreesToRadians = function(degrees) {
  return degrees * Math.PI / 180;
}

let distanceInKmBetweenEarthCoordinates = function(lat1, lon1, lat2, lon2) {
  var earthRadiusKm = 6371;

  var dLat = degreesToRadians(lat2-lat1);
  var dLon = degreesToRadians(lon2-lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return earthRadiusKm * c;
}

let pricingCalculation = function(fromLoc, toLoc, multiplier = 1) {
  // fromLoc = [lat, long]
  // toLoc = [lat, long]
  // console.log(fromLoc)
  // console.log(toLoc)
  // console.log(fromLoc[0])
  fromLoc = JSON.parse(fromLoc);
  toLoc = JSON.parse(toLoc);
  // console.log(fromLoc[0])
  if (fromLoc[0] > 85 || toLoc[0] > 85 || fromLoc[0] < -85 || toLoc[0] < -85 || fromLoc[1] > 180 || fromLoc[1] < -180 || toLoc[1] > 180 || toLoc[0] < -180) {
  	console.log('invalid coordinates');
  	return null;
  } 

  if (isNaN(Number(fromLoc[0])) || isNaN(Number(fromLoc[1])) || isNaN(Number(toLoc[0])) || isNaN(Number(toLoc[1]))) {
  	console.log('coordinates are NaN');
  	return null;
  }

  let distance = distanceInKmBetweenEarthCoordinates(fromLoc[0], fromLoc[1], toLoc[0], toLoc[1]);
  console.log('success! distance is', distance)
  return multiplier * distance * 1.5;
}

// console.log(Faker.fake("{{address.latitude}}, {{address.longitude}}"))
// var fromLoc = Faker.fake("{{address.latitude}}, {{address.longitude}}");
// fromLoc = fromLoc.split(',');
// var toLoc = Faker.fake("{{address.latitude}}, {{address.longitude}}");
// toLoc = toLoc.split(',');
// console.log(type, 1of fromLoc)
// // console.log(fromLoc.split(','))

// console.log(pricingCalculation(fromLoc, toLoc, 1))

module.exports = {
	pricingCalculation
}