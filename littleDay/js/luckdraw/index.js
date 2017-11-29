 var activityId="e5c644a6edc946728b4a504cd1740cf9";
 var activityName="暗战";
 var type="线下活动20161210";
 var prize =-1;//破蛋效果 状态
 var ddata;//可查看数据
 
$(function(){
	
	///---记录抽奖后金蛋状态
	if($.cookie('luckdraw')=='true'){
		eggFun('1');
	}else if($.cookie('luckdraw')=='false'){
		eggFun('0');
	}else{
		eggFun('2');
	}
	
	//活动心跳
	var activityInterval = setInterval(function(){
		var date=new Date();
		var str=fmtSecond(date.getTime()/1000);
		//判断是否为整点，整点的话则打开抽奖开关。还原抽奖页样式
		if(str.substring(str.length-5)=="00:00"){
//		if(str.substring(str.length-2)=="00"){
			$.cookie('luckdraw', null); //设置cookie的值,打开cookie
			$.cookie('luckdraw_count', 0);
			//还原抽奖页面样式
			eggFun('2');
		}
    },1000);
	
	HH.ajax({
		url:"/yzmm/account/luckDrawRule/countDown",
		callback:function(data){
			//获取倒计时容器
			var div1=$('.endTime');
			div1.html(null);//清空倒计时容器
			
			if(data.countDownStatus==null){
				toast('本次活动已结束');
				var span1=$('<span class="tit">活动<br>结束</span>').appendTo(div1);
				var div2=$('<div class="cont">00:00:00</div>').appendTo(div1);
			}else{
				//倒计时
				var timeInterval=setInterval(function(){
					div1.html(null);//清空倒计时容器
					var time=timer(data.countDownTime);//获取倒计时需要的秒
					if(time=='00:00:00'||time.indexOf('-')>=0){
						setTimeout("countDown()",2000);//倒计时结束 更新倒计时状态
						clearInterval(timeInterval);
					}
					if(data.countDownStatus){
						//true 不在活动内， 下轮抽奖 开始还有：00:00:00
						var span1=$('<span class="tit">下轮抽奖<br>开始还有</span>').appendTo(div1);
						var div2=$('<div class="cont">'+time+'</div>').appendTo(div1);
						
						
					}else{
						//false 在活动内，本轮抽奖 结束还有: 00:00:00
						var span1=$('<span class="tit">本轮抽奖<br>结束还有</span>').appendTo(div1);
						var div2=$('<div class="cont">'+time+'</div>').appendTo(div1);
					}
				},1000);
				
				if(data.countDownStatus){
					//true  不在活动内
					$(".egg").click(function() {toast('请期抽奖活动开始~');});
				}else{
					//true 在活动内
					bangding();
				}
			}
		}
	});
	
    //点击查看领奖记录
    $(".viewRecode").click(function(){
    	recordAwardAjax();
        $(".prizeLayer:eq(0)").fadeIn();
    })
    $(".ruleTit").click(function(){
        $(".prizeLayer:eq(1)").fadeIn();
    })
    $(".prizeLayer").click(function(e){
        e.stopPropagation();
        if($(e.target).hasClass("prizeLayer")){
            $(".prizeLayer").fadeOut();
        }
    })
    //业务变更 抽奖页面不需要中奖纪录了
//    //奖品自动滚动效果
//    var i = 0;
//    setInterval(function(){
//        ++i;
//        var h1 = $(".prizeRecodeList").eq(0).height();
//        var h2 = $(".prizeRecodeList:eq(0) li").length*h1/3;
//        var h3 = h1/3;
//        if(i*h3<=h2-h1){
//            $(".prizeRecodeList:eq(0) ul").animate({"top":-i*h3},100);
//        }
//    },1000)
})
/**
 * 破蛋效果
 * @param flag
 */
