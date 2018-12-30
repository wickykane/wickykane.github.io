var bWeInTouchLand = false;

function diagonal(_ele)
{
    var w = _ele.width();
    var h = _ele.height();
    return Math.sqrt(w * w + h * h);
}

function arrange()
{
    console.log("arrange");
    $(".splashBox").each(function()
    {
        var rot = -20 + Math.random() * 40;
        var imgWidth = diagonal($(this).find("figure"));
        var pw = $(this).parent().width()
        var maxPercentage = (pw - imgWidth) / pw * 100.0;
        var val = Math.random();
        var margin = val * maxPercentage;
        this.origTransform = "rotate(" + rot + "deg)";
        this.origMarginVal = val;
        $(this).css("transform", this.origTransform);
        $(this).css("margin-left", margin + "%");
        // $(this).css("background-color", "hsl(0, 0%, " + (90 + Math.random() * 8.0) + "%)");
        $(this).css("visibility", "visible");
    });
    if(!bWeInTouchLand)
    {
        $(".splashBox").mouseenter(function()
        {
            $(this).css("z-index", 1);
            $(this).css("transform", "scale(1.1)");
            $("#splashText").html($(this).attr("data-caption"));
            $("#splashText").css("color", "hsl(" + Math.random() * 360.0 + ", 100%, 50%)");
            var other = this;
            $(".splashBox").each(function()
            {
                if(this != other)
                {
                    $(this).find("img").css("opacity", 0.0);
                    $(this).css("background-color", "hsl(0, 0%, " + (90 + Math.random() * 8.0) + "%)");
                }
            });
        });
        $(".splashBox").mouseleave(function()
        {
            $(this).css("z-index", 0);
            $(this).css("transform", this.origTransform);
            $("#splashText").html("");
            var other = this;
            $(".splashBox").each(function()
            {
                if(this != other)
                {
                    $(this).find("img").css("opacity", 1);
                    $(this).css("background", "none");
                }
            });
        });
        $( document ).on( "mousemove", function( event )
        {
            $("#splashText").css("padding", 0);
            if(event.clientX <= $(window).width() / 2)
            {
                $("#splashText").css("padding-left", event.clientX + "px");
            }
            else
            {
                $("#splashText").css("padding-left",  Math.max(0,  Math.abs(event.clientX - $(window).width())) + "px");
            }
            if(event.clientY <= $(window).height() / 2)
            {
                $("#splashText").css("padding-top", event.clientY + "px");
            }
            else
            {
                $("#splashText").css("padding-top", Math.max(0,  Math.abs(event.clientY - $(window).height())) + "px");
            }
        });
    }
}

function newMargin()
{
    $(".splashBox").each(function()
    {
        if(this.origMarginVal)
        {
            var imgWidth = diagonal($(this).find("figure"));
            var pw = $(this).parent().width()
            var maxPercentage = (pw - imgWidth) / pw * 100.0;
            var margin = this.origMarginVal * maxPercentage;
            $(this).css("margin-left", margin + "%");
        }
    });
}

$(window).resize(function()
{
    newMargin();
});

$(document).ready(function()
{
    if ('ontouchstart' in document) {
        bWeInTouchLand = true;
        console.log("WE ARE IN TOUCH LAND!!!!");
    }
    $(".mobileWorkTitle").each(function()
        {
            $(this).css("color", "hsl(" + Math.random() * 360.0 + ", 100%, 50%)");
        });
    arrange();
});
