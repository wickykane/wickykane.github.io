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
        var prllxSkillContainer = TweenLite.to(".skills img", 1, {
            yPercent: 0,
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

        var minSkill = $(".skills").offset().top;
        var maxSkill =
            $(".skills").offset().top + $(".skills").outerHeight();
        var normSkill = clamp(
            normalize(window.pageYOffset, minSkill, maxSkill),
            0,
            1
        );
        prllxSkillContainer.progress(normSkill);
    }

    // Parrallax
    var scene = $('.avatar')[0];
    var objective = $('.objective.scence')[0];
    new Parallax(objective, {
            relativeInput: true,
            hoverOnly: true,
        })
        // var parallax = new Parallax(scene, {
        //     relativeInput: true,
        // });
});