$(function(){


//情報barの動き
var mesQueue=['トナカイさんになりたいというのも悪くないかもしれませんね。','ひよこさんより可愛いのは存在しないんだと思います。','くいなちゃんはいま風を引いているので超えるなら今。']
console.log(mesQueue.next);

var pushInfoMessage = function(iMes){
  $('#infoBar').append(iMes);
  loopInfoMessage(iMes);
}


var loopInfoMessage = function(iMes){ 
  console.log(-iMes.width());
iMes.css('left',$(window).width());
iMes.animate({
    left:-iMes.width()+'px'
  },$(window).width()/0.32,'linear',function(){
    console.log('next');
      pushInfoMessage($('<span>',{class:'info-message'}).html('nyaaaaan'));
      $(this).remove();
  });
}


pushInfoMessage($('<span>',{class:'info-message'}).html('nyaaaaan'));
})