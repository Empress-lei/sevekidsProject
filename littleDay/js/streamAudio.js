$(function(){
     getSong();
})
var audio = document.getElementById("audio");
var t;
var linew = $(".audioLine").width();
var sw = $("#drag").width();
function getSong(){
    playCotrol();
    clicks();
}
function clicks() {
    $(".playBtn").click(function() {
        //audio.pause();
        //audio.currentTime = 0.0;
        //$(".voicemsg").find(".voicebar").removeClass("active");
        if($(this).hasClass("play")) {
            $(this).addClass("pause").removeClass("play");
            audio.play();
            dragMove();
        } 
        else {
            $(this).addClass("play").removeClass("pause");
            audio.pause();
            dragMove();
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

function playCotrol() {
    audio.addEventListener("loadeddata",function() {
            var allTime = audio.duration;
            addListenTouch(); 
        }, false);
    audio.addEventListener("durationchange",function() {
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
        }, false);
    audio.addEventListener("pause",
        function() {
    		//暂停触发弹框
    		if(audio.currentTime>stopPayTime){
    			//检查是否需要弹框 JS在course_score.js
            	courseScore();
    		}
    		//答疑阶段触发弹框
    		if(!answerShow){
            	courseScore();
    		}
            $(".playBtn").addClass("ui-play").removeClass("ui-pause");
            if (audio.currentTime == audio.duration) {
            	
            	courseScore();
            	
                audio.pause();
                audio.currentTime = 0;
                $(".playBtn").addClass("play").removeClass("pause");
            }
        }, false);
    audio.addEventListener("play",
        function() {
            $(".playBtn").addClass("pause").removeClass("play");
            dragMove();
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
var answerShow=true;//答疑弹框
function dragMove() {
    t = setInterval(function() {
        drag.style.left = (audio.currentTime / audio.duration) * (linew - sw) + "px";
        $(".audioLine .lineaft").width((audio.currentTime / audio.duration) * (linew - sw));
        var currnetTime = parseInt(audio.currentTime);
        var m = Math.floor(currnetTime / 60);
        var s = currnetTime % 60;
        //进入答疑阶段弹评星框
        if(audio.currentTime>$('.answer').data('answer')&&answerShow){
        	answerShow=false;
        	//检查是否需要弹框 JS在course_score.js
        	courseScore();
        }
        if(m<=9){
            m = "0"+m;
        }
        if(s<=9){
            s = "0"+s;
        }
        $(".audioCont .txt").text(m+":"+s);
    }, 500);

}