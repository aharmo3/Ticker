arTicker = {

Init : function () {
    var $tickerItem = $('#heartbeatModule .item');
    var $tickerWrapper = $('#heartbeatModule .innerContent');

    $tickerItem.last().prev().remove().clone().prependTo('.innerContent').css('margin-top', (-1 * ($tickerItem.outerHeight(true))));

    //On load auto play
    var interval = setInterval(arTicker.hbanimationUp, 3000);

    //on hover pause 
    $tickerWrapper.hover(function () {
        clearInterval(interval);
    }, function () {
        interval = setInterval(arTicker.hbanimationUp, 3000);
    });

    $('#ticker-up').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        clearInterval(interval);
        arTicker.hbanimationDown();
    });

    $('#ticker-down').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        clearInterval(interval);
        arTicker.hbanimationUp();
    });
},


hbanimationUp: function () {
    var $tickerItem = $('#heartbeatModule .item');

    //Grab outerheight of 3 elements in view and set wrapper height
    $('.innerContent').css('height', $tickerItem.eq(2).outerHeight() + $tickerItem.eq(3).outerHeight() + $tickerItem.eq(4).outerHeight());
            
    $tickerItem.first().remove().clone().appendTo('.innerContent').css('margin-top', '0');
    $tickerItem = $('#heartbeatModule .item');
    $tickerItem.first().stop().animate({
        marginTop: '-' + $tickerItem.first().outerHeight()
    }, 1000, "swing");//end animate
},

hbanimationDown : function () {
    var $tickerItem = $('#heartbeatModule .item');
    $('.innerContent').css('height', $tickerItem.eq(0).outerHeight() + $tickerItem.eq(1).outerHeight() + $tickerItem.eq(2).outerHeight());
    var marginTop = -1 * ($tickerItem.last().outerHeight(true));

    $tickerItem.first().stop().animate({
        marginTop: '0'
    }, 1000, "swing", function () {
        $tickerItem.last().remove().clone().prependTo('.innerContent').css('margin-top', marginTop);


    });//end animate
}

}