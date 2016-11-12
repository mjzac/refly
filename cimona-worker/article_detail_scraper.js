var fs = require('fs');

var request = require('request');
var async = require('async');
var async2 = require('async');

var files = fs.readdirSync('./articles/');

async.eachSeries(files, function iterate(item, cb) {
  var content = fs.readFileSync('./articles/' + item, 'utf8');
  var ids = content.split(',');
  var articles = [];
  async2.eachSeries(ids, function another(item2, cb2) {
    var options = {
      url: 'http://localhost:1337/en/articles/' + item2,
      method: 'get',
      json: true
    };
    console.log(options.url);
    request(options, function response(error, response, body) {
      var article_content = body.response.content;
      articles.push(article_content);
      cb2();
    });
  }, function done2(err) {
    fs.writeFileSync('./data/' + item + '.txt', articles.join('\n'));
    cb();
  });
}, function done(err) {
  console.log('done!');
});

