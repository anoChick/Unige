var mongoose = require('mongoose');
var redis = require('redis');
var crypto = require('crypto');
//暗号化
var COMMON_KEY = 'pass23OPEMopMEI_)#<@V%M9{N$@%(VUMT()#<Ccar;9nh7a;word';
var cipher = crypto.createCipher('aes-256-cbc',COMMON_KEY);
var crypt = function(str){
  var crypted = cipher.update(str, 'utf-8', 'hex');
  crypted += cipher.final('hex');
}
//復号化
decipher = crypto.createDecipher('aes-256-cbc',COMMON_KEY);
var decrypt = function(str){
  var dec = decipher.update(str, 'hex', 'utf-8');
  dec += decipher.final('utf-8');
}



// 定義フェーズ
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
  name:  String,//ハンドルネーム
  point: Number,//ポイント
  password : String,//パスワード暗号化済み
  userid : Number,//id　901240917
  userName : String,//ユーザネームanoChick
  recordDate : Date//登録日
});
mongoose.model('User', UserSchema);









// 使用フェーズ
mongoose.connect('mongodb://localhost/sample_db');

var User = mongoose.model('User');
var user = new User();
user.name  = 'KrdLab';
user.point = 777;
// user.save(function(err) {
//   if (err) { console.log(err); }
// });

// ※注意：イベント駆動

User.find({}, function(err, docs) {
  console.log(docs);
  for (var i=0, size=docs.length; i<size; ++i) {
  }
});
