$(function(){
	$(".shareMoreTit .more").click(function(){
		if($(".shareMoreInfo .word").is(":hidden")){
			$(".shareMoreInfo .word").slideDown();
			$(this).addClass("moreactive");
		}
		else{
			$(".shareMoreInfo .word").slideUp();
			$(this).removeClass("moreactive");
		}
	})
})