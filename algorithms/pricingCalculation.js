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

console.log(distanceInKmBetweenEarthCoordinates(51.5, 0, 38.8, -77.1))

let pricingCalculation = function(fromLoc, toLoc) {
  // fromLoc = [lat, long]
  // toLoc = [lat, long]
  let distance = distanceInKmBetweenEarthCoordinates(fromLoc[0], fromLoc[1], toLoc[0], toLoc[1]);
  return distance * 1.5;
}

// console.log(console.log(Faker.fake("{{address.latitude}}, {{address.longitude}}")))
// var fromLoc = Faker.fake("{{address.latitude}}, {{address.longitude}}");
// fromLoc = fromLoc.split(',');
// var toLoc = Faker.fake("{{address.latitude}}, {{address.longitude}}");
// toLoc = toLoc.split(',');
// console.log(typeof fromLoc)
// // console.log(fromLoc.split(','))

// console.log(pricingCalculation(fromLoc, toLoc))