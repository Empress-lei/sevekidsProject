$(function(){
	//搜索框获取焦点
	$(".searchTxt input").focus(function(){
		$(this).addClass("inputFocus");
		$(".search .his").hide();
		$(".cancleBtn").show();
	})
	//搜索框输入内容
	$(".searchTxt input").keyup(function(){
		var str = $(this).val();
		$(".searchTxt input").focus();
		if(str.length!=0){
			$(".search .clear").show();
		}
		else{
			$(".search .clear").hide();
		}
	})
	//清除搜索框内容
	$(".search .clear").click(function(){
		$(".searchTxt input").val("");
		$(".searchTxt input").focus();
		$(this).hide();
	})
	//取消按钮
	$(".cancleBtn").click(function(){
		$(".searchTxt input").val("");
		$(".search .clear").hide();
		$(".searchTxt input").removeClass("inputFocus");
		$(this).hide();
		$(".search .his").show();
	})
})