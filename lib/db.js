var mongoose = require('mongoose');
var redis = require('redis');
var mongooseCachebox = require('mongoose-cachebox');
var options = {
  engine: 'redis',
  host: '127.0.0.1',
  port: '6379',
  password: 'secret'
};

// adding mongoose cachebox
mongooseCachebox(mongoose, options);
var query = new mongoose.Query();


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
  type : String,//ユーザタイプ、Guestか,BasicかPro
  handle:  String,//ハンドルネーム
  point: Number,//ポイント
  password : String,//パスワード暗号化済み
  id : Number,//id　901240917
  name : String,//ユーザネームanoChick
  recordDate : Date,//登録日
  lastDate : Date,//最終更新日
  iconName : String,//アイコンのファイルネーム
  email: String,//メールアドレス
});
mongoose.model('User', UserSchema);


var GameSchema = new Schema({
  id : Number,//id　901240917
  ownerID:Number,// 投稿者のユーザID
  title:String,//タイトル
  files:[String],//ファイル
  release:Number,//公開ファイルの配列インデックス
  thumbnail:String,//サムネイル画像
  description:String,//概要・説明など
  genre:Number,//げーむじゃんる
  tags:[String],//タグ
  plays:Number,//プレイ総数
  likes:Number//お気に入りされてる数


});
mongoose.model('Game', GameSchema);



// 使用フェーズ
mongoose.connect('mongodb://localhost/sample_db');

var User = mongoose.model('User');
var user = new User();
user.name  = 'KrdLab';
user.point = 777;
user.id=1;
// user.save(function(err) {
//   if (err) { console.log(err); }
// });




//////////////こっから


var db ={
  User:User,
  mongoose:mongoose,
  crypt:crypt,
  decrypt:decrypt
}


module.exports = db;
