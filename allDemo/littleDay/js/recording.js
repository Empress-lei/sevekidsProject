$(function(){
	var t;
	$(".recording")[0].addEventListener("touchstart",function(){
		recording(true);
	})
	$(".recording")[0].addEventListener("touchend",function(){
		recording(false);
	})
	function recording(flag){
		var i = -1;
		var len = $(".recordingbar").find("span").length;
		if(flag){
			$(".recording").removeClass("record-start");
			$(".recordingbar").removeClass("hidden");
			$(".recordingbar").addClass("active");
			$(".playword").text("松开录音按钮，结束录音");
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
			$(".playword").text("长按上面按钮，进行录音");
			$(".recordingbar").find("span").removeClass("active");
			$(".recordingbar").removeClass("active");
			clearInterval(t);
			i=-1;
		}
	}
})