$(function(){
	var stopWindowDefault = {
		windowdefaultEvent: function(windowflag){
			window.ontouchmove = function(e){
				e.preventDefault && e.preventDefault();
				e.stopPropagation && e.stopPropagation();
				if(windowflag){
		            e.returnValue=true;
		            return true;	
				}
				else{
			        e.returnValue=false;
			        return false;
				}
			}
		}
	};
	/*评论弹层*/
	$(".votebtn").click(function(){
		$(".publishVote").addClass("slideTop");
		var st = $(window).scrollTop();
		$(window).scrollTop(0);
		$("body").css("overflow","hidden");
		stopWindowDefault.windowdefaultEvent(false);
		$("body").data("st",st);
		$(".publishVote textarea").val("");
		$(".publishVote .num i").text("0");
		setTimeout(function(){
			$(".btnfixed").hide();
			//$(".publishVote textarea").focus();
		},800)

	})
	/*文本域字数效果*/
	$(".publishVote textarea").keyup(function(){
		var len = $(this).val().length;
		$(".publishVote .num i").text(len);
	})
	//提示
	$(".submit").click(function(){
		var len = $(".publishVote textarea").val().length;
		if(len==0){
			$(".noteWord").fadeIn();
			setTimeout(function(){
				$(".noteWord").fadeOut();
			},1000)
		}
		else{
			var st = parseInt($("body").data("st"));
			$(".publishVote").addClass("slideBottom");
			setTimeout(function(){
				$("body").removeAttr("style");
				$(".publishVote").removeClass("slideTop");
				$(".publishVote").removeClass("slideBottom");
				stopWindowDefault.windowdefaultEvent(true);	
				$(".btnfixed").show();
				//$(window).scrollTop(st);
			},800);
		}
	})
})
function votebtnClick(){
	$(".publishVote").addClass("slideTop");
	var st = $(window).scrollTop();
	$(window).scrollTop(0);
	$("body").css("overflow","hidden");
	stopWindowDefault.windowdefaultEvent(false);
	$("body").data("st",st);
	$(".publishVote textarea").val("");
	$(".publishVote .num i").text("0");
	setTimeout(function(){
		$(".btnfixed").hide();
		//$(".publishVote textarea").focus();
	},800)

}
