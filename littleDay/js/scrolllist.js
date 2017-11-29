$(function(){
	var h = $(".scrollLive").height();
	var len  = $(".scrollLiveList a").length;
	var i = 0;
	var str = $(".scrollLiveList").html();
	setInterval(function(){
		var st = $(".scrollLiveList").eq(0).offset().top;
		++i;
		if(i<len){
			$(".scrollLiveList").eq(0).animate({"top":-h*i},500);
			if(i == len-1){
				$(".scrollLive").append("<div class='scrollLiveList'>"+str+"</div>");
			}
		}
		else{
			i = 0;
			$(".scrollLiveList").eq(0).remove();
		}
	},3000)
})