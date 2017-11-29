var i=0;
$(function() {

	//底部固定导航的切换
	//左边切换
	var cardImgGray = './img/navImg/card.png';
	var cardImgOrange = './img/navImg/cardOra.png';
	var moneyGray = './img/navImg/money.png';
	var moneyOrange = './img/navImg/moneyOra.png';
	var rankingGray = './img/navImg/ranking.png';
	var rankingOrange = './img/navImg/rankingOra.png';
	//获取打卡图片
	var img = $(".btnNav :nth-child(1) img");
	var src = $(img).attr('src');
	//获取成长基金图片
	var img1 = $(".btnNav :nth-child(2) img");
	var src1 = $(img1).attr('src');
	//获取排行版图片
	var img2 = $(".btnNav :nth-child(3) img");
	console.log(img2);
	var src2 = $(img2).attr('src');
	console.log(src2);
	//点击左边的p文字
	$(".btnNav :nth-child(1)").on('click', function() {
		$(".btnNav :nth-child(1) p").removeClass('navText').addClass('navText1');
		$(".btnNav :nth-child(1) img").attr('src', cardImgOrange);
		$(".btnNav :nth-child(2) p").removeClass('navText1').addClass('navText');
		$(".btnNav :nth-child(2) img").attr('src', moneyGray);
		$(".btnNav :nth-child(3) p").removeClass('navText1').addClass('navText');
		$(".btnNav :nth-child(3) img").attr('src', rankingGray);
		$(".btnNav :nth-child(4) p").removeClass('navText1').addClass('navText');
	});
	$(".btnNav :nth-child(2)").on('click', function() {
		$(".btnNav :nth-child(1) p").removeClass('navText1').addClass('navText');
		$(".btnNav :nth-child(1) img").attr('src', cardImgGray);
		$(".btnNav :nth-child(2) p").removeClass('navText').addClass('navText1');
		$(".btnNav :nth-child(2) img").attr('src', moneyOrange);
		$(".btnNav :nth-child(3) p").removeClass('navText1').addClass('navText');
		$(".btnNav :nth-child(3) img").attr('src', rankingGray);
		$(".btnNav :nth-child(4) p").removeClass('navText1').addClass('navText');
	});
	$(".btnNav :nth-child(3)").on('click', function() {
		$(".btnNav :nth-child(1) p").removeClass('navText1').addClass('navText');
		$(".btnNav :nth-child(1) img").attr('src', cardImgGray);
		$(".btnNav :nth-child(2) p").removeClass('navText1').addClass('navText');
		$(".btnNav :nth-child(2) img").attr('src', moneyGray);
		$(".btnNav :nth-child(3) p").removeClass('navText').addClass('navText1');
		$(".btnNav :nth-child(3) img").attr('src', rankingOrange);
		$(".btnNav :nth-child(4) p").removeClass('navText1').addClass('navText');
	});
	$(".btnNav :nth-child(4)").on('click', function() {
		$(".btnNav :nth-child(1) p").removeClass('navText1').addClass('navText');
		$(".btnNav :nth-child(1) img").attr('src', cardImgGray);
		$(".btnNav :nth-child(2) p").removeClass('navText1').addClass('navText');
		$(".btnNav :nth-child(2) img").attr('src', moneyGray);
		$(".btnNav :nth-child(3) img").attr('src', rankingGray);
		$(".btnNav :nth-child(4) p").removeClass('navText1').addClass('navText');
		$(".btnNav :nth-child(4) p").removeClass('navText').addClass('navText1');
	});
	setInterval('gaibian()',1000);
	// var ss=document.querySelector('#shakeslow');
	// var __si = setInterval(function(){
	// 	ss.classList = 'shake shake-slow hover';
	// 	setTimeout(function(){
	// 		ss.classList='shake shake-slow';
	// 		//限定隔了2秒后只抖动一次
	// 		/*clearInterval(__si);*/
	// 	},500)
	// },4000)
})
function gaibian(){
	if(i==0){
		i=1;
		$("#wo").removeClass("zhuan_left");
		$("#wo").addClass("zhuan_right");
	}else{
		i=0;
		$("#wo").addClass("zhuan_left");
		$("#wo").removeClass("zhuan_right");
	}

}
