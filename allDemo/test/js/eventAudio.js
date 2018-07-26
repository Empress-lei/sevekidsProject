function audioEvent(options) {
    this.options = {};
    this.intervalId = 0;
    //默认的音频状态
    this.audioStatus = 0;
    //默认的audio
    this.myaudio = "";
    this.myaudio.src = options.src;
    this.myaudio.id = options.id || "";
    this.intervalId = "";
    // 音频的状态4种状态值
    this.audioStatusEnum = {
        NOT_DATA: 0,//无数据
        READY: 1,//就绪
        PLAY: 2,//播放中
        PAUSE: 3,//暂停
        STATE: 4
    };
    // this.playStatusRecord = false;
    //创建音频
    // this.create();
    //在创建的时候初始化
    this.init(options);
}
audioEvent.prototype = {
    constrcutor: audioEvent,
    //判断页面中书否有audio标签，有则用页面中的
    // 无则创建audio标签(wbl)
    create: function () {
        console.log("----create----");
        //判断页面中有没有audio标签
        //没有则创建一个audio标签，并且添加src值
        if (!this.myaudio) {
            this.myaudio = document.createElement('audio');
            console.log(this);
            this.myaudio.preload = "auto";
            this.myaudio.id = "audio";
            console.log("@@@@@@@@@@@@@@");
            $("body").append(this.myaudio);
            console.log(this.myaudio)
        }
        return this.myaudio;
    },
    //判断audio是否准备就绪(wbl)
    isReady: function () {
        //将音频准备的状态为就绪
        return this.myaudio.readyState = this.audioStatusEnum.STATE;
    },
    //播放
    play: function () {
        if (!this.isReady()) {
            return;
        }
        console.log('播放了');
        var ct = this.myaudio.currentTime;
        console.log(ct);
        //获取音频的总时长
        var d = this.myaudio.duration;
        console.log(d);
        this.myaudio.play();
        this.audioStatus = this.audioStatusEnum.PLAY;
        this.ePlay(ct, d);
        if (!this.intervalId) {
            this.move();
        }
        console.log(this.myaudio);
        clearInterval(this.intervalId);
        // this.myaudio.setCurrentTime(ct);
    },
    //判断音频是否播放
    isPlay: function () {
        return this.audioStatus == this.audioStatusEnum.PLAY;
    },
    //暂停
    pause: function () {
        //判断音频的状态是不是处于播放的状态，是则调用他的暂停方法
        //并修改其播放的状态
        console.log('暂停了');
        //获取音频当前播放的时间
        var ct = this.myaudio.currentTime;
        console.log(ct);
        //获取音频的总时长
        var d = this.myaudio.duration;
        console.log(d);
        this.myaudio.pause();
        this.audioStatus = this.audioStatusEnum.PAUSE;
        this.ePause();
        clearInterval(this.intervalId);
        console.log(this.myaudio);
    },
    //停止播放，音频停止了，
    // 再次播放的时候，音频将重新开始播放
    stop: function () {
        if (!this.isPlay()) {
            return;
        }
        console.log('停止播放音频了');
        //获取音频当前播放的时间
        var ct = this.myaudio.currentTime;
        console.log(ct);
        //获取音频的总时长
        var d = this.myaudio.duration;
        console.log(d);
        this.myaudio.load();
        this.audioStatus = this.audioStatusEnum.NOT_DATA;
        this.eStop(ct, d);
        clearInterval(this.intervalId);
        console.log('lll');
    },
    //内部调用的播放暂停方法
    ePlay: function (ct, duration) {
        try {
            if (this.options.onPlay) {
                this.options.onPlay(ct, duration, this.myaudio.id);
                console.log(ct);
                console.log(duration);
                console.log(this.myaudio.id);
            }
        } catch (e) {
        }
    },
    ePause: function (ct, duration) {
        try {
            if (this.options.onPause) {
                this.options.onPause(ct, duration, this.myaudio.id);
                console.log(ct);
                console.log(duration);
                console.log(this.myaudio.id);
            }
        } catch (e) {
        }
    },
    eStop: function (ct, duration) {
        try {
            if (this.options.onStop) {
                this.options.onStop(ct, duration);
                console.log(ct);
                console.log(duration);
            }
        } catch (e) {
        }
    },
    eMove: function (ct, duration) {
        try {
            if (this.options.onMove) {
                this.options.onMove(ct, duration);
                // console.log(ct);
                // console.log(duration);
            }
        } catch (e) {
        }
        
    },
    src: function () {
        return this.myaudio.src;
    },
    //给音频设置地址(wbl)
    setSrc: function (src) {
        console.log('设置地址');
        this.myaudio.src = src;
        console.log(this.myaudio.src);
        console.log(this.myaudio);
    },
    // 获取音频的当前时间
    getCurrentTime: function () {
        return this.myaudio.currentTime;
    },
    //设置音频的当前时间
    setCurrentTime: function (ct) {
        return this.myaudio.currentTime = ct;
    },
    //获取音频的总时长
    getDuration: function () {
        return this.myaudio.duration;
    },
    //每500秒监测一下音频的当前时间以及上一次的时间的变化
    move: function () {
        var lastCurrentTime = -1;
        var tempCurrentTime = -1;
        var _this = this;
        var audioStatus = _this.audioStatusEnum.NOT_DATA;
        //每500监测一下音频时间的变化
        this.intervalId = setInterval(function () {
            _this.eMove(_this.myaudio.currentTime, _this.myaudio.duration)
            //判断音频的当前时间 > 获取的当前时间  &&  上面的时间 == 当前时间
            var hasPlay = (_this.myaudio.currentTime > tempCurrentTime) && (lastCurrentTime == tempCurrentTime);
            //音频的当前时间   == 当前时间 && 当前时间 > 上一秒时间
            var hasPause = (_this.myaudio.currentTime == tempCurrentTime) && (tempCurrentTime > lastCurrentTime);
            // console.log(hasPlay);
            // console.log(hasPause);
            //上一秒时间 赋值 当前时间
            lastCurrentTime = tempCurrentTime;
            //当前时间  赋值给 音频的当前时间
            tempCurrentTime = _this.myaudio.currentTime;
            //2.暂停
            if (hasPause && _this.myaudio.readyState == _this.audioStatusEnum.STATE) {
                audioStatus = _this.audioStatusEnum.PAUSE;
                _this.ePause(_this.myaudio.currentTime, _this.myaudio.duration);
                // console.log('www');
                // console.log(_this.myaudio.currentTime);
                // console.log(_this.myaudio.duration);

            } else if (hasPlay && _this.myaudio.readyState == _this.audioStatusEnum.STATE) {
                //3.播放中
                audioStatus = _this.audioStatusEnum.PLAY;
                _this.ePlay(_this.myaudio.currentTime, _this.myaudio.duration);
                // console.log('bbb');
                // console.log(_this.myaudio.currentTime);
                // console.log(_this.myaudio.duration);
            }
            //如果当前时间 == 音频的总时长,音频就播放完毕了
            if (_this.myaudio.currentTime == _this.myaudio.duration) {
                //音频暂停，音频的当前时间归初始化，上一秒时间和当前时间初始化
                lastCurrentTime = -1;
                tempCurrentTime = -1;
                _this.stop();
            }
            // console.log(lastCurrentTime);
            // console.log(tempCurrentTime);
            // console.log(_this.myaudio.currentTime)
            // console.log(_this.myaudio.duration)
        }, 500);
    },
    //初始化
    init: function (op) {
        console.log('初始化');
        if (op) {
            return $.fn.extend(this.options, op);
        }
        if (this.options.src) {
            return this.myaudio.src = this.options.src;
        }
    }
}
