/**
 * ManoramaController
 *
 * @description :: Server-side logic for managing Manoramas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getSections: function getSections(req, res) {
    var editionCode = req.param('edition') || 'en';
    switch (editionCode) {
      case 'en':
      case 'ml': {
        sails.services.manoramaapi.findSections(editionCode, function callback(error, response) {
          if (error) {
            return res.json(401, { error: error });
          } else {
            return res.json(200, { response: response });
          }
        });
        break;
      }
      default: {
        return res.json(403, { error: 'Invalid Edition ' + editionCode });
      }
    }
  },

  getArticles: function getArticles(req, res) {
    var editionCode = req.param('edition') || 'en';
    var sectionCode = req.param('section') || '';
    var params = {};
    var page = req.param('page') || '';
    var size = req.param('size') || '';
    if (page) {
      params.page = page;
    }
    if (page) {
      params.size = size;
    }
    switch (editionCode) {
      case 'en':
      case 'ml': {
        params.edition = editionCode;
        params.section = sectionCode;
        return sails.services.manoramaapi.findArticles(params, function callback(error, response) {
          if (error) {
            return res.json(401, { error: error });
          } else {
            return res.json(200, { response: response });
          }
        });
      }
      default: {
        return res.json(403, { error: 'Invalid Edition Code ' + editionCode });
      }
    }
  },

  getArticleDetails: function getArticles(req, res) {
    var editionCode = req.param('edition') || 'en';
    var articleID = req.param('articleID') || '';
    var params = {};
    switch (editionCode) {
      case 'en':
      case 'ml': {
        params.edition = editionCode;
        params.article = articleID;
        return sails.services.manoramaapi.findArticleDetails(params, function callback(error, response) {
          if (error) {
            return res.json(401, { error: error });
          } else {
            return res.json(200, { response: response });
          }
        });
      }
      default: {
        return res.json(403, { error: 'Invalid Edition Code ' + editionCode });
      }
    }
  },

  search: function search(req, res) {
    var editionCode = req.param('edition') || 'en';
    var searchType = req.param('type') || 'all';
    var term = req.param('term') || '';
    var params = {};
    var page = req.param('page') || '';
    if (page) {
      params.page = page;
    }
    switch (editionCode) {
      case 'en':
      case 'ml': {
        params.edition = editionCode;
        params.type = searchType;
        params.term = term;
        return sails.services.manoramaapi.searchArticles(params, function callback(error, response) {
          if (error) {
            return res.json(401, { error: error });
          } else {
            return res.json(200, { response: response });
          }
        });
      }
      default: {
        return res.json(403, { error: 'Invalid Edition Code ' + editionCode });
      }
    }
  }
};

