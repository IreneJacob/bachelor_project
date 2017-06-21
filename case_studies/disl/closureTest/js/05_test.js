var PROXY = "/coldboxproxy.cfc"
  , SCROLL_SPEED = 500
  , ANIMATION_SPEED = 1200
  , scrollExcludeList = "";
function keepAlive() {
    $.post(PROXY, {
        method: "keepAlive"
    })
}
var Omniture = Omniture || {};
function handleLoginResponse(a) {
    handleAjaxCheckFormResponse(a);
    var c = a.validationErrorMessage;
    a.erroredFields.length || c.length || ($.IsDefined(a.originUrl) ? goToUrl(a.originUrl) : reloadPage())
}
function handleRegFormResponse(a) {
    handleAjaxCheckFormResponse(a);
    var c = a.formId
      , b = a.validationErrorMessage;
    a.erroredFields.length || b.length || (/campaignDownloadFormID/i.test(c) && triggerEvent("18", "Download Submit"),
    $("#" + c)[0].submit())
}
function handleSamsungRegFormResponse(a) {
    handleAjaxCheckFormResponse(a);
    var c = a.formId
      , b = a.validationErrorMessage;
    a.erroredFields.length || b.length || $("#" + c)[0].submit()
}
function handleWacomRegFormResponse(a) {
    handleAjaxCheckFormResponse(a);
    a.erroredFields.length || "function" === typeof refreshAds && refreshAds()
}
function handleSendToAFriendResponse(a) {
    handleAjaxCheckFormResponse(a);
    a.erroredFields.length || "function" === typeof refreshAds && refreshAds()
}
function handlePostUserReviewResponse(a) {
    handleAjaxCheckFormResponse(a);
    a.erroredFields.length || ($("#facebox .content").html("<p><strong>Thank You. Your review will be checked and will appear online in a few hours</strong></p>"),
    "function" === typeof refreshAds && refreshAds())
}
function handleNewsletterEmailCheckResponse(a) {
    var c = !0
      , b = !1
      , e = a.erroredFields
      , f = a.correctFields;
    if (0 < e.length)
        for (var d = 0; d < e.length; d++) {
            if ("newsletterEmail" == e[d].field || "email" == e[d].field)
                if (f = e[d].validationStatus.toString().split(","),
                1 == f[0] || 2 == f[0])
                    "email" == e[d].field ? (a.erroredFields[d].message = "You already have an account with us.  Click the 'Already Registered?' link above to update your details.",
                    1 == f[0] && (a.erroredFields[d].message += ' Alternatively, <a href="/login/" title="Login">click here</a> to log in.')) : (reloadPage(),
                    c = !1)
        }
    else if (0 < f.length)
        for (d = 0; d < f.length; d++)
            "email" == f[d].field ? (c = !1,
            b = !0) : "newsletterEmail" == f[d].field && (f[d].message = "We have no record of the email address provided. Please close this form and use the 'New subscriber' form provided.",
            a.erroredFields[e.length] = f[d],
            delete f[d]);
    c && handleAjaxCheckFormResponse(a);
    b && handleRegFormResponse(a)
}
function handlePostConfirmSubmitFormResponse(a) {
    var c = a.formId
      , b = !1;
    switch ($("[id=" + c + "] [id=" + gbl.TARGET_FIELD + "]").val()) {
    case "attemptQuickRegister":
        handleAjaxCheckFormResponse(a);
        break;
    case "attemptXSiteRegister":
        b = !0;
        break;
    case "attemptNewsletterRegister":
        b = !0;
        break;
    default:
        return
    }
    var e = a.erroredFields;
    a = a.validationErrorMessage;
    (b || !e.length && !a.length) && $("#" + c)[0].submit()
}
function updateTextAreaCharCount(a, c, b, e) {
    a = e - c.value.length;
    c = $("[id=" + b + "Container]");
    $("[id=" + b + "]", c).html(a);
    1 > a ? c.addClass("overCount") : c.removeClass("overCount")
}
function clearPreviouslyLoggedInUser() {
    $.post(PROXY, {
        method: "clearPreviouslyLoggedInUser"
    })
}
function scrollToLocation(a, c, b) {
    extraOff = c ? c : 0;
    a = "object" == typeof a ? a : $("[name=" + a + "]");
    if (a.length)
        return a = a.offset().top + extraOff - 15,
        $("html,body").animate({
            scrollTop: a
        }, SCROLL_SPEED, b),
        !1
}
function reloadPage() {
    window.location = window.location
}
function goToUrl(a) {
    window.location = a
}
function openWindow(a, c, b) {
    window.open(a, c, b)
}
Omniture.trackClick = function(a) {
    s_gi(s_account).tl(!0, "o", a.toLowerCase())
}
;
$("img.lightbox").each(function(a) {
    $(this).attr("title", "Click to enlarge");
    $(this).click(function() {
        var a = $(window).width()
          , b = $(window).height()
          , e = $(this).attr("src")
          , e = e.replace(/\_thumb[0-9]*\./i, ".");
        $("body").append('<img id="tempSizerImage" style="display: none" src="' + e + '">');
        $("img#tempSizerImage").load(function() {
            oryginalImgWidth = $(this).width();
            oryginalImgHeight = $(this).height();
            var f = "";
            0 > oryginalImgWidth - oryginalImgHeight ? oryginalImgHeight > b && (f = 'height="' + (b - 100) + '"') : oryginalImgWidth > a && (f = 'width="' + (a - 100) + '"');
            $.facebox('<img src="' + e + '" ' + f + "  >");
            $("img#tempSizerImage").remove()
        })
    })
});
$(document).ready(function() {
    $(".toggleRelDiv").click(function() {
        $("#" + $(this).attr("rel")).slideToggle();
        $(this).hasClass("toggleClosed") ? ($(this).removeClass("toggleClosed"),
        $(this).addClass("toggleOpen")) : $(this).hasClass("toggleOpen") && ($(this).removeClass("toggleOpen"),
        $(this).addClass("toggleClosed"));
        return !1
    }).css("cursor", "pointer").each(function() {
        $("#" + $(this).attr("rel")).hide()
    });
    $(".showRelDiv").unbind("click").click(function() {
        var a = $("#" + $(this).attr("rel"))
          , b = $(this).html();
        "none" == a.css("display") ? a.css("display", a.attr("origDisplay")) : a.attr("origDisplay", $(this).css("display")).hide();
        "undefined" != typeof $(this).attr("toggleHTML") && $(this).html($(this).attr("toggleHTML")).attr("toggleHTML", b);
        return !1
    }).css("cursor", "pointer").each(function() {
        $("#" + $(this).attr("rel")).attr("origDisplay", $(this).css("display")).hide()
    });
    var a = RegExp("fbdiv-([a-zA-Z0-9-_]*)", "g");
    $("a[rel*=fbdiv-]").each(function() {
        $(this).attr("rel").search(a);
        $(this).attr("href", "#" + RegExp.$1)
    });
    $(document).ready(function() {
        "undefined" !== typeof facebox && $("a[rel*=facebox]").facebox()
    });
    $(".ajaxForm").not(".siteLoginForm,#fbSendToAFriendFormID").submit(function() {
        ajaxCheckForm(this, handleRegFormResponse);
        return !1
    });
    $(".ajaxForm input.formtext, .ajaxForm select, .ajaxForm .formpassword").not(".login-overlay form *").bind("blur change", function() {
        ajaxCheckField(this);
        return !1
    });
    $("#inRegLoginFormID.ajaxForm,#loginFormID.ajaxForm").unbind("submit").submit(function() {
        ajaxCheckForm(this, handleLoginResponse);
        return !1
    });
    $("#newsletterEmailCheckFormID.ajaxForm,#advancedNewsletterFormID.ajaxForm").unbind("submit").submit(function() {
        ajaxCheckForm(this, handleNewsletterEmailCheckResponse);
        return !1
    });
    $("#wacomRegFormID.ajaxForm").unbind("submit").submit(function(a) {
        a.preventDefault();
        ajaxCheckForm(this, handleWacomRegFormResponse);
        return !1
    });
    $("a[href=#zzz]").click(function() {
        return !1
    });
    $(".tabs li,.tabs li a").each(function() {
        if ("undefined" === typeof $(this).attr("rel"))
            var a = $("a", this).attr("rel") + "Container"
              , b = $(this);
        else
            a = $(this).attr("rel") + "Container",
            b = $(this).closest("li");
        $(this).click(function() {
            $("#" + a).show().siblings(".tabbedContentContainer").hide();
            b.addClass("active").siblings().removeClass("active");
            return !1
        });
        $(this).hasClass("active") && ($("#" + a).show().siblings(".tabbedContentContainer").hide(),
        b.addClass("active").siblings().removeClass("active"))
    });
    $("a[href*=#]").click(function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname && !$.ListFindNoCase(scrollExcludeList, this.hash.slice(1)) && "facebox" == !$(this).attr("rel")) {
            var a = $(this.hash)
              , a = a.length && a || $("[name=" + this.hash.slice(1) + "]");
            scrollToLocation(a)
        }
    })
});
