$(function(){
	//点击更多
	$(".sectionTit .more").click(function(){
		if(!$(this).hasClass("moreactive")){
			$(this).addClass("moreactive");
		}
		else{
			$(this).removeClass("moreactive");
		}
	})
	$(document).on("click", ".viewmore", function() {
		$(".section").show();
		$(".section").eq(0).removeClass("sectionBorder0");
		$(this).remove();
	});
	/*三千问详情*/
	$(".recommendList li").click(function(){
		$(".pagehost").hide();
		$(".askinfo").show().addClass("slideup");
	})
	$(".activityTitle .backBtn").click(function(){
		$(".askinfo").addClass("slidedown");
		$(".pagehost").show();
		setTimeout(function(){
			$(".askinfo").removeClass("slideup");
			$(".askinfo").removeClass("slidedown");
			$(".askinfo").hide();
		},500)
	})
})