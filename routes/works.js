var express = require('express');
var router = express.Router();
var db = require('../lib/db');
/* GET users listing. */
router.get('/', function(req, res) {
  res.json(false);
});


module.exports = router;