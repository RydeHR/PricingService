const Faker = require('faker');

function generateGetData(userContext, events, done) {
  var areacode = Math.floor(Math.random() * 201);
  userContext.vars.areacode = `/multiplier/${areacode}`;
  return done();
}

function generatePostData(userContext, events, done) {
  // generate data with Faker:
  var fakeDate = Faker.date.between('2011-01-01', '2017-12-31');
  fakeDate = JSON.stringify(fakeDate);
  fakeDate = fakeDate.split('T').join(' ');
  fakeDate = JSON.parse(fakeDate);
  // add variables to virtual user's context:
  var areacode2 = Math.floor(Math.random() * 201);
  var success = Math.round(Math.random());
  var multiplier = Number((Math.random() * 10).toFixed(1));
  userContext.vars.date = fakeDate;
  userContext.vars.areacode2 = areacode2;
  userContext.vars.multiplier = multiplier;
  userContext.vars.success = Number(success);
  userContext.vars.url = `/multiplier/${areacode}`
  return done();
}

function generateMarketData(userContext, events, done) {
  var fakeRiders = Math.floor(Math.random() * 140);
  var fakeDrivers = Math.floor(Math.random() * 100);
  var areacode3 = Math.floor(Math.random() * 20000);

  userContext.vars.riders = fakeRiders;
  userContext.vars.drivers = fakeDrivers;
  userContext.vars.areacode3 = areacode3;
  return done();
}

module.exports = {
  generateGetData,
  generatePostData,
  generateMarketData
};