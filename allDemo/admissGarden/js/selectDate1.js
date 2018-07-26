$(function() {
	//幼儿园开园时间
	var scrollYear1,scrollMonth1,scrollDay1;
	var selectTime = $('.scrollDateTime');
	//获取当前的年月日
	var curTime1 = new Date();
	var curYear1 = curTime1.getFullYear(); 
	console.log(curYear1);
	var curMonth1 = curTime1.getMonth()+1 >= 10 ? curTime1.getMonth()+1 : ("0" + (curTime1.getMonth()+1)); 
	console.log(curMonth1);
	var curDate1 = curTime1.getDate() >= 10 ? curTime1.getDate() : ("0" + curTime1.getDate()); 
	console.log(curDate1);
	var timeInner1 = $('.showTime1');
	var swiperYear1,swiperMonth1,swiperDay1;
	//点击页面中的选择时间的位置出现弹层
	$('#modify').click(function() {
		selectTime.fadeIn();
		initSwiper1(curYear1,curMonth1,curDate1); 	
	});
	//点击取消，时间页面消失
	$('.btn_cancle1').click(function() {
		selectTime.fadeOut();
	});
	//点击时间页面上的“确定”按钮，设置时间  页面取消
	$('.btn_sure1').click(function() {
		//获取当前的时间
		var z = curYear1 + "年"  + curMonth1 + "月" + curDate1 + "日";
		console.log(z)
		//获取时间页面上选择到的时间
		var s1=  timeInner1.eq(0).html()+"年"+ timeInner1.eq(1).html()+"月"+ timeInner1.eq(2).html()+"日";
		console.log(s1);
		if(s1 < z) {
			toast('所选时间不能小于当前时间');
		}else {
			selectTime.fadeOut();
			$("#messDate1").children("#nickSpan1").html(s1);
		}
	})
	//点击幼儿园开园时间
	function initSwiper1(curYear1, curMonth1, curDate1) {
		//获取年、月、日的索引值
		var yearIndex1 = curYear1 - 2014 - 1;
		var monthIndex1 = curMonth1 - 1 - 1;
  		var dateIndex1 = curDate1 - 1 - 1;
		swiperYear = new Swiper('#swiperYear1', {
			direction: 'vertical',
			height: 45,
			loop: true,
			initialSlide: yearIndex1,
			centeredSlides: true,
			paginationClickable: true,
			observer: true, //修改swiper自己或子元素时，自动初始化swiper
			observeParents: true, //修改swiper的父元素时，自动初始化swiper
			//改变顶部年的值
			onSlideChangeEnd:function(swiper){
                var idx=swiper.activeIndex;
                console.log(idx);
                var o=$("#swiperYear1").children("div.swiper-wrapper").find("div:eq("+idx+")");
                var curTime1 = $('.scrollDateTime .swiper-slide-next').eq(0).html();
                timeInner1.eq(0).html(curTime1);
          },
		})
		swiperMonth = new Swiper('#swiperMonth1', {
			direction: 'vertical',
			height: 45,
			loop: true,
			initialSlide: monthIndex1,
			centeredSlides: true,
			paginationClickable: true,
			observer: true, //修改swiper自己或子元素时，自动初始化swiper
			observeParents: true, //修改swiper的父元素时，自动初始化swiper
			//改变顶部月的值
			onSlideChangeEnd:function(swiper){
                var idx=swiper.activeIndex;
                console.log(idx);
                var o=$("#swiperMonth1").children("div.swiper-wrapper").find("div:eq("+idx+")");
                var curTime1 = $('.scrollDateTime .swiper-slide-next').eq(1).html();
                timeInner1.eq(1).html(curTime1);
            }
		})
		swiperDay = new Swiper('#swiperDay1', {
			direction: 'vertical',
			height: 45,
			loop: true,
			initialSlide: dateIndex1,
			centeredSlides: true,
			paginationClickable: true,
			observer: true, //修改swiper自己或子元素时，自动初始化swiper
			observeParents: true, //修改swiper的父元素时，自动初始化swiper
			//改变顶部日的值
			onSlideChangeEnd:function(swiper){
                var idx=swiper.activeIndex;
                console.log(idx);
                var o=$("#swiperDay1").children("div.swiper-wrapper").find("div:eq("+idx+")");
                var curTime1 = $('.scrollDateTime .swiper-slide-next').eq(2).html();
                timeInner1.eq(2).html(curTime1);
            }
		})
	}
});



