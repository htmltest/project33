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

                $.ajax({
                    url: curLink.attr('href'),
                    dataType: 'html',
                    cache: false
                }).done(function(html) {
                    $('.item').html(html);
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

        $('.messages-list-content a').click(function(e) {
            var curLink = $(this);
            if (!curLink.hasClass('active')) {
                $('.messages-content .loading').show();
                $('.messages-list-content a.active').removeClass('active');
                curLink.addClass('active');
                $.ajax({
                    url: curLink.attr('href'),
                    dataType: 'html',
                    cache: false
                }).done(function(html) {
                    $('.messages-content-inner').html(html);
                    $('.messages-content .loading').hide();
                });
            }
            e.preventDefault();
        });

        $('.item-wrap form').each(function() {
            $('#fileupload-foto').fileupload({
                url: 'js/jquery.fileupload/server/php/',
                acceptFileTypes: /(\.|\/)(jpg)$/i,
                autoUpload: true,
                start: function() {
                    $('.item-wrap form').addClass('disabled');
                },
                stop: function() {
                    $('.item-wrap form').removeClass('disabled');
                }
            });

            $('#fileupload-audio').fileupload({
                url: 'js/jquery.fileupload/server/php/',
                acceptFileTypes: /(\.|\/)(mp3|wav)$/i,
                autoUpload: true,
                start: function() {
                    $('.item-wrap form').addClass('disabled');
                },
                stop: function() {
                    $('.item-wrap form').removeClass('disabled');
                }
            });

            $('#fileupload-video').fileupload({
                url: 'js/jquery.fileupload/server/php/',
                acceptFileTypes: /(\.|\/)(mp4|avi)$/i,
                autoUpload: true,
                start: function() {
                    $('.item-wrap form').addClass('disabled');
                },
                stop: function() {
                    $('.item-wrap form').removeClass('disabled');
                }
            });

            $('.item-input-link span').click(function() {
                var curItem = $(this).parents().filter('.form-filelink-top');
                curItem.find('.item-input').show();
                curItem.find('.item-input-link').hide();
            });
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

        $('.messages-list-container').jScrollPane({
                autoReinitialise: true
        });

        $('.messages-list-content a:first').click();
    });

})(jQuery);