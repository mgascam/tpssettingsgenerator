var fs = require('fs-extra');
var xml2js = require('xml2js');
var util = require('util');

var parser = new xml2js.Parser();

fs.readFile(__dirname + '/templates/slots/cgs-slots-settings.xml', function (err, data) {
  if(err) {
    console.log(err);
    return;
  }

  parser.parseString(data, function (err, result) {
    if(err) {
      console.log(err);
    }
    console.log(util.inspect(result, false, null));
    // var json = JSON.stringify(result);
    // console.log(json);
    // console.log(result);

    console.log('Done');
  })
});
