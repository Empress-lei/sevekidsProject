$(function(){
	//活动细则弹层
	$(".hdxz").click(function(){
		$(".bmxz").fadeIn();
	})
	$(".bmxz").click(function(){
		$(".bmxz").fadeOut();
	})
	$(".zybjkclose").click(function(){
		$(".zybjk").fadeOut();
	})
	
	//点击提醒
	$(".clockme").click(function(){
		$(".clockBox").parent().fadeIn();
	})
	/*排名规则*/
	$(".motherSort .ruleBtn").click(function(){
		$(".sortruleBox").parent().fadeIn();
	})
	$(".sortruleBox .submitbtn").click(function(){
		$(".actlayer").fadeOut();
	})
	//加载更多文字
	$(".activityBanner .slidebtn").click(function(){
		if($(".activityBanner .txt2 p").hasClass("els2")){
			$(".activityBanner .txt2 p").removeClass("els2");
			$(".activityBanner").css({
				"height":"auto"
			});
			$(".activityBanner .slidebtn").addClass("slidebtnDown");
		}
		else{
			$(".activityBanner .txt2 p").addClass("els2");
			$(".activityBanner .slidebtn").removeClass("slidebtnDown");
		}
	})
	//7天效果
	var ww = $(window).width();
	var ullen = $(".timelistBox ul").length;
	$(".timelistBox").width(ww*ullen);
	$(".timelistBox ul").width(ww);
	var sx,mx,ex,sl;
	var flag = false;
	var tmp1;
	var tmp2;
	$(".timelistBox").on("touchstart",function(e){
		flag = true;
		sx = e.pageX || e.originalEvent.targetTouches[0].pageX;
		mx = 0;
		ex = 0;
		sl = parseInt($(".timelistBox").offset().left);
	})
	$(".timelistBox").on("touchmove",function(e){
		if(flag){
			mx = e.pageX || e.originalEvent.targetTouches[0].pageX;
			ex = mx-sx;
			
			if(Math.abs(ex)>0){
			$(".timelistBox").css("left",sl+ex);
			}
		}
	})
	
	$(".timelistBox").on("touchend",function(e){
		console.log(ex);
		if(Math.abs(ex)>0){
			sl = parseInt($(".timelistBox").offset().left);
			if(ex>0){
				sl = sl+ww;
			}
			else{
				sl = sl-ww;
			}
			console.log("sl:"+sl+"  ex:"+ex+"  sx:"+sx+"  mx:"+mx+" ullen:"+ullen);
			if(sl>=0){
				$(".timelistBox").stop().animate({"left":"0px"},500);
			}
			else if(sl<=-(ullen-1)*ww){
				$(".timelistBox").stop().animate({"left":-(ullen-1)*ww},500);
			}
			else{
				$(".timelistBox").stop().animate({"left":-ww},500);
			}
		}
	});
	/*我的活动*/
	$(".myactivity").click(function(){
		$(".containerOther").hide();
		$(".containerAct").show().animate({"top":"0"},300);
		$(window).scrollTop(0);
	})
	$(".activityTitle .backBtn").click(function(){
		$(".containerAct").animate({"top":"100%"},300,function(){
			$(".containerOther").show();
			$(".containerAct").hide();
		});
	})
	//查看热招中的活动
	$(".actempty").click(function(){
		$(".actempty").hide();
		$(".containerAct").hide();
		$(".containerActBox2").show().animate({"top":"0"},300);
		$(window).scrollTop(0);
	})
	//热招中的活动点击小差按钮
	$(".activityTitle .backBtn2").click(function(){
		$(".containerActBox2").animate({"top":"100%"},300,function(){
			$(".containerAct").show();
			$(".actempty").show();
			$(".containerActBox2").hide();
		});
	})
	//女神之路
	$(".centerMenu:eq(0)").click(function(){
		$(".containerOther").hide();
		$(".containerAct").show().animate({"top":"0"},300);
		$(window).scrollTop(0);
	})
	/*点击活动详情*/
	$(".activitymore").click(function(){
		$(".containerOther").hide();
		$(".containerAct").show().animate({"top":"0"},300);
		$(window).scrollTop(0);
	})
})