function eggFun(flag){
	var luckdraw_count=$.cookie('luckdraw_count');
	var luckdraw=$.cookie('luckdraw');
    if(flag=="1"){//有奖品
    	$(".start").hide();
        $(".eggbox").hide();
        $(".eggPrize").show();
        $(".gash").remove();
        $(".guang").show().animate({"height":441/75+"rem"},400,function(){
            $(".gift").addClass("animated");
            $(".title").show();
        });
        //抽奖次数直接填满三次
        $.cookie('luckdraw_count',3, {expires: 1/24});
        //修改成 1/24 一小时
        $.cookie('luckdraw', true, {expires: 1/24});
    }
    else if(flag=="0"){//无奖品
    	$(".start").hide();
        $(".eggbox").hide();
        $(".eggPrize").show();
        $(".gash").remove();
        $(".eggEmpty").show();
        $(".emptyTitle").show();

		if(luckdraw_count==undefined){
			luckdraw_count=0;
		}else{
			luckdraw_count=Number(luckdraw_count);
		}

        //抽奖次数 +1
        luckdraw_count++;

        

        if(luckdraw_count<3){
        	toast('您还剩'+(3-luckdraw_count)+'次机会');
        	setTimeout(function(){
				eggFun('2');//金蛋恢复可砸状态
        	},500);
        	$.cookie('luckdraw_count',luckdraw_count, {expires: 1/24});
        }else{
        	//修改成 1/24 一小时
	        $.cookie('luckdraw', false, {expires: 1/24});
        }
    }else if(flag=='2'){
    	var egg=$(".egg");
		egg.html(null);
    	var div1=$('<div class="eggbox"></div>').appendTo(egg);
		var div1=$('<div class="eggPrize"></div>').appendTo(egg);
		var div1=$('<div class="eggEmpty"></div>').appendTo(egg);
		var div1=$('<div class="beat"></div>').appendTo(egg);
		var div1=$('<div class="gash"></div>').appendTo(egg);
		var div1=$('<div class="start"></div>').appendTo(egg);
		var div1=$('<div class="guang"></div>').appendTo(egg);
		var div1=$('<div class="gift"></div>').appendTo(egg);
		var div1=$('<div class="title"></div>').appendTo(egg);
		var div1=$('<div class="emptyTitle">').appendTo(egg);
    }
    else{//网络异常
        $(".eggbox").addClass("animated2");
        $(".gash").addClass("animated2");
    }
    
}

/**
 * 抽奖js
 */
function startLuckDraw(){
	var kdata={};
	kdata.activityId=activityId;
	kdata.activityName=activityName;
	kdata.type=type;
	
	HH.ajax({
		url:"/yzmm/account/luckDraw/startLuckDraw",
		data:kdata,
		callback:function(data,params){
			if(data.success){
				if(data.ext){
					prize= "1";
				}else{
					prize= "0";
				}
			}
		}
	})
}


/**
 * 领奖记录 ajax
 */
function recordAwardAjax(){
	try{
    	HH.ajax({
    		url:"/yzmm/account/luckDraw/recordAward",
    		data:{awardTimeIsNull:null,pageSize:50},
    		callback:function(data,params){
    			if(data.success){
    				var prlint=$("#prizeRecodeListIsNullFalse");
    				prlint.html(null);
    				
    				var ext=JSON.parse(data.ext);
    				var telephone=ext.telephone;
    				$("<li>手机号："+telephone+"</li>").appendTo(prlint);
    				
    				var list=ext.list;
    				if(list){
    					var values=JSON.parse(list);
    					//页面录入中奖记录
    					for (var int = 0; int < values.length; int++) {
    						var luckdraw=values[int];
    						var strT=fmtSecond(luckdraw.createTime);strT=strT.substring(strT.length-8).substring(0,5);
    						if(luckdraw.type==0){
    							$("<li>"+strT+" 您中奖一次</li>").appendTo(prlint);
    						}else{
    							$("<li>"+strT+" 未中奖</li>").appendTo(prlint);
    						}
    					}
    					
    					//华丽分割线
    					$("<li>------------------</li>").appendTo(prlint);
    					//领奖记录
    					var ljGroup=new Array();
    					ljGroup=groupList(values);
    					for (var int3 = 0; int3 < ljGroup.length; int3++) {
    						var obj=ljGroup[int3];
    						$("<li>"+obj.substring(0,5)+" 您领取了"+obj.substring(5,obj.length)+"次奖品</li>").appendTo(prlint);
    					}
    				}
    			}
    		}
    	})
	}catch (e) {
	}
}


/**
 * 结果集 根据时间 分钟 分组
 * @param group
 * @returns
 */
