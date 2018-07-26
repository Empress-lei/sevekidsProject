// 测试音频事件
var audio = $('#audio');
console.log(audio);
var playqaobj = "";
var playUrl = $('#audio').src;
var aboveX = 0;
var startX = 0;
var objPlayer = null;
// 创建一个audioEvent
var audioEvent = new audioEvent({
    //在事件方法中回调用
    onStop: function (ct, d, id) {
        alert('onStop');
        //音频播放完之后更改播放按钮的状态
        $(playqaobj, objPlayer).addClass("play").removeClass("pause");
        $(playqaobj, objPlayer).removeClass("active");
        $('.circle', objPlayer).css("left", "0px");
        $(".audioLine .lineaft",objPlayer).width("0px");
        $(".audioCont .txt",objPlayer).text("00:00");
    },
    onPause: function (ct, d, id) {
        // alert('onPause');
    },
    onPlay: function (ct, d, id) {
        // alert('onPlay');
    },
    onMove: function (ct, d) {
        durationchangeTime();
    }
})
console.log(audioEvent);
$(function () {
    $(".audioDiv").on('click', '.playBtn', function () {
        //点击之后，获得匹配选择器的第一个祖先元素，从当前元素开始沿 DOM 树向上。
        objPlayer = $(this).closest('.audioDiv');
        audioClick(this);
        audioEvent.move();
        durationchangeTime();
    });
    addListenTouch(); //这个事件移出点击触发,放入到页面加载完就触发
});
/*
 * 点击播放按钮去判断状态：
 * 1.如果不是对象，直接return
 * 2、判断audioEvent的个数，去控制多个音频之间播放暂停
 * 3、如果这个对象为空的情况下，音频不播放，并且remove掉active这个类名
 * 4、判断audio的src是否为空或者undefined，如果是，则将获取到的data-url的地址赋值给
 *       audio的src，然后根据active去判断按钮的状态，并控制音频的播放暂停
 * 5、多个音频的情况下，点击的时候判断audio的src和获取到的data-url是否一致，一致，直接播放或者暂停，
 *       如果不一致，则将获取到的data-url的值赋值给audio的src上进行切换
 * */
function audioClick(obj) {
    audioEvent.create();
    if (!obj) {
        return;
    }
    var self = $(obj);
    console.log(self);
    var url = self.data("url");
    console.log(url);
    console.log(this);
    console.log(self);
    if ($(audioEvent).size()) {
        $(audioEvent).get(0).pause();
        $(playqaobj).removeClass("pause");
        $(playqaobj).addClass("play");
    } else {
        $(audioEvent).get(0).play();
        $(playqaobj).removeClass("play");
        $(playqaobj).addClass("pause");
    }
    //如果这个对象为空的情况下，音频不播放，并且remove掉active这个类名
    if (playqaobj) {
        if (obj != playqaobj) {
            audioEvent.pause();
            $(playqaobj).removeClass("active");
        }
    }
    //判断点击按钮这个标签上有没有active
    if (audioEvent.src() == "" || audioEvent.src() == "undefined") {
        playUrl = url;
        audioEvent.setSrc(playUrl);
        if (!$(playqaobj).hasClass("active")) {
            alert("-------播放--------")
            console.log(audioEvent.src);
            //有则添加暂停按钮，删除播放按钮，音频播放，按钮可以拖拽，增加active类名
            playqaobj = obj;
            console.log($(playqaobj));
            $(playqaobj).addClass("pause").removeClass("play");
            $(playqaobj).addClass("active");
            audioEvent.play();
        }
    } else {
        if (self.data("url") != playUrl) {
            playUrl = url;
            audioEvent.setSrc(playUrl);
            if (!$(playqaobj).hasClass("active")) {
                alert("-------播放--------")
                console.log(audioEvent.src);
                //有则添加暂停按钮，删除播放按钮，音频播放，按钮可以拖拽，增加active类名
                playqaobj = obj;
                console.log($(playqaobj));
                $(playqaobj).addClass("pause").removeClass("play");
                $(playqaobj).addClass("active");
                audioEvent.play();
            } else {
                alert("-------暂停--------")
                $(playqaobj).addClass("play").removeClass("pause");
                $(playqaobj).removeClass("active");
                audioEvent.pause();

            }
        } else {
            if (!$(playqaobj).hasClass("active")) {
                alert("-------播放--------")
                console.log(audioEvent.src);
                //有则添加暂停按钮，删除播放按钮，音频播放，按钮可以拖拽，增加active类名
                playqaobj = obj;
                console.log($(playqaobj));
                $(playqaobj).addClass("pause").removeClass("play");
                $(playqaobj).addClass("active");
                audioEvent.play();
            } else {
                alert("-------暂停--------")
                $(playqaobj).addClass("play").removeClass("pause");
                $(playqaobj).removeClass("active");
                audioEvent.pause();
            }
        }
    }
    console.log(audioEvent.src);
    console.log(playUrl);
    console.log(audioEvent);
    $('.circle').css("left", "0px");
    $(".audioLine .lineaft").width("0px");
    $(".audioCont .txt").text("00:00");
}
/*
 * 监听进度条上的小圆点的拖拽事件
 * e.preventDefault   阻止元素的默认行为
 * touch.pageX    去计算手指在页面上的位置
 * drag.style.left  小圆点向左移动
 * */
