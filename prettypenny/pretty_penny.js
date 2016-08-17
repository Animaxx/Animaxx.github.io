/**
 * Created by denganimax on 1/14/16.
 */

var _allowMousewheel = true;

$(document).ready(function() {
    $(window).delay(500).queue(function(chain) {
        $("#thumb-photo").css("opacity", 1.0);
        $("#thumb-photo").addClass("bounceInLeft");
        chain();
    });

    var f = $(window).height();
    if (f < 500) {
        f = 500
    }
    $("section").css("height", f);
    $("nav a").on("click", function(k) {
        _allowMousewheel = true;
        $($(this).attr("href")).ScrollTo();
        return false
    });

    $("section").waypoint(function(m) {
        $("#site-nav ul li").removeClass("selected");
        if (m == "up") {
            var k = $("a[href=#" + $(this).attr("id") + "]").parent();
            if (k.prev()) {
                k.prev().addClass("selected")
            } else {
                k.addClass("selected")
            }
        } else {
            $("a[href=#" + $(this).attr("id") + "]").parent().addClass("selected")
        }

        //$(".AnimatrixImage").removeClass("flipInX");
        //if ($("#site-nav ul li.selected a").attr("href") == "#home") {
        //    $(".AnimatrixImage").addClass("flipInX");
        //}
    });

    $(window).mousewheel(function(k, l) {
        if (!_allowMousewheel) {
            return false
        }
        _allowMousewheel = false;
        if (l > 0) {
            $($("nav li.selected").prev().children("a").attr("href")).stop().ScrollTo()
        } else {
            $($("nav li.selected").next().children("a").attr("href")).stop().ScrollTo()
        }
        setTimeout(function() {
            _allowMousewheel = true
        }, 1000);
        return false
    });

    _autoResize();
});


var _autoResize = function() {
    var b = $(window).height();
    if (b < 500) {
        b = 500
    }
    $("#page-body section").css("height", b);
};
$(window).resize(_autoResize);