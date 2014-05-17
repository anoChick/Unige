"use strict";

$(function() {

  var unige = {
    data: {
      user: null
    },
    init: function() {
      var self = this;
      self.view = new View().init();
      if (!self.data.user) {
        self.login();
      }
    },
    start: function() {
      var self = this;
      self.init();
    },
    login: function() {
      //自分のユーザ情報取得
      var self = this;
      if (!$.cookie('user_session')) {
        $.get("/user/login").done(function(data) {

          //データ更新
          self.data.user = data.userData
          ///ユーザラベル更新
          self.view.renderUserLabel(data.userData);

          //ユーザメニュー更新
          self.view.renderUserMenu(data.userData);
        });

      }
    },
    //アカウント作成命令
    postEntryUser: function() {
      var self = this;
      $.post("/user/create", {
        handle: $('#entryForm .handle').val(),
        name: $('#entryForm .name').val(),
        email: $('#entryForm .email').val(),
        password: $('#entryForm .pass').val()
      }).done(function(data) {

        console.log(data);

      });
    }
  }

  var View = function() {
    this.init = function() {
      var self = this;
      //アカウント作成
      $('#createUserButton').on('click', function() {
        if ($("#entryForm").valid()) {
          unige.postEntryUser();
        }
      })
      //バリデーションチェック
      $("#entryForm").validate({
        rules: {
          name: {
            customUserIDValidation: true,
            required: true,
            rangelength: [2, 32],
            remote: {
              url: "/user/validcheck",
              type: "get",
              dataType: 'json',
              data: {
                username: function() {
                  return $("#username").val();
                }
              }
            }
          },
          email: {
            required: true,
            email: true,
            remote: {
              url: "/user/validcheck",
              type: "get",
              dataType: 'json',
              data: {
                username: function() {
                  return $("#username").val();
                }
              }
            }
          }
        }
      });
      //モーダル
      $('#modalBack').on('click', function() {

        $(this).fadeOut(100);
      });
      $('#modalEntry').on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      })

      //登録ボタンの挙動
      $('#entryButton').on('click', function() {
        $('#modalBack').fadeIn(100);
        console.log(unige);
        $('#entryForm input').val('');
        $('#entryForm .handle').val(unige.data.user && unige.data.user.handle);
      });

      //探索ボタンの挙動
      self.a($('#mainMenuTagButton'), function() {
        $('#mainMenuGenreButton').removeClass('active');
        $('#mainMenuTagButton').toggleClass('active');
        if ($('#mainMenuTagButton').hasClass('active')) {
          $('.toggle-view').slideDown(100);
        } else {
          $('.toggle-view').slideUp(100);
        }
        $('#toggleView .tag-cloud').removeClass('hide');
        $('#toggleView .categories').addClass('hide');
      });
      self.a($('#mainMenuGenreButton'), function() {
        $('#mainMenuTagButton').removeClass('active');
        $('#mainMenuGenreButton').toggleClass('active');
        if ($('#mainMenuGenreButton').hasClass('active')) {
          $('.toggle-view').slideDown(100);
        } else {
          $('.toggle-view').slideUp(100);
        }
        $('#toggleView .tag-cloud').addClass('hide');
        $('#toggleView .categories').removeClass('hide');
      });


      //サイドメニューの挙動

      for (var i = 0; i < $('.side-menu .item').length; i++) {
        var e = $($('.side-menu .item')[i]);
        self.a(e, function(m){
          return function() {
            $('.container').hide();
            $('#' + m[0] + m[1] + 'Container').show();
          }
        }(e.attr('href').split('/')));
      }

      //view.init終り
      return this;
    }

    //ユーザメニューを追加　オプションは{href}
    this.genUserMenu = function(label, option) {
      var self = this;

      var item = $('<a>', {
        class: 'item',
        href: option.href
      }).html(label);

      return self.a(item, function() {
        $('.page').addClass('hide');
        if (option.href) $('#' + option.href + 'Page').removeClass('hide');



        $('#userMenu .item').removeClass('active');
        item.addClass('active');
      });
    }
    //ハイパーリンクオフにしてコールバックを追加
    this.a = function(a, callback) {
      a.on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        callback();
        return false;
      })
      return a;
    }
    //ユーザメニュー更新
    this.renderUserMenu = function(data) {
      var self = this;
      var uMenu = $('#userMenu');

      //ユーザタイプごとの処理
      var n = {
        Guest: function() {

          uMenu.append(self.genUserMenu('ログイン', {
            href: 'login'
          }));
        },
        Basic: function() {
          uMenu.append(self.genUserMenu('投稿', {
            href: 'works'
          }));
        },
        Pro: function() {

        }
      }[data.type];
      n && n();
    }

    //ユーザラベルを更新
    this.renderUserLabel = function(data) {
      var uLabel = $('#userLabel');
      if (data) {
        //共通
        uLabel.find('.handle').html(data.handle);

        //ユーザタイプごとの処理
        var n = {
          Guest: function() {

          },
          Basic: function() {
            //登録ボタンを隠す
            $('#entryButton').hide();


          },
          Pro: function() {
            $('#entryButton').hide();
          }
        }[data.type];
        n && n();
      }

      uLabel.children('.wrap').removeClass('hide');
      uLabel.children('.loading').addClass('hide');
    }
  }

  unige.start();
})