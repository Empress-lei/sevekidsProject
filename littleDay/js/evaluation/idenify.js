var custom;//自定义函数     注：用完清空
var userInfo={};
$(function(){
	$('.idenfyItem span:eq(0)').on('click',function(){
		$('.idenfyItem span:eq(1)')[0].className='';
		this.className='active';
	});
	$('.idenfyItem span:eq(1)').on('click',function(){
		$('.idenfyItem span:eq(0)')[0].className='';
		this.className='active';
	});
	//校验时间
	function varificationDate(){
		var today = new Date();
		var y = today.getFullYear();
		var years=$(".scrollList .year span");
		for (var int = 0; int < years.length; int++) {
			var year=$(years[int]).text();
			if(year==y){
				$(years[int]).click();
			}
		}
		var m = today.getMonth()+1;
		var months=$(".scrollList .month span");
		for (var int = 0; int < months.length; int++) {
			var month=$(months[int]).text();
			if(month==m){
				$(months[int]).click();
			}
		}
		
		var d = today.getDate();
		var days=$(".scrollList .day span");
		for (var int = 0; int < days.length; int++) {
			var day=$(days[int]).text();
			if(day==d){
				$(days[int]).click();
			}
		}
	}
	//执行函数
	var submitEvents=function(){
		if(userInfo.babySex=='小王子'){
			userInfo.babySex='MALE';
		}else if(userInfo.babySex=='小公主'){
			userInfo.babySex='FAMALE';
		}else{
			userInfo.babySex='UNKNOW';
		}
		userInfo.cpId=cpid;
		HH.ajax({
    		url:"/yzmm/account/evaluation/result/saveIdentity",
    		async:false,
    		data:userInfo,
    		callback:function(data){
    			
    			if(data.code == 200){
    				HH.href("/yzmm/account/evaluation/evaluationProblemList?cpResultId="+data.ext);
    			}
    			else{
    				toast(data.msg);
    				throw data.msg;
    			}
    		}
    	});
	};
	
	$(".idenify img:eq(0)").on("click",function(){
		userInfo.userIdentity='MOM';
		custom=function(){
			$(".idenfy").fadeIn();
			custom=function(){
				submitEvents();
				$(".idenfy").fadeOut();
				custom="";
			};
		}
		varificationDate();
		$(".scroll").fadeIn();
	});
	$(".idenify span:eq(0)").on("click",function(){
		userInfo.userIdentity='MOM';
		custom=function(){
			$(".idenfy").fadeIn();
			custom=function(){
				submitEvents();
				$(".idenfy").fadeOut();
				custom="";
			};
		}
		varificationDate();
		$(".scroll").fadeIn();
	});
	$(".idenify img:eq(1)").on("click",function(){
		userInfo.userIdentity='GRAVIDA';
		$('.tipInfo').html('<span class="span-prompt">请选择预产期</span>');
		custom=function(){
			submitEvents();
			$(".scroll").fadeOut();
		}
		varificationDate();
		$(".scroll").fadeIn();
	});
	$(".idenify span:eq(1)").on("click",function(){
		userInfo.userIdentity='GRAVIDA';
		$('.tipInfo').html('<span class="span-prompt">请选择预产期</span>');
		custom=function(){
			submitEvents();
			$(".scroll").fadeOut();
		}
		varificationDate();
		$(".scroll").fadeIn();
	});
	$(".idenify img:eq(2)").on("click",function(){
		userInfo.userIdentity='MIAOXINGREN';
		submitEvents();
	});
	$(".idenify span:eq(2)").on("click",function(){
		userInfo.userIdentity='MIAOXINGREN';
		submitEvents();
	});
	
	//日历点击确定
	var t;
	$(".scroll .btn_sure").click(function(e){
			var t1 = $(".scroll .scollItem:eq(0) .active").text();
			var t2 = parseInt($(".scroll .scollItem:eq(1) .active").text())>9 ? $(".scroll .scollItem:eq(1) .active").text() : "0"+$(".scroll .scollItem:eq(1) .active").text();
			var t3 = parseInt($(".scroll .scollItem:eq(2) .active").text())>9 ? $(".scroll .scollItem:eq(2) .active").text() : "0"+$(".scroll .scollItem:eq(2) .active").text();
			t = t1+'/'+t2+"/"+t3;
			userInfo.fYear=t1;
			userInfo.fMonth=t2;
			userInfo.fDay=t3;
			
			//录入baby信息
			userInfo.babyAge=new Date(t).getTime()/1000;
			if(userInfo.userIdentity=='MOM'){
				if(varificationBabyBirthday(t)){
					if(typeof(custom)=="function"){
						custom();
					}
				}
			}
			//预产期判断
			else if(userInfo.userIdentity=='GRAVIDA'){
				if(checkGestationPeriod()){
					var ycq=getYcq(t);
					if(typeof(custom)=="function"){
						custom();
					}
				}else{
					throw "预产期输入错误！";
				}
			}
	})
	var getYcq=function(time){
		var date=new Date(time);
		var datenow=new Date(fmtDate(new Date(),'yyyy/MM/dd'));
		var dt=280 * 24 * 60 * 60-(date.getTime()-datenow.getTime())/1000;
		if(dt<86400){
			toast('请选择正确天数');
			throw '';
			return false;
		}
		return parseInt(dt/(24 * 60 * 60 * 7))+"周"+((parseInt(dt%(24 * 60 * 60 * 7)/(24 * 60 * 60)))==0?"":(parseInt(dt%(24 * 60 * 60 * 7)/(24 * 60 * 60)))+"天");
	}
	/**
	 * 验证宝宝生日
	 */
	var varificationBabyBirthday=function(time) {
		var date=new Date(time);
		var datenow=new Date(fmtDate(new Date(),'yyyy/MM/dd'));
		var dt=(datenow.getTime()-date.getTime())/1000;
		if(dt<0){
			toast('请选择正确天数');
			throw "";
			return false;
		}
		var age=getDateObject(dt);
		var yearMonth=ageYearMonth(age);
		if(dt==0||yearMonth.indexOf('天')!=-1){
			yearMonth='0岁';
		}
		return yearMonth;
	}
	//性别&身份 点击确定
	$(".idenfy .btn_sure").click(function(){
		var str = $(".idenfy").attr("setsex");
		var ix = parseInt($(".idenfy").attr("data-ix"));
		idenfy=$(".idenfy .active").text();
		$('.name .sex').text(idenfy);
		
		//录入 性别&身份 信息
		if($(".idenfy .active").text().indexOf('／')==-1){
			userInfo.babySex=$(".idenfy .active").text();
		}
		
		$(".idenfy").removeAttr("setsex");
		if(typeof(custom)=="function"){
			custom();
		}else if(custom=='idenfy'){
			custom='';//custom用完清空
		}
	})
	//性别&身份 点击确定
	$(".idenfy .btn_cancle").click(function(){
		$(".idenfy").fadeOut();
	})
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

/**
 * 检查孕期
 * @returns
 */
function checkGestationPeriod(){
	var date=new Date(userInfo.fYear+"/"+userInfo.fMonth+"/"+userInfo.fDay);
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