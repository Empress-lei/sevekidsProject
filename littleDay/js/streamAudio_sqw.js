$(function(){
     getSong();
})
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
	var start = audioplaytime["start${kid}"];
	var startCurrentTime = audioplaytime["currentTime${kid}"];
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
var audio = {}
var t;
var linew = $(".audioLine").width();
var sw = $("#drag").width();
function getSong(){
	audio = document.getElementById("audio");
    playCotrol();
    clicks(); 
}
function clicks() {
    $(".playBtn").click(function() {
    	if(!hasAuth){
    		return;
    	}
        if($(this).hasClass("play")) {
            $(this).addClass("pause").removeClass("play");
            audio.play();
            try{
        		$(this).addClass("pause").removeClass("play");
        		dragMove();
            }catch(e){}
        } 
        else {
        	audio.pause();
        	try{
            $(this).addClass("play").removeClass("pause");
            dragMove();
        	 }catch(e){}
        }
    })
    $(".teach").click(function(){
        audio.currentTime = 0;
        audio.play();
        dragMove();
    })
    $(".answer").click(function(){
        var answer = parseInt($(this).attr("data-answer"));
        audio.currentTime = answer;
        audio.play();
        dragMove();
        
    })
}

var noListen = true;
var top_iframe_id;
var audioplaytime = {};

var audioplaytime = {};
function playCotrol() {
    audio.addEventListener("loadeddata",function() {
    			try{
	            var allTime = audio.duration;
	            addListenTouch(); 
    			}catch(e){}
        }, false);
    audio.addEventListener("durationchange",function() {
    			try{
	            addListenTouch(); 
	            var allTime = parseInt(audio.duration);
	            var m = Math.floor(allTime / 60);
	            var s = allTime % 60;
	            if(m<=9){
	                m = "0"+m;
	            }
	            if(s<=9){
	                s = "0"+s;
	            }
	            $(".audioCont .txt2").text(m+":"+s);
    			}catch(e){}
        }, false);
    audio.addEventListener("pause",
        function() {
    			try{
	            $(".playBtn").addClass("ui-play").removeClass("ui-pause");
	            if (audio.currentTime == audio.duration) {
	                audio.pause();
	                audio.currentTime = 0;
	                $(".playBtn").addClass("play").removeClass("pause");
	            }
	            //记录播放时间 什么时候开始 什么时候结束
				uploadPlayTime(audio);
    			}catch(e){}
        }, false);
    audio.addEventListener("play",
        function() {
	try{
            $(".playBtn").addClass("pause").removeClass("play");
            dragMove();
            //上传音频长度
            if($(".topaudioBox .txt2").data("sec")==0){
            	addTimelen(audio);
			}
            //记录播放开始时长
            audioplaytime["currentTime${kid}"] = audio.currentTime;
			//记录播放时间
			var starttime = audioplaytime["start${kid}"];
			if (!starttime) {
				audioplaytime["start${kid}"] = new Date()
						.getTime();
			}
		   top.clearPlay(top_iframe_id);
		   top.fuqiu();  
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
	     }catch(e){}	
        }, false);
}
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
 }
function dragMove() {

    t = setInterval(function() {
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
    }, 500);

}