window.onload=function(){
	//initMyImgShow();
}

function closeMyImg(){
	//$("#popup>.bg>img").fadeOut("slow");
	//$("#popup>.bg>img").fadeOut("2000");
	//定时删除
	//setTimeout(removeMyImg(),500);
	$(".popup").remove();
}
function removeMyImg(){
	$(".popup").remove();
}

function initMyImgShow(){
	
	$('img').unbind("click").bind('click', function(event) {
		var isbig = $(this).data("big")+"";
		if("false" == isbig){
			return ;
		}
		var myImg = new Image;
		myImg.src = $(this).attr("src");
		var bg = "";
		bg += '<div id="popup" class="popup" onclick="closeMyImg(this)">';
		bg += '<div class="bg"><img  src="'+myImg.src+'" alt="" width="'+screen.width+'"/></div>';
		bg += '</div>';
		//$(this).parent().after(bg);
		$("body").append(bg); 
		//当前屏幕举例顶部的高度 document.body.scrollTop
		//网页可见的高度  document.body.clientHeight
		//添加css样式，设置图片定位
		$("#popup").css({"position":"fixed","width":"100%","max-width":"540px","background-color" : "rgba(0,0,0,0.5)","height":window.screen.height+78});
		$("#popup").css({"top":"0%","margin-top":"-50px"});
		$("#popup").css({"z-index":"999"});
		//$("#popup>.bg>img").css({"height":window.screen.height/2});
		//调整居中
		var topHeight = (window.screen.height-$(".bg:first>img").height())/2;
		if(topHeight < 0  ){
			//全屏显示
			$("#popup>.bg").css({"margin-top":"13%"});
			$("#popup>.bg>img").css({"width":"100%"})
		}else{
			//水平居中
			$("#popup>.bg").css({"padding-top":topHeight+"px"});
		}
		//取消淡入淡出效果，由于其他定位影响显示
		//设置img  style="display:none;"
		//$("#popup>.bg>img").fadeIn("slow");
		//$("#popup>.bg>img").fadeIn("2000");
		
		
	  });
	
	//$("img").click(function(event){})
}

