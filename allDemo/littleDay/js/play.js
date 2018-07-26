$(function(){
	var t,duration;
	$("#audio")[0].addEventListener("durationchange",function() {
	 	duration = audio.duration;
	}, false);
	$(".playBtn").on("click",function(){
		if(duration){
			if(!$(this).hasClass("pausebtn")){
				$(this).addClass("pausebtn");
				$(".playvoice").hide();
				$(".playword").show();
				$("#audio")[0].play();
				var len = $(".audiobar span").length;
				var step = -1;
				t = setInterval(function(){
					step++;
					if(step<len){
						$(".audiobar span").eq(step).addClass("active").siblings("span").removeClass("active");
					}
					else{
						step = -1;
					}
					if($("#audio")[0].currentTime>=duration){
						clearInterval(t);
						$(".playBtn").removeClass("pausebtn");
						$(".playvoice").show();
						$(".playword").hide();
						$("#audio")[0].pause();
						$("#audio")[0].currentTime = 0;
						$(".audiobar span").removeClass("active");
					}
				},100)
			}
			else{
				clearInterval(t);
				$(this).removeClass("pausebtn");
				$(".playvoice").show();
				$(".playword").hide();
				$("#audio")[0].pause();
				$("#audio")[0].currentTime = 0;
				$(".audiobar span").removeClass("active");
			}
		}
	})

})