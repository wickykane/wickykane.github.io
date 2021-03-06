var prllxCloudContainer;
var round = 0;
$(document).ready(function() {
    // Scroll To Top Default
    var prllxAbouts, prllxSkillContainer;
    prllxSkillContainer = TweenLite.to(".skills img", 1, {
        yPercent: 10,
        ease: Linear.easeNone,
        paused: true
    });
    TweenLite.set(".about .padding", { y: "25%" });
    prllxAbouts = TweenLite.to(".about .padding", 1, {
        y: "-25%",
        ease: Linear.easeNone,
        paused: true
    });

    $("body,html").animate({
            scrollTop: 0
        },
        800
    );

    function goToElement(selector) {
        $("body").removeClass("open-menu");
        $("html,body").animate({ scrollTop: $(selector).offset().top }, "slow");
    }

    function initHome() {
        prllxCloudContainer = TweenLite.to(".cloud img", 1, {
            yPercent: 50,
            ease: Linear.easeNone,
            paused: true
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

            var minCloud = $(".cloud").offset().top;
            var maxCloud = $(".cloud").offset().top + $(".cloud").outerHeight();
            var normCloud = clamp(
                normalize(window.pageYOffset, minCloud, maxCloud),
                0,
                1
            );
            prllxCloudContainer.progress(normCloud);
        }
        setTimeout(function() {
            TweenLite.ticker.addEventListener("tick", onScroll);
        });
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

    $(window).trigger("resize");

    // Parrallax
    var objective = $(".objective.scence")[0];
    new Parallax(objective, {
        // relativeInput: true,
        hoverOnly: true,
        clipRelativeInput: true
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

    var roundList = ["education", "fast", "ants", "seldat"];
    var marioSprite = $(".mario-character");

    $(".control-keys #right-control").on("click", function() {
        ++round;
        round = Math.min(Math.max(round, 0), roundList.length);

        var label = $(".round-label");
        label.text("ROUND " + round);
        if (round > 1) {
            $(".mario-map")
                .removeClass()
                .addClass("mario-map")
                .addClass("mario-loading");

            setTimeout(function() {
                $(".mario-map")
                    .removeClass()
                    .addClass("mario-map")
                    .addClass(roundList[round - 1]);
            }, 3000);
        } else {
            $(".mario-map")
                .removeClass()
                .addClass("mario-map")
                .addClass(roundList[round - 1]);
        }

        label.css("animation-name", "");
        label
            .removeClass("slideInUp")
            .delay(100)
            .queue(function() {
                $(this)
                    .addClass("animated slideInUp")
                    .dequeue();
            });
    });

    $(".control-keys #left-control").on("click", function() {
        --round;
        round = Math.min(Math.max(round, 0), roundList.length);

        var label = $(".round-label");
        label.text("ROUND " + round);

        if (round == 0) {
            label.text("WELCOME !!!");
            $(".mario-map")
                .removeClass()
                .addClass("mario-map")
                .addClass("welcome");
            return;
        }

        if (round >= 1) {
            $(".mario-map")
                .removeClass()
                .addClass("mario-map")
                .addClass("mario-loading");

            setTimeout(function() {
                $(".mario-map")
                    .removeClass()
                    .addClass("mario-map")
                    .addClass(roundList[round - 1]);
            }, 3000);
        } else {
            $(".mario-map")
                .removeClass()
                .addClass("mario-map")
                .addClass(roundList[round - 1]);
        }

        label.css("animation-name", "");
        label
            .removeClass("slideInUp")
            .delay(100)
            .queue(function() {
                $(this)
                    .addClass("animated slideInUp")
                    .dequeue();
            });
    });

    // Menu Control

    $(".menu-nav li").on("click", function(e) {
        var id = e.currentTarget.id;
        switch (id) {
            case "menu-about":
                goToElement(".page-content .about");
                break;
            case "menu-experience":
                goToElement(".page-content .experience");
                break;
            case "menu-work":
                goToElement(".page-content .featured-work");
                break;
            default:
                break;
        }
    });

    $('.work-box').on('mouseenter', function(e) {
        var bgDom = $(e.currentTarget).attr('data-background');
        if (bgDom) {
            $('.work-background > div').each(function() {
                $(this).removeClass('active');
            })
            $('.' + bgDom).addClass('active');
        }
    })
});