var fs = require('fs');

var request = require('request');
var async = require('async');

var options = {
  url: 'http://localhost:1337/en/section',
  method: 'get',
  json: true
};
request(options, function response(error, response, body) {
  var sections = body.response.sections;
  var cleaned_section = [];
  async.each(sections, function saveSubSections(item, cb){
    if (item.sectionCount > 0) {
      var _child_sections = item.sections;
      for(var i = 0; i< _child_sections.length; i++) {
        cleaned_section.push(_child_sections[i].code);
      }
    } else {
      cleaned_section.push(item.code);
    }
    cb();
  }, function done(err){
    fs.writeFile('./sections.txt', cleaned_section, function wrote(err) {
      console.log('done!');
    });
  });
});
