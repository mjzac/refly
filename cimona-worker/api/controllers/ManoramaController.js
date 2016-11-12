/**
 * ManoramaController
 *
 * @description :: Server-side logic for managing Manoramas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getSections: function getSections(req, res) {
    var sectionCode = req.param('section') || 'en';
    switch (sectionCode) {
      case 'en': {
        sails.services.manoramaapi.findEnglishSections({}, function callback(error, response) {
          if (error) {
            return res.json(401, { error: error });
          } else {
            return res.json(200, { response: response });
          }
        });
        break;
      }
      case 'ml': {
        sails.services.manoramaapi.findMalayalamSections({}, function callback(error, response) {
          if (error) {
            return res.json(401, { error: error });
          } else {
            return res.json(200, { response: response });
          }
        });
        break;
      }
      default: {
        return res.json(403, {error: 'Invalid section'});
      }
    }
  }
};

