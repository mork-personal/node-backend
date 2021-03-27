var express = require("express");
var querystring = require('querystring');
const { stateKey, baseUrl, clientId } = require("../constants");
var router = express.Router();

var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.get("/", function (req, res, next) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: clientId,
        // scope: 'space separated list https://developer.spotify.com/documentation/general/guides/scopes/#user-library-modify'
        redirect_uri: baseUrl + "/callback",
        state: state,
      })
  );
});

module.exports = router;
