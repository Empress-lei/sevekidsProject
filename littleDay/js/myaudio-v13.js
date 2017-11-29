var 	weixinserveridArray =  new Array();
var currentlocalId='';
jQuery.fn.extend({
	myaudio:function(_p){
		$(this).each(function(){
			if(!$(this).hasClass("myaudioinit")){
				$(this).initmyaudio(_p);
			}
		});
		var thet = $(this).parents(".mywrap");;
		setTimeout(function() {
			thet.find(".bar").css("background-color","#AD6305");
		},100);
	},

	initmyaudio: function(_p) {
		var p = {};
		if(_p){
			p = _p;
		}
		var thet = this;
		thet.playUrl=thet.attr("src");
		if(!thet.playUrl){
			thet.playUrl = thet.children("source").attr("src");
		}
		thet.addClass("myaudioinit");
		thet.audio =  this.get(0);
		var dom = $('<div class="myaudio"></div>');
		if(p.nowrap){
			dom.css("padding","0 0");
		}
		thet.after(dom);
		var mywrap =$('<div class="mywrap"></div>')
			dom.append(mywrap);
		var playpause = $('<div class="playpause"></div>')
		mywrap.append(playpause);
		thet.playBtn = $('<a class="play"></a>');
		thet.playBtn.append(this);
		playpause.append(thet.playBtn);
		if(thet.playUrl.indexOf("weixin:")>-1){
			thet.time =  $('<div class="time"></div>');
		}else{
		thet.time =  $('<div class="time">00:00</div>');
		}
		mywrap.append(thet.time);
		thet.bar = $('<div class="bar"><div></div><div class="white"></div></div>');
		thet.bar.find("div:first-child").addClass("bg"+Math.ceil(Math.random()*3))
		mywrap.append(thet.bar);
		thet.linew = thet.bar.width();
		
		if(thet.playUrl.indexOf("weixin:")>-1){
			thet.duration = $('<div class="duration"></div>');
		}else{
			thet.duration = $('<div class="duration">--</div>');
		}
		mywrap.append(thet.duration);
		
		thet.white = thet.bar.find(".white");
		
		
		thet.playBtn.click(function() {
			if(currentlocalId){
				return;
			}
			if ($(this).hasClass("pause")) {
				if(p.pause){
					p.pause(thet);
				}
				stopaudio();
			} else {
				if(p.play){
					p.play(thet);
				}
				if(thet.playUrl.indexOf("weixin:")>-1){
					//微信
					playweixinaudio(thet);
					$(this).addClass("pause");
				}else{
					$(this).addClass("pause");
					thet.audio.play();
				}
			}
		})
		
		thet.intervalId=null;
		var dragMove = function() {
			thet.intervalId = setInterval(function() {
				var w = (thet.audio.currentTime / thet.audio.duration) * thet.linew;
				//console.log(w+" "+thet.linew+" "+(w <= thet.linew));
				if(w <= thet.linew){
					thet.white.css("width",w+ "px")
				}
				var currnetTime = parseInt(thet.audio.currentTime);
				var m = Math.floor(currnetTime / 60);
				var s = currnetTime % 60;
				if (m <= 9) {
					m = "0" + m;
				}
				if (s <= 9) {
					s = "0" + s;
				}
				thet.time.text(m + ":" + s);
			}, 500);
		}
		
		thet.audio.addEventListener("durationchange", function() {
			var allTime = parseInt(thet.audio.duration);
			var m = Math.floor(allTime / 60);
			var s = allTime % 60;
			if (m <= 9) {
				m = "0" + m;
			}
			if (s <= 9) {
				s = "0" + s;
			}
			thet.duration.text(m + ":" + s);

		}, false);
		thet.audio.addEventListener("pause", function() {
			thet.playBtn.removeClass("pause");
			if (thet.audio.currentTime == thet.audio.duration) {
				thet.audio.pause();
				thet.audio.currentTime = 0;
			}
			if(thet.intervalId){
				setTimeout(function() {
					clearInterval(thet.intervalId);
				},1000);
			}
			if(p.audioPause){
				p.audioPause(thet.audio);
			}
		}, false);
		thet.audio.addEventListener("play", function() {
			if(p.audioPlay){
				p.audioPlay(thet.audio);
			}
			dragMove();
		}, false);
		
		var stopaudio = function (){
			var ap = $(".pause");
			ap.each(function(){
				var a = $(this).find("audio").get(0);
				if(a.src.indexOf("weixin:") == -1){
					a.pause();
				}
			});
			ap.removeClass("pause");
		};
		var playweixinaudio = function (t){
			if(typeof canwxaudio == 'undefined' || typeof wx == 'undefined'){
				toast("您的设备可能不支持微信播放，请刷新后重试！")
				return;
			}
			id = t.playUrl;
			var localId = '';
			for(var i=0 ;i<weixinserveridArray.length;i++){
				var temp = weixinserveridArray[i];
				if(temp){
					var temparray = temp.split("|");
					if(temparray[0] == id){
						localId = temparray[1];
						break;
					}
				}
			}
			if(!localId){
				var _serverId = id.substr(7);
				var _sindex = _serverId.indexOf("|");
				if(_sindex > -1){
					_serverId = _serverId.substring(0,_sindex);
				}
				_sindex = _serverId.indexOf("?");
				if(_sindex > -1){
					_serverId = _serverId.substring(0,_sindex);
				}
				wx.downloadVoice({
				    serverId: _serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
				    isShowProgressTips: 1, // 默认为1，显示进度提示
				    success: function (res) {
				        localId = res.localId; // 返回音频的本地ID
				        weixinserveridArray.push(id+"|"+localId);
				        wx.playVoice({
						    localId: localId,
						    success: function (res) {
						        currentlocalId = localId;
						    }
				        });
				    }
				});
			}else{
				 wx.playVoice({
					    localId: localId,
					    success: function (res) {
					        currentlocalId = localId;
					    }
				 });
			}
			 wx.onVoicePlayEnd({
				  complete: function (res) {
					  $(".pause").removeClass("pause");
					  currentlocalId = "";
				  }
				});
		};
		
	}
	
});

