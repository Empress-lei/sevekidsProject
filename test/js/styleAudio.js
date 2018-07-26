// 测试音频事件
var audio = $('#audio');
console.log(audio);
var playUrl = $(".playBtn").data("url");
var playqaobj = "";
var audioEvent = new audioEvent({
    //在事件方法中回调用
    onStop: function (ct, d, id) {
        alert('onStop');
        //音频播放完之后更改播放按钮的状态
        $(playqaobj).addClass("play").removeClass("pause");
        $(playqaobj).removeClass("active");
        drag.style.left = "0px";
        $(".audioLine .lineaft").width("0px");
        $(".audioCont .txt").text("00:00");
    },
    onPause: function (ct, d, id) {
        // alert('onPause');
    },
    onPlay: function (ct, d, id) {
        // alert('onPlay');
    },
    onMove: function (ct, d, id){
        durationchangeTime();
    },
    src: playUrl,
    id: audio,
})
console.log(audioEvent);
//点击播放按钮去判断状态
function audioClick(obj) {
    if (!obj) {
        return;
    }
    var self = $(obj);
    console.log(self);
    if($(audioEvent).size()){
        $(audioEvent).get(0).pause();
        $(".playBtn").removeClass("pause");
        $(".playBtn").addClass("play");
    }else {
        $(audioEvent).get(0).play();
        $(".playBtn").removeClass("play");
        $(".playBtn").addClass("pause");
    }
    var url = self.data("url");
    console.log(url);
    console.log(audioEvent);
    //如果这个对象为空的情况下，音频不播放，并且remove掉active这个类名
    if (playqaobj) {
        if (obj != playqaobj) {
            audioEvent.pause();
            $(playqaobj).removeClass("active");
        }
    }
    playqaobj = obj;
    console.log($(playqaobj));
    playUrl = url;
    console.log(playUrl);
    // audioEvent.myaudio.src = playUrl;
    audioEvent.setSrc(playUrl);
    //判断点击按钮这个标签上有没有active
    if (!$(playqaobj).hasClass("active")) {
        //有则添加暂停按钮，删除播放按钮，音频播放，按钮可以拖拽，增加active类名
        $(playqaobj).addClass("pause").removeClass("play");
        audioEvent.play();
        $(playqaobj).addClass("active");
        addListenTouch();
        durationchangeTime();
        audioEvent.move();
        playStatusRecord = true;
    } else {
        //没有则添加播放按钮，删除暂停按钮，并且音频暂停，删除active类名
        $(playqaobj).addClass("play").removeClass("pause");
        audioEvent.pause();
        $(playqaobj).removeClass("active");
    }
}
//监听进度条上的小圆点的拖拽事件
function addListenTouch() {
    try {
        document.getElementsByClassName("circle")[0].addEventListener("touchstart", touchStart, false);
        document.getElementsByClassName("circle")[0].addEventListener("touchmove", touchMove, false);
        document.getElementsByClassName("circle")[0].addEventListener("touchend", touchEnd, false);
    } catch (e) {
    }
}
var aboveX;
//开始拖拽
function touchStart(e) {
    e.preventDefault();
    var touch = e.touches[0];
    console.log(touch);
    startX = touch.pageX;
    console.log(startX);
    aboveX = parseInt(drag.style.left);
    console.log(aboveX);
}
//拖拽移动
function touchMove(e) {
    e.preventDefault();
    console.log(e);
    var touch = e.touches[0];
    var linew = $(".audioLine").width();
    var sw = $("#drag").width();
    x = touch.pageX - startX;
    if (aboveX + x + sw < linew && aboveX + x > 0) {
        audioEvent.pause();
        drag.style.left = aboveX + x + "px";
        $(".audioLine .lineaft").width((aboveX + x));
        var ctime = parseInt((aboveX + x) / (linew - sw) * audioEvent.setDuration());
        var m = Math.floor(ctime / 60);
        var s = ctime % 60;
        if (m <= 9) {
            m = "0" + m;
        }
        if (s <= 9) {
            s = "0" + s;
        }
        $(".audioCont .txt").text(m + ":" + s);
    }
}
//拖拽结束
function touchEnd(e) {
    e.preventDefault();
    var linew = $(".audioLine").width();
    var sw = $("#drag").width();
    aboveX = parseInt(drag.style.left);
    var touch = e.touches[0];
    var dragPaddingLeft = drag.style.left;
    console.log(dragPaddingLeft);
    var change = dragPaddingLeft.replace("px", "");
    numDragpaddingLeft = parseInt(change);
    var currentTime = (numDragpaddingLeft / (linew - sw)) * audioEvent.setDuration();
    console.log(currentTime);
    // audioEvent.myaudio.currentTime = currentTime;
    audioEvent.setCurrentTime(currentTime);
    //音频暂停，如果拖拽播放，改变播放按钮的状态
    $(playqaobj).addClass("pause").removeClass("play");
    audioEvent.play();
    // audioEvent.move();
}
//设置圆点拖动的进度，以及时间的格式
function durationchangeTime() {
    try {
        //进度条上的小圆点的位置
        var linew = $(".audioLine").width();
        var sw = $("#drag").width();
        //获取当前时长
        var current = audioEvent.setCurrentTime();
        console.log(current);
        //获取总时长
        var duration = audioEvent.setDuration();
        console.log(duration);
        //设置小圆点的位置
        drag.style.left = (current / duration) * (linew - sw) + "px";
        console.log(drag.style.left);
        $(".lineaft").width((current / duration) * (linew - sw));
        console.log(audioEvent.setCurrentTime());
        var currnetTime = parseInt(audioEvent.setCurrentTime());
        console.log(currnetTime);
        //设置当前进度的时间格式
        var m = Math.floor(currnetTime / 60);
        var s = currnetTime % 60;
        if (m <= 9) {
            m = "0" + m;
        }
        if (s <= 9) {
            s = "0" + s;
        }
        $(".audioCont .txt").text(m + ":" + s);
    } catch (e) {
    }
};