function addListenTouch() {
    $(".circle").on("touchstart", function(e){
        e.preventDefault();
        var touch = e.originalEvent.targetTouches[0];//e.touches[0];
        //console.log(touch);
        startX = touch.pageX;
        //console.log(startX);
        aboveX = parseInt($(this).position().left);
    }).on("touchmove", function(e){
        e.preventDefault();
        var player=$(this).closest('.audioDiv');
        //console.log(e);
        var touch =  e.originalEvent.targetTouches[0]; //e.touches[0];
        //获取进度条的宽度
        var linew = $(".audioLine",player).width();
        //获取进度条上面的小圆点的宽度
        var sw = $(".circle",player).width();
        x = touch.pageX - startX;
        if (aboveX + x + sw < linew && aboveX + x > 0) {
            $('.circle', player).css('left', aboveX + x + "px");
            $(".audioLine .lineaft",player).width((aboveX + x));
            var ctime = parseInt((aboveX + x) / (linew - sw) * audioEvent.getDuration());
            var m = Math.floor(ctime / 60);
            var s = ctime % 60;
            if (m <= 9) {
                m = "0" + m;
            }
            if (s <= 9) {
                s = "0" + s;
            }
            $(".audioCont .txt", player).text(m + ":" + s);
            $(player).data('pause', ctime);
        }
    }).on("touchend", function(e){
        e.preventDefault();
        var player = $(this).closest('.audioDiv');
        var linew = $(".audioLine",player).width();
        var sw = $(".circle",player).width();
        aboveX = parseInt($(".circle",player).position().left);
        var touch = e.originalEvent.targetTouches[0]; //e.touches[0];
        var dragPaddingLeft = $('.circle', player).position().left;
        numDragpaddingLeft = parseInt(dragPaddingLeft);
        var currentTime = (numDragpaddingLeft / (linew - sw)) * audioEvent.getDuration();
        // //console.log(currentTime);
        audioEvent.setCurrentTime(currentTime);
        //音频暂停，如果拖拽播放，改变播放按钮的状态
        $('.playBtn',player).addClass("pause").removeClass("play");
        audioEvent.play();
        audioEvent.move();
        durationchangeTime();
    });
}
//设置圆点拖动的进度，以及时间的格式
function durationchangeTime() {
    try {
        //进度条上的小圆点的位置
        var linew = $(".audioLine",objPlayer).width();
        var sw = $(".circle",objPlayer).width();
        //获取当前时长
        var current = audioEvent.getCurrentTime();
        // console.log(current);
        //获取总时长
        var duration = audioEvent.getDuration();
        //设置小圆点的位置：（当前时间 / 总时长）* （进度条的宽度 - 小圆点的宽度）
        $('.circle', objPlayer).css('left', (current / duration) * (linew - sw) + "px");
        console.log($('.circle', objPlayer).css('left'));
        //进度条的宽度：（当前时间 / 总时长）* （进度条的宽度 - 小圆点的宽度）
        $(".lineaft",objPlayer).width((current / duration) * (linew - sw));
        // console.log(audioEvent.setCurrentTime());
        var currnetTime = parseInt(audioEvent.getCurrentTime());
        // console.log(currnetTime);
        //设置当前进度的时间格式
        var m = Math.floor(currnetTime / 60);
        var s = currnetTime % 60;
        if (m <= 9) {
            m = "0" + m;
        }
        if (s <= 9) {
            s = "0" + s;
        }
        $(".audioCont .txt",objPlayer).text(m + ":" + s);
    } catch (e) {}
}





