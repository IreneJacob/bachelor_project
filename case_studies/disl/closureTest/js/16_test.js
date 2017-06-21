$(document).ready(function() {
    $.get($(".commentsFromFacebook").attr("data-href"), function(comments) {
        if (typeof comments.share != 'undefined') {
            $(".commentsFromFacebook").text(comments.share.comment_count);
        }
    });

    // more link
    // Configure/customize these variables.
    var showChar = 288;
    // How many characters are shown by default
    var ellipsestext = "";
    // var ellipsestext = "...";
    var moretext = "Read more >";
    var lesstext = "";
    //var lesstext = "show less";

    $('.more_title').each(function() {
        var content = $(this).html();

        if (content.length > showChar) {

            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);

            var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

            $(this).html(html);
        }

    });

    $(".morelink").click(function() {
        if ($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle(500);
        $(this).prev().toggle(500);

        return false;
    });

    /*$('[data-opt-opener]').mouseover(function(event) {
		event.preventDefault();
		$(this).parent().toggleClass('opened-options');
	});*/
    $('#header #main_nav .menu > li').mouseenter(function(event) {
        event.preventDefault();
        $(this).addClass('opened-options');
    });
    $('#header #main_nav .menu > li').mouseleave(function(event) {
        event.preventDefault();
        $(this).removeClass('opened-options');
    });

    $(document).on("click", '[data-search-open]', function(event) {
        event.preventDefault();
        var open = $(this).attr('data-search-open');

        if (open == "true") {
            $(this).attr('data-search-open', 'false');
            $(this).parent().addClass('search-opened');
            setTimeout(function() {
                $('[data-search-open]').next('.search_header').focus();
                //Focus on input after opening the search field
            }, 300);
        } else {
            $('#search').submit();
        }
    });

    $('[data-search-close]').click(function(event) {
        event.preventDefault();
        $(this).parent().removeClass('search-opened');
        $('[data-search-open]').attr('data-search-open', 'true');
    });

    $(document).click(function(event) {
        if ($(event.target).closest('[data-opt-opener]').length) {
            return;
        }
        $('[data-opt-opener]').each(function(index, el) {
            $(this).parent().removeClass('opened-options');
        });
        event.stopPropagation();
    });

    if (window.location.href.indexOf("inspiration") > -1) {
        //if(window.location.href.indexOf("inspirations") > -1) {
        $('div#content').css('margin-bottom', '-20px');
    }
    // end of more link
});

$(window).load(function() {
    var $articleLike = $('.article_like');
    var $articleShareBtns = $articleLike.find('.sharebtn');
    var $articleTotalShares = $articleLike.find('.shares-total');
    var $sharing = $('.sharing');

    totalShares($articleLike, $articleShareBtns, $articleTotalShares);

    $sharing.each(function(index, el) {
        totalShares($(el), $(el).find('.sharebtn'), $(el).find('.shares-total'));
    });
});

function totalShares($block, $shares, $totalShares) {
    if (!($block.length && $shares.length && $totalShares)) {
        return;
    }

    var total = 0;
    var value = 0;
    $shares.each(function(index, el) {
        value = +($(el).html());
        //		console.log(el);
        if ($(el).hasClass("commentsnumber")) {
            return;
        }
        if (value != value)
            return;

        total += value;
    });

    if (total >= 1000) {
        total /= 1000;
        total = total.toFixed(1);
        if (total % 10 == 0) {
            total = total / 1;
        }
        total += "K";
    }

    $totalShares.html(total);
}

function sticky_relocate() {
    if ($('#sidebar-anchor').length < 1) {
        return false;
    }
    var window_top = $(window).scrollTop();
    var div_top = $('#sidebar-anchor').offset().top;
    var footerTopPos = $('#editorbio').offset().top - 1015;
    //console.log("window_top:", window_top);
    //console.log("footerTopPos:",footerTopPos );
    if (window_top > div_top + 244) {
        $('.toparticles').addClass('stick');
    } else {
        $('.toparticles').removeClass('stick');
    }

    if (window_top >= footerTopPos) {
        $('.toparticles.stick').addClass('fixedpos');
        $('.toparticles.stick').css({
            'top': footerTopPos
        });
    } else {
        $('.toparticles.stick').removeClass('fixedpos');
        $('.toparticles.stick').css({
            'top': '50px',
            'z-index': '90'
        });
    }
}

