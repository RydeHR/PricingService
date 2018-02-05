module.exports = {
  generateRandomData
};

// Make sure to "npm install faker" first.
const Faker = require('faker');

function generateRandomData(userContext, events, done) {
  // generate data with Faker:
  var fakeDate = Faker.date.between('2011-01-01', '2017-12-31');
  fakeDate = JSON.stringify(fakeDate);
  fakeDate = fakeDate.split('T').join(' ');
  fakeDate = JSON.parse(fakeDate);
  // add variables to virtual user's context:
  var areacode = Math.floor(Math.random() * 201);
  var success = Math.round(Math.random());
  userContext.vars.date = fakeDate;
  userContext.vars.areacode = areacode;
  userContext.vars.success = Number(success);
  return done();
}