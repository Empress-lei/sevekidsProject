// JavaScript Document
function closeleftmenu(){
	$(".leftmenu").animate({left:"-88%"});
	$(".main").animate({left:"0"});
	$(".gb .gb1").removeClass("slide-btn1")
	$(".gb .gb1").addClass("slide-btn")
	$("#pbdiv").hide();
	$("body,html").css({overflow:"auto"})
}
$(function(){
	$(".gb .gb1").click(function(){
		if($(".gb .gb1").hasClass("slide-btn")){
			$(".leftmenu").animate({left:"0"});
			$(".main").animate({left:"88%"});
			$(".gb .gb1").removeClass("slide-btn")
			$(".gb .gb1").addClass("slide-btn1")
			$("body,html").css({overflow:"hidden"})
			$("#pbdiv").show();
		}else{
			closeleftmenu();
		}
	})
	$(".leftmenu .menugb,.leftmenu .nav-list,#pbdiv").click(function(){
		closeleftmenu();
	});
	
$(".footer .fixed-box a").click(function(){
		$(".footer .fixed-box a").css("color","#999")
		$(this).css("color","#e51812")
		})
	$(".footer .ft1").click(function(){
		
		$(".footer .fixed-box .ft2").removeClass("z2")
		$(".footer .fixed-box .ft3").removeClass("z3")
		$(this).addClass("z1")
		})	
	$(".footer .ft2").click(function(){
		
		$(".footer .fixed-box .ft1").removeClass("z1")
		$(".footer .fixed-box .ft3").removeClass("z3")
		$(this).addClass("z2")
		})	
	$(".footer .ft3").click(function(){
		
		$(".footer .fixed-box .ft2").removeClass("z2")
		$(".footer .fixed-box .ft1").removeClass("z1")
		$(this).addClass("z3")
		})			
	  
	})