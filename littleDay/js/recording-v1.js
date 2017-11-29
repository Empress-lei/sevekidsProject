$(function(){
	var t;
	 //v1版本变更：屏蔽触摸事件变更为点击事件
	$($(".recording")[0]).click(function(){
		if($($(".recording")[0]).hasClass("record-start")){
			//开始录音
			recording(true);
			toast("录音开始");
		}else{
			//暂停录音
			recording(false);
			toast("录音结束");
		}
		
	})
	
	function recording(flag){
		var i = -1;
		var len = $(".recordingbar").find("span").length;
		if(flag){
			$(".recording").removeClass("record-start");
			$(".recordingbar").removeClass("hidden");
			$(".recordingbar").addClass("active");
			$(".playword").text("点击上面按钮，结束录音");
			t = setInterval(function(){
				i++;
				if($(".recordingbar").hasClass("active"))
				if(i<len){
					$(".recordingbar").find("span").eq(i).addClass("active").siblings().removeClass("active");
				}
				else{
					i=-1;
				}
			},100);
		}
		else{
			$(".recording").addClass("record-start");
			$(".recordingbar").addClass("hidden");
			$(".playword").text("点击上面按钮，进行录音");
			$(".recordingbar").find("span").removeClass("active");
			$(".recordingbar").removeClass("active");
			clearInterval(t);
			i=-1;
		}
	}
})