function groupList(values){
	var group=new Array();
	for (var int = 0; int < values.length; int++) {
		var luckdraw=values[int];
		if(luckdraw.awardTime!=undefined){
			var str=fmtSecond(luckdraw.awardTime);str=str.substring(0,str.length-6);
			var strT=fmtSecond(luckdraw.awardTime);strT=strT.substring(strT.length-8).substring(0,5);
			group.push(strT);
		}
	}
	
	var newgroup=new Array();//新容器
	
	for (var int2 = 0; int2 < group.length; int2++) {
		var obj =group[int2];
		
		if(!newgroup.contains(obj)){
			newgroup.push(obj+""+group.getIndsByVal(obj).length);
		}
	}
 
	return newgroup;
}
/**
 * 倒计时计算函数
 */
function timer(second) {
	var ts = (second * 1000) - (new Date());//计算剩余的毫秒数  
	//var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10);//计算剩余的天数  
	var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数  
	var mm = parseInt(ts / 1000 / 60 % 60, 10);//计算剩余的分钟数  
	var ss = parseInt(ts / 1000 % 60, 10);//计算剩余的秒数  
	//dd = checkTime(dd);
	hh = checkTime(hh);
	mm = checkTime(mm);
	ss = checkTime(ss);
	
	var dateTime=hh + ":" + mm + ":" + ss;
	
	return dateTime;
}

function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
};
/**
 * 倒计时
 */
function countDown(){
	HH.ajax({
		url:"/yzmm/account/luckDrawRule/countDown?time="+new Date().getTime(),
		callback:function(data){
			//获取倒计时容器
			var div1=$('.endTime');
			div1.html(null);//清空倒计时容器
			
			if(data.countDownStatus==null){
				$('.egg').unbind("click");
				$(".egg").click(function() {toast('本次活动已结束');});
				toast('本次活动已结束');
				var span1=$('<span class="tit">活动<br>结束</span>').appendTo(div1);
				var div2=$('<div class="cont">00:00:00</div>').appendTo(div1);
			}else{
				//倒计时
				var timeInterval=setInterval(function(){
					div1.html(null);//清空倒计时容器
					var time=timer(data.countDownTime);//获取倒计时需要的秒
					if(time=='00:00:00'||time.indexOf('-')>=0){
						clearInterval(timeInterval);
						return;
					}
					if(data.countDownStatus){
						$('.egg').unbind("click");
						$(".egg").click(function() {toast('请期待下一轮抽奖~');});
						//true 不在活动内， 下轮抽奖 开始还有：00:00:00
						var span1=$('<span class="tit">下轮抽奖<br>开始还有</span>').appendTo(div1);
						var div2=$('<div class="cont">'+time+'</div>').appendTo(div1);
					}else{
						$('.egg').unbind("click");
						bangding();
						//false 在活动内，本轮抽奖 结束还有: 00:00:00
						var span1=$('<span class="tit">本轮抽奖<br>结束还有</span>').appendTo(div1);
						var div2=$('<div class="cont">'+time+'</div>').appendTo(div1);
					}
				},1000);
			}
		}
	});
}

function bangding(){
	//金蛋 点击事件
	 $(".egg").click(function() {
		if ($.cookie('luckdraw') == 'null'
			|| $.cookie('luckdraw') == undefined) {
			HH.ajax({
				url : "/yzmm/account/luckDraw/recordAward",
				data : {
					awardTimeIsNull : true,
					type:'WINNING',
					activityId:activityId,
					pageSize : 50
				},
				callback : function(data, params) {
					if (data.success) {
						var prlint = $("#prizeRecodeListIsNullTrue");

						var ext = JSON.parse(data.ext);

						if (ext) {
							toast('请先领取上一轮奖品，才能进行本次抽奖');
						} else {
							startLuckDraw();
							$(".beat").addClass("animated");
							$(".start").hide();
							var i = 0;
							setTimeout(function() {
								$(".beat").hide();
								$(".eggbox").addClass("animated");
							}, 500)
							var t1 = setInterval(function() {
								$(".eggbox").removeClass("animated");
							}, 400)
							var t2 = setInterval(function() {
								i = i + 0.5;
								if (i > 1.5) {
									clearInterval(t1);
									clearInterval(t2);
									// 破蛋效果
									eggFun(prize);
								}
								// 锤子砸后的效果
								$(".eggbox").addClass("animated");
								$(".gash").show().css({
									"transform" : "scale(" + i + ")"
								});
							}, 500);
						}
					}
				}
			})
		}else{
			toast('请期待下一轮抽奖~');
		}
	});	
}