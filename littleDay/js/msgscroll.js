/*
$.fn.msgscroll = function(options){
	var defaults = {
		setFlag:function(){

		}
	};
	var opts = $.extend({},defaults,options);
	var obj = $(this);
	var i = 0;
	var str="";
	var flag = true;
	if(opts.money){
		str= "<li><div class='name'>"+opts.username+"：</div><div class='word'><span class='money'></span>"+opts.money+"</div></li>";
	}
	else if(opts.flower){
		str= "<li><div class='name'>"+opts.username+"：</div><div class='word'><span class='flower'></span></div></li>";
	}
	else{
		str= "<li><div class='name'>"+opts.username+"：</div><div class='word'>"+opts.msg+"</div></li>";
	}
	
	var lt = obj.offset().top;
	var lh = obj.height();
	var uh = obj.find("ul").height();
	var st = Math.abs(parseInt(obj.find("ul").css("top")));
	var h = obj.find("li").eq(0).height();
	console.log(st);
	console.log(uh-lh);
	if(uh-lh>=st){
		obj.find("ul").css("top",-st-h);
	}
	obj.find("ul").append(str);
	//obj.scrollTop(uh-lh);

}
$(".liveVote").scroll(function(){
	var sst = $(this).scrollTop();
	var slh = $(this).height();
	var suh = $(this).find("ul").height();
	//console.log(sst);
	$(this).find("ul").css("top",-sst);
})
<script>
var i = 0;
$(".reward").click(function(){
	++i;
	$(".liveVote").msgscroll({
		username:"小红妈妈",
		money:"￥"+i,
		//flower:"true",
		//msg:"哈哈哈"
	})
})



</script>


*/
$(function(){
	var wh = $(window).height();
	var w1 = $(".live").eq(0).height();
	var w2 = $(".liveBottom").height();
	var w3 = $(".liveVote").height();
	$(".liveVote").height(wh-w1-w2+w3-44);
})