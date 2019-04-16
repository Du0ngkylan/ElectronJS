(function () {
  'use strict';

  bc = bc || {};
  var i = "abcdeghiklmnopqrstuvxy",
  k = i.split(""),
  d = "Chúc mừng, Xuất sắc, Tuyệt đỉnh, Siêu nhân, Hoan hô, Quá giỏi, Tuyệt cú mèo".split(", "),
  a = new Image,
  n = localStorage || {};
  $(function () {
    DisplayControl();
  })

  //======= các hàm xử lý ========
  function g(n) {
    for (var r, u = "", f = i.split("").reverse().join(""), t = 0; t < n.length; t++) r = i.indexOf(n.charAt(t)), u += r >= 0 ? f.charAt(r) : n.charAt(t);
    return u.replace(/aas/ig, "ấ").replace(/aaf/ig, "ầ").replace(/aar/ig, "ẩ").replace(/aax/ig, "ẫ").replace(/aaj/ig, "ậ").replace(/aa/ig, "â").replace(/as/ig, "á").replace(/af/ig, "à").replace(/ar/ig, "ả").replace(/ax/ig, "ã").replace(/aj/ig, "ạ").replace(/aws/ig, "ắ").replace(/awf/ig, "ằ").replace(/awr/ig, "ẳ").replace(/awx/ig, "ẵ").replace(/awj/ig, "ặ").replace(/aw/ig, "ă").replace(/ees/ig, "ế").replace(/eef/ig, "ề").replace(/eer/ig, "ể").replace(/eex/ig, "ễ").replace(/eej/ig, "ệ").replace(/ee/ig, "ê").replace(/es/ig, "é").replace(/ef/ig, "è").replace(/er/ig, "ẻ").replace(/ex/ig, "ẽ").replace(/ej/ig, "ẹ").replace(/oos/ig, "ố").replace(/oof/ig, "ồ").replace(/oor/ig, "ổ").replace(/oox/ig, "ỗ").replace(/ooj/ig, "ộ").replace(/oo/ig, "ô").replace(/os/ig, "ó").replace(/of/ig, "ò").replace(/or/ig, "ỏ").replace(/ox/ig, "õ").replace(/oj/ig, "ọ").replace(/is/ig, "í").replace(/if/ig, "ì").replace(/ir/ig, "ỉ").replace(/ix/ig, "ĩ").replace(/ij/ig, "ị").replace(/ows/ig, "ớ").replace(/owf/ig, "ờ").replace(/owr/ig, "ở").replace(/owx/ig, "ỡ").replace(/owj/ig, "ợ").replace(/ow/ig, "ơ").replace(/ys/ig, "ý").replace(/yf/ig, "ỳ").replace(/yr/ig, "ỷ").replace(/yx/ig, "ỹ").replace(/yj/ig, "ỵ").replace(/us/ig, "ú").replace(/uf/ig, "ù").replace(/ur/ig, "ủ").replace(/ux/ig, "ũ").replace(/uj/ig, "ụ").replace(/uws/ig, "ứ").replace(/uwf/ig, "ừ").replace(/uwr/ig, "ử").replace(/uwx/ig, "ữ").replace(/uwj/ig, "ự").replace(/uw/ig, "ư").replace(/dd/ig, "đ").replace(/-+/ig, " ").toLowerCase()
  }

  function o(n) {
    return n.replace(/[áàảãạâấầẩẫậăắằẳẵặ]/ig, "a").replace(/[đ]/ig, "d").replace(/[éèẻẽẹêếềểễệ]/ig, "e").replace(/[íìỉĩị]/ig, "i").replace(/[óòỏõọôốồổỗộơớờởỡợ]/ig, "o").replace(/[ýỳỷỹỵ]/ig, "y").replace(/[úùủũụưứừửữự]/ig, "u").replace(/\s+/ig, "").toLowerCase()
  }

  function s(n) {
    for (var i, r, t = n.length; t; i = Math.floor(Math.random() * t), r = n[--t], n[t] = n[i], n[i] = r);
    return n
  }

  function v(n) {
    n = n.toLowerCase().replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var i = new RegExp("[\\?&]" + n + "=([^&#]*)"),
      t = i.exec(location.search.toLowerCase());
    return t == null ? "" : decodeURIComponent(t[1].replace(/\+/g, " "))
  }

  function r() {
    return n && $.isNumeric(n.l) ? parseInt(n.l) : 1
  }

  function h() {
    return n && $.isNumeric(n.sound) ? parseInt(n.sound) : 1
  }

  function y(t) {
    $.isNumeric(t) && (n.sound = t, t == 1 ? $("#start.stage .btn-speaker").removeClass("off") : $("#start.stage .btn-speaker").addClass("off"))
  }

  function f() {
    if (n && n.s) {
      var t = u(n.s, i);
      return $.isNumeric(t) ? parseInt(t) : 0
    }
    return 0
  }

  function p(t) {
    $.isNumeric(t) && (n.s = l(t, i), $("#play.stage .header .points>i").text(t))
  }

  function c() {
    if (n && n.p) {
      var t = u(n.p, i);
      return $.isNumeric(t) ? parseInt(t) : 0
    }
    return 0
  }

  function nt(t) {
    $.isNumeric(t) && (n.p = l(t, i))
  }

  function tt(t) {
    $.isNumeric(t) && (n.l = t)
  }


  function lt() {
    var n = r(),
      t;
    return n <= bc.data.length && (t = e(bc.data[n - 1]), $("#play.stage .answer>a").text().toLowerCase() == o(t.d)) ? !0 : !1
  }

  function e(n) {
    var t = n.split(".")[0];
    return {
      a: n,
      d: g(t)
    }
  }


  // =============================


  function Show(item) {
    $(".stage").addClass("hide");
    $("#" + item).removeClass("hide");
    switch (item) {
      case "play":
        play();
        break;
    }
  }

  function play() {
    var image_path = "../databases/items/",
    c = 14,
    u = r(),
    h, n, l, v, b, y, i, d;

    if ($("#play.stage .keyboard").empty(), $("#play.stage .answer").empty(), u <= bc.data.length) {
      if (h = e(bc.data[u - 1]), n = s(o(h.d).split("")), c < n.length && (c = n.length), $.each(n, function () {
        $("#play.stage .answer").append("<a><\/a>")
      }),
      l = s(n.concat(s(k).slice(0, c - n.length))), $.each(l, function (n) {
        var t = $("<a><\/a>").text(l[n]).on("mousedown", function () {
          var n = $(this),
            t = $("#play.stage .answer>a");
          t.each(function () {
            if ($(this).text() == "") {
              n.css("visibility", "hidden");
              $(this).text(n.text()).one("mousedown", function () {
                $(this).text("");
                n.css("visibility", "")
              });
              return t.text().replace(" ", "").length == t.length && (lt() ? vt() : at()), !1
            }
          })
        });
        $("#play.stage .keyboard").append(t)
      }), $("#play.stage .header .level>i").text(r()), $("#play.stage .header .points>i").text(f()), $("#play.stage .body #image").attr("src", p + h.a), v = w(), b = o(h.d), v > 0)
        for (y = $("#play.stage .answer>a"), y.trigger("mousedown"), i = 0; i < v; i++) $($("#play.stage .keyboard>a:contains('" + b[i] + "')")[0]).trigger("mousedown"), $(y[i]).addClass("disabled").off("mousedown")
    }
  }

  // điều khiển các hoạt động trên giao diện
  function DisplayControl() {
    $(".button.button-start").click(function () {
      Show("play");
    });
  }
})();