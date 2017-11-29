
$(document).ready(function () {
    (genClips = function () {
        $t = $('.item1');
        var amount = 8;
        var width = $t.width() / amount;
        var height = $t.height() / amount;
        var totalSquares = Math.pow(amount, 2);
        var y = 0;
        var index = 1;
        for (var z = 0; z <= (amount * width) ; z = z + width) {
            $('<img class="clipped" src="/res/img/money/m' + index + '.png" />').appendTo($('.item1 .clipped-box'));
            if (z === (amount * width) - width) {
                y = y + height;
                z = -width;
            }
            if (index >= 5) {
                index = 1;
            }
            index++;
            if (y === (amount * height)) {
                z = 9999999;
            }
        }
    })();
    
    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var first = false,
        clicked = false;
    // On click
    //$('.item1 div.kodai').on('click', function () {
    function moneyEffect(){
    	setTimeout(function(){
        $('.item1 .clipped-box').css({
            'display': 'block'
        });
        $('.clipped-box img').each(function () {
            var v = rand(10, 80),
                angle = rand(80, 89), 
                theta = (angle * Math.PI) / 180, 
                g = -9.8; 

            // $(this) as self
            var self = $(this);
            var t = 0,
                z, r, nx, ny,
                totalt =10;
            var negate = [1, -1, 0],
                direction = negate[Math.floor(Math.random() * negate.length)];

            var randDeg = rand(-5, 10),
                randScale = rand(0.9, 1.1),
                randDeg2 = rand(30, 5);

            // And apply those
            $(this).css({
                'transform': 'skew(' + randDeg + 'deg) rotateZ(' + randDeg2 + 'deg)'
            });

            // Set an interval
            z = setInterval(function () {
                var ux = (Math.cos(theta) * v) * direction;
                var uy = (Math.sin(theta) * v) - ((-g) * t);
                nx = (ux * t);
                ny = (uy * t) + (0.25 * (g) * Math.pow(t, 2));
                if (ny < -140) {
                    ny = -140;
                }
                //$("#html").html("g:" + g + "bottom:" + ny + "left:" + nx + "direction:" + direction);
                $(self).css({
                    'bottom': (ny) + 'px',
                    'left': (nx) + 'px'
                });
                // Increase the time by 0.10
                t = t + 0.10;

                //����ѭ��
                if (t > totalt) {
                    clicked = false;
                    first = true;
                    clearInterval(z);
                }
            }, 20);
        });
        setTimeout(function(){
        	$(".main").fadeOut(3000);
        },3000)
    },1000);
    }
    //});
   // moneyEffect();
    $(".payover").click(function(){
    	$(".main").show().addClass("moneyActive");
    	moneyEffect();
    });
});
