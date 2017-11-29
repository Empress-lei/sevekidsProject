$(function(){
	//活动细则弹层
	$(".activityBanner .rulebtn").click(function(){
		$(".activityruleBox").parent().fadeIn();
	})
	$(".actlayer .close").click(function(){
		$(".actlayer").fadeOut();
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
	$(".timelistBox").width(ww*3);
	$(".timelistBox ul").width(ww);
	var sx,mx,ex,sl;
	var flag = false;
	$(".timelistBox").on("touchstart",function(e){
		flag = true;
		sx = e.pageX || e.originalEvent.targetTouches[0].pageX;
		sl = parseInt($(".timelistBox").offset().left);
	})
	$(".timelistBox").on("touchmove",function(e){
		if(flag){
			mx = e.pageX || e.originalEvent.targetTouches[0].pageX;
			ex = mx-sx;
			$(".timelistBox").css("left",sl+ex);
		}
	})
	$(".timelistBox").on("touchend",function(e){
		sl = parseInt($(".timelistBox").offset().left);
		if(ex>0){
			sl = sl+ww;
		}
		else{
			sl = sl-ww;
		}
		if(sl>=0){
			$(".timelistBox").stop().animate({"left":"0px"},500);
		}
		else if(sl<=-ww*2){
			$(".timelistBox").stop().animate({"left":-ww*2},500);
		}
		else{
			$(".timelistBox").stop().animate({"left":-ww},500);
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
			$(".containerOther").show();
			$(".containerAct").hide();
			$(".actempty").hide();
			//$(".containerAct").show();
			//$(".actempty").show();
			$(".containerActBox2").hide();
		});
	})
	//女神之路
	$(".centerMenu li:eq(0)").click(function(){
		$(".containerOther").hide();
		$(".containerAct").show().animate({"top":"0"},300);
		$(window).scrollTop(0);
		//执行后台请求
		goddessOfTheRoad();
	})
	/**
	 * 女神之路后台请求 ajax
	 */
	function goddessOfTheRoad(){
		var honorTag=$('.honorTag');//荣誉勋章容器
		honorTag.html(null);//荣誉勋章容器清空
		$('<li><img src="/res/img/center/t1.png"><p>优秀学员</p></li>').appendTo(honorTag);//添加默认荣誉勋章 TODO 咨询星星默认文案和默认图片
		
		var workcardList=$('.workcardList');//作业补交卡容器
		workcardList.html(null);//作业补交卡容器清空
		
		HH.ajax({
			url:'/yzmm/account/usermedal/goddessOfTheRoad',
			data:{},
			callback:function(data){
				if(data.success){
					var result=JSON.parse(data.ext);
					//荣誉勋章嵌套
					var mualist=result.mualist;
					if(mualist){
						for (var i = 0; i < mualist.length; i++) {
							var mua=mualist[i];
							$('<li><img src="'+mua.medalImg+'"><p>'+mua.medalName+'</p></li>').appendTo(honorTag);
						}
					}
					//作业补交卡嵌套
					var cardlist=result.cardlist;
					if(cardlist){
						for (var i = 0; i < cardlist.length; i++) {
							var card=cardlist[i];
							var li=$('<li class="workcardItem"></li>').appendTo(workcardList);
							var div1=$('<div class="il"><div class="tit">作业补交卡</div><div class="name">'+card.activityName+'</div></div>').appendTo(li);
							
							var state=card.useState=="YES"?"已使用"+"(第"+card.dayNumber+"天使用)":"未使用";
							var div2=$('<div class="ir"></div>').appendTo(li);
							if(card.useState=='NO'){
								//如果未使用判断是否过期
								var nowTime=new Date().getTime()/1000;
								if(nowTime<card.validEndTime){
									var div3=$('<div class="tag"><span>'+state+'</span></div><div class="date">有效期<br>'+fmtDate(new Date(card.validStartTime*1000),'yyyy.MM.dd')+'-'+fmtDate(new Date(card.validEndTime*1000),'yyyy.MM.dd')+'</div>').appendTo(div2);
								}else{
									state='已过期';
									li.addClass('workcardItemGray');
									var div3=$('<div class="tag tag1"><span>'+state+'</span></div><div class="date">有效期<br>'+fmtDate(new Date(card.validStartTime*1000),'yyyy.MM.dd')+'-'+fmtDate(new Date(card.validEndTime*1000),'yyyy.MM.dd')+'</div>').appendTo(div2);
									var div4=$('<div class="timed"></div>').appendTo(li);
								}
							}else{
								li.addClass('workcardItemGray');
								var div3=$('<div class="tag tag1"><span>'+state+'</span></div><div class="date">有效期<br>'+fmtDate(new Date(card.validStartTime*1000),'yyyy.MM.dd')+'-'+fmtDate(new Date(card.validEndTime*1000),'yyyy.MM.dd')+'</div></div>').appendTo(div2);
								var div4=$('<div class="used"></div>').appendTo(li);
							}
						}
					}
				}else{
					toast(data.msg);
				}
			}
		});
	}
})
/**
 * 跳转活动类型明细
 * @param url
 * @returns
 */
function toActivityTypeDetailed(url){
	top.location=url;
}