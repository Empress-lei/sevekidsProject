$(function(){
	/*如何抢占封面*/
	$(".wordTit").on("click",function(){
		$(".slidedown").show();
		$(".slidedown-cont").animate({"bottom":"0"},300);
	})
	$(".knowbtn").on("click",function(){
		$(".slidedown-cont").animate({"bottom":"-100%"},300,function(){
			$(".slidedown").hide();
		});
	})
	$(".slidedown").on("click",function(e){
		if($(e.target).hasClass("slidedown")){
			$(".slidedown-cont").animate({"bottom":"-100%"},300,function(){
				$(".slidedown").hide();
			});
		}
	})
	/*图片展示*/
	$(".imglist").on("click","img",function(){
		$(".imgshow").show();
		$(".imgshow img").attr("src","");
		$(".imgshow img").css({
			"width":"0px",
			"height":"0px"
		})
		var img = new Image();
		var url = $(this).attr("data-url");
		img.src = url;
		img.onload = function(){
			var wh = $(window).height();
			var ww = $(window).width();
			var iw = img.width;
			var ih = img.height;
			var per = iw/ih;
			if(iw>ww && ih<wh){
				iw = ww;
				ih = ww/per;
			}
			if(ih>wh && iw<ww){
				iw = per*wh;
				ih = wh;

			}
			if(iw>ww && ih>wh){
				iw = iw*0.7;
				ih = ih*0.7;
			}
			$(".imgshow img").attr("src",url);
			$(".imgshow img").stop().animate({
				"width":iw,
				"height":ih,
				"top":-ih/2
			},500,function(){
				//stopWindowDefault.windowdefaultEvent(false);
			})
		}
	})
	$(".imglist").on("click",".i-delete",function(){
		$(this).parent().parent().remove();
	});
	$(".imgshow-cont").on("click",function(e){
		e.stopPropagation();
		if($(e.target).hasClass("imgshow-cont")){
			//stopWindowDefault.windowdefaultEvent(true);
			$(".imgshow").hide();

		}
	})
})