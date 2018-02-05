const faker = require('faker');
const fs = require('fs');
const os = require('os');
let results = [];
module.exports.generator = function() {
  var output = [];
  var bias = Math.random();
  var areaCode = Math.floor(bias * 201);
  if (areaCode === 0) {
  	areaCode = 1;
  }
  if (bias > 0.8) {
  	var multiplier = Number((Math.random() * 10).toFixed(1));	
  } else if (bias > 0.6) {
  	var multiplier = Number((Math.random() * 5).toFixed(1));
  } else {
  	var multiplier = 1;
  }

  var date = faker.date.between('2011-01-01', '2017-12-31');
  date = JSON.stringify(date);
  date = date.split('T').join(' ');
  date = JSON.parse(date);

 
  if (multiplier > 7) { 
    if (bias > 0.95) {
      var success = 'true';
    } else {
      var success = 'false';
    }
  }

  if (multiplier > 5) {
    if (bias > 0.8) {
      var success = 'true';
    } else {
      var success = 'false';
    }
  }

  if (multiplier > 3) {
    if (bias > 0.65) {
      var success = 'true';
    } else {
      var success = 'false';
    }
  }

  if (multiplier > 1) {
    if (bias > 0.5) {
      var success = 'true';
    } else {
      var success = 'false';
    }
  } 

  if (multiplier === 1) {
    if (bias > 0.35) {
      var success = 'true';
    } else {
      var success = 'false';
    }
  } else {
    var success = 'true';
  }
  output.push(date, areaCode, multiplier, success)
  return output;
}
var generator = function() {
  var output = [];
  var bias = Math.random();
  var areaCode = Math.floor(bias * 201);
  if (areaCode === 0) {
  	areaCode = 1;
  }
  var bias = Math.random();
  if (bias > 0.8) {
  	var multiplier = Number((Math.random() * 10).toFixed(1));	
  } else if (bias > 0.6) {
  	var multiplier = Number((Math.random() * 5).toFixed(1));
  } else {
  	var multiplier = 1;
  }
  if (multiplier < 1) {
    multiplier = 1;
  }
  var date = faker.date.between('2011-01-01', '2017-12-31');
  date = JSON.stringify(date);
  date = date.split('T').join(' ');
  date = JSON.parse(date);
  var bias = Math.random();
  if (multiplier > 7) { 
  	if (bias > 0.95) {
      var success = 1;
  	} else {
  	  var success = 0;
  	}
  }

  if (multiplier > 5) {
  	if (bias > 0.8) {
  	  var success = 1;
  	} else {
  	  var success = 0;
  	}
  }

  if (multiplier > 3) {
  	if (bias > 0.65) {
  	  var success = 1;
  	} else {
  	  var success = 0;
  	}
  }

  if (multiplier > 1) {
  	if (bias > 0.5) {
  	  var success = 1;
  	} else {
  	  var success = 0;
  	}
  } 

  if (multiplier === 1) {
  	if (bias > 0.35) {
  	  var success = 1;
  	} else {
  	  var success = 0;
  	}
  } else {
  	var success = 1;
  }
  output.push(areaCode, JSON.stringify(date), multiplier, success)
  return output;
}


let writeStream = fs.createWriteStream('finalData.txt');

for (var i = 0; i < 10000000; i++) {
  var row = generator().join(',');
  writeStream.write(row + ',' + i + os.EOL)
}
writeStream.on('end', () => {
  console.log('wrote all data to file');
})
writeStream.end();  