
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
	$(".textarea textarea").focus(function(){
		$(".liveBottom").addClass("liveBottomFocus");
		$(".expressionList").hide();
	})
	$(".editVote").click(function(){
		$(this).addClass("liveBottomFocus");
	})

	$(".textarea textarea").keyup(function(){
		var th = $(this).height();
		var st = $(this).scrollTop();
		var len = $(this).val().length;
		var eb = parseInt($(".expressionList").css("bottom"));
		$(".expressionList").hide();
		$(this).parent().height(th+st+12);
		$(".voteTxt").height(th+st+12);
		$(".textarea textarea").height(th+st);
		$(this).parent().find("i").text(len);
		$(".expressionList").css("bottom",th+st+30);
	});
	$(".textarea textarea").submit(function(){
		$(".liveBottom").removeClass("liveBottomFocus");
		$(".editVote").removeClass("liveBottomFocus");
	})
	
	//评论关闭
	$(".editVote,.liveBottom").click(function(e){
		/*console.log("close");
		$(".commentContent").find("i").text(0);
		//$(".questionContent").find("i").text(0);
		$(".commentContent textarea").val("");
		//$(".questionContent textarea").val("");
		//$(".vodcomment textarea").val("");
		e.stopPropagation();
		if($(e.target).hasClass("liveBottomFocus")){
			$(e.target).removeClass("liveBottomFocus");
		}
		$(".commentContent").height("");
		$(".commentContent textarea").height("");
		$(".voteTxt").height("");
		$(".questionContent").height("");
		$(".questionContent textarea").height("");
		$(".vodcomment").height("");
		$(".vodcomment textarea").height("");*/
		e.stopPropagation();
		if($(e.target).hasClass("liveBottomFocus")){
			$(e.target).removeClass("liveBottomFocus");
			$(".expressionList").hide();
			$(".textarea textarea").val("");
			$(".textarea textarea").attr("placeholder","评论:");
			$(".expressionList").removeAttr("style");
			$(".voteTxt").removeAttr("style");
			$(".textarea").removeAttr("style");
			$(".textarea textarea").removeAttr("style");
		}
		$(".commentContent").height("");
		$(".commentContent textarea").height("");
		$(".voteTxt").height("");
		$(".questionContent").height("");
		$(".questionContent textarea").height("");
		$(".vodcomment").height("");
		$(".vodcomment textarea").height("");
	});
	/*表情效果*/
	$(".expression").click(function(){
		if($(".expressionList").is(":visible")){
			$(".expressionList").hide();
		}
		else{
			$(".expressionList").show();
		}
	})
	var i = 0;
	var expArry = [];
	var newtxt="";
	$(".expressionList a").click(function(){
		var txt = $(this).attr("data-txt");
		var inp = $(".textarea textarea").val();
		/*var len = (inp+txt).length;
		var cls = $(this).attr("class");
		var inpArry = $(".voteTxt textarea").val().split("]");
		var inpstrLen = inpArry.length;
		var str = "<li><div class='name'>小红妈妈：</div><div class='word'><span class='exp "+cls+"'></span></div></li>";*/
		$(".expressionList").hide();
		
		$(".textarea textarea").val(inp+txt);
	})
})
/*点击@TA*/
	function atTa(obj){
		var str = $(obj).closest(".voteInfo").find(".name").text();
		$(".editVote").addClass("liveBottomFocus");
		$(".editVote textarea").val("@"+str+" ");
	}
