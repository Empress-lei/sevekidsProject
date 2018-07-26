$(function(){
   document.onreadystatechange = function () {      
       if(document.readyState=="complete") {  
       		$(".load").hide();          
		  	var mySwiper = new Swiper('.swiper-container',{
				direction: 'vertical',
				onlyExternal : true,
			});  
			//文字判断
			var txt1 = $(".page-one .tag1").find("span").text();
			var txt2 = $(".page-one .tag2").find("span").text();
			var txt3 = $(".page-one .tag3").find("span").text();
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
       }     
   } 
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