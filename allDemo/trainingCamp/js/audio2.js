var audioPlayer=function(i){
	var noListen = true;
	var top_iframe_id;
	var audioplaytime = {};
	var audioplaytime = {};
	var playStatusRecord = false;
	//设置变量
	var topicCid="cfe7486d"+i;
	var drag;
	var t;
	var btnPlay=$(".audioDiv #playBtn"+i);
	var line=$("#audioLine" + i);
	var inds=i;
    var audio = document.getElementById("audio" + i);
    var drag= document.getElementById("drag" +i);
	btnPlay.click(function() {
		var muns=$(".audio").length;
        for (var j = 1; j <muns+1; j++) {
            if (inds!=j){
                document.getElementById("audio" + j).pause();
                pause(document.getElementById("audio" + j));
                document.getElementById("drag" + j).style.left = "0px";
                $("#audioLine"+j+" .lineaft").width("0px");
                $("#timeNum"+j+" .txt").text("00:00");
                clearInterval(t);
                //2017-08-28下午18:30隐藏了
                document.getElementById("audio" + j).currentTime = 0;
                document.getElementById("audio" + j).pause();
                pause(audio);
                $(".playBtn").eq(j-1).removeClass("pause").addClass("play");
            }else{
                dragMove();
            }
        }
		//获取播放器中的一个长横线的宽度
    	linew = line.width();
    	//获取进度条上的小圆点
    	sw = $("#drag" + i).width();
    	//判断按钮有没有play，有就添加pause,移除play
        if($(this).hasClass("play")) {
            $(this).addClass("pause").removeClass("play");
            audio.play();
            play(audio);
//			drag.addEventListener("touchstart", touchStart, false);
//			drag.addEventListener("touchmove", touchMove, false);
//			drag.addEventListener("touchend", touchEnd, false);
            dragMove();
            playStatusRecord = true;
        }
        else {
            $(this).addClass("play").removeClass("pause");
            clearInterval(t);
            audio.pause();
            pause(audio);
        }
	})
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
            $("#audioLine"+i+" .lineaft").width((aboveX + x));
            var ctime = parseInt((aboveX + x) / (linew-sw) * audio.duration);
            var m = Math.floor(ctime / 60);
            var s = ctime % 60;
            if(m<=9){
                m = "0"+m;
            }
            if(s<=9){
                s = "0"+s;
            }
            $("#audioCont"+i+" .txt").text(m+":"+s);
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
    function dragMove(playBtn){
        t = setInterval(function() {
            //已經点击播放按鈕(一次),播放状态,音频加完毕,网络传输事件隔离
            if(playStatusRecord && !audio.paused && audio.readyState == 4){
                play(audio);
                playStatusRecord = false;
            }
                drag.style.left = (audio.currentTime / audio.duration) * (linew - sw) + "px";
                $("#audioLine"+i+" .lineaft").width((audio.currentTime / audio.duration) * (linew - sw));
                var currnetTime = parseInt(audio.currentTime);
                var m = Math.floor(currnetTime / 60);
                var s = currnetTime % 60;
                if(m<=9){
                    m = "0"+m;
                }
                if(s<=9){
                    s = "0"+s;
                }

            $("#timeNum"+i+" .txt").text(m+":"+s);
            //播放結束   currentTime音频播放的当前时间==duration音频播放的方向
            if(audio.currentTime==audio.duration){
                $(".playBtn").addClass("play").removeClass("pause");
                drag.style.left = "0px";
                $("#audioLine"+i+" .lineaft").width("0px");
                $("#timeNum"+i+" .txt").text("00:00");
                clearInterval(t);
                audio.currentTime = 0;
                audio.pause();
                pause(audio);
            }
        }, 500);
    }
    function play(audio){
		// console.log("play--i="+i);
        $("#playBtn"+i).addClass("pause").removeClass("play");
        //上传音频长度
        if($("#timeNum"+i+" .txt2").data("sec")==0){
        }
        //记录播放开始时长
        audioplaytime["currentTime"+topicCid] = audio.currentTime;
        //记录播放时间
        var starttime = audioplaytime["start"+topicCid];
        if (!starttime) {
            audioplaytime["start"+topicCid] = new Date().getTime();
        }

    }
    function pause(audio){
			// console.log("pause--i="+i);
        try{
            $("#playBtn"+i).addClass("ui-play").removeClass("ui-pause");
            if (audio.currentTime == audio.duration) {
                audio.currentTime = 0;
                $("#playBtn"+i).addClass("play").removeClass("pause");
            }
            //记录播放时间 什么时候开始 什么时候结束
            uploadPlayTime(audio);
        }catch(e){}
    }
    function offall(drags,line,mun){
        drags.style.left = "0px";
        // $("#audioLine"+i+" .lineaft").width("0px");
        // $("#timeNum"+i+" .txt").text("00:00");
        $(line).width("0px").unbind();
        $(mun).text("00:00").unbind();
        clearInterval();
    }
}

