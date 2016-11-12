var fs = require('fs');

var request = require('request');
var request2 = require('request');
var async = require('async');
var async2 = require('async');

var data = fs.readFileSync('./sections.txt', 'utf8');
var sections = data.split(',');
var article_counts = [];

async.eachSeries(sections, function iterate(item, cb) {
  var options = {
    url: 'http://localhost:1337/en/' + item + '/articles',
    method: 'get',
    json: true
  };
  console.log(options.url);
  request(options, function response(error, response, body) {
    if (body) {
      var articlesCount = body.response.articlesCount;
      article_counts.push({ item: item, count: articlesCount });
    }

    cb();
  });
}, function done(err) {

  async.eachSeries(article_counts, function iterate(item, cb) {
    var options = {
      url: 'http://localhost:1337/en/' + item.item + '/articles?size=' + item.count,
      method: 'get',
      json: true
    };
    console.log(options.url);
    request2(options, function response(error1, response1, body1) {
      console.log(error1);
      if (body1 && body1.response.articleSummary) {
        var articles = body1.response.articleSummary;
        var articleIDs = [];
        for (var j = 0; j < articles.length; j++) {
          articleIDs.push(articles[j].articleID);
        }
        fs.writeFileSync('./articles/' + item.item, articleIDs);
      }
      cb();

    });
  }, function done(err) {
    console.log('done!!');
  });
});

