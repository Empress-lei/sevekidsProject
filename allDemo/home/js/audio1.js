var noListen = true;
var top_iframe_id;
var audioplaytime = {};
var audioplaytime = {};
var playStatusRecord = false;
//设置变量
var topicCid="cfe7486d";
var agent = navigator.userAgent;
var eScroll = $(window).scrollTop();
var temp =10.5;
console.log(eScroll);
$(function(){
    //获取到音频的标签
    var audio = document.getElementById("audio");
    console.log(audio);
    var t;
    //获取播放器中的一个长横线的宽度
    var linew = $(".audioLine").width();
    console.log(linew);
    //获取上面的小圆点
    var sw = $("#drag").width();
    console.log(sw);

    $(".classAudio .playBtn").click(function() {
        $(".audioFixed").fadeIn();

        //判断按钮有没有play，有就添加pause,移除play
        if($(this).hasClass("play")) {
            $(this).addClass("pause").removeClass("play");
            $(".hideBox .playBtn").addClass("pause").removeClass("play");
            $('.audioFixed .divGray').addClass("pauseGray").removeClass("playGray");
            if($("#qaaudio").length > 0) {
                $("#qaaudio").get(0).pause();
                $(playqaobj).removeClass("active");
            };

            audio.play();
            play(audio);
            addListenTouch();
            dragMove();
            playStatusRecord = true;
            $(".audioFixed .wrongGray").fadeOut();

        }
        else {
            $(this).addClass("play").removeClass("pause");
            $(".hideBox .playBtn").addClass("play").removeClass("pause");
            $('.audioFixed .divGray').addClass("playGray").removeClass("pauseGray");
            clearInterval(t);
            audio.pause();
            pause(audio);
            $(".audioFixed .wrongGray").fadeIn();
        }
        var new_scroll_position = 0;
        var last_scroll_position;
        var header = document.getElementById("audioFixed");
        window.addEventListener('scroll', function(e) {
            last_scroll_position = window.scrollY;
            // Scrolling down
            if (new_scroll_position < last_scroll_position && last_scroll_position > 80) {
                // header.removeClass('slideDown').addClass('slideUp');
                header.classList.remove("slideDown");
                header.classList.add("slideUp");

                // Scrolling up
            } else if (new_scroll_position > last_scroll_position) {
                // header.removeClass('slideUp').addClass('slideDown');
                header.classList.remove("slideUp");
                header.classList.add("slideDown");
            }

            new_scroll_position = last_scroll_position;
        });
    })
    $(".hideBox .playBtn").click(function() {
        //判断按钮有没有play，有就添加pause,移除play
        if($(this).hasClass("play")) {
            $(this).addClass("pause").removeClass("play");
            $('.classAudio .playBtn').addClass("pause").removeClass("play");
            $('.audioFixed .divGray').addClass("pauseGray").removeClass("playGray");
            audio.play();
            play(audio);
            addListenTouch();
            dragMove();
            playStatusRecord = true;
            if($("#qaaudio").length > 0) {
                $("#qaaudio").get(0).pause();
                $(playqaobj).removeClass("active");
            };
        }
        else {
            $(this).addClass("play").removeClass("pause");
            $('.classAudio .playBtn').addClass("play").removeClass("pause");
            $('.audioFixed .divGray').addClass("playGray").removeClass("pauseGray");
            $(".audioFixed .wrongGray").hide();
            clearInterval(t);
            audio.pause();
            pause(audio);
        }
    })
    function addListenTouch() {
        document.getElementById("drag").addEventListener("touchstart", touchStart, false);
        document.getElementById("drag").addEventListener("touchmove", touchMove, false);
        document.getElementById("drag").addEventListener("touchend", touchEnd, false);
    }
    var aboveX;
    function touchStart(e) {
        e.preventDefault();
        var touch = e.touches[0];
        startX = touch.pageX;
        aboveX = parseInt(drag.style.left);
    }
    function touchMove(e) {
        e.preventDefault();
        var touch = e.touches[0];
        x = touch.pageX - startX;
        if(aboveX+x+sw<linew && aboveX+x>0){
            audio.pause();
            clearInterval(t);
            drag.style.left = aboveX + x + "px";
            $(".audioLine .lineaft").width((aboveX + x));
            var ctime = parseInt((aboveX + x) / (linew-sw) * audio.duration);
            var m = Math.floor(ctime / 60);
            var s = ctime % 60;
            if(m<=9){
                m = "0"+m;
            }
            if(s<=9){
                s = "0"+s;
            }
            $(".audioCont .txt").text(m+":"+s);
        }
    }
    function touchEnd(e) {
        e.preventDefault();
        aboveX = parseInt(drag.style.left);
        var touch = e.touches[0];
        var dragPaddingLeft = drag.style.left;
        var change = dragPaddingLeft.replace("px", "");
        numDragpaddingLeft = parseInt(change);
        var currentTime = (numDragpaddingLeft / (linew - sw)) * audio.duration;
        audio.currentTime = currentTime;
        audio.play();
        dragMove();
    }
    function dragMove(){
        t = setInterval(function() {
            //已經点击播放按鈕(一次),播放状态,音频加完毕,网络传输事件隔离
            if(playStatusRecord && !audio.paused && audio.readyState == 4){
                play(audio);
                playStatusRecord = false;
            }
            drag.style.left = (audio.currentTime / audio.duration) * (linew - sw) + "px";
            $(".audioLine .lineaft").width((audio.currentTime / audio.duration) * (linew - sw));
            var currnetTime = parseInt(audio.currentTime);
            var m = Math.floor(currnetTime / 60);
            var s = currnetTime % 60;
            if(m<=9){
                m = "0"+m;
            }
            if(s<=9){
                s = "0"+s;
            }
            $(".audioCont .txt").text(m+":"+s);
            //播放結束   currentTime音频播放的当前时间==duration音频播放的方向
            if(audio.currentTime==audio.duration){
                $(".playBtn").addClass("play").removeClass("pause");
                drag.style.left = "0px";
                $(".audioLine .lineaft").width("0px");
                $(".audioCont .txt").text("00:00");
                clearInterval(t);
                audio.currentTime = 0;
                audio.pause();
                pause(audio);
            }
        }, 500);
    }

    function play(audio){
        $(".playBtn").addClass("pause").removeClass("play");
        //上传音频长度
        if($(".topaudioBox .txt2").data("sec")==0){
        }
        //记录播放开始时长
        audioplaytime["currentTime"+topicCid] = audio.currentTime;
        //记录播放时间
        var starttime = audioplaytime["start"+topicCid];
        if (!starttime) {
            audioplaytime["start"+topicCid] = new Date()
                .getTime();
        }

    }
    function pause(audio){
        try{
            $(".playBtn").addClass("ui-play").removeClass("ui-pause");
            if (audio.currentTime == audio.duration) {
                audio.currentTime = 0;
                $(".playBtn").addClass("play").removeClass("pause");
            }
        }catch(e){}
    }
})
