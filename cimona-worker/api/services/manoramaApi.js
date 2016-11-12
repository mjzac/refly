var request = require('request');
var APIKEY = process.env.MANORAMA_API_KEY;
var API_HOST = process.env.MANORAMA_HOST;
module.exports = {

  findSections: function findSections(sectionType, callback) {
    switch (sectionType) {
      case 'en': {
        return sails.services.manoramaapi.findEnglishSections({}, callback);
      }
      case 'ml': {
        return sails.services.manoramaapi.findMalayalamSections({}, callback);
      }
    }
  },
  findEnglishSections: function findEnglishSections(params, callback) {
    params.method = 'get';
    params.endpoint = '/editions/en/sections';
    return sails.services.manoramaapi.makeAPICall(params, callback);
  },
  findMalayalamSections: function findMalayalamSections(params, callback) {
    params.method = 'get';
    params.endpoint = '/editions/ml/sections';
    return sails.services.manoramaapi.makeAPICall(params, callback);
  },

  findArticles: function findArticles(params, callback) {
    params.method = 'get';
    params.endpoint = '/editions/' + params.edition + '/sections/' + params.section + '/articles';
    if (params.page) {
      params.qs = { page: params.page };
    }
    return sails.services.manoramaapi.makeAPICall(params, callback);
  },

  findArticleDetails: function findArticleDetails(params, callback) {
    params.method = 'get';
    params.endpoint = '/editions/' + params.edition + '/articles/' + params.article;
    return sails.services.manoramaapi.makeAPICall(params, callback);
  },

  searchArticles: function searchArticles(params, callback) {
    params.method = 'get';
    params.endpoint = '/editions/' + params.edition + '/search';
    params.qs = {
      term: params.term,
      type: params.type
    };
    if (params.section) {
      params.qs.section = params.section;
    }
    if (params.page) {
      params.qs.page = params.page;
    }
    return sails.services.manoramaapi.makeAPICall(params, callback);
  },
  makeAPICall: function makeAPICall(params, callback) {
    var url = API_HOST + params.endpoint;
    var options = {
      url: url,
      method: params.method,
      qs: params.qs,
      json: true,
      body: params.data,
      headers: {
        Accept: 'application/json',
        Authorization: APIKEY,
        'User-Agent': 'Cimona-worker'
      }
    };
    request(options, function response(error, response, body) {
      return callback(error, body);
    });
  }
};
