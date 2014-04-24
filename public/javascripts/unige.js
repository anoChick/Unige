$(function(){


//情報barの動き
var mesQueue=['トナカイさんになりたいというのも悪くないかもしれませんね。','ひよこさんより可愛いのは存在しないんだと思います。','くいなちゃんはいま風を引いているので超えるなら今。']
console.log(mesQueue.next);
mesQueue.next  = function(){
  var next =this.shift();
  this.push(next);

  return next;
}


var pushInfoMessage = function(iMes){
  $('#infoBar').append(iMes);
  loopInfoMessage(iMes);
}


var loopInfoMessage = function(iMes){
iMes.css('left',$(window).width());
iMes.animate({
    left:-iMes.width()+'px'
  },$(window).width()/0.104,'linear',function(){
      pushInfoMessage($('<span>',{class:'info-message'}).html(mesQueue.next()));
      $(this).remove();
  });
}


//pushInfoMessage($('<span>',{class:'info-message'}).html(mesQueue.next()));
})
