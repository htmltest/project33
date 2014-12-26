(function($) {

    $(document).ready(function() {

        // поле поиска
        $('.search-input input').each(function() {
            if ($(this).val() == '') {
                $(this).parent().find('span').css({'display': 'block'});
            }
        });

        $('.search-input input').focus(function() {
            $(this).parent().find('span').css({'display': 'none'});
        });

        $('.search-input input').blur(function() {
            if ($(this).val() == '') {
                $(this).parent().find('span').css({'display': 'block'});
            }
        });

        $('.list-content-items .list-content-name-inner').click(function(e) {
            var curLink = $(this);
            var curTR = curLink.parents().filter('tr');
            if (!curTR.hasClass('active')) {
                $('.item-wrap .loading').show();
                $('.list-content-items tr.active').removeClass('active');
                curTR.addClass('active');

                var curIndex = $('.list-content-items tr').index(curTR);
                var prevIndex = curIndex - 1;
                if (prevIndex < 0) {
                    prevIndex = $('.list-content-items tr').length - 1;
                }
                var nextIndex = curIndex + 1;
                if (nextIndex >= $('.list-content-items tr').length) {
                    nextIndex = 0;
                }

                $('.item-others-prev .item-others-name').html($('.list-content-items tr').eq(prevIndex).find('.list-content-name-text-1').html());
                $('.item-others-prev .item-others-genre').html($('.list-content-items tr').eq(prevIndex).find('.list-content-name-inner').attr('rel'));
                $('.item-others-next .item-others-name').html($('.list-content-items tr').eq(nextIndex).find('.list-content-name-text-1').html());
                $('.item-others-next .item-others-genre').html($('.list-content-items tr').eq(nextIndex).find('.list-content-name-inner').attr('rel'));

                $('.item').load(curLink.attr('href'), function() {
                    $('.item-wrap .loading').hide();
                });
            }

            e.preventDefault();
        });

        $('.item-others-prev').click(function(e) {
            var curIndex = $('.list-content-items tr').index($('.list-content-items tr.active'));
            curIndex--;
            if (curIndex < 0) {
                curIndex = $('.list-content-items tr').length - 1;
            }
            $('.list-content-items tr').eq(curIndex).find('.list-content-name-inner').click();
            e.preventDefault();
        });

        $('.item-others-next').click(function(e) {
            var curIndex = $('.list-content-items tr').index($('.list-content-items tr.active'));
            curIndex++;
            if (curIndex >= $('.list-content-items tr').length) {
                curIndex = 0;
            }
            $('.list-content-items tr').eq(curIndex).find('.list-content-name-inner').click();
            e.preventDefault();
        });

    });

    $(window).bind('load resize', function() {

        // выравнивание заголовков в списках
        $('.list').each(function() {
            var curBlock = $(this);

            var firstTR = curBlock.find('.list-content tr:first');
            curBlock.find('.list-headers th').each(function() {
                var curTH = $(this);
                var curIndex = curBlock.find('.list-headers th').index(curTH);
                curTH.width(firstTR.find('td').eq(curIndex).width());
            });
        });

        var api = $('.list-content-items').data('jsp');
        if (api) {
            api.reinitialise();
        } else {
            $('.list-content-items').jScrollPane({
                autoReinitialise: true
            });
        }
    });

    $(window).load(function() {
        $('.list-content-items tr:first .list-content-name-inner').click();
    });

})(jQuery);