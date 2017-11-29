$(function() {
	//获取弹层页面
	var timePage = $('.messEdit');
	//宝宝出生日期
	var scrollYear,scrollMonth,scrollDay;
	//获取当前的年月日
	var curTime = new Date();
	var curYear = curTime.getFullYear(); 
	console.log(curYear);
	var curMonth = curTime.getMonth()+1 >= 10 ? curTime.getMonth()+1 : ("0" + (curTime.getMonth()+1)); 
	console.log(curMonth);
	var curDate = curTime.getDate() >= 10 ? curTime.getDate() : ("0" + curTime.getDate()); 
	console.log(curDate);
	var babyMumTime = curYear;
	console.log(babyMumTime);
	var preMumTime = curYear + "年"  + curMonth + "月" + curDate + "日";
	console.log(preMumTime)
	var swiperYear,swiperMonth,swiperDay;
	//点击页面中的选择时间的位置出现弹层
	$('.babyMumEdit div').off();
	//点击宝妈/爸弹层出现
	$('.babyMumEdit div').click(function() {
		if($(this).hasClass('editRightTrans')) {
			$(this).removeClass('editRightTrans').addClass('editRightOrange');
		}
		timePage.fadeIn();
		$('.preMumEdit').fadeOut();
		$('.needMess').hide();
		$('.babyDate').text('宝宝出生年月日');
		$('.messSex').show();
		$('.messName').show();
	});
	$('.preMumEdit div').off();
	//点击孕妈/爸弹层出现
	$('.preMumEdit div').click(function() {
		if($(this).hasClass('editRightTrans')) {
			$(this).removeClass('editRightTrans').addClass('editRightOrange');
		}
		$('.babyDate').text('您的预产期是？');
		$('.messSex').hide();
		$('.messName').hide();
		timePage.fadeIn();
		$('.babyMumEdit').hide();	
		$('.needMess').hide();
	});
	//点击返回按钮，返回页面选择初始状态，不要带有选中
	$('.leftGrayBtn').off();
	$('.leftGrayBtn').click(function() {
		timePage.fadeOut();
		$('.preMumEdit').show();
		$('.needMess').show();
		if($('.preMumEdit div').hasClass('editRightOrange')) {
			$('.preMumEdit div').removeClass('editRightOrange').addClass('editRightTrans');
		}
		$('.babyMumEdit').show();
		if($('.babyMumEdit div').hasClass('editRightOrange')) {
			$('.babyMumEdit div').removeClass('editRightOrange').addClass('editRightTrans');
		}
	});
	initSwiper(curYear,curMonth,curDate);
	//点击选择是男孩还是女孩
	$('.grilEdit div').click(function() {
		if($(this).hasClass('editRightTrans')) {
			$(this).removeClass('editRightTrans').addClass('editRightOrange');
			$(this).parent().parent().children().eq(2).find('div').removeClass('editRightOrange').addClass('editRightTrans');
		}
	})
	$('.boyEdit div').click(function() {
		if($(this).hasClass('editRightTrans')) {
			$(this).removeClass('editRightTrans').addClass('editRightOrange');
			$(this).parent().parent().children().eq(1).find('div').removeClass('editRightOrange').addClass('editRightTrans');
		}
	})
	//选择宝宝出生日期
	function initSwiper(curYear, curMonth, curDate) {
		//获取年、月、日的索引值
		var yearIndex = curYear - 1981 - 1;
		var monthIndex = curMonth - 1 - 1;
  		var dateIndex = curDate - 1 - 1;
		swiperYear = new Swiper('#swiperYear', {
			direction: 'vertical',
			height: 43,
			loop: true,
			initialSlide: yearIndex,
			centeredSlides: true,
			paginationClickable: true,
			observer: true, //修改swiper自己或子元素时，自动初始化swiper
			observeParents: true, //修改swiper的父元素时，自动初始化swiper
			onSlideChangeEnd:function(swiper){
                var idx=swiper.activeIndex;
                console.log(idx);
                var o=$("#swiperYear").children("div.swiper-wrapper").find("div:eq("+idx+")");
                //获取当前选中的年的值
                var curTime = $('.scrollDate .swiper-slide-next').eq(0).html();
                console.log(curTime);
                if(babyMumTime >= curTime) {
//              	alert('选择的时间不能大于当前时间');
                }
          },
		})
		swiperMonth = new Swiper('#swiperMonth', {
			direction: 'vertical',
			height: 43,
			loop: true,
			initialSlide: monthIndex,
			centeredSlides: true,
			paginationClickable: true,
			observer: true, //修改swiper自己或子元素时，自动初始化swiper
			observeParents: true, //修改swiper的父元素时，自动初始化swiper
			onSlideChangeEnd:function(swiper){
                var idx=swiper.activeIndex;
                console.log(idx);
                var o=$("#swiperMonth").children("div.swiper-wrapper").find("div:eq("+idx+")");
                //获取当前选中的月的值
                var curTime = $('.scrollDate .swiper-slide-next').eq(1).html();
				console.log(curTime);
            }
		})
		swiperDay = new Swiper('#swiperDay', {
			direction: 'vertical',
			height: 43,
			loop: true,
			initialSlide: dateIndex,
			centeredSlides: true,
			paginationClickable: true,
			observer: true, //修改swiper自己或子元素时，自动初始化swiper
			observeParents: true, //修改swiper的父元素时，自动初始化swiper
			onSlideChangeEnd:function(swiper){
                var idx=swiper.activeIndex;
                console.log(idx);
                var o=$("#swiperDay").children("div.swiper-wrapper").find("div:eq("+idx+")");
                //获取当前选中的日的值
                var curTime = $('.scrollDate .swiper-slide-next').eq(2).html();
                console.log(curTime);
            }
		})
	}
});



