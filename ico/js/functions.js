$(function () {
    $(".w-custom-select").each(function () {
        function e(n) {
            n.removeClass("custom-select--open")
        }
        var n = $(this),
            o = $(".w-custom-select"),
            i = n.find(".custom-select__placeholder"),
            r = n.find(".custom-select__items");
        n.on("click", function (r) {
            if (r.target === n[0] || r.target === i[0])
                if (n.hasClass("custom-select--open")) n.removeClass("custom-select--open");
                else {
                    r.stopPropagation();
                    for (var a = 0, s = o.not(this), c = s.length; a < c; a++) s[a].classList.remove("custom-select--open");
                    n.addClass("custom-select--open"), $("body").one("click", e)
                }
        }), r.on("click", ".custom-select__item", function () {
            var o = r.find('label[for="' + $(this).attr("id") + '"]').text();
            i.html(o), n.removeClass("custom-select--open"), $("body").off("click", e);
            var lang = $(this).attr("id");

            $('.main-logo').attr('src', arrLang[lang]['logo-src']);


            $('.lang').each(function (index, element) {
                $(this).text(arrLang[lang][$(this).attr('key')]);
            })

        })
    });

    $(".menuitem").on("click", function () {
        $(".menuitem").each(function () {
            $(this).removeClass("active");
        });

        $(this).addClass("active");
    });

    // media query event handler
    if (matchMedia) {
        const mq1050 = window.matchMedia("(min-width: 1050px)");
        mq1050.addListener(WidthChange1050);
        WidthChange1050(mq1050);
    }

    // media query change
    function WidthChange1050(mq) {
        $headerRight = $('.header-right');
        $headerNav = $('.header-nav');
        $leftLang = $('.left-lang');
        var headerRow = document.getElementById('header-row');;
        if (mq.matches) {
            // window width is at least 1050px
            //$headerNav.removeClass('col-md-9');
            $headerNav.addClass('col-md-7');
            $headerRight.addClass('col-md-2');
            $headerNav.addClass('col-12');
            $headerNav.addClass('col-sm-6');
            $headerRight.removeClass('col-12');
            $headerRight.removeClass('col-sm-6');

            var div = headerRow.querySelector('.header-right');
            headerRow.appendChild(div);
        } else {
            // window width is less than 1050px   
            $headerRight.removeClass('col-md-2');
            $headerNav.removeClass('col-md-7');
            $headerNav.removeClass('col-12');
            $headerNav.removeClass('col-sm-6');
            $headerRight.removeClass('col-12');
            $headerRight.removeClass('col-sm-6');
            //$headerNav.addClass('col-md-9');

            var div = headerRow.querySelector('.header-nav');
            headerRow.appendChild(div);
        }

    };

    $('#calculate-btn').click(function () {
        $('#calc-alert').removeClass('show');

        var eth_in = $('#eth-input');
        var eth = $('#eth-input').val();
        var usd_in = $('#usd-input');
        var usd = $('#usd-input').val();
        var token_in = $('#token-input');
        var token = $('#token-input').val();
        var eth_usd_price = 892.97; //брать из json
        var token_eth_price = 0.02; //брать из json

        if (eth && !usd && !token) {
            usd_in.val((eth * eth_usd_price).toFixed(2));
            token_in.val(Math.round(eth / token_eth_price));
        }
        else if (!eth && usd && !token) {
            eth = usd / eth_usd_price;
            eth_in.val((usd / eth_usd_price).toFixed(2));
            token_in.val((Math.round(eth / token_eth_price)));
        }
        else if (!eth && !usd && token) {
            eth = token * token_eth_price;
            eth_in.val((token * token_eth_price).toFixed(2));
            usd_in.val((eth * eth_usd_price).toFixed(2));
        }
        else {
            $('#calc-alert').addClass('show');
        }
    });

    $('#clean-calculate-btn').click(function (event) {
        event.preventDefault();
        $('#calc-alert').removeClass('show');
        $('#eth-input').val('');
        $('#usd-input').val('');
        $('#token-input').val('');

    });
});

function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}
