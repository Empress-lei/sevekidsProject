var shuping = 'onorientationchange' in window ? 'orientationchange' : 'resize';
                var isAndorid = /(Android)/i.test(navigator.userAgent);
                var timer = null;
                function setFontSize(){
                    var w = document.documentElement.clientWidth || document.body.clientWidth;
                    document.documentElement.style.fontSize = 64*w/640 + 'px';
                }
                setFontSize();
                window.addEventListener(shuping, function (){
                    clearTimeout(timer);
                    timer = setTimeout(setFontSize, isAndorid?300:0);
                }, false);