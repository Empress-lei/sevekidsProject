$(function(){
	$(".his").click(function(){
		$(".hisList").show().addClass("slideup");
	})
	$(".slidedownBtn").click(function(){
		$(".hisList").addClass("slidedown");
		setTimeout(function(){
			$(".hisList").hide();
			$(".hisList").removeClass("slidedown");
			$(".hisList").removeClass("slideup");
		},500)
	})
})