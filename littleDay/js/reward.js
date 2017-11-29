$(function(){
	$(".t-reward").click(function(){
		$(".rewardLayer").show();
		$(".rewardLayerBox").addClass("slideup");
		$(this).addClass("active");
	})
	$(".rewardLayer").click(function(e){
		e.stopPropagation();
		if($(e.target).hasClass("rewardLayer") || $(e.target).is("a")){
			$(".rewardLayerBox").addClass("slidedown");
			$(".t-reward").removeClass("active");
			var t;
			t = setTimeout(function(){
				$(".rewardLayer").hide();
				$(".rewardLayerBox").removeClass("slideup");
				$(".rewardLayerBox").removeClass("slidedown");
			},500)
			if($(e.target).is("a")){
				$(e.target).parent().addClass("active").siblings().removeClass("active");
			}
		}
	})
})