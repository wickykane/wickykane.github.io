$(document).ready(function() {
  function normalize(value, min, max) {
    return (value - min) / (max - min);
  }
  function clamp(value, min, max) {
    return value < min ? min : value > max ? max : value;
  }

  var scrollTop, wW, wH;
  console.log("init WOW");
  new WOW().init();
  $(window).on("resize", function() {
    wW = $(window).width();
    wH = $(window).height();
  });
  $(window).trigger("resize");
  $(window).scrollTop();
  TweenLite.ticker.addEventListener("tick", onScroll);
  function onScroll() {
    scrollTop = $(window).scrollTop();
    if (scrollTop > 10 && $("body").hasClass("show-hello")) {
      $("body").removeClass("show-hello");
    } else if (scrollTop <= 10 && !$("body").hasClass("show-hello")) {
      $("body").addClass("show-hello");
    }

    //PRLLX VIDEOCONTAINER
    var prllxObjectiveContainer = TweenLite.to(".objective img", 1, {
      yPercent: 50,
      ease: Linear.easeNone,
      paused: true
    });

    if (
      scrollTop > $(".objective").outerHeight() &&
      scrollTop < $(".objective").outerHeight() + wH
    ) {
      TweenLite.to($(".hello"), 0, {
        y: -(scrollTop - $(".objective").outerHeight()) * 0.5,
        ease: Linear.easeNone
      });
      TweenLite.to($(".objective"), 0, {
        y: -(scrollTop - $(".objective").outerHeight()) * 0.5,
        ease: Linear.easeNone
      });
    } else {
      TweenLite.to($(".hello"), 0, { y: 0, ease: Linear.easeNone });
      TweenLite.to($(".objective"), 0, { y: 0, ease: Linear.easeNone });
    }

    var minObjective = $(".objective").offset().top;
    var maxObjective =
      $(".objective").offset().top + $(".objective").outerHeight();
    var normObjective = clamp(
      normalize(window.pageYOffset, minObjective, maxObjective),
      0,
      1
    );
    prllxObjectiveContainer.progress(normObjective);
  }
});
