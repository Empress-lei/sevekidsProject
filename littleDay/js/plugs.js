/*公共控件*/
(function ($) {
    /*二次封装滑动幻灯片*/
    $.fn.slider = function (options) {
        var setting = {
            mode: "horizontal", //屏幕方向
            loop: true, //循环
            init: null, //初始化
            setIndex: null, //初始化索引
            autoplay: false, //是否自动播放
            time: 3000 //幻灯片间隔时间
        }
        var interval = 0;
        options = Object.extend(options, setting);
        var $this = this;
        $this.slider = new Swiper($this[0], {
            mode: options.mode,
            loop: options.loop,
            grabCursor: true,
            paginationClickable: false,
            calculateHeight: true,
            visiblilityFullfit: true,
            onSlideChangeStart: function (swiper) {
                options.setIndex && options.setIndex.call($this, swiper);
            },
            onTouchStart: function () {
                $this.trigger('stop');
            }
        });

        //自定义播放事件
        $this.on('play', function () {
            $this.trigger('stop');
            interval = setInterval(function () {
                $this.slider.swipeNext($this.slider.activeLoopIndex);
            }, options.time);
        });

        $this.on('stop', function () {
            clearInterval(interval);
        })

        options.autoplay && $this.trigger('play');
        options.init && options.init.call($this);
    }

    //右侧附加选择层插件
    $.fn.rightSwipe = function (options) {
        var $temp = null;
        var setting = {
            clickEnd: null //打开关闭层回调事件
        };
        options = Object.extend(options, setting);
        this.each(function (index, curr) {
            var $curr = $(curr);
            (function ($this) {
                $this.click(function (ev) {
                    ev.preventDefault();
                    var $leftPopup = $('.leftPopup.' + $this.attr('data-action'));
                    $leftPopup[0].style.zIndex = 20;
                    $leftPopup.rightSwipeAction({
                        clickEnd: function (display) {
                            var $back = $('.' + $leftPopup.attr('data-back')), $swipeLeft = $leftPopup.find('.swipeLeft');
                            $leftPopup[0].style.display = $back[0].style.display = '';
                            $back[0].style.zIndex = 1;
                            if ($temp && $temp.length > 0) {
                                $temp.removeClass('swipeLeft-block');
                                $back[0].style.display = 'none';
                            }
                            setTimeout(function () {
                                $swipeLeft.addClass('swipeLeft-block');
                            }, 100)
                            $temp = $swipeLeft;

                            $back.on('close', function () {
                                if ($temp[0])
                                    $temp.removeClass('swipeLeft-block');
                                setTimeout(function () {
                                    if ($temp && $temp.length > 0) {
                                        $leftPopup[0].style.display = $('.' + $temp.parent().attr('data-back'))[0].style.display = 'none';
                                        $temp = null;
                                        options.clickEnd && options.clickEnd.call($leftPopup, false);
                                    }
                                }, 300)

                            })

                            $back.touches({
                                touchstart: function () {
                                    $back.trigger('close');
                                }
                            })
                            $swipeLeft.transitionEnd({ end: function () { options.clickEnd && options.clickEnd.call($leftPopup, true); } })
                        }
                    });
                })
            })($curr);
        })
    }
})(jQuery);


/*初始化*/
$(function () {
    //滑动幻灯片
    (function () {
        var $container = $('.swiper-container'),
            items = $container.find('.swiper-wrapper li'),
            $menu = $container.find('.slide_menu'),
            $menuUl = $menu.find('ul');
        $container.show();
        if (items.length == 0) return;
        var menu = [];
        items.each(function (index, curr) {
            menu.push('<li></li>')
        })
        $menuUl.width(items.length * 16);
        $menuUl.html(menu.join(''));
        $container.on('setIndex', function (event, idx) {
            var $li = $(items[idx]);

            var arrli = $menuUl.find('li');
            arrli.each(function (index, curr) {
                $(curr).removeClass('current');
            })
            $(arrli[idx]).addClass('current');
        });
        $container.trigger('setIndex', 0);
        $container.show();
        // 焦点图切换
        $container.slider({
            autoplay: true,
            setIndex: function (swiper) {
                this.trigger('setIndex', swiper.activeLoopIndex);
                this.trigger('play');
            },
            init: function () {
                var $this = this;
                var li = $this.find('.swiper-slide');
                /*解决高度自适应问题*/
                $(window).resize(function () {
                    setTimeout(function () {
                        var height = $this.find('img').height();
                        if (height > 0) {
                            li.height(height);
                            li.parent().height(height)
                        }
                    }, 50);
                })
            }
        })
    })();

    ////下拉菜单
    //(function () {
    //    $('.btn-nav').sliderMenu({
    //        clickEnd: function ($menu, display) {
    //            $menu[0].style.display = display;
    //            if (display == 'block')
    //                this.addClass('btn-nav-show');
    //            else {
    //                this.removeClass('btn-nav-show')
    //            }
    //        }
    //    });
    //})();

});