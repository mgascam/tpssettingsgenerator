var xmldom = require('xmldom').DOMParser;
var fs = require('fs-extra');

var doc = new xmldom();

fs.readFile(__dirname + '/templates/slots/cgs-slots-settings.xml', function (err, data) {
  if(err) {
    console.log(err);
    return;
  }

  doc.parseFromString(data);

  console.log(doc);
});
