
function playCotrol() {
    audio.addEventListener("loadeddata",function() {
            var allTime = audio.duration;
            addListenTouch(); 
        }, false);
    audio.addEventListener("durationchange",function() {
            addListenTouch(); 
            var allTime = audio.duration;
        }, false);
    audio.addEventListener("pause",
        function() {
            $(".ui-start").addClass("ui-play").removeClass("ui-pause");
            if (audio.currentTime == audio.duration) {
                audio.pause();
                audio.currentTime = 0;
            }
        }, false);
    audio.addEventListener("play",
        function() {
            $(".ui-start").addClass("ui-pause").removeClass("ui-play");
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
    setInterval(function() {
        drag.style.left = (audio.currentTime / audio.duration) * (linew - sw) + "px";
    }, 500);
}