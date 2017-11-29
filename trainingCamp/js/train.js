//记录文本框中的字数
function fn() {
	var len = $(".font13 textarea").val().length;
	$(".font13 p span").text(len);
	$(".font13 textarea").css('height','2rem');
}
function vfn() {
	var len = $(".font13 textarea").val().length;
	if(len < 10) {
		toast("至少输入10个字符");
		return false;
	}
}
//左右滑动切换
var ints = 0;
//切换当前是第几天（后面的值从0开始）
var initialSlide = 2;
//记录成绩
var transcript = false;
//记录宝贝成长变化上面按钮的文字显示在文本框中
$(function() {
	$.each($('.hiddenTxt .txtContent img'), function() {
		var alt = "点击查看大图";
		$(this).attr('title', alt).after('<p class="lookText">' + alt + '</p>');
	});
	$('.btnEvaluate li').click(function() {
		if($(this).hasClass('orangeBtn')) {
			$(this).removeClass('orangeBtn');
		} else {
			$(this).addClass('orangeBtn').siblings('li').removeClass('orangeBtn');
		}
	});
	var isheight;
	$('.presenTop').click(function() {
		if($(this).hasClass("ignoreClick")){
			return;
		}
		isheight = $(".autoheight1").height();
		$(this).hide();
		$(this).siblings(".hiddenTxt").show();
		$(this).siblings(".btnDiv").show();
		$(".autoheight1").css("height",$(this).parents(".swiper-slide").height()+32);
	});
	$('.btnDiv').click(function() {
		$(this).hide();
		$(".autoheight1").height(isheight);
		$(this).siblings(".hiddenTxt").hide();
		$(this).siblings(".presenTop").show();
	});
	//连续打卡奖励通知弹层
	$('.weekTask').click(function() {
		$('.signShare').fadeIn();
	})
	$('#btnReceive').click(function() {
		$('.signShare').fadeOut();
	})
	//第一次进入点击打卡、音频、显示全部显示的弹层
	$('.backTitle').click(function() {
		$('.posterShare').fadeIn();
	})
	$('.posterShare .conThreeBotImg').click(function() {
		$('.posterShare').fadeOut();
	})
	//点击打卡领金币的时候弹层意见反馈
	$('.noSign .btnJi').click(function() {
		$('.changeShare').fadeIn();
	});
	$('.changeShare .conThreeBotImg').click(function() {
		$('.changeShare').fadeOut();
	});
	//首次打卡成功弹层上面的x图标，弹层消失
	$('.firstPunch .conThreeBotImg').click(function() {
		$('.firstPunch').fadeOut();
	});
	$('.planJoinBtn').click(function() {
		$('.changeShare').fadeOut();
		$('.firstPunch').fadeIn();
	});
	//打卡成功弹层提示
	$('.cardSussShare .invitationBtn').click(function() {
		$('.cardSussShare').fadeOut();
		$('.promptShare').fadeIn();
	});
	$('.cardSussShare .conThreeBotImg').click(function() {
		$('.cardSussShare').fadeOut();
	});
	//点击分享页阴影处消失
	$('.promptShare').click(function() {
		$('.promptShare').fadeOut();
	});
	//点击打卡未开启这几个字，红包弹层出现
	$('.signTit h3').click(function() {
		$('.receiveRed').fadeIn();
	});
	$('.receiveRed').click(function() {
		$('.receiveRed').fadeOut();
	});
	//提示用户当前有正在进行中的活动弹层消失
	$('.textWhole ').click(function() {
		$('.currentShare').fadeIn();
	});
	$('.btnRight').click(function() {
		$('.currentShare').fadeOut();
	});
	//打卡规则说明
	$('.titLeft ').click(function() {
		$('.ruleShare').fadeIn();
	});
	$('.knowBtnJoin').click(function() {
		$('.ruleShare').fadeOut();
	});
	$(".weekStars li div").on('click', function() {
		if($(this).hasClass('starsGray')) {
			$(this).addClass('starsOrange').removeClass('starsGray');
			$(this).next().addClass('active');
			$('.signTit1').show();
			$('.signTit').hide();
			$('.btnJi').hide();
			$('.btnJi1').show();
			$('.succShare').show().fadeOut(2000);
		}
	})
	//点击继续弹层消失继续下一个页面
	$(".guideShareClass .continueBtn").click(function() {
		$(this).parent().fadeOut();
		$(".classShare").fadeIn();
	});
	$(".classShare .continueBtn").click(function() {
		$(this).parent().fadeOut();
		$(".cardShare").fadeIn();
	});
	$(".cardShare .continueBtn").click(function() {
		$(this).parent().fadeOut();
		$(".fundPosShare").fadeIn();
	});
	$(".fundPosShare .continueBtn").click(function() {
		$(this).parent().fadeOut();
		$(".redBoxShare").fadeIn();
	});
	$(".redBoxShare .continueBtn").click(function() {
		$(this).parent().fadeOut();
	});
	// 点击继续弹层消失继续下一个页面结束
	//点击打卡显示的朦层提示
	$(".btnNav :nth-child(1)").click(function() {
		$(".guideShareClass").fadeIn();
	});
	//点击请朋友听
	$(".btnNav :nth-child(4)").click(function() {
		$(".promptShare").fadeIn();
	});
	//点击成长基金出现打卡成功提示
	$(".bannerVipImg").click(function() {
		$(".cardSussShare").fadeIn();
	});

//	$(".todaySign").eq(initialSlide).removeClass("hide").parent(".swiper-slide").siblings(".swiper-slide").find(".todaySign").addClass("hide");
	//获取图片上的日期
	var textDate = $('.textData1').text();
	console.log(textDate);
	var transcript = true;
	var swiper1 = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		slidesPerView: 5,
		initialSlide: initialSlide,
		centeredSlides: true,
		controlBy:'container',
		paginationClickable: true,
		spaceBetween:13,
		slideToClickedSlide: true,
		onSlideChangeEnd: function(swiper) {
			console.log(swiper.activeIndex -1)
			if(transcript){
				if($(".csf").length == swiper.activeIndex + 1) {
					$('.recommend').show();
					$('.signBto').hide();
					$('.line').show();
					$('.wrapPage .signImg .conText .textDate').text('成绩单');
					$('.todaySign').eq(swiper.activeIndex + 1).text('');
					
				} else {
					$('.recommend').hide();
					$('.signBto').show();
					$('.line').show();
					// $(".listDetails").parent().parent().parent().find('.signBto').hide();
					// $('.textData1').text(textDate);
				}
			}
			if(swiper.activeIndex==0){
				$('.signBto').hide();
			}else{
				$('.signBto').show();
			}
		},
		onClick: function(swiper){
			console.log(swiper.activeIndex);
			$(".cst").eq(swiper.activeIndex).find(".spanCir").addClass("bigCir").removeClass("grayCir").parents().siblings().find($('.cst .spanCir')).removeClass('bigCir').addClass('grayCir');
		}
	});
	// $(".listDetails").parent().parent().parent().find('.signBto').hide();
	//首先进来默认是第几天的就显示图片为大
	if($(initialSlide)) {
		$('.datenum .swiper-wrapper .swiper-slide-active .spanCir').removeClass('grayCir').addClass('bigCir');
	}
	var swiper3 = new Swiper('.fontDate', {
		pagination: '.swiper-pagination',
		slidesPerView: 5,
		initialSlide: initialSlide,
		centeredSlides: true,
		controlBy:'container',
		paginationClickable: true,
		spaceBetween:13,
		slideToClickedSlide: true,
	});
	swiper3.params.control = swiper1;
	swiper1.params.control = swiper3;
	var swiper2 = new Swiper('.test', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		slidesPerView: 'auto',
		autoHeight: true,
		initialSlide: initialSlide,
		control: [swiper1, swiper3],//控制前面两个Swiper
		slideToClickedSlide: true,
		onSlideChangeEnd: function(swiper) {
			$(".cst").eq(swiper.activeIndex).find(".spanCir").addClass("bigCir").removeClass("grayCir").parents().siblings().find($('.cst .spanCir')).removeClass('bigCir').addClass('grayCir');
		},
	});
	swiper1.params.control = swiper2;
	swiper3.params.control = swiper2;
	for(var i = 1; i < 8; i++) {
		audioPlayer(i);
	}
	initMyImgShow();
})