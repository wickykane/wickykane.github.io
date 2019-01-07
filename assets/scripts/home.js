var prllxSkillContainer;

$(document).ready(function() {
  // Scroll To Top Default
  var prllxAbouts, prllxSkillContainer;
  prllxSkillContainer = TweenLite.to(".skills img", 1, { yPercent: 10, ease: Linear.easeNone, paused: true });
  TweenLite.set(".about .padding", { y: "25%" });
  prllxAbouts = TweenLite.to(".about .padding", 1, {
    y: "-25%",
    ease: Linear.easeNone,
    paused: true
  });


  $("body,html").animate(
    {
      scrollTop: 0
    },
    800
  );

  function initHome() {
    prllxSkillContainer = TweenLite.to(".skills img", 1, { yPercent: 50, ease: Linear.easeNone, paused: true });
    TweenLite.ticker.addEventListener("tick", onScroll);

    function onScroll() {
      scrollTop = $(window).scrollTop();
      if (scrollTop > 10 && $("body").hasClass("show-hello")) {
        $("body").removeClass("show-hello");
      } else if (scrollTop <= 10 && !$("body").hasClass("show-hello")) {
        $("body").addClass("show-hello");
      }
  
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
  
      var minSkill = $(".skills").offset().top;
      var maxSkill = $(".skills").offset().top + $(".skills").outerHeight();
      var normSkill = clamp(
        normalize(window.pageYOffset, minSkill, maxSkill),
        0,
        1
      );
      prllxSkillContainer.progress(normSkill);
    }
  
  }
  function normalize(value, min, max) {
    return (value - min) / (max - min);
  }

  function clamp(value, min, max) {
    return value < min ? min : value > max ? max : value;
  }

  var scrollTop, wW, wH;
  console.log("init WOW");
  new WOW().init();

  // Typed js
  var typedText = new Typed(".objective .content .title", {
    typeSpeed: 200,
    strings: ["I am a frontend developer", "Have a great day!"],
    backSpeed: 80,
    loop: true
  });

  $(window).on("resize", function() {
    wW = $(window).width();
    wH = $(window).height();
  });

  function onScroll() {
    scrollTop = $(window).scrollTop();
    if (scrollTop > 10 && $("body").hasClass("show-hello")) {
      $("body").removeClass("show-hello");
    } else if (scrollTop <= 10 && !$("body").hasClass("show-hello")) {
      $("body").addClass("show-hello");
    }


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

    var minSkill = $(".skills").offset().top;
    var maxSkill = $(".skills").offset().top + $(".skills").outerHeight();
    var normSkill = clamp(
      normalize(window.pageYOffset, minSkill, maxSkill),
      0,
      1
    );
    prllxSkillContainer.progress(normSkill);

    //PRLLX ABOUT
    var minAbout = $(".about").offset().top - wH;
    var maxAbout = $(".about").offset().top + $(".about").outerHeight();
    var normAbout = clamp(
      normalize(window.pageYOffset, minAbout, maxAbout),
      0,
      1
    );
    prllxAbouts.progress(normAbout);
  }

  $(window).trigger("resize");

  
  // Parrallax
  var objective = $(".objective.scence")[0];
  new Parallax(objective, {
    // relativeInput: true,
    hoverOnly: true,
    clipRelativeInput: true,
  });

  // Hover Menu
  $("body").on("click", function(e) {
    if (!$(".page-menu")[0].contains(e.target)) {
      $("body").removeClass("open-menu");
    }
  });
  $(".page-header .menu")
    .on("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      $("body").toggleClass("open-menu");
    })
    .on("mouseenter mouseleave", function() {
      $("body").toggleClass("hover-menu");
    });
  // Remove Loading
  setTimeout(function() {
    $(".show-loading").toggleClass("show-loading");
    initHome();
  }, 500);

 
});
