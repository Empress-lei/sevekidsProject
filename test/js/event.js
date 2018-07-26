var audio = $('#audio');
console.log(audio);
var playqaobj = "";
var playUrl = $('#audio').src;

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
    onMove: function (ct, d) {
        durationchangeTime();
    }
})
/*
 点击播放按钮去判断状态：
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
}
function proEvent(options) {
    //进度条
    this.line=$("#" + (options.audioLineId|| "audioLine"));
    //进度条上的小圆点
    this.drag=document.getElementById(options.dragId|| "drag");
    //进度条动改变的宽度
    this.audioLineLeaft=$("#"+(options.audioLineId|| "audioLine")+" .lineaft");
    //时间
    this.timeNumTxt=$("#"+(options.timeNumId|| "timeNum"));
    this.audioContTxt=$("#"+(options.audioContId|| "audioCont")+" .txt");
    //线的宽度
    this.linew = this.line.width();
    //圆点的宽度
    this.sw = $(this.drag).width();
    this.t=0;
    this.aboveX=0;
    this.startX=0;
};
proEvent.prototype = {
    touchStart: function (e) {
        e.preventDefault();
        var touch = e.touches[0];
        this.startX = touch.pageX;
        this.aboveX = parseInt(this.drag.style.left);
    },
    touchMove: function (e) {
        e.preventDefault();
        var touch = e.touches[0];
        x = touch.pageX -  this.startX;
        if(this.aboveX+x+this.sw<this.linew && this.aboveX+x>0){
            this.audio.pause();
            clearInterval(t);
            this.drag.style.left =  this.aboveX + x + "px";
            //$("#audioLine"+i+" .lineaft").width((aboveX + x));
            this.audioLineLeaft.width(( this.aboveX + x));
            var ctime = parseInt((this.aboveX + x) / (this.linew-this.sw) * audioEvent.getDuration());
            var m = Math.floor(ctime / 60);
            var s = ctime % 60;
            if(m<=9){
                m = "0"+m;
            }
            if(s<=9){
                s = "0"+s;
            }
            this.audioContTxt.text(m+":"+s);
        }
    },
    touchEnd:function (e) {
        e.preventDefault();
        this.aboveX = parseInt(this.drag.style.left);
        var touch = e.touches[0];
        var dragPaddingLeft = this.drag.style.left;
        var change = dragPaddingLeft.replace("px", "");
        numDragpaddingLeft = parseInt(change);
        var currentTime = (numDragpaddingLeft / (this.linew - this.sw)) * audioEvent.getDuration();
        audioEvent.setCurrentTime(currentTime);
        audioEvent.play();
        audioEvent.move();
    },
    //改变时间
    durationchangeTime: function() {
        var _this = this;
        try {
            //进度条上的小圆点的位置
            var linew =this.linew;
            var sw = this.sw;
            //获取当前时长
            var current = audioEvent.getCurrentTime();
            console.log(current);
            //获取总时长
            var duration = audioEvent.getDuration();
            console.log(duration);
            //设置小圆点的位置：（当前时间 / 总时长）* （进度条的宽度 - 小圆点的宽度）
            _this.drag.style.left = (current / duration) * (linew - sw) + "px";
            // console.log(drag.style.left);
            //进度条的宽度：（当前时间 / 总时长）* （进度条的宽度 - 小圆点的宽度）
            _this.audioLineLeaft.width((current / duration) * (linew - sw));
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
            this.timeNumTxt(m + ":" + s);
        } catch (e) {}
    }
}
