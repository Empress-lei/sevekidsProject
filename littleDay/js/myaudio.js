jQuery.fn.extend({
	myaudio:function(_p){
		$(this).each(function(){
			if(!$(this).hasClass("myaudioinit")){
				$(this).initmyaudio(_p);
			}
		});
		var thet = $(this).parents(".mywrap");;
		setTimeout(function() {
			thet.find(".bar").css("background-color","rgba(238, 238, 238,0.8)");
		},100);
	},
	
	initmyaudio: function(_p) {
		var p = {};
		if(_p){
			p = _p;
		}
		var thet = this;
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
		thet.time =  $('<div class="time">00:00</div>');
		mywrap.append(thet.time);
		thet.bar = $('<div class="bar"><div></div><div class="white"></div></div>');
		thet.bar.find("div:first-child").addClass("bg"+Math.ceil(Math.random()*3))
		mywrap.append(thet.bar);
		thet.linew = thet.bar.width();
		thet.duration = $('<div class="duration">--</div>');
		mywrap.append(thet.duration);
		
		thet.white = thet.bar.find(".white");
		thet.playBtn.click(function() {
			if ($(this).hasClass("pause")) {
				if(p.pause){
					p.pause(thet);
				}
				$(this).removeClass("pause");
				thet.audio.pause();
			} else {
				if(p.play){
					p.play(thet);
				}
				$(this).addClass("pause");
				thet.audio.play();
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
		thet.audio.addEventListener("ended", function() {
			if(p.audioEnded){
				p.audioEnded(thet.audio);
			}
		}, false);
	}
});
