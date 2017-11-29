$(function(){
	//日历
	$(".addmiao").scrollEve({
		selectors:{
			obj:".birth",
			scrollitem:".scollItem",
			item:"span",
			sure:".btn_sure",
			cancle:".btn_cancle",
			active:".active"
		}
	})
	//单选按钮
	$(".form,.addmiao").on("click",".radio",function(){
		$(this).find(".i-radio").addClass("i-radioactive");
		$(this).siblings(".radio").find(".i-radio").removeClass("i-radioactive");
		if($(this).hasClass("others")){
			$(".addmiao2 .addbtn").hide();
			$(".addmiao2 .item").hide();
		}
		else if($(this).hasClass("mother")){
			$(".addmiao2 .addbtn").hide();
			$(".addmiao2 .item").not(".duedate").hide();
			$(".addmiao2 .duedate").css("display","-webkit-box");
			
		}
		else{
			$(".addmiao2 .addbtn").show();
			$(".addmiao2 .item").not(".duedate").show();
			$(".addmiao2 .duedate").removeAttr("style");
		}
	})
	//添加宝贝
	$(".addmiao2 .addbtn").on("click",function(){
		if(!$(this).hasClass("remove")){		
			var str = $(".addmiao2 .item").eq(0).html();
			var len = $(".addmiao2 .item").length;
			if(len==2){
				$(".addmiao2 .item:eq(0)").after("<div class='item'id='newitem'><div class='newitemcont'>"+str+"</div></div>");
				$(".addmiao2 .item").eq(len-1).find(".item-tit").text("喵二：");
			}else if(len==3){
				$(".addmiao2 .item:eq(1)").after("<div class='item'id='newitem'><div class='newitemcont'>"+str+"</div></div>");
				$(".addmiao2 .item").eq(len-1).find(".item-tit").text("喵三：");
			}
			else{
				return false;
			}
		}
		$("#newitem .i-arrow").addClass("i-dele").removeClass("i-arrow");
	})
	//删除宝贝
	$(".addmiao").on("click",".i-dele",function(e){
		if($(e.target).hasClass("i-dele")){
			$(e.target).closest("#newitem").remove();
		}
	})
	//初始化宝宝生日--默认当前时间为宝宝生日
	$('#b1').empty();
	//获取当前日期
	var now_date=fmtSecond(new Date().getTime()/1000);
	var b1_birth=now_date.replace('-','年').replace('-','月').replace(' ','日');
	b1_birth=b1_birth.substring(0,11);
	
	$('#b1').append(b1_birth);
	//--------------------初始化end
	
})

//<!-- 不修改h5样式，禁止表单直接被提交 -->
function sub(){
    return false;
}
/**
 * 提交前信息整理
 */
function active(){
	//身份信息
	var identity={};
	//身份状态信息 0 宝妈；1 孕妈；2 其他
	var status=obtainIdentity();
	
	//验证结果
	var bool=true;
	
	if(status==0){
		identity={};//清空身份信息
		
		var babys=obtainBabyInfo();
		//验证宝宝信息
		bool=verification(babys);
		if(!bool){
			toast('宝宝生日不能大于今天');
			bool=false;
		}else{
			identity.identity='MOM';
			identity.babys=JSON.stringify(babys);
		}
	}else if(status==1){
		identity={};//清空身份信息
		
		var pregnancy_mother={};
		var date=$('.item')[$('.item').length-1].children[2].innerText;
		date=date.replace('年','-').replace('月','-').replace('日',' ').concat('23:59:59');
		var time=getTime(date)/1000;
		
		//sex 性别 0 未知 birthday预产期
		pregnancy_mother.sex='UNKNOW';
		pregnancy_mother.birthday=time;
		identity.identity='GRAVIDA';
		var arr=new Array();
		arr.push(pregnancy_mother);
		identity.babys=JSON.stringify(arr);
		
		
		//验证孕期
		//1) 预产期不能早于当天日期，否则提示“无效日期”
		//2) 预产期不能大于280天，从当前日期开始算，否则提示“无效日期”

		bool=verification(null,pregnancy_mother);
		if(!bool){
			toast('无效日期');
			bool=false;
		}
	}else{
		identity={};//清空身份信息
		identity.identity='HELPER';
	}
	//完成后所跳转的url
	identity.toUrl=toUrl;
	
	if(bool){
		reg_submit(identity);
	}
}
/**
 * 注册提交
 */
