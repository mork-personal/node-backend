var express = require("express");
var querystring = require('querystring');
const { stateKey } = require("../constants");
var router = express.Router();

router.get("/", function (req, res, next) {
  console.log("made it to the callback endpoint" + req);
  
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  console.log(`Code: ${code}, state: ${state}, and stored state: ${storedState}`);
  res.render('index', { title: 'Callback!' });
});

module.exports = router;