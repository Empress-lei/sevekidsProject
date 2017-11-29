var custom;//自定义函数     注：用完清空
var babyInfo={};
var aa;
$(function(){
	
	var isnew=false;
	
	//初始化
	var time=$('.baobao').text().replace('.','/').replace('.','/');
	var date=new Date(time);
	var nowdate=new Date(fmtDate(new Date(),'yyyy/MM/dd'));
	if(idenfyNum==1){
		var dt=280 * 24 * 60 * 60-(date.getTime()-nowdate.getTime())/1000;
		if(dt<86400){
			toast('请选择正确天数');
			return;
		}
		var age=getDateObject(dt);
		aa=age;
		$('.baobao').text((parseInt(age.month?age.month:0)*4+parseInt(age.week?age.week:0))+'周'+(age.day?parseInt(age.day)+'天':''));
	}else{
		var dt=(nowdate.getTime()-date.getTime())/1000;
		var age=getDateObject(dt);
		var yearMonth=ageYearMonth(age);
		if(dt==0||yearMonth.indexOf('天')!=-1){
			yearMonth='0岁';
		}
		$('.baobao').text(yearMonth);
	}
	
	//初始化页面时间
	var cts=$('.createTime');
	for (var i = 0; i < cts.length; i++) {
		var ct=$(cts[i]);
		ct.text(fmtDate(new Date(ct.text()*1000)));
	}
	//初始化宝宝身份信息
	babyInfo.fYear=$('.fYear').val();
	babyInfo.fMonth=$('.fMonth').val();
	babyInfo.fDay=$('.fDay').val();
	babyInfo.fSex=$('.fSex').val();
	
	
	/*修改身份*/
	$(".border0 li:eq(0)").click(function(){
		modifyIdenfy();
	})
	
	$(".idenfy .perCont").on("click","span",function(){
		$(this).addClass("active").siblings("span").removeClass("active");
	})
	$(".btn_cancle").click(function(){
		//删除新增窗口
		if(isnew){
			$(".border0 li:eq(0)").remove();
			$('.baobao').removeClass('main');
			$(".border0 li:eq("+($(".border0 li").length-1)+")").css('display','block');
		}
		$(".idenfy").fadeOut();
	});
	/*添加宝贝*/
	var addbaby=function(){
		isnew=true;
		var str="";
		var txt="";
		var today = new Date();
		var y = today.getFullYear();
		var m = (today.getMonth()+1)>9 ? today.getMonth()+1 : "0"+(today.getMonth()+1);
		var d = (today.getDate()+1)>9 ? today.getDate() : "0"+(today.getDate());
		
		if($(".idenfy .active").text()=='宝妈／爸'){
			str = '<li class="blockitem"><div class="name">大宝：<span class="txt2 sex" >小王子</span><span class="baobao" >'+y+'年'+m+'月'+d+'日</span></div><div class="cont"><span class="txt2"><a href="javascript:modifyIdenfy();">修改</a></span></div></li>';
		}else{
			str = '<li class="blockitem"><div class="name">已怀孕：<span class="baobao" >'+y+'.'+m+'.'+d+'</span></div><div class="cont"><span class="txt2"><a href="javascript:modifyIdenfy();">修改</a></span></div></li>';
		}
		$(".border0 li:eq(0)").before(str);
		$('.baobao').addClass('main');loadScrollEve();
		$('.baobao').bind('DOMNodeInserted', domNodeInserted);
		
		setTimeout(function(){
			$('.baobao').click();
			custom=function(){
				$(".baobao").removeClass("main");loadScrollEve();
				
				$('.submitBtn').css('background-color','#F39D39');
				$('.submitBtn').unbind();
				//重新绑定提交事件
				$(".submitBtn").click(submitEvents);
				
				
				var lis=$(".border0 li");
				for(var i=1;i<lis.length;i++){
					$(lis[i]).css('display','none');
				}
			}
		},500);
	}
	
	//设置宝宝性别和出生日期
	$(".baoHandle").on("click",".baobao",function(e){
		if($(".idenfy .active").text()=='宝妈／爸'){
			if($(e.target).hasClass("baobao") || $(e.target).closest("li").hasClass("baobao")){
				$(".idenfy").attr("setsex","1");
				$(".idenfy .perCont span").eq(0).text("小公主");
				$(".idenfy .perCont span").eq(1).text("小王子");
				$(".idenfy .perCont span").eq(2).remove();
				$(".idenfy .perCont span").eq(1).addClass("active").siblings().removeClass("active");
				//$(".scroll").fadeIn();
				var ix = $(".baoHandle .baobao").index($(this).closest("li"));
				$(".idenfy").attr("data-ix",ix);
			}
		}
	});
	
	$(".baobao").bind("click",function(e){
	    var babyid=$(e.currentTarget).find('.txt2').data('babyid');
	    custom=function(){
	    	$(".idenfy").fadeIn();
	    };
	  });
	//日历点击确定
	var t;
	$(".scroll .btn_sure").click(function(e){
			var t1 = $(".scroll .scollItem:eq(0) .active").text();
			var t2 = parseInt($(".scroll .scollItem:eq(1) .active").text())>9 ? $(".scroll .scollItem:eq(1) .active").text() : "0"+$(".scroll .scollItem:eq(1) .active").text();
			var t3 = parseInt($(".scroll .scollItem:eq(2) .active").text())>9 ? $(".scroll .scollItem:eq(2) .active").text() : "0"+$(".scroll .scollItem:eq(2) .active").text();
			t = t1+'/'+t2+"/"+t3;
			
			//录入baby信息
			babyInfo.fYear=t1;
			babyInfo.fMonth=t2;
			babyInfo.fDay=t3;
			
			if(babyInfo.idenfy=='宝妈／爸'){
				$(".idenfy").fadeIn();
			}else{
				//预产期判断
				if(babyInfo.idenfy=='孕妈／爸'){
					if(checkGestationPeriod()){
						if(typeof(custom)=="function"){
							custom();
						}
					}else{
						throw "预产期输入错误！";
					}
				}
			}
	})
	//性别&身份 点击确定
	$(".idenfy .btn_sure").click(function(){
		var str = $(".idenfy").attr("setsex");
		var ix = parseInt($(".idenfy").attr("data-ix"));
		idenfy=$(".idenfy .active").text();
		$('.name .sex').text(idenfy);
		
		//录入 性别&身份 信息
		if($(".idenfy .active").text().indexOf('／')==-1){
			babyInfo.fSex=$(".idenfy .active").text();
		}
		if($(".idenfy .active").text().indexOf('／')!=-1){
			babyInfo.idenfy=$(".idenfy .active").text();
			if(babyInfo.idenfy=='孕妈／爸'){
				$('.tipInfo').html('<span class="span-prompt">请选择预产期</span>');
			}else{
				$('.tipInfo').html('<span class="span-prompt">请选择宝宝出生日期</span>');
			}
		}
		$(".idenfy").removeAttr("setsex");
		if(typeof(custom)=="function"){
			custom();
		}else if(custom=='idenfy'){
			addbaby();
			custom='';//custom用完清空
		}
		$(".idenfy").fadeOut();
	})
	/**
	 * 监控baobao
	 */
	$('.baobao').bind('DOMNodeInserted', domNodeInserted); 
	//日历
	$(".main").scrollEve({
		selectors:{
			obj:".baobao",
			scrollitem:".scollItem",
			item:"span",
			sure:".btn_sure",
			cancle:".btn_cancle",
			active:".active"
		}
	})
})
function loadScrollEve(){
	$(".main").scrollEve({
		selectors:{
			obj:".baobao",
			scrollitem:".scollItem",
			item:"span",
			sure:".btn_sure",
			cancle:".btn_cancle",
			active:".active"
		}
	})
}

