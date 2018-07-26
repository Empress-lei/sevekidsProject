
	var noListen = true;
	var top_iframe_id;
	var audioplaytime = {};
	var audioplaytime = {};
	
	var playStatusRecord = false;
	
$(function(){
	
    var audio = document.getElementById("audio");
    var t;
    var linew = $(".audioLine").width();
    var sw = $("#drag").width();
    $(".playBtn").click(function() {
        if($(this).hasClass("play")) {
            $(this).addClass("pause").removeClass("play");
            audio.play();
            play(audio);
            addListenTouch();
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
            //播放結束
            if(audio.currentTime==audio.duration){
            	$(".playBtn").addClass("play").removeClass("pause");
                drag.style.left = "0px";
                $(".audioLine .lineaft").width("0px");
                $(".audioCont .txt").text("00:00");
                clearInterval(t);
                audio.currentTime = 0;
                audio.pause();
                if($(".useable").hasClass("useable-active")|| $(".unuseable").hasClass("unuseable-active")){
    		 		//两个点赞或者踩有一个被点击都不出点赞弹框
    		 	}else{
    		 		$(".courseScore").show();
    		 	}
                pause(audio);
            }
        }, 500); 
    }
    
    function addTimelen(audio){
		window.setTimeout(function() {
			if(isNumeric(audio.duration)){
				var duration = audio.duration;
				 if(duration){
					 HH.ajax({
						   waiting:false,
						   url: "/yzmm/account/knowledge/ajaxAddTime",
						   data: {kid:kid,time:duration},
					});
				 }
			}
		}, 2000);
    }
	function uploadPlayTime(audio) {
		//var kid = '${knowledge.id}';
		var start = audioplaytime["start"+kid];
		var startCurrentTime = audioplaytime["currentTime"+kid];
		HH.ajax({
			waiting : false,
			url : "/yzmm/account/knowledge/sqwPlayTime",
			data : {
				kid :kid,
				start : start,
				end : new Date().getTime(),
				duration : audio.duration,
				endCurrentTime : audio.currentTime,
				startCurrentTime : startCurrentTime
			},
		});
	}
	function play(audio){
		
	            $(".playBtn").addClass("pause").removeClass("play");
	            //上传音频长度
	            if($(".topaudioBox .txt2").data("sec")==0){
	            	addTimelen(audio);
				}
	            //记录播放开始时长
	            audioplaytime["currentTime"+kid] = audio.currentTime;
				//记录播放时间
				var starttime = audioplaytime["start"+kid];
				if (!starttime) {
					audioplaytime["start"+kid] = new Date()
							.getTime();
				}
				try{
					top.clearPlay(top_iframe_id);
					top.fuqiu(knowledgeImg); 
				 }catch(e){}	
			   if (noListen) {
					HH.ajax({
						waiting : false,
						url : "/yzmm/account/knowledgeMiaoListen/tolistencount",
						data : {
							knowledgeId : kid
						},
						callback : function(data) {
							//每次点击三千问播放先清空存储对象
							localStorage.clear();
							var x = $(".listen").html();
							x = parseInt(x) + 1;
							$(".listen").html(x+"人看过");
							//三千问id存储在页面
							localStorage.setItem("id",
								kid);
						}
					});
					noListen = false;
				}
	}
	function pause(audio){
		try{
	    $(".playBtn").addClass("ui-play").removeClass("ui-pause");
	    if (audio.currentTime == audio.duration) {
	        audio.currentTime = 0;
	        $(".playBtn").addClass("play").removeClass("pause");
	    }
	    //记录播放时间 什么时候开始 什么时候结束
		uploadPlayTime(audio);
		}catch(e){}
	}
})

