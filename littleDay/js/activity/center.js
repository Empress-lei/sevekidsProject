$(function(){
	
	var custom;//自定义函数     注：用完清空
	
	//打赏记录、购买记录切换
	$(".tabtop a").click(function(){
		var ix =  $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".tabslide").hide();
		$(".tabslide").eq(ix).show();
	})
	/*修改身份*/
	$(".idenfyValue").click(function(){
		$(".idenfy").fadeIn();
		var txt = $(this).find(".txt2").text();
		var str = "<span>孕妈／爸</span><span class='active'>宝妈／爸</span><span>喵星人</span>";
		$(".idenfy .perCont").html(str);
		var len =(".idenfy .perCont span").length;
		$(".idenfy .perCont span").each(function(){
			var txt2 = $(this).text();
			if(txt==txt2){
				$(this).addClass("active").siblings("span").removeClass("active");
			}
		})
	})
	$(".idenfy .perCont").on("click","span",function(){
		$(this).addClass("active").siblings("span").removeClass("active");
	})
	$(".idenfy .btn_cancle").click(function(){
		$(".idenfy").fadeOut();
	});
	/*添加宝贝*/
	$(".addBtn").click(function(){
		var len1 = $(".baoHandle .baobao").length;
		var len2 = $(".baobao,.baoba2").length;
		var str="";
		var txt="";
		var today = new Date();
		var y = today.getFullYear();
		var m = (today.getMonth()+1)>9 ? today.getMonth()+1 : "0"+(today.getMonth()+1);
		var d = (today.getDate()+1)>9 ? today.getDate() : "0"+(today.getDate());
		$(".removeBtn").show();
		$(".baobao2 .removearrow").addClass("arrow");
		$(".baobao2 .removearrow").removeClass("removearrow");
		$(".removeBtn").text("删除宝贝");	
		$(".baobao2").addClass("baobao");
		$(".baobao2").removeClass("baobao2");
		if(len1<=2){
			if(len2==0){
				txt = "大宝";
			}
			else if(len2==1){
				txt = "二宝";
			}
			else if(len2==2){
				txt = "三宝";
			}
			if(len1==2){
				$(".addBtn").hide();
			}
			str = "<li class='blockitem baobao'><div class='name'>"+txt+"</div><div class='cont'><span class='txt2' data-datime='"+y+"."+m+"."+d+"'>小王子 "+y+"."+m+"."+d+"</span><span class='arrow'></span></div></li>"
		}
		$(".baoBtn").before(str);
		$('.baobao').click();
	})
	//删除宝贝
	$(".removeBtn").click(function(){
		var len = $(".baobao").length;
		if(len<3){
			$(".addBtn").show();
		}
		if($(this).text()=="删除宝贝"){
			$(".baobao .arrow").addClass("removearrow");
			$(".baobao .arrow").removeClass("arrow");
			$(this).text("取消删除");
			$(".baobao").addClass("baobao2");
			$(".baobao").removeClass("baobao");
		}
		else{
			$(".baobao2 .removearrow").addClass("arrow");
			$(".baobao2 .removearrow").removeClass("removearrow");
			$(this).text("删除宝贝");	
			$(".baobao2").addClass("baobao");
			$(".baobao2").removeClass("baobao2");
		}
	})
	$(".baoHandle").on("click",".removearrow",function(){
		var len = $(".baobao2").length;
		if(len==1){
//			$(".removeBtn").hide();
//			$(".removeBtn").text("删除宝贝");
			toast('操作无效，请先修改身份信息');
			return;
		}
		$(".addBtn").show();
		$(this).closest("li").remove();
		$(".baobao2").eq(0).find(".name").text("大宝");
		$(".baobao2").eq(1).find(".name").text("二宝");
		
		// 删除宝宝
		if(typeof(function_del_babyInfo)=="function"){
			var babyId=$(this).parent().find('.txt2').data('babyid');
			function_del_babyInfo(babyId);
		}
	})
	
	//设置宝宝性别和出生日期
	$(".baoHandle").on("click",".baobao",function(e){
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
	});
	$(".baobao").bind("click",function(e){
	    var babyid=$(e.currentTarget).find('.txt2').data('babyid');
	    custom=function(){
	    	$(".idenfy").fadeIn();
	    	custom=function(){
	    		function_edit_babyInfo(babyid);
	    	};
	    };
	  });
	//日历点击确定
	var t;
	$(".scroll .btn_sure").click(function(){
		var setsex = $(".idenfy").attr("setsex");
		if(setsex){
			var t1 = $(".scroll .scollItem:eq(0) .active").text();
			var t2 = parseInt($(".scroll .scollItem:eq(1) .active").text())>9 ? $(".scroll .scollItem:eq(1) .active").text() : "0"+$(".scroll .scollItem:eq(1) .active").text();
			var t3 = parseInt($(".scroll .scollItem:eq(2) .active").text())>9 ? $(".scroll .scollItem:eq(2) .active").text() : "0"+$(".scroll .scollItem:eq(2) .active").text();
			t = t1+'.'+t2+"."+t3;
			$(".scroll").fadeOut();
			$('.baobao .cont .txt2').attr('data-datetime',t);
			if(typeof(custom)=="function"){
				var bool=custom();
				if(bool){
					$(".idenfy").fadeIn();
				}
			}else{
				$(".idenfy").fadeIn();
			}
		}
	})
	//性别&身份 点击确定
	$(".idenfy .btn_sure").click(function(){
		var str = $(".idenfy").attr("setsex");
		var ix = parseInt($(".idenfy").attr("data-ix"));
		if(str){
			t = $(".idenfy .active").text()+" "+t;
			$(".baoHandle .baobao").eq(ix).find(".txt2").text(t);
			$(".idenfy").removeAttr("setsex");
			if(typeof(custom)=="function"){
				custom();
			}
		}else{
			var txt=$(".idenfy .active").text();
			$(".idenfyValue .txt2").text(txt);
			//------------------------执行后台修改身份方法
			var education="";
			switch (txt) {
			case "孕妈／爸":
				education='GRAVIDA';
				break;
			case "宝妈／爸":
				education='MOM';
				break;
			default:
				education='NURSEDAD';
			break;
			}
			
			HH.ajax({
				url:'/yzmm/account/user/modifyIdenfy',
				data:{education: education}, 
				callback:function(data){
					//判断发送是否成功
					if(data.success) {
						/*idenfy 身份信息 0喵  1孕 2宝妈
						 *身份变更逻辑处理 
						 */
						if(idenfy==0){
							switch (education) {
							case 'GRAVIDA'://喵星人变孕妈
								nursedadTransfGravida();
								break;
							case 'MOM'://喵星人变宝妈
								nursedadTransfMom();
								break;
							}
						}else if(idenfy==1){
							switch (education) {
							case 'MOM'://孕妈变宝妈
								gravidaTransfMom();
								break;
							case 'NURSEDAD'://孕妈变喵星人
								gravidaTransfNursedad();
								break;
							}
						}else if(idenfy==2){
							switch (education) {
							case 'GRAVIDA'://宝妈变孕妈
								momTransfGravida();
								break;
							case 'NURSEDAD'://宝妈变喵星人 
								momTransfNursedad();
								break;
							}
						}
					} else {
						toast(data.msg);
					}
				}
			});
			//------------------------执行后台修改方法 end
		}
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
	//--------------逻辑处理方法start
	/**
	 * 身份转换：喵星人变 孕妈爸
	 */
	function nursedadTransfGravida(){
		$('.addBtn').click();//触发添加宝宝事件
		$('.baobao').click();//触发宝宝生日
		$(".baobao").hide();
		
		custom=function(){
			function_save_babyInfo();
			return false;
		}
	}
	/**
	 * 身份转换：喵星人变 宝妈爸
	 */
	function nursedadTransfMom(){
		$('.addBtn').click();//触发添加宝宝事件
		$('.baobao').click();//触发宝宝生日
		
		custom=function(){
			custom=function_save_babyInfo;
			return true;
		}
	}
	/**
	 * 身份转换：宝妈变 孕妈爸
	 */
	function momTransfGravida(){
		$('.baobao').click();//触发宝宝生日
		
		custom=function(){
			var babyid=$(".firstBabyId").data('firstbabyid');
			function_edit_babyInfo(babyid);
			return false;
		}
	}
	/**
	 *  身份转换：宝妈变 喵星人
	 */
	function momTransfNursedad(){
		location.reload();
	}
	/**
	 * 身份转换：孕妈变 宝妈爸
	 */
	function gravidaTransfMom(){
		$('.baobao').click();
		custom=function(){
			custom=function(){
				var babyid=$("#babyBirthday").data('babyid');
				function_edit_babyInfo(babyid);
			};
			return true;
		}
	}
	/**
	 * 身份转换：孕妈变 喵星人
	 */
	function gravidaTransfNursedad(){
		location.reload();
	}
	
	//--------------逻辑处理方法end
	
	/**
	 * 添加宝宝
	 */
	$('.tjbb').click(function(){
		$('.baobao').click();//触发宝宝生日
		custom=function(){
			custom=function_save_babyInfo;
			return true;
		}
	});
	/**
	 * 保存宝宝信息定义
	 */
	var function_save_babyInfo=function(){
		var dateStr=$('.baobao .cont .txt2').attr('data-datetime').replace('.','-').replace('.','-');
		var birthday=getTime(dateStr+" 00:00:00")/1000;
		var sex=$('.idenfyItem .perCont .active').text();
		if(sex=='小王子'){
			sex='MALE';
		}else{
			sex='FAMALE';
		}
		HH.ajax({
			url:'/yzmm/account/user/addBabyInfo',
			data:{birthday: birthday,sex:sex},
			callback:function(data){
				if(data.success){
					location.reload();
				}else{
					toast(data.msg);
				}
			}
		});
	}
	/**
	 * 修改宝宝信息定义
	 */
	var function_edit_babyInfo=function(id){
		var dateStr=$('.baobao .cont .txt2').attr('data-datetime').replace('.','-').replace('.','-');
		var birthday=getTime(dateStr+" 00:00:00")/1000;
		var sex=$('.idenfyItem .perCont .active').text();
		if(sex=='小王子'){
			sex='MALE';
		}else{
			sex='FAMALE';
		}
		HH.ajax({
			url:'/yzmm/account/user/modifyBabyInfo',
			data:{birthday: birthday,sex:sex,id:id},
			callback:function(data){
				if(data.success){
					location.reload();
				}else{
					toast(data.msg);
				}
			}
		});
	}
	/**
	 * 删除宝宝信息
	 */
	var function_del_babyInfo=function(id){
		HH.ajax({
			url:'/yzmm/account/user/deleteBabyInfo',
			data:{id:id},
			callback:function(data){
				if(data.success){
					//删除成功
					toast(data.msg);
				}else{
					toast(data.msg);
				}
			}
		});
	}
})