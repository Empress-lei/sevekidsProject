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
			$(".choose-other").show();
			$(".othercont").animate({"bottom":"0"},300);
			$(".addmiao2 .duedate").removeAttr("style");
		}
		else if($(this).hasClass("mother")){
			$(".addmiao2 .addbtn").hide();
			$(".addmiao2 .item").not(".duedate").hide();
			$(".addmiao2 .duedate").css("visibility","visible");
			
		}
		else{
			$(".addmiao2 .addbtn").show();
			$(".addmiao2 .item").not(".duedate").show();
			$(".addmiao2 .duedate").removeAttr("style");
		}
	})
	//选择其他
	$(".othercont a").on("click",function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(".other i").last().text($(this).text());
		$(".othercont").animate({"bottom":"-100%"},300,function(){
			$(".choose-other").hide();
		});
	})
	//添加宝贝
	$(".addmiao2 .addbtn").on("click",function(){
		if(!$(this).hasClass("remove")){		
			var str = $(".addmiao2 .item").eq(0).html();
			var len = $(".addmiao2 .item").length;
			if(len<3){
				$(".addmiao2 .item:eq(0)").after("<div class='item'>"+str+"</div>");
				$(".addmiao2 .item").eq(len-1).find(".item-tit").text("喵二：");
				$(this).addClass("remove")
			}
			else{
				return false;
			}
		}
		else{
			$(".addmiao2 .item").eq(1).remove();
			$(this).removeClass("remove")
		}
	})
	$(".btn:eq(0) a:eq(0)").on("click",function(){
		$(".container").addClass("slideTop");
	})
})