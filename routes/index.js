var express = require('express');
var router = express.Router();
var db = require('../lib/db');



/* GET home page. */

router.get('/', function(req, res) {
  var sess = req.session;
  if (sess.views) {
    sess.views++;
  } else {
    sess.views = 1;
    //クリエイトゲストユーザ
  }
  // req.session.destroy(function(err) {
  //   // cannot access session here
  // });
  console.log(sess);
  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;
