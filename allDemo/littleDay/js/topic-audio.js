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
		 	$this.find(".time").eq(1).text(m+":"+s);
    	}, false);

    	//设置音频进度条
    	var wave = [2,2,2,6,2,2,2,6,8,10,4,4,6,8,10,4,4,6,8,10,4,4,6,8,10,4,4,6,8,10,6,2,2,2,6,2,2,2];
    	var len = wave.length;
    	var str="";
    	for(j=4;j<=33;j++){
    		wave[j] = Math.random()*30+1;
    	}
    	for(i=0;i<len;i++){
    		str+="<span style='height:"+wave[i]+"px;margin-top:-"+wave[i]/2+"px'></span>"
    	}
    	$this.find(".wave").html(str);
    	/*点击播放暂停*/
    	var t,t2;
    	$this.on("click",".play",function(){
    		audio.step = -1;
    		var alen = $(".audio").length;
    		if(alen>1){
	    		var other = $(".audio").not($(this).parent());
				other.find(".play").removeClass("pause");
				other.find("audio")[0].pause();
				other.find("audio")[0].currentTime = 0.0;
				clearInterval(t);
				clearInterval(t2);
				other.find(".time").eq(0).text("00:00");
				other.find("span").removeClass("active");
    		}
    		if(!$(this).hasClass("pause") && duration){
    			$(this).addClass("pause");
    			$this.find("span").removeClass("active");
    			audio.play();
				var inval = Math.ceil( duration * 1000 / len);
    			t = setInterval(function(){
    				var currnetTime = parseInt(audio.currentTime);
    				var m = Math.floor(currnetTime / 60)>9 ? Math.floor(currnetTime / 60) : "0"+Math.floor(currnetTime / 60);
    				var s = currnetTime % 60>9 ? currnetTime % 60 : "0"+currnetTime % 60;
    				$this.find(".time").eq(0).text(m+":"+s);
    				if(currnetTime>=duration){
		    			$this.find(".play").removeClass("pause");
		    			audio.pause();
		    			audio.currentTime = 0.0;
		    			audio.step = -1;
		    			clearInterval(t);
		    			clearInterval(t2);
		    			$this.find(".time").eq(0).text("00:00");
		    			$this.find("span").removeClass("active");
    				}
    			},500);
    			t2 = setInterval(function(){
    				if($this.find(".play").hasClass("pause")){
	    				audio.step++;
	    				$this.find("span").eq(audio.step).addClass("active");
	    				if(audio.step>=len){
	    					clearInterval(t2);
	    				}
    				}
    			},inval)
    		}
    		else{
    			$this.find(".play").removeClass("pause");
    			audio.pause();
    			audio.currentTime = 0.0;
    			audio.step = -1;
    			clearInterval(t);
    			clearInterval(t2);
    			$this.find(".time").eq(0).text("00:00");
    			$this.find("span").removeClass("active");
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