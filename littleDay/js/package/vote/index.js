$(function(){
	var mySwiper = new Swiper('.swiper-container',{
		direction: 'vertical',
		onlyExternal : true,
	});
	
	//第二页点击“马上参与”按钮
	$(".page-three .jionBtn").click(function(){
		mySwiper.slideNext();
	})
	//选择辣妈
	$(".mumlist li").click(function(){
		var age = $(this).data("age");
		$("#agegroup").val(age);
		mySwiper.slideNext();
		var ix = $(this).index();
		localStorage.motherix = ix;
		$(".page-two .photo").hide();
		$(".page-two .photo").eq(ix).show();
		$(".page-two .name").hide();
		$(".page-two .name").eq(ix).show();
	})
	//选择特质
	$(".tagList").delegate("li","click",function(){
		var txt = $(this).find("span").text();
		var len = $(".page-six .tagactive").length;
		if(len==3){
			promptEve('最多只能选择3个哟');
		}
		else{
			var cando = true;//可以添加到上面
			$(".page-six .tag").each(function(){
				var thistxt = $(this).find("span").text();
				if(txt==thistxt){
					promptEve('不能选择两个相同的哟');
					cando = false;
					return false;
				} 
			});
			$(".page-six .tag").each(function(){
				if(!cando){
					return;
				}
				if(!$(this).hasClass("tagactive")){
					$(this).find("span").text(txt);
					$(this).addClass("tagactive");
					return false;
				}
			});
			
		}
	})
	//清除某一特质
	$(".page-six .close").click(function(){
		$(this).parent().removeClass("tagactive");
		$(this).parent().find("span").text("未选择标签");
	})
	//点击确定按钮
	$(".page-six .sureBtn").click(function(){
		var txt = $(".page-six input").val();
		var len = $(".page-six .tagactive").length;
		if(len<3){
			if($.trim(txt)!=""){
				//校验文本是否涉及非法内容
				HH.ajax({
					url: "/yzmm/account/vote/verifyText",
					data:{
						text:txt
						},
					async:true,
					callback:function(data){
						if(data.success){
							$(".page-six .tag").each(function(){
								var thistxt = $(this).find("span").text();
								if(txt==thistxt){
									promptEve('不能选择两个相同的哟');
									return false;
								}
								else{
									if(!$(this).hasClass("tagactive")){
										$(this).find("span").text(txt);
										$(this).addClass("tagactive");
										return false;
									}
								}
							})
						}else{
							promptEve(data.msg);
							return false;
						}
					}
				});
			}
			else{
				promptEve('请不要填写为空的哟');
			}
		}
		else if(len==3){
			promptEve('最多只能选择3个哟');
		}
		
	});
	//点击选完了
	$(".page-six .completeBtn").click(function(){
		var len = $(".page-six .tagactive").length;
		if(len<3){
			promptEve('请选择三个特质');
		}
		else{
			mySwiper.slideNext();
			var txt1 = $(".page-six .tag1").find("span").text();
			var txt2 = $(".page-six .tag2").find("span").text();
			var txt3 = $(".page-six .tag3").find("span").text();
			
			//年龄段
			var ageGroup =$("#agegroup").val();
			 HH.ajax({
				    url:'/yzmm/account/vote/labelSelectPage',
				    data:{
				    	ageGroup:ageGroup,
				    	txt1:txt1,
				    	txt2:txt2,
				    	txt3:txt3
				    	},
				    callback:function(data,params){
				    	var h = "";
				   		if(data.success){
				   		//字数判断
						var tlen1 = txt1.length;
						var tlen2 = txt2.length;
						var tlen3 = txt3.length;
						if(tlen1==3){
							$(".page-one .tag1,.page-two .tag1").css({
								"font-size":"0.4rem",
								"line-height":"0.4rem"
							});
						}
						else if(tlen1==4){
							$(".page-one .tag1,.page-two .tag1").css({
								"font-size":"0.24rem",//30
								"line-height":"0.26666667rem"
							});
						}
						if(tlen2==3){
							$(".page-one .tag2,.page-two .tag2").css("font-size","0.58666667rem");
						}
						else if(tlen2==4){
							$(".page-one .tag2,.page-two .tag2").css("font-size","0.45333333rem");//34
						}
						if(tlen3==3 ||tlen3==4){
							$(".page-one .tag3,.page-two .tag3").css("font-size","0.34666667rem");//26
						}
						$(".page-one .tag1,.page-two .tag1").text(txt1);
						$(".page-one .tag2,.page-two .tag2").text(txt2);
						$(".page-one .tag3,.page-two .tag3").text(txt3);
						$(".data i").eq(0).text(txt1);
						$(".data i").eq(1).text(txt2);
						$(".data i").eq(2).text(txt3);
						
						//初始化我的选择占比
						initMySel(txt1,txt2,txt3);
				   	}
				}
			});
		}
	})
	//点击更多数据
	$(".page-two .otherMeb").click(function(){
		topList();
		mySwiper.slideNext();
	})
	//点击“邀请朋友参加”
	$(".page-two .jionBtn").click(function(){
		//mySwiper.slideTo(6,10,false);
		$(".shareLayer").show();
	})
	//点击分享弹层
	$(".shareLayer").click(function(){
		$(this).hide();
	})
	//点击左箭头
	localStorage.motherix = 0;
	$(".page-two .goL").click(function(){
		var ix = parseInt(localStorage.motherix)+1;
		if(ix>2){
			ix=0;
		}
		localStorage.motherix = ix;
		$(".page-two .photo").hide().removeClass("zoomIn");
		$(".page-two .photo").eq(ix).show().addClass("zoomIn");
		$(".page-two .name").hide().removeClass("zoomIn");
		$(".page-two .name").eq(ix).show().addClass("zoomIn");
	})
	//点击右箭头
	$(".page-two .goR").click(function(){
		var ix = parseInt(localStorage.motherix)-1;
		if(ix<0){
			ix=2;
		}
		localStorage.motherix = ix;
		$(".page-two .photo").hide().removeClass("zoomIn");
		$(".page-two .photo").eq(ix).show().addClass("zoomIn");
		$(".page-two .name").hide().removeClass("zoomIn");
		$(".page-two .name").eq(ix).show().addClass("zoomIn");
	});
})
function promptEve(txt){
	var html = "<div class='prompt'><div class='promptBox'><span>"+txt+"</span></div></div>";
	$("body").append(html);
	$(".prompt").fadeIn();
	setTimeout(function(){
		$(".prompt").fadeOut();
		$(".prompt").remove();
	},1000)
}
/**
 * 初始化我的选择
 */
function initMySel(txt1,txt2,txt3){
	var txts = [txt1,txt2,txt3].join(",");
	HH.ajax({
		url:"/yzmm/account/vote/ajaxSelProportion",
		data:{"labels":txts},
		callback:function(data,params){
			for (var i = 0; i < data.length; i++) {
				$(".data i").eq(i).text(data[i].title);
				$(".data span").eq(i+1).text(data[i].proportion);
			}
		}
	})
}
function topList(){
		HH.ajax({
			url:"/yzmm/account/vote/ajaxTopList",
			data:{},
			callback:function(data,params){
				var _h = ""
				for (var i = 0; i < data.length; i++) {
					_h += "<li>";
					_h += "<div class='tit'>"+data[i].title+"</div>";
					_h += "<div class='bar'></div>";
					_h += "<div class='value'>"+data[i].proportion+"</div>";
					_h += "</li>";
				}
				$(".perdata").append(_h);
			}
		})
	}	
