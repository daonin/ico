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
});
