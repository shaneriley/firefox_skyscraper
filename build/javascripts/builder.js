$(function() {
  var corners = ["tl", "tr", "bl", "br"],
      sides = ["t", "r", "b", "l"];
  var œ = function(number) {
    return {
      length: number,
      times: {
        length: number,
        "do": function(fn) {
          var len = this.length;
          for (var i = 0; i < len; i++) {
            fn(i);
          }
        }
      },
      tags: function(tag, html) {
        tag = tag || "<b>";
        html = html || "";
        var closing_tag = tag.replace(/</, "</");
        return (new Array(this.length + 1)).join(tag) + html + (new Array(this.length + 1)).join(closing_tag);
      }
    };
  };
  var $b = $("#base");

  (function() {
    var drawCorner = function(idx) {
      var $parent = $("<b />", {
        id: idx + "_corner",
        "class": "corner",
        html: œ(99).tags()
      }).appendTo($b);
    };

    corners.forEach(drawCorner);
  })("corners");

  (function() {
    var drawBeam = function(position) {
      œ(5).times.do(function(j) {
        var $parent = $("<b />", {
          "class": position + "_beam beam beam_" + (j + 1),
          html: œ(99).tags()
        }).appendTo($b);
      });
    };

    sides.forEach(drawBeam);
  })("vertical beams");

  (function() {
    var drawSide = function(idx) {
      $parent = $("<b />", {
        id: idx + "_side",
        "class": "side",
        html: œ(99).tags("<div>")
      }).appendTo($b);
    };

    sides.forEach(drawSide);
  })("sides");

  (function() {
    var antenna_l = '<span id="antenna_l">' + œ(30).tags("<span>") + '</span>',
        antenna_r = '<span id="antenna_r">' + œ(32).tags("<span>") + '</span>',
        roof = '<b id="roof">' + œ(1).tags(0, antenna_l + antenna_r) + '</b>';
    $("<b />", {
      id: "guts",
      html: œ(99).tags(0, roof)
    }).appendTo($b);
  })("center");

  (function() {
    $(".corner").each(function() {
      var $e = $(this);
      for (var i = 24; i < 100; i += 25) {
        var $floor = $e.find("b").eq(i < 99 ? i : -1);
        $("<strong />", {
          "class": "row_beam l" + i
        }).appendTo($floor);
      }
    });
  })("row beams");

  (function() {
    var crossBeam = function(i, dir, qty) {
      return '<b class="crossbeam l' + i + ' ' + dir + '">' + œ(qty || 24).tags() + '</b>';
    };
    $(".corner").each(function() {
      var $e = $(this),
          $floors = $e.find("b");
      (["horizontal", "vertical"]).forEach(function(direction) {
        $e.append(crossBeam(1, direction));
      });
      for (var i = 2; i < 6; i ++) {
        (["horizontal", "vertical"]).forEach(function(direction) {
          $floors.eq((i - 1) * 25 - 1).append(crossBeam(i, direction, i > 3 ? 23 : 24));
        });
      }
    });
  })("cross beams");
});