$(document).ready(function() {
    if (window.location.href.indexOf("/articles/") > -1) {
        $(window).scroll(sticky_relocate);
        sticky_relocate();
    }

    $('.newsletter_subscribe .hemail').css("display", "none");
    $(' #fNewsletterWrapper .hemail').css("display", "none");
    $(' #sidebar .newsletter_subscribe .hemail').css("display", "none");

    $('.name_newsletter').on('focus', function() {
        if ($(this).val() == "Enter your name here") {
            $(this).val('');
        }
    });
    $('.name_newsletter').on('blur', function() {
        if ($(this).val() == '') {
            $(this).val("Enter your name here");
        }
    });
    /*
	 * $('.email_newsletter').on('focus', function() { if ($(this).val() ==
	 * "Enter your email here") { $(this).val(''); } });
	 * $('.email_newsletter').on('blur', function() { if ($(this).val() == '') {
	 * $(this).val("Enter your email here"); } });
	 */
    /*
	 * $('.f_email_newsletter').on('focus', function() { if ($(this).val() ==
	 * "Submit your email to get our newsletter") { $(this).val(''); } });
	 * $('.f_email_newsletter').on('blur', function() { if ($(this).val() == '') {
	 * $(this).val("Submit your email to get our newsletter"); } });
	 */
    //	$('.search_header').on('focus', function() {
    //		if ($(this).val() == 'Search something good') {
    //			$(this).val('');
    //		}
    //	});
    //	$('.search_header').on('blur', function() {
    //		if ($(this).val() == '') {
    //			$(this).val('Search something good');
    //		}
    //	});
    $('.talk_textarea').on('focus', function() {
        if ($(this).val() == 'Write your comment here') {
            $(this).val('');
        }
    });
    $('.talk_textarea').on('blur', function() {
        if ($(this).val() == '') {
            $(this).val('Write your comment here');
        }
    });
    $('.talk_textarea').on('focus', function() {
        if ($(this).val() == 'Write your comment here') {
            $(this).val('');
        }
    });
    $('.talk_textarea').on('blur', function() {
        if ($(this).val() == '') {
            $(this).val('Write your comment here');
        }
    });
    $('.contact_name').on('focus', function() {
        if ($(this).val() == 'Your Name') {
            $(this).val('').removeClass("light_color");
        }
    }).on('blur', function() {
        if ($(this).val() == '') {
            $(this).val('Your Name').addClass("light_color");
        }
    });
    $('.contact_email').on('focus', function() {
        if ($(this).val() == 'Your Email') {
            $(this).val('').removeClass("light_color");
        }
    });
    $('.contact_email').on('blur', function() {
        if ($(this).val() == '') {
            $(this).val('Your Email').addClass("light_color");
        }
    });
    $('.contact_link').on('focus', function() {
        if ($(this).val() == 'Link to Video') {
            $(this).val('');
        }
    });
    $('.contact_link').on('blur', function() {
        if ($(this).val() == '') {
            $(this).val('Link to Video');
        }
    });
    $('.contact_message').on('focus', function() {
        if ($(this).val() == 'Your Message') {
            $(this).val('');
        }
    });
    $('.contact_message').on('blur', function() {
        if ($(this).val() == '') {
            $(this).val('Your Message');
        }
    });
    $('.service_name').on('focus', function() {
        if ($(this).val() == 'Organization') {
            $(this).val('');
        }
    });
    $('.service_name').on('blur', function() {
        if ($(this).val() == '') {
            $(this).val('Organization');
        }
    });
    $('.company_name').on('focus', function() {
        if ($(this).val() == 'Organization') {
            $(this).val('');
        }
    });
    $('.company_name').on('blur', function() {
        if ($(this).val() == '') {
            $(this).val('Organization');
        }
    });
    $('.site_url').on('focus', function() {
        if ($(this).val() == 'URL') {
            $(this).val('');
        }
    });
    $('.site_url').on('blur', function() {
        if ($(this).val() == '') {
            $(this).val('URL');
        }
    });
    $('.site_description').on('focus', function() {
        if ($(this).val() == "Tell us about your service - we're all ears! ") {
            $(this).val('');
        }
    });
    $('.site_description').on('blur', function() {
        if ($(this).val() == '') {
            $(this).val("Tell us about your service - we're all ears! ");
        }
    });
    $('.activity_header').click(function() {
        var type = $(this).attr('type');
        $('.activity_header').removeClass('active');
        $(this).addClass('active');
        $('.activity_content').removeClass('active');
        $('.activity_content[type=' + type + ']').addClass('active');
    });

    $('.contact_street').on('focus', function() {
        if ($(this).val() == 'Street') {
            $(this).val('').removeClass("light_color");
        }
    }).on('blur', function() {
        if ($(this).val() == '') {
            $(this).val('Street').addClass("light_color");
        }
    });

    $('.contact_zip').on('focus', function() {
        if ($(this).val() == 'ZIP code') {
            $(this).val('').removeClass("light_color");
        }
    }).on('blur', function() {
        if ($(this).val() == '') {
            $(this).val('ZIP code').addClass("light_color");
        }
    });

    $('.contact_city').on('focus', function() {
        if ($(this).val() == 'City') {
            $(this).val('').removeClass("light_color");
        }
    }).on('blur', function() {
        if ($(this).val() == '') {
            $(this).val('City').addClass("light_color");
        }
    });

    $('.contact_zip').on('focus', function() {
        if ($(this).val() == 'ZIP code') {
            $(this).val('').removeClass("light_color");
        }
    }).on('blur', function() {
        if ($(this).val() == '') {
            $(this).val('ZIP code').addClass("light_color");
        }
    });

    $('.contact_country').on('focus', function() {
        if ($(this).val() == 'Country') {
            $(this).val('').removeClass("light_color");
        }
    }).on('blur', function() {
        if ($(this).val() == '') {
            $(this).val('Country').addClass("light_color");
        }
    });

    $('.contact_state').on('focus', function() {
        if ($(this).val() == 'State') {
            $(this).val('').removeClass("light_color");
        }
    }).on('blur', function() {
        if ($(this).val() == '') {
            $(this).val('State').addClass("light_color");
        }
    });

    $('.contact_phone').on('focus', function() {
        if ($(this).val() == 'Phone') {
            $(this).val('').removeClass("light_color");
        }
    }).on('blur', function() {
        if ($(this).val() == '') {
            $(this).val('Phone').addClass("light_color");
        }
    });

});