function reg_submit(identity){
	HH.ajax({
		data:identity,
		url: '/yzmm/account/userInfoReg',
		callback:function(data){
			if(data.success){
				//成功后跳转历史链接
				window.location.href=data.ext;
			}else{
				toast(data.msg);
			}
		}
	});
}
/**
 * 获取身份信息
 * 
 * return 0 宝妈；1 孕妈；2 其他
 */
function obtainIdentity(){
	var identitys=getColumn(0).children[1].children;
	for (var int = 0; int < identitys.length; int++) {
		var identity=identitys[int];
		var className=identity.children[0].className;
		if(className.indexOf('i-radioactive')!=-1){
			return int;
		}
	}
}
/**
 * 获取宝宝信息
 */
function obtainBabyInfo(){
	var items=$('.item');
	var babys=new Array();
	
	//宝宝性别规则：1：男 2：女
	//int 1 是因为 去掉了身份信息那一栏，保证获取到的都是宝宝信息； items.length-1 去除了 孕妈预产期的信息
	for (var int = 1; int < items.length-1; int++) {
		var baby={};
		//获取宝宝元素
		var baby_hml=items[int].children;
		if(int>1){
			baby_hml=items[int].children[0].children;
		}
		//获取宝宝性别
		for(var i=0;i<baby_hml[1].children.length;i++){
			var status=baby_hml[1].children[i].children[0].className;
			if(status.indexOf('i-radioactive')!=-1){
				if(i==0){
					baby.sex='MALE';
				}else if(i==1){
					baby.sex='FAMALE';
				}
			}
		}
		
		//获取宝宝生日
		var birth=baby_hml[2].innerText;
		birth=birth.replace('年','-').replace('月','-').replace('日',' ').concat('23:59:59');
		//获取宝宝生日秒数
		var birthTime=getTime(birth)/1000;
		baby.birthday=birthTime;
		
		babys.push(baby);
	}
	return babys;
}

/**
 * 获取指定栏位：如身份信息、宝宝信息
 * @param index
 * @returns
 */
function getColumn(index){
	return $('.item')[index];
}

/**
 * 验证
 * babys 有值时 验证宝宝生日不能大于当天
 * pregnancy 有值时 验证孕妈 
 */
function verification(babys,pregnancy_mother){
	if(babys!=null){
		for (var int = 0; int < babys.length; int++) {
			var baby=babys[int];
			
			//获取宝宝生日秒数
			var birth=baby.birthday;
			
			//获取当前日期秒数（23:59:59）
			var nowTime=getUnixTime();
			
			//生日time不能大于当天time
			if(birth>nowTime){
				return false;
			}
		}
	}else{
		var birth=pregnancy_mother.birthday;
		var nowTime=getUnixTime();
		//280天转秒
		var pregnancy=nowTime+60*60*24*280;
		//生日time不能大于当天time
		if(birth<nowTime){
			return false;
		}else if(birth>pregnancy){
			return false;
		}
	}
	return true;
}
/**
 * 获取当前日期（23:59:59）秒数 
 * @returns {Number}
 */
function getUnixTime(){
	//获取当前日期秒数（23:59:59）
	var nowTime=new Date().getTime()/1000;
	var nowDate=fmtSecond(nowTime);
	nowDate=nowDate.substring(0,11).concat('23:59:59');
	nowTime=getTime(nowDate)/1000;
	return nowTime;
}

//取消
function cancelSubmit(){
	window.location.href="/yzmm/account/cancelSubmit";
}