/**
 * 数据监控函数
 * @param e
 * @returns
 */
function domNodeInserted(e) {
	//非法数据过滤
	if($(e.target).text().length<10){
		return;
	}
	var time=$(e.target).text().substring(0,10).replace('年','/').replace('月','/').replace('日','');
	var date=new Date(time);
	var datenow=new Date(fmtDate(new Date(),'yyyy/MM/dd'));
	if(babyInfo.idenfy=='孕妈／爸'){
		var dt=280 * 24 * 60 * 60-(date.getTime()-datenow.getTime())/1000;
		if(dt<86400){
			toast('请选择正确天数');
			return;
		}
		$('.baobao').text(parseInt(dt/(24 * 60 * 60 * 7))+"周"+((parseInt(dt%(24 * 60 * 60 * 7)/(24 * 60 * 60)))==0?"":(parseInt(dt%(24 * 60 * 60 * 7)/(24 * 60 * 60)))+"天"));
	}else{
		var dt=(datenow.getTime()-date.getTime())/1000;
		if(dt<-86400){
			toast('请选择正确天数');
			return;
		}
		var age=getDateObject(dt);
		var yearMonth=ageYearMonth(age);
		if(dt==0||yearMonth.indexOf('天')!=-1){
			yearMonth='0岁';
		}
		$('.baobao').text(yearMonth);
	}
}
/**
 * 修改身份信息
 * @returns
 */
function modifyIdenfy(){
	custom='idenfy';
	
	var txt = $(this).find(".txt2").text();
	var str = "<span>孕妈／爸</span><span class='active'>宝妈／爸</span>";
	$(".idenfy .perCont").html(str);
	$(".idenfy").fadeIn();
	var len =(".idenfy .perCont span").length;
	$(".idenfy .perCont span").each(function(){
		var txt2 = $(this).text();
		if(txt==txt2){
			$(this).addClass("active").siblings("span").removeClass("active");
		}
	})
}
/**
 * 检查孕期
 * @returns
 */
function checkGestationPeriod(){
	var date=new Date(babyInfo.fYear+"/"+babyInfo.fMonth+"/"+babyInfo.fDay);
	var nowdate=new Date(fmtDate(new Date(),'yyyy/MM/dd'));
	var ycqss=280 * 24 * 60 * 60;
	var nowdayss=(nowdate.getTime()-date.getTime())/1000;
	if(nowdayss+ycqss> ycqss||-nowdayss+24 * 60 * 60>ycqss){
		toast("请输入正确预产期");
		return false;
	}else{
		return true;
	}
}