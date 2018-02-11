$(document).ready(function () {
    var startDate = new Date(appConfig.dates.eb_stage_start).getTime();
    var preStartDate = new Date(appConfig.dates.pre_ico_stage_start).getTime();
    var icoStartDate = new Date(appConfig.dates.ico_stage_start).getTime();
    var finishDate = new Date(appConfig.dates.ico_stage_finish).getTime();
    var now = new Date().getTime();
    var percent = 0;

    if (startDate < now && now < finishDate) {
        var fDate, sDate;
        var offset = 0;
        var metrik = 57;

        if (now < preStartDate) {
            fDate = preStartDate;
            sDate = startDate;
        }
        else if (now < icoStartDate) {
            sDate = preStartDate;
            fDate = icoStartDate
            offset = 57;
            metrik = 76.5 - 57;
        }
        else {
            sDate = icoStartDate;
            fDate = finishDate;
            offset = 76.5;
            metrik = 100 - 76.5;
        }

        var fullLength = fDate - sDate;
        var distance = fDate - now;

        percent = offset + ((1 - (distance / fullLength)) * metrik);
    }

    if (now >= finishDate)
    {
        percent = 100;
    }

    var cssString = "width: " + percent + "%";
    
    $('#stages-progress').attr('style', cssString);

    /*JSON Part*/
    function parseAndFill(data) {

        appConfig.money.raised = data.raised;
        appConfig.money.token_eth_price = data.token_eth_price;
        appConfig.money.eth_usd_price = data.eth_usd_price;

        var raised = appConfig.money.raised * appConfig.money.eth_usd_price;
        //var raised = data.raised;

        var formattedRaised = number_format(raised, 2, ',', ' ');
        $('.raised__text').text("$" + formattedRaised);

        if (raised > appConfig.goals.soft_cap) {
            $('span.soft-cap-check').removeClass('hidden');
        }

        var raisedPercent = (raised / appConfig.goals.hard_cap) * 100;
        if (raisedPercent < 0.5) {
            raisedPercent = 0.5;
        }
        var cssString = "width: " + raisedPercent + "%";

        $('div.thermometer-item').removeAttr('style');
        $('div.thermometer-item').attr('style', cssString);

        var price = appConfig.money.token_eth_price * appConfig.money.eth_usd_price;
        var formattedPrice = number_format(price, 2, ',', ' ');

        $('#token-price-value').text("$" + formattedPrice);
    };

    $.ajax({
        url: '/data.json',
        type: "GET",
        dataType: "json",
        success: function (data) {
            parseAndFill(data);
        },
        error: function (error) {
            alert(JSON.stringify(error));
        }
    });   
});