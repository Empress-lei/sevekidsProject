var i=0;
//记录文本框中的字数
function fn() {
    var len = $(".font13 textarea").val().length;
    $(".font13 p span").text(len);
}
function vfn() {
    var len = $(".font13 textarea").val().length;
    if(len < 10) {
        toast("至少输入10个字符");
        return false;
    }
}
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
    //点击播放按钮的主题课，向下滑动，底部音频展示的固定位置隐藏
    //向上滑动，底部音频展示的固定位置显示
    $("#playBtn").click(function(){
        $(".audioFixed").fadeIn();
    });
    //点击“底部音频展示的固定位置”右边的箭头
    $(".audioFixed .topArr").click(function() {
        $(".exhibitionBox").fadeOut();
        $(".hideBox").fadeIn();
        $(".classNav").hide();
        $(".classNavPresen").show();
        $(".audioFixed").fadeOut();
        var new_scroll_position = 0;
        var last_scroll_position;
        var header = document.getElementById("audioFixed");
        window.addEventListener('scroll', function(e) {
            last_scroll_position = window.scrollY;
            if (new_scroll_position < last_scroll_position && last_scroll_position > 80) {
                header.classList.remove("slideDown");
                header.classList.add("slideDown");
            } else if (new_scroll_position > last_scroll_position) {
                header.classList.remove("slideDown");
                header.classList.add("slideDown");
            }
            new_scroll_position = last_scroll_position;
        });
    });
    //点击显示主题课音频的单独页面上的箭头
    $(".hideBox .lowerArr").click(function() {
        $(".hideBox").fadeOut();
        $(".exhibitionBox").fadeIn();
        $(".audioFixed").fadeIn();
        $(".classNav").show();
        $(".classNavPresen").hide();
        var new_scroll_position = 0;
        var last_scroll_position;
        var header = document.getElementById("audioFixed");
        window.addEventListener('scroll', function(e) {
            last_scroll_position = window.scrollY;
            if (new_scroll_position < last_scroll_position && last_scroll_position > 80) {
                header.classList.remove("slideDown");
                header.classList.add("slideUp");
            } else if (new_scroll_position > last_scroll_position) {
                header.classList.remove("slideUp");
                header.classList.add("slideDown");
            }
            new_scroll_position = last_scroll_position;
        });
    });
    //点击“底部音频展示的固定位置”左边的小X号，底部音频展示消失
    $(".audioFixed .wrongGray").click(function() {
        $(".audioFixed").fadeOut();
    });
    //打赏弹层选择
    $('.btnEvaluate li').click(function() {
        if($(this).hasClass('rewardOran')) {
            $(this).removeClass('rewardOran');
        } else {
            $(this).addClass('rewardOran').siblings('li').removeClass('rewardOran');
        }
    });
    //点击打赏弹层上的再想想页面消失
    $(".rewardShare .think").click(function() {
        $(".rewardShare").fadeOut();
    });
    //点击导航上的打赏，显示弹层
    $(".rewardText").click(function() {
        $(".rewardShare").fadeIn();
    });
    //点击导航上的留言出现留言页
    $(".messText").click(function() {
        // return;
        $(".classNav").hide();
        $(".blackBack").hide();
        //增加聚焦效果
        $(".messPage").show();
        $(".mySearchTitle").focus();
    });
    //点击留言页的“取消按钮”，页面消失
    $(".cancelCont").click(function() {
        $(".messPage").hide();
        $(".classNav").show();
    });
    //点击留言页的“提交按钮”，页面消失
    //点击留言页的“提交按钮”，页面消失
    $(".submitCont").click(function() {
        $(".messPage").hide();
        $(".classDetails").show();
        $(".classNav").show();
        $(".blackBack").show();
    });
    //点击精选留言旁边的“写留言”出现留言页
    $(".askRecommend .messBtn").click(function() {
        $(".classNav").hide();
        $(".blackBack").hide();
        $(".messPage").show();
        //增加聚焦效果
        $(".mySearchTitle").focus();
    });
    //点击“收藏”，显示朦层
    var collecImg = "./img/classNav/collOra.png";
    $(".navList1").click(function() {
        if($(this).hasClass('collection')) {
            $(this).addClass('collectionOran').removeClass('collection');
            $('.collecShare').show().fadeOut(2000);
            $(this).find('img').attr('src', collecImg);
        }
    });
    //搜索页
    $(".cancelImgDiv2").click(function(){
        $(".keyword").val("");
        $(".keyword1").val("");
        $(".cancleBtn").show();
        $(".submitShow").hide();
        $(".cancelImgDiv2").hide();
    });
    //点击搜索框上面的搜索两个字
    $(".submitShow").click(function() {
        $(".searchList").hide();
        $("#relevantList").fadeIn();
    });
    //搜索页点击留言记录每一项的X号
    $(".clearImg").click(function() {
        $(this).parent().hide();
    });
    //点击全部清空，将搜索记录全部清空
    $(".clearAll").click(function() {
        $(".listClear").parent().parent().hide();
    });
    //点击更多内容
    $(".moreCont").click(function() {
        $("#relevantList").hide();
        $(".leftArrow").show();
        $(".moreClassList").fadeIn();
        $(".searchTxt").css("width","80%");
    });
    //点击文稿显示文稿页
    $(".classNavPresen .presenLeft").click(function() {
        $(".exhibitionBox").show();
        $(".classNavPresen").hide();
        $(".hideBox").hide();
        $(".classNav").show();
    });
    //点击回退
    $(".leftArrow").click(function() {
        $(".moreClassList").hide();
        $(".leftArrow").hide();
        $(".searchItem").fadeIn();
        $("#relevantList").fadeIn();
        $(".searchTxt").css("width","85%");
    });
    //我的留言显示隐藏效果
    $(".messageBtn").click(function() {
        $(this).hide();
        $(".contentTopBor").fadeIn();
        $(".messageStop").fadeIn();
    });
    $(".messageStop").click(function() {
        $(this).hide();
        $(".contentTopBor").hide();
        $(".messageBtn").fadeIn();
    });
    //查看更多精选留言
    $(".showLeav .lookMoreContent1").click(function() {
        $(this).hide();
        $(".showLeav .messShare").hide();
        $(".showLeav .messShow").fadeIn();
        $(".showLeav .messShow").fadeIn();
        $(".showLeav .hideContent1").fadeIn();
    });
    $(".showLeav .hideContent1").click(function() {
        $(this).hide();
        $(".showLeav .messShare").show();
        $(".showLeav .messShow").hide();
        $(".showLeav .messShow").hide();
        $(".showLeav .lookMoreContent1").show();
    });
    //查看更多打赏
    $(".rewardUl .lookMoreContent").click(function() {
        $(this).hide();
        $(".rewardUl .messShare").hide();
        $(".rewardUl .messShow").fadeIn();
        $(".rewardUl .messShow").fadeIn();
        $(".rewardUl .hideContent").fadeIn();
    });
    $(".rewardUl .hideContent").click(function() {
        $(this).hide();
        $(".rewardUl .messShare").show();
        $(".rewardUl .messShow").hide();
        $(".rewardUl .messShow").hide();
        $(".rewardUl .lookMoreContent").show();
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
function fn2(){
    var len = $(".keyword").val().length;
    var len1 = $(".keyword").val();
    if(len){
        $(".cancleBtn").hide();
        $(".submitShow").show();
        $(".cancelImgDiv2").show();
        $(".keyword1").val(len1);
    }else{
        $(".cancleBtn").show();
        $(".submitShow").hide();
    }
}
//音频区域
var playqaobj = "";
var qaaudio;
function initqaaudio(){
    if(!qaaudio){
        $('body').append('<audio id="qaaudio" src="" controls="controls" style="display: none;"></audio>');
        qaaudio = document.getElementById("qaaudio");
        console.log(qaaudio);
    }
}
function playqa(obj){
    if(!obj){
        return;
    }
    var self=$(obj);
    if($("#audio ").size()){
        $("#audio ").get(0).pause();
        $(".playBtn ").removeClass("pause");
        $(".playBtn ").addClass("play");
    }else {
        $("#audio").get(0).play();
        $(".playBtn").removeClass("play");
        $(".playBtn").addClass("pause");
    }
    var url = self.data("url");
    console.log(url);
    initqaaudio();
    if(playqaobj){
        if(obj != playqaobj){
            qaaudio.pause();
            $(playqaobj).removeClass("active");
        }
    }
    playqaobj = obj;
    qaaudio.src = url;
    if(!$(playqaobj).hasClass("active")){
        qaaudio.play();
        $(playqaobj).addClass("active")
        addTimelen();
        console.log(qaaudio.currentTime)
        console.log(qaaudio.duration)
    }else{
        qaaudio.pause();
        $(playqaobj).removeClass("active")
    }
}
function addTimelen(){
    var obj = $(playqaobj);
    console.log(obj);
    var a = qaaudio;
    if(a && !obj.hasClass("time")){
        window.setTimeout(function() {
            var duration = a.duration;
            var o = obj;
            o.addClass("time");
        }, 2000);
    }
}



