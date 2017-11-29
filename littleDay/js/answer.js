$.fn.audioPlayer = function(opts){
	$(this).each(function (i, v) {
		var $this = $(this),
			mediaUrl = $this.data('aurl'),
            opt = opt || {},
            audio = $this.find("audio")[0];
         var duration;
        //获取音频时长
		audio.addEventListener("durationchange",function() {
		 	duration = parseInt(audio.duration);
		 	var m = Math.floor(duration / 60)>9 ? Math.floor(duration / 60) : "0"+Math.floor(duration / 60);
		 	var s = duration % 60>9 ? duration % 60 : "0"+duration % 60;
		 	$this.find(".time").text(duration+"\"");
    	}, false);

    	//设置音频进度条
    	var w = $this.find(".wave").width();
    	var len = parseInt(w/6);
    	//var wave = [2,2,2,6,2,2,2,6,8,10,4,4,6,8,10,4,4,6,8,10,4,4,6,8,10,4,4,6,8,10,6,2,2,2,6,2,2,2];
    	var wave = [2,2,2,6];
    	var wave2 = [6,2,2,2];
    	var str="";
    	for(j=4;j<=len-4;j++){
    		wave[j] = parseInt(Math.random()*30+1);
    	}
    	wave = wave.concat(wave2);
    	for(i=0;i<len;i++){
    		str+="<span style='height:"+wave[i]+"px;margin-top:-"+wave[i]/2+"px'></span>"
    	}
    	$this.find(".wave").html(str);
    	/*点击播放暂停*/
    	var t,t2;
    	$this.on("click",function(){
    		$("#audio")[0].pause();
    		$(".playBtn").removeClass("pause").addClass("play");
    		audio.step = -1;
    		var alen = $(".voicemsg").length;
    		if(alen>1){
	    		var other = $(".voicemsg").not($(this));
				other.find(".voicebar").removeClass("active");
				other.find("audio")[0].pause();
				other.find("audio")[0].currentTime = 0.0;
				clearInterval(t);
				clearInterval(t2);
				//other.find(".time").eq(0).text("0\"");
				//other.find("span").removeClass("active");
    		}

    		if(!$(this).find(".voicebar").hasClass("active") && duration){
    			$(this).find(".voicebar").addClass("active");
    			audio.play();
				var inval = Math.ceil( duration * 1000 / len);
    			t = setInterval(function(){
    				var currnetTime = parseInt(audio.currentTime);
    				var m = Math.floor(currnetTime / 60)>9 ? Math.floor(currnetTime / 60) : "0"+Math.floor(currnetTime / 60);
    				var s = currnetTime % 60>9 ? currnetTime % 60 : "0"+currnetTime % 60;
    				//$this.find(".time").eq(0).text(m+":"+s);
    				if(currnetTime>=duration){
		    			$this.find(".voicebar").removeClass("active");
		    			audio.pause();
		    			audio.currentTime = 0.0;
		    			audio.step = -1;
		    			clearInterval(t);
		    			clearInterval(t2);
		    			//$this.find(".time").eq(0).text("00:00");
		    			//$this.find("span").removeClass("active");
    				}
    			},500);
    			t2 = setInterval(function(){
    				if($this.find(".voicebar").hasClass("active")){
	    				audio.step++;
	    				$this.find("span").eq(audio.step).addClass("active");
	    				if(audio.step>=len){
	    					clearInterval(t2);
	    				}
    				}
    			},inval)
    		}
    		else{

    			$this.find(".voicebar").removeClass("active");
    			audio.pause();
    			audio.currentTime = 0.0;
    			audio.step = -1;
    			clearInterval(t);
    			clearInterval(t2);
    			//$this.find(".time").eq(0).text("00:00");
    			//$this.find("span").removeClass("active");
    		}
    	})
		//操作音频进度条
		$this.find(".wave").on("click",function(e){
			if($this.find(".play").hasClass("pause")){
				var x = parseInt(e.pageX);
				var l = parseInt($(this).offset().left);
				var w = parseInt($(this).width());
				var ix = Math.ceil((x-l)*len/w);
				var currentTime = audio.currentTime = parseInt(duration/len*ix);
				//console.log(parseInt(duration*1000/len*ix));
				var m = Math.floor(currentTime / 60)>9 ? Math.floor(currentTime / 60) : "0"+Math.floor(currentTime / 60);
				var s = currentTime % 60>9 ? audio.currentTime % 60 : "0"+audio.currentTime % 60;
				$this.find(".time").eq(0).text(m+":"+s);
				$(this).find("span").removeClass("active");
				for(i=0;i<=ix;i++){
					$(this).find("span").eq(i).addClass("active");
				}
				if(currentTime>=duration){
	    			$this.find(".play").removeClass("pause");
	    			audio.pause();
	    			audio.currentTime = 0;
	    			$(this).find("span").removeClass("active");
				}
			}
		})
	});
} 