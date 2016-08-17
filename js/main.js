var _allowMousewheel = true;
var _resumeChart = false;
$(document).ready(function() {
	//$(".AnimatrixImage").addClass("flipInX");
	$(window).delay(1000).queue(function(k) {
		$("#thumb-photo").css("opacity", 1.0);
		$("#thumb-photo").addClass("bounceInLeft");
		k();
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
	// $("#sideNav div").mouseleave(function() {
	// 	if ($(this).hasClass("hint")) {
	// 		$("#sideNav div").removeAttr("data-hint");
	// 		$("#sideNav div").removeClass("hint").removeClass("hint--left");
	// 	}
	// });
	$("#sideNav .arrowUp").bind("click", function(k) {
		$($("#site-nav ul li.selected").prev().children("a").attr("href")).ScrollTo()
	});
	$("#sideNav .arrowDown").bind("click", function(k) {
		$($("#site-nav ul li.selected").next().children("a").attr("href")).ScrollTo()
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
		$(".AnimatrixImage").removeClass("flipInX");
		if ($("#site-nav ul li.selected a").attr("href") == "#home") {
			$(".AnimatrixImage").addClass("flipInX");
		} else if ($("#site-nav ul li.selected a").attr("href") == "#about") {
			_animationResume("animax-area");
			if (_resumeChart == false) {
				_resumeChart = document.getElementById("resume-chart").getContext("2d");
				var l = [{
					value: 21,
					color: "#2FBFBF"
				}, {
					value: 11,
					color: "#FFCDAD"
				}, {
					value: 22,
					color: "#186185"
				}, {
					value: 18,
					color: "#FC9D9A"
				}, {
					value: 20,
					color: "#FE4365"
				}, {
					value: 8,
					color: "#83AF9B"
				}];
				new Chart(_resumeChart).Doughnut(l)
			}
			$("section#about #resume-chart-explain").stop().animate({
				opacity: "1.00"
			}, 3000);

		} else if ($("#site-nav ul li.selected a").attr("href") == "#herewego") {
			$("#herewego").addClass("selected");
		}
	});
	var c = function(k, l) {
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
		};

	$(window).mousewheel(c);
	$(document).on("keydown", function(l) {
		_allowMousewheel = true;
		var k = (l.keyCode ? l.keyCode : l.which);
		switch (k) {
		case 38:
			$($("nav li.selected").prev().children("a").attr("href")).stop().ScrollTo();
			break;
		case 40:
			$($("nav li.selected").next().children("a").attr("href")).stop().ScrollTo();
			break;
		case 37:
			break;
		case 39:
			break;
		case 27:
			$("#black-background").stop().animate({
				opacity: "0.00"
			}, 200);
			$("#black-background").delay(200).queue(function(m) {
				$("#black-background #display-container").children().remove();
				$("#black-background").hide();
				m()
			});
			break
		}
	});
	$("#sideBar .email").on("click", function(k) {
		return mailMe()
	});
	$("#sideBar .linkedin").on("click", function(k) {
		return linkedinMe()
	});
	$("#sideBar .github").on("click", function(k) {
		return githubMe()
	});
	$("#thumb-photo").on("click", function(k) {
		return linkedinMe()
	});
	$(".animation.ItemD").on({
		mouseenter: function() {
		  	$(".likeConver").stop( true, true ).animate({opacity: 0.00},200, function() {
		  		$(".likeConver").html("Link Me :)");
		  		$(".likeConver").animate({opacity: 1.00},100);
		  	});
		  }, mouseleave: function() {
		  	$(".likeConver").stop( true, true ).animate({opacity: 0.00},200, function() {
		  		$(".likeConver").html("Love It?");
		  		$(".likeConver").animate({opacity: 1.00},100);
		  	});
		    //$( this ).html("Love It?");
		  }
	});
	$(".likeConver").on({
		  click: function() {
		    return connectMe();
		  }
	});


	_autoResize();
	$("#black-background").css("height", $(document).height());
	$("#detail-container").load("detail-pages.html", function(k) {
		$("div[link]").css("cursor", "pointer");
		$("div[link]").bind("click", function(l) {
			$("#black-background #display-container, #black-background #close").css("margin-top", $(document).scrollTop());
			$("#black-background").css("opacity", "0.00");
			$("#black-background").show();
			$("#black-background").stop().animate({
				opacity: "1.00"
			}, 200);
			$("#black-background #display-container").html($($(this).attr("link")).clone());
			$("#black-background #display-container a").on("click", function(o) {
				window.open($(this).attr("href"), "_blank");
				return false;
			}); 
			$("#black-background div.slider").unslider({
				speed: 500,
				delay: 5000,
				complete: function() {},
				keys: true,
				dots: true,
				fluid: false
			});
			l.preventDefault();
			l.stopPropagation();
			return false
		});
		$("#black-background").bind("click", function(l) {
			$("#black-background").stop().animate({
				opacity: "0.00"
			}, 200);
			$("#black-background").delay(200).queue(function(m) {
				$("#black-background #display-container").children().remove();
				$("#black-background").hide();
				m()
			});
			l.preventDefault();
			l.stopPropagation();
			return false
		});
		$("#black-background #display-container").bind("click", function(l) {
			l.preventDefault();
			l.stopPropagation();
			window.event.cancelBubble = true;
			return
		});

		//Don't preload
	});
	var a = 160;
	var b = 60;
	var h = false;
	var e = [];
	var j = [];
	var g = function(l) {
			var k = h;
			if (!k) {
				return
			}
			j[k] = e[k] - l.pageY;
			if (j[k] < 0) {
				j[k] = 0
			}
			if (j[k] + a >= $("section#home").css("height")) {
				j[k] = (parseInt($("section#home").css("height") - a))
			}
			if (k == "ItemB" && parseInt($("section#home ." + k).css("height")) < 100) {
				$("section#home ." + k).css("height", 100)
			}
			$("section#home ." + k).css("margin-top", j[k] * -1);
			$("section#home ." + k).css("height", "+=" + (j[k]))
		};
	var i = function(n) {
			var l = h;
			if (!l) {
				$("section#home").unbind("mousemove", g);
				$(document).unbind("mouseup", i);
				return
			}
			if (j[l] > 200) {
				var m = (parseInt($("section#home").css("height")) - a) * -1;
				var k = parseInt($("section#home").css("height")) - b;
				if (l == "ItemB") {
					m += 76;
					k -= 76
				}
				$("section#home ." + l).animate({
					"margin-top": m,
					height: k
				}, 200);
				j[l] = k
			} else {
				$("section#home ." + l).animate({
					"margin-top": (l == "ItemB" ? 76 : 0),
					height: (l == "ItemB" ? 24 : 100)
				}, 200);
				j[l] = 0
			}
			$("section#home").unbind("mousemove", g);
			$(document).unbind("mouseup", i)
		};
	$("section#home .ItemA, section#home .ItemB, section#home .ItemC").mouseenter(function(l) {
		if (parseInt($(this).css("margin-top")) < 0) {
			return
		}
		var k = false;
		if ($(this).hasClass("ItemA")) {
			k = "ItemA"
		}
		if ($(this).hasClass("ItemB")) {
			k = "ItemB"
		}
		if ($(this).hasClass("ItemC")) {
			k = "ItemC"
		}
		if (!k) {
			return
		}
		if (k == "ItemB" && parseInt($(this).css("margin-top")) < 76) {
			return
		}
		$(this).stop().animate({
			"margin-top": ((k == "ItemB" ? 76 : 0) - 30),
			height: ((k == "ItemB" ? 24 : 100) + 31)
		}, 200).animate({
			"margin-top": ((k == "ItemB" ? 76 : 0)),
			height: ((k == "ItemB" ? 24 : 100))
		}, 200)
	});
	$("section#home .hi .words").delay(1000).queue(function(k) {
		$("section#home .hi .words").css("opacity", "1.00");
		$("section#home .hi .words").addClass("bounceInLeft");
		k()
	});
	$(window).delay(1500).queue(function(k) {
		$("section#home .item div.mouseIcon").addClass("tada");
		k()
	});
	$("section#home .bottomColor div.item").css("opacity", "1.00");
	$("section#home .bottomColor div.ItemA,section#home .bottomColor div.ItemB,section#home .bottomColor div.ItemC,section#home .bottomColor div.ItemD").addClass("bounceInUp");
	$("section#works div.category div").eq(0).css("height", (parseInt($("section#works").css("height")) - 100) + "px");
	$("section#works div.category div.left-arrow").click(function() {
		var k = parseInt($("ul.project-menu").css("margin-top"));
		k = k + 485;
		if (k > 0) {
			k = 0
		}
		$("ul.project-menu").stop().animate({
			marginTop: k + "px"
		}, 200)
	});
	$("section#works div.category div.right-arrow").click(function() {
		var k = parseInt($("ul.project-menu").css("margin-top"));
		k = k - 485;
		$("ul.project-menu").stop().animate({
			marginTop: k + "px"
		}, 200)
	});
	var d = function(k) {
			$(".category-content ul.project-menu").stop().animate({
				marginTop: "0px"
			}, 200)
		};
	$(".project-menu").mixitup({
		onMixEnd: d
	});

	// var _goingToHerewegoPage = false;
	// $("#herewego .content_form").mousemove(function() {
	// 	if (!_goingToHerewegoPage && $("#site-nav ul li.selected a").attr("href") != "#herewego") {
	// 		$("#herewego").stop().ScrollTo();
	// 		_goingToHerewegoPage = true;
	// 		setTimeout(function() { _goingToHerewegoPage = false; }, 1000);
	// 	} 
	// 	if ($("#site-nav ul li.selected a").attr("href") != "#herewego") {
	// 		$("#herewego .content_form").mousemove(function() {});
	// 	}
	// })
	
	$(window).delay(1000).queue(function(k) {
		window.console && window.console.info("**************************************************** \r\n Give me your suggestions by email me 'Animax.deng[At]gmail.com' \r\n Or visit me on https://www.linkedin.com/in/animaxdeng \r\n                                    -- Animax Deng \r\n**************************************************** \r\n ");
		k()
	});
});


var _autoResize = function() {
		var b = $(window).height();
		if (b < 500) {
			b = 500
		}
		$("#page-body section").css("height", b);
		$("section#works div.category div").eq(0).css("height", (parseInt($("section#works").css("height")) - 100) + "px");
    
        // Home page resize
		var a = parseInt($("section#home").css("height")) - 552;
		if (a < 0) {
			a = 0
		}
		$("section#home .bottomColor").css("margin-top", a + "px");
        
        // about me page resize
		var c = parseInt($("section#about").css("height")) - 600;
		if (c < 0) {
			c = 20
		}
		$("section#about div.resume-display").css("margin-top", c + "px")
	};
$(window).resize(_autoResize);
var _animationResume = function(d) {
		var m = ["rgba(254,67,101,0.6)", "rgba(249,205,173,0.6)", "rgba(24,97,133,0.6)", "rgba(252,157,154,0.6)", "rgba(47,191,191,0.6)", "rgba(131,175,155,0.6)", "rgba(242,194,48,0.6)", "rgba(102,102,102,0.6)"];
		var l = "div.resume-display div." + d;
		if (parseInt($(l).css("width")) > 0 && $(l).css("display") == "block") {
			return false
		}
		$(l).css("width", "0%");
		$(l).stop().animate({
			width: "100%"
		}, 1000);
		var n = parseInt($(l).css("height"));
		var c = parseInt($(l).attr("resume-start"));
		var p = parseInt($(l).attr("resume-end"));
		var g = p - c;
		var j = parseInt($("div.resume-display").css("width"));
		var o = 0;
		if (j > 0 && g > 0) {
			o = j / g
		}
		$(window).delay(1000).queue(function(r) {
			$(l + " .resume-points").html("");
			for (var q = 0; q <= g; q++) {
				setTimeout('$("' + l + ' .resume-points .resume-point").addClass("hint--always"); $("' + l + " .resume-points\").append(\"<div class='resume-point hint  hint--bottom' data-hint='" + (c + q) + "' style='margin-left: " + (o * q) + "px'></div>\");", 500 * q)
			}
			r()
		});
		var a = 500 * (g + 1);
		$(window).delay(a).queue(function(i) {
			$(l + " .resume-points .resume-point").addClass("hint--always")
		});
		if (a > 0) {
			a = (a + 1000) / 2
		}
		var k = $(l + " .resume-blocks .block");
		for (var h = 0; h < k.length; h++) {
			var e = parseInt(k.eq(h).attr("resume-height"));
			if (e > 0) {
				e = e / 100
			}
			var f = parseFloat(k.eq(h).attr("resume-start"));
			f = f * o;
			var b = parseFloat(k.eq(h).attr("resume-last"));
			b = b * o;
			k.eq(h).css({
				height: (n * e) + "px",
				width: b + "px",
				position: "absolute",
				marginTop: ((n * (1 - e)) - 5) + "px",
				marginLeft: f + "px",
				backgroundColor: _ramdonColor(),
				opacity: "0.00",
				display: "block"
			});
			k.eq(h).stop().delay(a + 800 * h).animate({
				opacity: "1.00"
			}, 500);
		}

	};
var pervColor = false;
var prepervColor = false;
var _ramdonColor = function() {
		var b = ["rgba(254,67,101,0.6)", "rgba(249,205,173,0.6)", "rgba(24,97,133,0.6)", "rgba(252,157,154,0.6)", "rgba(47,191,191,0.6)", "rgba(131,175,155,0.6)", "rgba(242,194,48,0.6)", "rgba(102,102,102,0.6)"];
		var a = b[parseInt(Math.floor(Math.random() * b.length))];
		if (pervColor == false) {
			pervColor = a;
			return a
		} else {
			while (pervColor == a || prepervColor == a) {
				a = b[parseInt(Math.floor(Math.random() * b.length))]
			}
		}
		prepervColor = pervColor;
		pervColor = a;
		return a
	};
var mailMe = function() {
		window.open("mailto:Animax.Deng@gmail.com?subject=Hello%20Animax&body=%5E_%5E", "_blank");
		return false
	};
var linkedinMe = function() {
		window.open("https://www.linkedin.com/in/animaxdeng", "_blank");
		return false
	};
var githubMe = function() {
		window.open("https://github.com/Animaxx", "_blank");
		return false
	};
var contact_submit = function() {
		if ($("input[name=contact_mail]").val() == "") {
			alert("Please fill your Email address to let me can contact you, thank you.");
			return false
		}
		if ($("input[name=contact_message]").val() == "") {
			alert("Please fill your message, thank you.");
			return false
		}
		return true
	};
var connectMe = function() {
		window.open("http://www.linkedin.com/inviteFromProfile?from=profile&key=86575183&firstName=Animax&lastName=Deng", "Connecting to Animax :)", "width=570, height=600");
		return false
	};
var Chart = function(d) {
		var o = this;
		var a = {
			linear: function(z) {
				return z
			},
			easeInQuad: function(z) {
				return z * z
			},
			easeOutQuad: function(z) {
				return -1 * z * (z - 2)
			},
			easeInOutQuad: function(z) {
				if ((z /= 1 / 2) < 1) {
					return 1 / 2 * z * z
				}
				return -1 / 2 * ((--z) * (z - 2) - 1)
			},
			easeInCubic: function(z) {
				return z * z * z
			},
			easeOutCubic: function(z) {
				return 1 * ((z = z / 1 - 1) * z * z + 1)
			},
			easeInOutCubic: function(z) {
				if ((z /= 1 / 2) < 1) {
					return 1 / 2 * z * z * z
				}
				return 1 / 2 * ((z -= 2) * z * z + 2)
			},
			easeInQuart: function(z) {
				return z * z * z * z
			},
			easeOutQuart: function(z) {
				return -1 * ((z = z / 1 - 1) * z * z * z - 1)
			},
			easeInOutQuart: function(z) {
				if ((z /= 1 / 2) < 1) {
					return 1 / 2 * z * z * z * z
				}
				return -1 / 2 * ((z -= 2) * z * z * z - 2)
			},
			easeInQuint: function(z) {
				return 1 * (z /= 1) * z * z * z * z
			},
			easeOutQuint: function(z) {
				return 1 * ((z = z / 1 - 1) * z * z * z * z + 1)
			},
			easeInOutQuint: function(z) {
				if ((z /= 1 / 2) < 1) {
					return 1 / 2 * z * z * z * z * z
				}
				return 1 / 2 * ((z -= 2) * z * z * z * z + 2)
			},
			easeInSine: function(z) {
				return -1 * Math.cos(z / 1 * (Math.PI / 2)) + 1
			},
			easeOutSine: function(z) {
				return 1 * Math.sin(z / 1 * (Math.PI / 2))
			},
			easeInOutSine: function(z) {
				return -1 / 2 * (Math.cos(Math.PI * z / 1) - 1)
			},
			easeInExpo: function(z) {
				return (z == 0) ? 1 : 1 * Math.pow(2, 10 * (z / 1 - 1))
			},
			easeOutExpo: function(z) {
				return (z == 1) ? 1 : 1 * (-Math.pow(2, -10 * z / 1) + 1)
			},
			easeInOutExpo: function(z) {
				if (z == 0) {
					return 0
				}
				if (z == 1) {
					return 1
				}
				if ((z /= 1 / 2) < 1) {
					return 1 / 2 * Math.pow(2, 10 * (z - 1))
				}
				return 1 / 2 * (-Math.pow(2, -10 * --z) + 2)
			},
			easeInCirc: function(z) {
				if (z >= 1) {
					return z
				}
				return -1 * (Math.sqrt(1 - (z /= 1) * z) - 1)
			},
			easeOutCirc: function(z) {
				return 1 * Math.sqrt(1 - (z = z / 1 - 1) * z)
			},
			easeInOutCirc: function(z) {
				if ((z /= 1 / 2) < 1) {
					return -1 / 2 * (Math.sqrt(1 - z * z) - 1)
				}
				return 1 / 2 * (Math.sqrt(1 - (z -= 2) * z) + 1)
			},
			easeInElastic: function(A) {
				var B = 1.70158;
				var C = 0;
				var z = 1;
				if (A == 0) {
					return 0
				}
				if ((A /= 1) == 1) {
					return 1
				}
				if (!C) {
					C = 1 * 0.3
				}
				if (z < Math.abs(1)) {
					z = 1;
					var B = C / 4
				} else {
					var B = C / (2 * Math.PI) * Math.asin(1 / z)
				}
				return -(z * Math.pow(2, 10 * (A -= 1)) * Math.sin((A * 1 - B) * (2 * Math.PI) / C))
			},
			easeOutElastic: function(A) {
				var B = 1.70158;
				var C = 0;
				var z = 1;
				if (A == 0) {
					return 0
				}
				if ((A /= 1) == 1) {
					return 1
				}
				if (!C) {
					C = 1 * 0.3
				}
				if (z < Math.abs(1)) {
					z = 1;
					var B = C / 4
				} else {
					var B = C / (2 * Math.PI) * Math.asin(1 / z)
				}
				return z * Math.pow(2, -10 * A) * Math.sin((A * 1 - B) * (2 * Math.PI) / C) + 1
			},
			easeInOutElastic: function(A) {
				var B = 1.70158;
				var C = 0;
				var z = 1;
				if (A == 0) {
					return 0
				}
				if ((A /= 1 / 2) == 2) {
					return 1
				}
				if (!C) {
					C = 1 * (0.3 * 1.5)
				}
				if (z < Math.abs(1)) {
					z = 1;
					var B = C / 4
				} else {
					var B = C / (2 * Math.PI) * Math.asin(1 / z)
				}
				if (A < 1) {
					return -0.5 * (z * Math.pow(2, 10 * (A -= 1)) * Math.sin((A * 1 - B) * (2 * Math.PI) / C))
				}
				return z * Math.pow(2, -10 * (A -= 1)) * Math.sin((A * 1 - B) * (2 * Math.PI) / C) * 0.5 + 1
			},
			easeInBack: function(z) {
				var A = 1.70158;
				return 1 * (z /= 1) * z * ((A + 1) * z - A)
			},
			easeOutBack: function(z) {
				var A = 1.70158;
				return 1 * ((z = z / 1 - 1) * z * ((A + 1) * z + A) + 1)
			},
			easeInOutBack: function(z) {
				var A = 1.70158;
				if ((z /= 1 / 2) < 1) {
					return 1 / 2 * (z * z * (((A *= (1.525)) + 1) * z - A))
				}
				return 1 / 2 * ((z -= 2) * z * (((A *= (1.525)) + 1) * z + A) + 2)
			},
			easeInBounce: function(z) {
				return 1 - a.easeOutBounce(1 - z)
			},
			easeOutBounce: function(z) {
				if ((z /= 1) < (1 / 2.75)) {
					return 1 * (7.5625 * z * z)
				} else {
					if (z < (2 / 2.75)) {
						return 1 * (7.5625 * (z -= (1.5 / 2.75)) * z + 0.75)
					} else {
						if (z < (2.5 / 2.75)) {
							return 1 * (7.5625 * (z -= (2.25 / 2.75)) * z + 0.9375)
						} else {
							return 1 * (7.5625 * (z -= (2.625 / 2.75)) * z + 0.984375)
						}
					}
				}
			},
			easeInOutBounce: function(z) {
				if (z < 1 / 2) {
					return a.easeInBounce(z * 2) * 0.5
				}
				return a.easeOutBounce(z * 2 - 1) * 0.5 + 1 * 0.5
			}
		};
		var r = d.canvas.width;
		var p = d.canvas.height;
		if (window.devicePixelRatio) {
			d.canvas.style.width = r + "px";
			d.canvas.style.height = p + "px";
			d.canvas.height = p * window.devicePixelRatio;
			d.canvas.width = r * window.devicePixelRatio;
			d.scale(window.devicePixelRatio, window.devicePixelRatio)
		}
		this.PolarArea = function(B, A) {
			o.PolarArea.defaults = {
				scaleOverlay: true,
				scaleOverride: false,
				scaleSteps: null,
				scaleStepWidth: null,
				scaleStartValue: null,
				scaleShowLine: true,
				scaleLineColor: "rgba(0,0,0,.1)",
				scaleLineWidth: 1,
				scaleShowLabels: true,
				scaleLabel: "<%=value%>",
				scaleFontFamily: "'Arial'",
				scaleFontSize: 12,
				scaleFontStyle: "normal",
				scaleFontColor: "#666",
				scaleShowLabelBackdrop: true,
				scaleBackdropColor: "rgba(255,255,255,0.75)",
				scaleBackdropPaddingY: 2,
				scaleBackdropPaddingX: 2,
				segmentShowStroke: true,
				segmentStrokeColor: "#fff",
				segmentStrokeWidth: 2,
				animation: true,
				animationSteps: 100,
				animationEasing: "easeOutBounce",
				animateRotate: true,
				animateScale: false,
				onAnimationComplete: null
			};
			var z = (A) ? u(o.PolarArea.defaults, A) : o.PolarArea.defaults;
			return new e(B, z, d)
		};
		this.Radar = function(B, A) {
			o.Radar.defaults = {
				scaleOverlay: false,
				scaleOverride: false,
				scaleSteps: null,
				scaleStepWidth: null,
				scaleStartValue: null,
				scaleShowLine: true,
				scaleLineColor: "rgba(0,0,0,.1)",
				scaleLineWidth: 1,
				scaleShowLabels: false,
				scaleLabel: "<%=value%>",
				scaleFontFamily: "'Arial'",
				scaleFontSize: 12,
				scaleFontStyle: "normal",
				scaleFontColor: "#666",
				scaleShowLabelBackdrop: true,
				scaleBackdropColor: "rgba(255,255,255,0.75)",
				scaleBackdropPaddingY: 2,
				scaleBackdropPaddingX: 2,
				angleShowLineOut: true,
				angleLineColor: "rgba(0,0,0,.1)",
				angleLineWidth: 1,
				pointLabelFontFamily: "'Arial'",
				pointLabelFontStyle: "normal",
				pointLabelFontSize: 12,
				pointLabelFontColor: "#666",
				pointDot: true,
				pointDotRadius: 3,
				pointDotStrokeWidth: 1,
				datasetStroke: true,
				datasetStrokeWidth: 2,
				datasetFill: true,
				animation: true,
				animationSteps: 60,
				animationEasing: "easeOutQuart",
				onAnimationComplete: null
			};
			var z = (A) ? u(o.Radar.defaults, A) : o.Radar.defaults;
			return new x(B, z, d)
		};
		this.Pie = function(B, A) {
			o.Pie.defaults = {
				segmentShowStroke: true,
				segmentStrokeColor: "#fff",
				segmentStrokeWidth: 2,
				animation: true,
				animationSteps: 100,
				animationEasing: "easeOutBounce",
				animateRotate: true,
				animateScale: false,
				onAnimationComplete: null
			};
			var z = (A) ? u(o.Pie.defaults, A) : o.Pie.defaults;
			return new t(B, z, d)
		};
		this.Doughnut = function(B, A) {
			o.Doughnut.defaults = {
				segmentShowStroke: true,
				segmentStrokeColor: "#fff",
				segmentStrokeWidth: 2,
				percentageInnerCutout: 50,
				animation: true,
				animationSteps: 100,
				animationEasing: "easeOutBounce",
				animateRotate: true,
				animateScale: false,
				onAnimationComplete: null
			};
			var z = (A) ? u(o.Doughnut.defaults, A) : o.Doughnut.defaults;
			return new w(B, z, d)
		};
		this.Line = function(B, A) {
			o.Line.defaults = {
				scaleOverlay: false,
				scaleOverride: false,
				scaleSteps: null,
				scaleStepWidth: null,
				scaleStartValue: null,
				scaleLineColor: "rgba(0,0,0,.1)",
				scaleLineWidth: 1,
				scaleShowLabels: true,
				scaleLabel: "<%=value%>",
				scaleFontFamily: "'Arial'",
				scaleFontSize: 12,
				scaleFontStyle: "normal",
				scaleFontColor: "#666",
				scaleShowGridLines: true,
				scaleGridLineColor: "rgba(0,0,0,.05)",
				scaleGridLineWidth: 1,
				bezierCurve: true,
				pointDot: true,
				pointDotRadius: 4,
				pointDotStrokeWidth: 2,
				datasetStroke: true,
				datasetStrokeWidth: 2,
				datasetFill: true,
				animation: true,
				animationSteps: 60,
				animationEasing: "easeOutQuart",
				onAnimationComplete: null
			};
			var z = (A) ? u(o.Line.defaults, A) : o.Line.defaults;
			return new s(B, z, d)
		};
		this.Bar = function(B, A) {
			o.Bar.defaults = {
				scaleOverlay: false,
				scaleOverride: false,
				scaleSteps: null,
				scaleStepWidth: null,
				scaleStartValue: null,
				scaleLineColor: "rgba(0,0,0,.1)",
				scaleLineWidth: 1,
				scaleShowLabels: true,
				scaleLabel: "<%=value%>",
				scaleFontFamily: "'Arial'",
				scaleFontSize: 12,
				scaleFontStyle: "normal",
				scaleFontColor: "#666",
				scaleShowGridLines: true,
				scaleGridLineColor: "rgba(0,0,0,.05)",
				scaleGridLineWidth: 1,
				barShowStroke: true,
				barStrokeWidth: 2,
				barValueSpacing: 5,
				barDatasetSpacing: 1,
				animation: true,
				animationSteps: 60,
				animationEasing: "easeOutQuart",
				onAnimationComplete: null
			};
			var z = (A) ? u(o.Bar.defaults, A) : o.Bar.defaults;
			return new c(B, z, d)
		};
		var q = function(z) {
				z.clearRect(0, 0, r, p)
			};
		var e = function(G, D, M) {
				var L, C, B, E, N, K, z;
				J();
				K = I();
				z = (D.scaleShowLabels) ? D.scaleLabel : null;
				if (!D.scaleOverride) {
					B = i(N, K.maxSteps, K.minSteps, K.maxValue, K.minValue, z)
				} else {
					B = {
						steps: D.scaleSteps,
						stepValue: D.scaleStepWidth,
						graphMin: D.scaleStartValue,
						labels: []
					};
					for (var F = 0; F < B.steps; F++) {
						if (z) {
							B.labels.push(j(z, {
								value: (D.scaleStartValue + (D.scaleStepWidth * F)).toFixed(v(D.scaleStepWidth))
							}))
						}
					}
				}
				C = L / (B.steps);
				g(D, A, H, M);

				function J() {
					L = (y([r, p]) / 2);
					L -= b([D.scaleFontSize * 0.5, D.scaleLineWidth * 0.5]);
					E = D.scaleFontSize * 2;
					if (D.scaleShowLabelBackdrop) {
						E += (2 * D.scaleBackdropPaddingY);
						L -= D.scaleBackdropPaddingY * 1.5
					}
					N = L;
					E = h(E, 5)
				}
				function A() {
					for (var P = 0; P < B.steps; P++) {
						if (D.scaleShowLine) {
							M.beginPath();
							M.arc(r / 2, p / 2, C * (P + 1), 0, (Math.PI * 2), true);
							M.strokeStyle = D.scaleLineColor;
							M.lineWidth = D.scaleLineWidth;
							M.stroke()
						}
						if (D.scaleShowLabels) {
							M.textAlign = "center";
							M.font = D.scaleFontStyle + " " + D.scaleFontSize + "px " + D.scaleFontFamily;
							var O = B.labels[P];
							if (D.scaleShowLabelBackdrop) {
								var Q = M.measureText(O).width;
								M.fillStyle = D.scaleBackdropColor;
								M.beginPath();
								M.rect(Math.round(r / 2 - Q / 2 - D.scaleBackdropPaddingX), Math.round(p / 2 - (C * (P + 1)) - D.scaleFontSize * 0.5 - D.scaleBackdropPaddingY), Math.round(Q + (D.scaleBackdropPaddingX * 2)), Math.round(D.scaleFontSize + (D.scaleBackdropPaddingY * 2)));
								M.fill()
							}
							M.textBaseline = "middle";
							M.fillStyle = D.scaleFontColor;
							M.fillText(O, r / 2, p / 2 - (C * (P + 1)))
						}
					}
				}
				function H(S) {
					var Q = -Math.PI / 2,
						P = (Math.PI * 2) / G.length,
						T = 1,
						R = 1;
					if (D.animation) {
						if (D.animateScale) {
							T = S
						}
						if (D.animateRotate) {
							R = S
						}
					}
					for (var O = 0; O < G.length; O++) {
						M.beginPath();
						M.arc(r / 2, p / 2, T * l(G[O].value, B, C), Q, Q + R * P, false);
						M.lineTo(r / 2, p / 2);
						M.closePath();
						M.fillStyle = G[O].color;
						M.fill();
						if (D.segmentShowStroke) {
							M.strokeStyle = D.segmentStrokeColor;
							M.lineWidth = D.segmentStrokeWidth;
							M.stroke()
						}
						Q += R * P
					}
				}
				function I() {
					var S = Number.MIN_VALUE;
					var O = Number.MAX_VALUE;
					for (var R = 0; R < G.length; R++) {
						if (G[R].value > S) {
							S = G[R].value
						}
						if (G[R].value < O) {
							O = G[R].value
						}
					}
					var Q = Math.floor((N / (E * 0.66)));
					var P = Math.floor((N / E * 0.5));
					return {
						maxValue: S,
						minValue: O,
						maxSteps: Q,
						minSteps: P
					}
				}
			};
		var x = function(H, E, M) {
				var L, D, C, F, N, K, z;
				if (!H.labels) {
					H.labels = []
				}
				J();
				var K = I();
				z = (E.scaleShowLabels) ? E.scaleLabel : null;
				if (!E.scaleOverride) {
					C = i(N, K.maxSteps, K.minSteps, K.maxValue, K.minValue, z)
				} else {
					C = {
						steps: E.scaleSteps,
						stepValue: E.scaleStepWidth,
						graphMin: E.scaleStartValue,
						labels: []
					};
					for (var G = 0; G < C.steps; G++) {
						if (z) {
							C.labels.push(j(z, {
								value: (E.scaleStartValue + (E.scaleStepWidth * G)).toFixed(v(E.scaleStepWidth))
							}))
						}
					}
				}
				D = L / (C.steps);
				g(E, A, B, M);

				function B(R) {
					var S = (2 * Math.PI) / H.datasets[0].data.length;
					M.save();
					M.translate(r / 2, p / 2);
					M.rotate(S);
					for (var Q = 0; Q < H.datasets.length; Q++) {
						M.beginPath();
						M.moveTo(0, R * (-1 * l(H.datasets[Q].data[0], C, D)));
						for (var P = 1; P < H.datasets[Q].data.length; P++) {
							M.rotate(S);
							M.lineTo(0, R * (-1 * l(H.datasets[Q].data[P], C, D)))
						}
						M.closePath();
						M.fillStyle = H.datasets[Q].fillColor;
						M.strokeStyle = H.datasets[Q].strokeColor;
						M.lineWidth = E.datasetStrokeWidth;
						M.fill();
						M.stroke();
						if (E.pointDot) {
							M.fillStyle = H.datasets[Q].pointColor;
							M.strokeStyle = H.datasets[Q].pointStrokeColor;
							M.lineWidth = E.pointDotStrokeWidth;
							for (var O = 0; O < H.datasets[Q].data.length; O++) {
								M.rotate(S);
								M.beginPath();
								M.arc(0, R * (-1 * l(H.datasets[Q].data[O], C, D)), E.pointDotRadius, 2 * Math.PI, false);
								M.fill();
								M.stroke()
							}
						}
					}
					M.restore()
				}
				function A() {
					var V = (2 * Math.PI) / H.datasets[0].data.length;
					M.save();
					M.translate(r / 2, p / 2);
					if (E.angleShowLineOut) {
						M.strokeStyle = E.angleLineColor;
						M.lineWidth = E.angleLineWidth;
						for (var S = 0; S < H.datasets[0].data.length; S++) {
							M.rotate(V);
							M.beginPath();
							M.moveTo(0, 0);
							M.lineTo(0, -L);
							M.stroke()
						}
					}
					for (var Q = 0; Q < C.steps; Q++) {
						M.beginPath();
						if (E.scaleShowLine) {
							M.strokeStyle = E.scaleLineColor;
							M.lineWidth = E.scaleLineWidth;
							M.moveTo(0, -D * (Q + 1));
							for (var P = 0; P < H.datasets[0].data.length; P++) {
								M.rotate(V);
								M.lineTo(0, -D * (Q + 1))
							}
							M.closePath();
							M.stroke()
						}
						if (E.scaleShowLabels) {
							M.textAlign = "center";
							M.font = E.scaleFontStyle + " " + E.scaleFontSize + "px " + E.scaleFontFamily;
							M.textBaseline = "middle";
							if (E.scaleShowLabelBackdrop) {
								var U = M.measureText(C.labels[Q]).width;
								M.fillStyle = E.scaleBackdropColor;
								M.beginPath();
								M.rect(Math.round(-U / 2 - E.scaleBackdropPaddingX), Math.round((-D * (Q + 1)) - E.scaleFontSize * 0.5 - E.scaleBackdropPaddingY), Math.round(U + (E.scaleBackdropPaddingX * 2)), Math.round(E.scaleFontSize + (E.scaleBackdropPaddingY * 2)));
								M.fill()
							}
							M.fillStyle = E.scaleFontColor;
							M.fillText(C.labels[Q], 0, -D * (Q + 1))
						}
					}
					for (var O = 0; O < H.labels.length; O++) {
						M.font = E.pointLabelFontStyle + " " + E.pointLabelFontSize + "px " + E.pointLabelFontFamily;
						M.fillStyle = E.pointLabelFontColor;
						var T = Math.sin(V * O) * (L + E.pointLabelFontSize);
						var R = Math.cos(V * O) * (L + E.pointLabelFontSize);
						if (V * O == Math.PI || V * O == 0) {
							M.textAlign = "center"
						} else {
							if (V * O > Math.PI) {
								M.textAlign = "right"
							} else {
								M.textAlign = "left"
							}
						}
						M.textBaseline = "middle";
						M.fillText(H.labels[O], T, -R)
					}
					M.restore()
				}
				function J() {
					L = (y([r, p]) / 2);
					F = E.scaleFontSize * 2;
					var Q = 0;
					for (var P = 0; P < H.labels.length; P++) {
						M.font = E.pointLabelFontStyle + " " + E.pointLabelFontSize + "px " + E.pointLabelFontFamily;
						var O = M.measureText(H.labels[P]).width;
						if (O > Q) {
							Q = O
						}
					}
					L -= b([Q, ((E.pointLabelFontSize / 2) * 1.5)]);
					L -= E.pointLabelFontSize;
					L = k(L, null, 0);
					N = L;
					F = h(F, 5)
				}
				function I() {
					var T = Number.MIN_VALUE;
					var O = Number.MAX_VALUE;
					for (var S = 0; S < H.datasets.length; S++) {
						for (var R = 0; R < H.datasets[S].data.length; R++) {
							if (H.datasets[S].data[R] > T) {
								T = H.datasets[S].data[R]
							}
							if (H.datasets[S].data[R] < O) {
								O = H.datasets[S].data[R]
							}
						}
					}
					var Q = Math.floor((N / (F * 0.66)));
					var P = Math.floor((N / F * 0.5));
					return {
						maxValue: T,
						minValue: O,
						maxSteps: Q,
						minSteps: P
					}
				}
			};
		var t = function(F, C, A) {
				var z = 0;
				var B = y([p / 2, r / 2]) - 5;
				for (var D = 0; D < F.length; D++) {
					z += F[D].value
				}
				g(C, null, E, A);

				function E(J) {
					var L = -Math.PI / 2,
						K = 1,
						I = 1;
					if (C.animation) {
						if (C.animateScale) {
							K = J
						}
						if (C.animateRotate) {
							I = J
						}
					}
					for (var H = 0; H < F.length; H++) {
						var G = I * ((F[H].value / z) * (Math.PI * 2));
						A.beginPath();
						A.arc(r / 2, p / 2, K * B, L, L + G);
						A.lineTo(r / 2, p / 2);
						A.closePath();
						A.fillStyle = F[H].color;
						A.fill();
						if (C.segmentShowStroke) {
							A.lineWidth = C.segmentStrokeWidth;
							A.strokeStyle = C.segmentStrokeColor;
							A.stroke()
						}
						L += G
					}
				}
			};
		var w = function(F, C, A) {
				var z = 0;
				var B = y([p / 2, r / 2]) - 5;
				var G = B * (C.percentageInnerCutout / 100);
				for (var D = 0; D < F.length; D++) {
					z += F[D].value
				}
				g(C, null, E, A);

				function E(K) {
					var M = -Math.PI / 2,
						L = 1,
						J = 1;
					if (C.animation) {
						if (C.animateScale) {
							L = K
						}
						if (C.animateRotate) {
							J = K
						}
					}
					for (var I = 0; I < F.length; I++) {
						var H = J * ((F[I].value / z) * (Math.PI * 2));
						A.beginPath();
						A.arc(r / 2, p / 2, L * B, M, M + H, false);
						A.arc(r / 2, p / 2, L * G, M + H, M, true);
						A.closePath();
						A.fillStyle = F[I].color;
						A.fill();
						if (C.segmentShowStroke) {
							A.lineWidth = C.segmentStrokeWidth;
							A.strokeStyle = C.segmentStrokeColor;
							A.stroke()
						}
						M += H
					}
				}
			};
		var s = function(U, T, M) {
				var C, F, Q, z, B, S, K, I, G, J, H, R, D = 0;
				O();
				S = L();
				K = (T.scaleShowLabels) ? T.scaleLabel : "";
				if (!T.scaleOverride) {
					Q = i(B, S.maxSteps, S.minSteps, S.maxValue, S.minValue, K)
				} else {
					Q = {
						steps: T.scaleSteps,
						stepValue: T.scaleStepWidth,
						graphMin: T.scaleStartValue,
						labels: []
					};
					for (var P = 0; P < Q.steps; P++) {
						if (K) {
							Q.labels.push(j(K, {
								value: (T.scaleStartValue + (T.scaleStepWidth * P)).toFixed(v(T.scaleStepWidth))
							}))
						}
					}
				}
				F = Math.floor(B / Q.steps);
				N();
				g(T, A, E, M);

				function E(Z) {
					for (var X = 0; X < U.datasets.length; X++) {
						M.strokeStyle = U.datasets[X].strokeColor;
						M.lineWidth = T.datasetStrokeWidth;
						M.beginPath();
						M.moveTo(H, R - Z * (l(U.datasets[X].data[0], Q, F)));
						for (var W = 1; W < U.datasets[X].data.length; W++) {
							if (T.bezierCurve) {
								M.bezierCurveTo(aa(W - 0.5), Y(X, W - 1), aa(W - 0.5), Y(X, W), aa(W), Y(X, W))
							} else {
								M.lineTo(aa(W), Y(X, W))
							}
						}
						M.stroke();
						if (T.datasetFill) {
							M.lineTo(H + (I * (U.datasets[X].data.length - 1)), R);
							M.lineTo(H, R);
							M.closePath();
							M.fillStyle = U.datasets[X].fillColor;
							M.fill()
						} else {
							M.closePath()
						}
						if (T.pointDot) {
							M.fillStyle = U.datasets[X].pointColor;
							M.strokeStyle = U.datasets[X].pointStrokeColor;
							M.lineWidth = T.pointDotStrokeWidth;
							for (var V = 0; V < U.datasets[X].data.length; V++) {
								M.beginPath();
								M.arc(H + (I * V), R - Z * (l(U.datasets[X].data[V], Q, F)), T.pointDotRadius, 0, Math.PI * 2, true);
								M.fill();
								M.stroke()
							}
						}
					}
					function Y(ab, ac) {
						return R - Z * (l(U.datasets[ab].data[ac], Q, F))
					}
					function aa(ab) {
						return H + (I * ab)
					}
				}
				function A() {
					M.lineWidth = T.scaleLineWidth;
					M.strokeStyle = T.scaleLineColor;
					M.beginPath();
					M.moveTo(r - G / 2 + 5, R);
					M.lineTo(r - (G / 2) - J - 5, R);
					M.stroke();
					if (D > 0) {
						M.save();
						M.textAlign = "right"
					} else {
						M.textAlign = "center"
					}
					M.fillStyle = T.scaleFontColor;
					for (var W = 0; W < U.labels.length; W++) {
						M.save();
						if (D > 0) {
							M.translate(H + W * I, R + T.scaleFontSize);
							M.rotate(-(D * (Math.PI / 180)));
							M.fillText(U.labels[W], 0, 0);
							M.restore()
						} else {
							M.fillText(U.labels[W], H + W * I, R + T.scaleFontSize + 3)
						}
						M.beginPath();
						M.moveTo(H + W * I, R + 3);
						if (T.scaleShowGridLines && W > 0) {
							M.lineWidth = T.scaleGridLineWidth;
							M.strokeStyle = T.scaleGridLineColor;
							M.lineTo(H + W * I, 5)
						} else {
							M.lineTo(H + W * I, R + 3)
						}
						M.stroke()
					}
					M.lineWidth = T.scaleLineWidth;
					M.strokeStyle = T.scaleLineColor;
					M.beginPath();
					M.moveTo(H, R + 5);
					M.lineTo(H, 5);
					M.stroke();
					M.textAlign = "right";
					M.textBaseline = "middle";
					for (var V = 0; V < Q.steps; V++) {
						M.beginPath();
						M.moveTo(H - 3, R - ((V + 1) * F));
						if (T.scaleShowGridLines) {
							M.lineWidth = T.scaleGridLineWidth;
							M.strokeStyle = T.scaleGridLineColor;
							M.lineTo(H + J + 5, R - ((V + 1) * F))
						} else {
							M.lineTo(H - 0.5, R - ((V + 1) * F))
						}
						M.stroke();
						if (T.scaleShowLabels) {
							M.fillText(Q.labels[V], H - 8, R - ((V + 1) * F))
						}
					}
				}
				function N() {
					var V = 1;
					if (T.scaleShowLabels) {
						M.font = T.scaleFontStyle + " " + T.scaleFontSize + "px " + T.scaleFontFamily;
						for (var W = 0; W < Q.labels.length; W++) {
							var X = M.measureText(Q.labels[W]).width;
							V = (X > V) ? X : V
						}
						V += 10
					}
					J = r - V - G;
					I = Math.floor(J / (U.labels.length - 1));
					H = r - G / 2 - J;
					R = B + T.scaleFontSize / 2
				}
				function O() {
					C = p;
					M.font = T.scaleFontStyle + " " + T.scaleFontSize + "px " + T.scaleFontFamily;
					G = 1;
					for (var W = 0; W < U.labels.length; W++) {
						var V = M.measureText(U.labels[W]).width;
						G = (V > G) ? V : G
					}
					if (r / U.labels.length < G) {
						D = 45;
						if (r / U.labels.length < Math.cos(D) * G) {
							D = 90;
							C -= G
						} else {
							C -= Math.sin(D) * G
						}
					} else {
						C -= T.scaleFontSize
					}
					C -= 5;
					z = T.scaleFontSize;
					C -= z;
					B = C
				}
				function L() {
					var aa = Number.MIN_VALUE;
					var V = Number.MAX_VALUE;
					for (var Z = 0; Z < U.datasets.length; Z++) {
						for (var Y = 0; Y < U.datasets[Z].data.length; Y++) {
							if (U.datasets[Z].data[Y] > aa) {
								aa = U.datasets[Z].data[Y]
							}
							if (U.datasets[Z].data[Y] < V) {
								V = U.datasets[Z].data[Y]
							}
						}
					}
					var X = Math.floor((B / (z * 0.66)));
					var W = Math.floor((B / z * 0.5));
					return {
						maxValue: aa,
						minValue: V,
						maxSteps: X,
						minSteps: W
					}
				}
			};
		var c = function(V, U, N) {
				var C, E, R, z, B, T, J, H, F, I, G, S, L, D = 0;
				P();
				T = K();
				J = (U.scaleShowLabels) ? U.scaleLabel : "";
				if (!U.scaleOverride) {
					R = i(B, T.maxSteps, T.minSteps, T.maxValue, T.minValue, J)
				} else {
					R = {
						steps: U.scaleSteps,
						stepValue: U.scaleStepWidth,
						graphMin: U.scaleStartValue,
						labels: []
					};
					for (var Q = 0; Q < R.steps; Q++) {
						if (J) {
							R.labels.push(j(J, {
								value: (U.scaleStartValue + (U.scaleStepWidth * Q)).toFixed(v(U.scaleStepWidth))
							}))
						}
					}
				}
				E = Math.floor(B / R.steps);
				O();
				g(U, A, M, N);

				function M(Z) {
					N.lineWidth = U.barStrokeWidth;
					for (var X = 0; X < V.datasets.length; X++) {
						N.fillStyle = V.datasets[X].fillColor;
						N.strokeStyle = V.datasets[X].strokeColor;
						for (var W = 0; W < V.datasets[X].data.length; W++) {
							var Y = G + U.barValueSpacing + H * W + L * X + U.barDatasetSpacing * X + U.barStrokeWidth * X;
							N.beginPath();
							N.moveTo(Y, S);
							N.lineTo(Y, S - Z * l(V.datasets[X].data[W], R, E) + (U.barStrokeWidth / 2));
							N.lineTo(Y + L, S - Z * l(V.datasets[X].data[W], R, E) + (U.barStrokeWidth / 2));
							N.lineTo(Y + L, S);
							if (U.barShowStroke) {
								N.stroke()
							}
							N.closePath();
							N.fill()
						}
					}
				}
				function A() {
					N.lineWidth = U.scaleLineWidth;
					N.strokeStyle = U.scaleLineColor;
					N.beginPath();
					N.moveTo(r - F / 2 + 5, S);
					N.lineTo(r - (F / 2) - I - 5, S);
					N.stroke();
					if (D > 0) {
						N.save();
						N.textAlign = "right"
					} else {
						N.textAlign = "center"
					}
					N.fillStyle = U.scaleFontColor;
					for (var X = 0; X < V.labels.length; X++) {
						N.save();
						if (D > 0) {
							N.translate(G + X * H, S + U.scaleFontSize);
							N.rotate(-(D * (Math.PI / 180)));
							N.fillText(V.labels[X], 0, 0);
							N.restore()
						} else {
							N.fillText(V.labels[X], G + X * H + H / 2, S + U.scaleFontSize + 3)
						}
						N.beginPath();
						N.moveTo(G + (X + 1) * H, S + 3);
						N.lineWidth = U.scaleGridLineWidth;
						N.strokeStyle = U.scaleGridLineColor;
						N.lineTo(G + (X + 1) * H, 5);
						N.stroke()
					}
					N.lineWidth = U.scaleLineWidth;
					N.strokeStyle = U.scaleLineColor;
					N.beginPath();
					N.moveTo(G, S + 5);
					N.lineTo(G, 5);
					N.stroke();
					N.textAlign = "right";
					N.textBaseline = "middle";
					for (var W = 0; W < R.steps; W++) {
						N.beginPath();
						N.moveTo(G - 3, S - ((W + 1) * E));
						if (U.scaleShowGridLines) {
							N.lineWidth = U.scaleGridLineWidth;
							N.strokeStyle = U.scaleGridLineColor;
							N.lineTo(G + I + 5, S - ((W + 1) * E))
						} else {
							N.lineTo(G - 0.5, S - ((W + 1) * E))
						}
						N.stroke();
						if (U.scaleShowLabels) {
							N.fillText(R.labels[W], G - 8, S - ((W + 1) * E))
						}
					}
				}
				function O() {
					var W = 1;
					if (U.scaleShowLabels) {
						N.font = U.scaleFontStyle + " " + U.scaleFontSize + "px " + U.scaleFontFamily;
						for (var X = 0; X < R.labels.length; X++) {
							var Y = N.measureText(R.labels[X]).width;
							W = (Y > W) ? Y : W
						}
						W += 10
					}
					I = r - W - F;
					H = Math.floor(I / (V.labels.length));
					L = (H - U.scaleGridLineWidth * 2 - (U.barValueSpacing * 2) - (U.barDatasetSpacing * V.datasets.length - 1) - ((U.barStrokeWidth / 2) * V.datasets.length - 1)) / V.datasets.length;
					G = r - F / 2 - I;
					S = B + U.scaleFontSize / 2
				}
				function P() {
					C = p;
					N.font = U.scaleFontStyle + " " + U.scaleFontSize + "px " + U.scaleFontFamily;
					F = 1;
					for (var X = 0; X < V.labels.length; X++) {
						var W = N.measureText(V.labels[X]).width;
						F = (W > F) ? W : F
					}
					if (r / V.labels.length < F) {
						D = 45;
						if (r / V.labels.length < Math.cos(D) * F) {
							D = 90;
							C -= F
						} else {
							C -= Math.sin(D) * F
						}
					} else {
						C -= U.scaleFontSize
					}
					C -= 5;
					z = U.scaleFontSize;
					C -= z;
					B = C
				}
				function K() {
					var ab = Number.MIN_VALUE;
					var W = Number.MAX_VALUE;
					for (var aa = 0; aa < V.datasets.length; aa++) {
						for (var Z = 0; Z < V.datasets[aa].data.length; Z++) {
							if (V.datasets[aa].data[Z] > ab) {
								ab = V.datasets[aa].data[Z]
							}
							if (V.datasets[aa].data[Z] < W) {
								W = V.datasets[aa].data[Z]
							}
						}
					}
					var Y = Math.floor((B / (z * 0.66)));
					var X = Math.floor((B / z * 0.5));
					return {
						maxValue: ab,
						minValue: W,
						maxSteps: Y,
						minSteps: X
					}
				}
			};

		function l(C, A, E) {
			var D = A.steps * A.stepValue;
			var B = C - A.graphMin;
			var z = k(B / D, 1, 0);
			return (E * A.steps) * z
		}
		function g(C, A, z, H) {
			var B = (C.animation) ? 1 / k(C.animationSteps, Number.MAX_VALUE, 1) : 1,
				G = a[C.animationEasing],
				D = (C.animation) ? 0 : 1;
			if (typeof A !== "function") {
				A = function() {}
			}
			f(E);

			function F() {
				var I = (C.animation) ? k(G(D), null, 0) : 1;
				q(H);
				if (C.scaleOverlay) {
					z(I);
					A()
				} else {
					A();
					z(I)
				}
			}
			function E() {
				D += B;
				F();
				if (D <= 1) {
					f(E)
				} else {
					if (typeof C.onAnimationComplete == "function") {
						C.onAnimationComplete()
					}
				}
			}
		}
		var f = (function() {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
			function(z) {
				window.setTimeout(z, 1000 / 60)
			}
		})();

		function i(C, G, M, I, O, z) {
			var N, A, B, K, P, J, L, F;
			J = I - O;
			L = D(J);
			N = Math.floor(O / (1 * Math.pow(10, L))) * Math.pow(10, L);
			A = Math.ceil(I / (1 * Math.pow(10, L))) * Math.pow(10, L);
			B = A - N;
			K = Math.pow(10, L);
			P = Math.round(B / K);
			while (P < M || P > G) {
				if (P < M) {
					K /= 2;
					P = Math.round(B / K)
				} else {
					K *= 2;
					P = Math.round(B / K)
				}
			}
			var H = [];
			if (z) {
				for (var E = 1; E < P + 1; E++) {
					H.push(j(z, {
						value: (N + (K * E)).toFixed(v(K))
					}))
				}
			}
			return {
				steps: P,
				stepValue: K,
				graphMin: N,
				labels: H
			};

			function D(Q) {
				return Math.floor(Math.log(Q) / Math.LN10)
			}
		}
		function b(z) {
			return Math.max.apply(Math, z)
		}
		function y(z) {
			return Math.min.apply(Math, z)
		}
		function h(A, z) {
			if (!A) {
				return z
			} else {
				return A
			}
		}
		function n(z) {
			return !isNaN(parseFloat(z)) && isFinite(z)
		}
		function k(z, B, A) {
			if (n(B)) {
				if (z > B) {
					return B
				}
			}
			if (n(A)) {
				if (z < A) {
					return A
				}
			}
			return z
		}
		function v(z) {
			var A;
			if (z % 1 != 0) {
				return z.toString().split(".")[1].length
			} else {
				return 0
			}
		}
		function u(C, A) {
			var z = {};
			for (var B in C) {
				z[B] = C[B]
			}
			for (var B in A) {
				z[B] = A[B]
			}
			return z
		}
		var m = {};

		function j(B, A) {
			var z = !/\W/.test(B) ? m[B] = m[B] || j(document.getElementById(B).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + B.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
			return A ? z(A) : z
		}
	};
var submitGoogleForm = function(o) {
	$("#ss-form").animate({
		height: "0.0"
	}, 1000, function() { 
		$(this).hide(); 
		$("#googleForm_thanks").css("opacity", "0.00").show();
		$("#googleForm_thanks").animate({
			opacity: "1.00"
		}, 1000);
	});

	return true;

	/*
	var submitingdata = $(o).serialize();
	$.ajax({
		type: "POST",
		url: "https://docs.google.com/forms/d/1yEC801BIWiRsrRtVxoDavR455yiQUUojUEimQPjg4wM/formResponse",
		data: submitingdata,
		crossDomain: true
	}).done(function( data ) {
	    $(o).html("Message already submited. Thank you for contact me :)");
	});

	return false;
	*/
}