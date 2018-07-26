var i=0;
var playqaobj = " ";
var qaaudio;
$(function(){
    //有用
    $(".useable").click(function(){
        $(".useable span").addClass("oraSpan")
        $(".useable p").addClass("useableOra")
        $(".useable").find("i").show().animate({"top":"-15px"},400,function(){
            $(".useable i").fadeOut();
        })
    });
    //无用
    $(".unuseable").click(function(){
        $(".unuseable").find("i").show().animate({"bottom":"-15px"},400,function(){
            $(".unuseable i").fadeOut();
        })
    });
    setInterval('gaibian()',1000);
    //课程详情页
    //打卡成功提示
    $(".classNav .navListBtn").click(function(){
        $(".purchaseShare").fadeIn();
    });
    $(".purchaseShare .wrongBtn").click(function(){
        $(".purchaseShare").fadeOut();
    });
    //点击主题课的播放按钮
    var agent = navigator.userAgent;
    //点击播放按钮的主题课，向下滑动，底部音频展示的固定位置隐藏
    //向上滑动，底部音频展示的固定位置显示
    $("#playBtn1").click(function(){
        $(".audioFixed").fadeIn();
        if (/.*Firefox.*/.test(agent)) {
            document.addEventListener("DOMMouseScroll", function(e) {
                e = e || window.event;
                var detail = e.detail;
                if (detail > 0) {
                    console.log("鼠标向下滚动");
                    $(".audioFixed").fadeOut();
                } else {
                    console.warn("鼠标向上滚动");
                    $(".audioFixed").fadeIn();
                }
            });
        } else {
            document.onmousewheel = function(e) {
                e = e || window.event;
                var wheelDelta = e.wheelDelta;
                if (wheelDelta > 0) {
                    console.log("鼠标向上滚动");
                    $(".audioFixed").fadeIn();

                } else {
                    console.warn("鼠标向下滚动");
                    $(".audioFixed").fadeOut();
                }
            }
        }
    });
    //点击“底部音频展示的固定位置”右边的箭头
    $(".audioFixed .topArr").click(function() {
        $(".exhibitionBox").slideUp();
        $(".hideBox").slideDown();
        $(".audioFixed").fadeOut();
    });
    //点击显示主题课音频的单独页面上的箭头
    $(".hideBox .lowerArr").click(function() {
        $(".hideBox").slideUp();
        $(".exhibitionBox").slideDown();
        $(".audioFixed").fadeIn();
    });
    //点击“底部音频展示的固定位置”左边的小X号，底部音频展示消失
    $(".audioFixed .wrongGray").click(function() {
        $(".audioFixed").fadeOut();
    });
})
//左右摇摆
function gaibian(){
    if(i==0){
        i=1;
        $(".redBox").removeClass("zhuan_left");
        $(".redBox").addClass("zhuan_right");
    }else{
        i=0;
        $(".redBox").addClass("zhuan_left");
        $(".redBox").removeClass("zhuan_right");
    }
}



