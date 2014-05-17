var express = require('express');
var router = express.Router();
var db = require('../lib/db');
/* GET users listing. */
router.get('/', function(req, res) {
  res.json(false);
});




router.get('/login', function(req, res) {
  var date = new Date();
  if (req.session.userId) {
    db.User.findOne({
      id: req.session.userId
    }, function(err, user) {
      var userData = coverUserData('self', user);

      req.session.userId = userData.id;
      res.json({
        error: null,
        userData: userData
      });
    })
  } else {

    db.User.findOne().sort('-id').exec(function(err, item) {
      if (err) res.json({
        error: err
      });
      var user = new db.User();
      user.type = 'Guest';
      user.handle = 'Guest' + (item.id + 1);
      user.point = 0;
      user.id = item.id + 1;
      user.recordDate = date, //登録日
      user.lastDate = date;
      user.save(function(err) {
        if (err) {
          console.log(err);
        }
      });
      var userData = coverUserData('self', user);
      req.session.userId = userData.id;
      res.json({
        error: null,
        userData: userData
      });
    });
  }

});



//バリデーションチェック
router.get('/validcheck', function(req, res) {
  if (req.query.name) {
    var thename = req.query.name;
    db.User.find({
      'name': {
        $regex: new RegExp(thename, "i")
      }
    }, function(err, item) {
      if (!item.length) {
        res.json(true);
      } else {
        res.json(false);
      }
    });
  } else if (req.query.email) {
    var thename = req.query.email;
    db.User.find({
      'email': {
        $regex: new RegExp(thename, "i")
      }
    }, function(err, item) {
      if (!item.length) {
        res.json(true);
      } else {
        res.json(false);
      }
    });
  } else {
    res.json(false);
  }
});

//ユーザデータをクライアント向けに隠ぺいする
function coverUserData(who, user) {
  var userData;
  switch (who) {
    case 'self':
      userData = {
        handle: user.handle,
        point: user.point,
        id: user.id,
        type: user.type
      }

      break;
  };
  return userData;
}


module.exports = router;