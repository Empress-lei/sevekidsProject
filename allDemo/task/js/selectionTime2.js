$(function(){
    // 初始化
	var hourLeft,minuteLeft,hourRight,minuteRight;
	var flag=true; //
	var  dateBox = $('.choiceDate');
	var objLeft,objRight;
    // 获取当前时间
    var curTime = new Date();
    var curHour = getData(curTime.getHours());
    console.log(curHour);
    var curMinute = getData(curTime.getMinutes());
    console.log(curMinute);
    var timeInner = $('.show-time');
    var swiperHourLeft;
	var swiperMinuteLeft;
	var swiperHourRight;
	var swiperMinuteRight;
	var n=0;
    // 点击warpPage左右时间  出现时间页面
	    $(".edit p.timeLeft").click(function(){
            // 获取每项任务的自定义id
            var index = $(this).parent('div').parent('div').parent('div')[0].dataset.id;
            // 获取到每项任务名称的值
            var titie = $(this).parent('div').parent('div').find('p').eq(0).html();
            // 获取图片
            var leftImg = $(this).parent('div').parent('div').parent('div').find('img').eq(0).attr("src");
            console.log(leftImg);
            var leftTime = $(this).parent('div').parent('div').find('.timeLeft').eq(0).html();
            console.log(leftTime);
            var rightTime = $(this).parent('div').parent('div').find('.timeRight').eq(0).html();
            console.log(rightTime);
            var topDistance = $(window).scrollTop(); 
            // 截取名称带有（）的标题
            var titleSlice = titie.split('（')[0];
			console.log("title="+titie);
            //将时间右边的标题设置为页面中的标题
            $('.headerLeft span').eq(0).html( titleSlice);
            $('.headerLeft .leftImg').eq(0).attr('src',leftImg);
            $('.headerLeft .startTimeCurrent').eq(0).html( leftTime);
            $('.headerLeft .endTimeCurrent').eq(0).html( rightTime);
            //  赋值索引
            $('.headerLeft span').eq(0)[0].dataset.id = index;
            $('.headerLeft .leftImg').eq(0)[0].dataset.id = index;
            dateBox.fadeIn();
            $('.wrapPage').css('position','fixed');
            $('.wrapPage').css('top',-topDistance);
            objLeft=$(this);
            // 左边时间的值
            var t=objLeft.text();
            // 截取：
            var a=t.split(":");
            hourLeft=a[0];
            minuteLeft=a[1];
			var text = $('#headerRight').html();
            console.log(text);
			if(titie!='入睡'){
				objRight=objLeft.siblings("p");
                console.log(objRight);
				t=objRight.text();
				console.log(t);
				a=t.split(":");
				console.log(a);
				hourRight=a[0];
				minuteRight=a[1];
                var firstHour = $('.headerLeft .startTimeCurrent').html().split(':')[0]*1;
                console.log(firstHour);
                var firstmins = $('.headerLeft .startTimeCurrent').html().split(':')[1]*1;
                console.log(firstmins);
                var lastHour =  $('.headerLeft .endTimeCurrent').html().split(':')[0]*1;
                var lastmins = $('.headerLeft .endTimeCurrent').html().split(':')[1]*1;
				$('.endTime').show();
				$('.endNum').show();
                $('.headerRight').html('下一项&nbsp;&nbsp;>');
                $('.endTimeCurrent').show();
				initSwiperLeft();
				initSwiperRight();
			}else{
				initSwiperLeft();
                $('.endTime').hide();
				$('.endNum').hide();
                $('.endTimeCurrent').html('<span class="show-time">23</span> ：<span class="show-time">59</span>');
                $('.headerRight').html('完成');
                $('.endTimeCurrent').hide();
			}	
			flag=true;     
		});
		$(".edit p.timeRight").click(function(){
			 // 获取每项任务的自定义id
            var index = $(this).parent('div').parent('div').parent('div')[0].dataset.id;
            // 获取到每项任务名称的值
            var titie = $(this).parent('div').parent('div').find('p').eq(0).html();
            // 获取图片
            var leftImg = $(this).parent('div').parent('div').parent('div').find('img').eq(0).attr("src");
            console.log(leftImg);
            var leftTime = $(this).parent('div').parent('div').find('.timeLeft').eq(0).html();
            console.log(leftTime);
            var rightTime = $(this).parent('div').parent('div').find('.timeRight').eq(0).html();
            console.log(rightTime);
            var topDistance = $(window).scrollTop(); 
            // 截取名称带有（）的标题
            var titleSlice = titie.split('（')[0];			
			console.log("title="+titie);
            //将时间右边的标题设置为页面中的标题
            $('.headerLeft span').eq(0).html( titleSlice);
            // var img = $('.headerLeft .leftImg').eq(0).attr('src',leftImg);
            $('.headerLeft .leftImg').eq(0).attr('src',leftImg);
            // console.log(img);
            $('.headerLeft .startTimeCurrent').eq(0).html( leftTime);
            $('.headerLeft .endTimeCurrent').eq(0).html( rightTime);
            //  赋值索引
            $('.headerLeft span').eq(0)[0].dataset.id = index;
            $('.headerLeft .leftImg').eq(0)[0].dataset.id = index;
            dateBox.fadeIn();
            $('.wrapPage').css('position','fixed');
            $('.wrapPage').css('top',-topDistance);
            objLeft=$(this);
            // 左边时间的值
            var t=objLeft.text();
            // 截取：
            var a=t.split(":");
            hourLeft=a[0];
            minuteLeft=a[1];
			var text = $('#headerRight').html();
            console.log(text);
			if(titie!='入睡'){
				objRight=objLeft.siblings("p");
                console.log(objRight);
				t=objRight.text();
				console.log(t);
				a=t.split(":");
				console.log(a);
				hourRight=a[0];
				minuteRight=a[1];
                var firstHour = $('.headerLeft .startTimeCurrent').html().split(':')[0]*1;
                console.log(firstHour);
                var firstmins = $('.headerLeft .startTimeCurrent').html().split(':')[1]*1;
                console.log(firstmins);
                var lastHour =  $('.headerLeft .endTimeCurrent').html().split(':')[0]*1;
                var lastmins = $('.headerLeft .endTimeCurrent').html().split(':')[1]*1;
				$('.endTime').show();
				$('.endNum').show();
                $('.endTimeCurrent').show();
                $('.headerRight').html('下一项&nbsp;&nbsp;>');
				initSwiperLeft();
				initSwiperRight();
			}else{
				initSwiperLeft();
                $('.endTime').hide();
				$('.endNum').hide();
                $('.endTimeCurrent').html('<span class="show-time">23</span> ：<span class="show-time">59</span>');
                $('.headerRight').html('完成');
                $('.endTimeCurrent').hide();
			}	
			flag=true; 
		});		
        $("div.layer").click(function() {
            $(this).parent().fadeOut();
            $('.wrapPage').css('position','relative');
            $('.wrapPage').css('top',0);
        })
        //点击时间页面上的确定按钮 
		$("#headerRight").click(function(){
            // 获取前后时间的值
            var firstHour = $('.headerLeft .startTimeCurrent').html().split(':')[0]*1;
            var firstmins = $('.headerLeft .startTimeCurrent').html().split(':')[1]*1;
            var lastHour =  $('.headerLeft .endTimeCurrent').html().split(':')[0]*1;
            var lastmins = $('.headerLeft .endTimeCurrent').html().split(':')[1]*1;
            console.log(lastmins);
            var leftImg = $('.headerLeft .leftImg').attr("src",$('.surTime').eq(index).find('img').attr('src'));
            console.log(leftImg);
            var index =  $('.headerLeft span').eq(0)[0].dataset.id;
            var index =  $('.headerLeft .leftImg').eq(0)[0].dataset.id;
            var totalIndex = $('.surTime').length;
            var dom = $(this);
            var topDistance1 = $('.wrapPage').scrollTop();
            var m = 0; 
            console.log(topDistance1);
            if(firstHour>lastHour){
                toast('结束时间不能小于开始时间 请重新填写');
            }else if(firstmins>=lastmins && firstHour==lastHour){
                toast('结束时间不能小于开始时间 请重新填写');
            }else {
                setDate(firstHour,firstmins,lastHour,lastmins,index);
                index++;
                if(index<totalIndex){
                    click(dom,index);
                }else{
                    dateBox.fadeOut();
                    $('.wrapPage').css('position','relative');
                    
                    $('.wrapPage').css('top',0);
                }
            }
				
		});
        
        function click(dom,index){
            dom.off();
            $('.headerLeft span').eq(0).html($('.surTime').eq(index).find('.timeArrange').children('p').html().split('（')[0]);
            $('.headerLeft .leftImg').eq(0).attr('src',$('.surTime').eq(index).find('img').attr('src'));
            $('.headerLeft .startTimeCurrent').eq(0).html($('.surTime').eq(index).find('.timeArrange').children('div').children('.timeLeft').html());
            $('.headerLeft .endTimeCurrent').eq(0).html($('.surTime').eq(index).find('.timeArrange').children('div').children('.timeRight').html());
            $('.headerLeft span').eq(0)[0].dataset.id = index;
            $('.headerLeft .leftImg').eq(0)[0].dataset.id = index;
            //initSwiper();
			initSwiperLeft();
            dom.click(function(){
            var firstHour = $('.headerLeft .startTimeCurrent').html().split(':')[0]*1;
            var firstmins = $('.headerLeft .startTimeCurrent').html().split(':')[1]*1;
            var lastHour =  $('.headerLeft .endTimeCurrent').html().split(':')[0]*1;
            var lastmins = $('.headerLeft .endTimeCurrent').html().split(':')[1]*1;
            var index =  $('.headerLeft span').eq(0)[0].dataset.id;
            var index =  $('.headerLeft .leftImg').eq(0)[0].dataset.id;
            var totalIndex = $('.surTime').length;
            var dom = $(this);
            var topDistance1 = $('.wrapPage').scrollTop();
            var m = 0;
            console.log(topDistance1);
            if(firstHour>lastHour){
                toast('结束时间不能小于开始时间 请重新填写');
            }else if(firstmins>=lastmins && firstHour==lastHour){
                toast('结束时间不能小于开始时间 请重新填写');
            }else {
                setDate(firstHour,firstmins,lastHour,lastmins,index);
                index++;
                console.log(index);
                if(index<totalIndex){
                    click(dom,index);
                }else{
                    dateBox.fadeOut();
                    $('.wrapPage').css('position','relative');
                    $('.wrapPage').css('top',0);

                    }
                }
                m = topDistance1;
                console.log(m);
            });
			var title=$(".headerLeft  span.title").text();
			var str=title.substring(0,2);
            console.log("title="+str);
            var rightTimeEnd = $('.endTimeCurrent').html();
            console.log(rightTimeEnd);
			
			if(str=='入睡'){
                $('.endTime').hide();
			    $('.endNum').hide();
                $('.endTimeCurrent').html('<span class="show-time">23</span> ：<span class="show-time">59</span>');
                $('.headerRight').html('完成');
                $('.endTimeCurrent').hide();
                
			}else{
                $('.endTime').show();
				$('.endNum').show();
				initSwiperRight();
                $('.endTimeCurrent').show();
			}
				
			
        }
        // 给warpPage添加时间，并且修改字体颜色
		function setDate(firstHour,firstMins,lastHour,lastMins,index){
            if(firstHour<10){
              firstHour = "0"+firstHour;
            }
            if(firstMins<10){
              firstMins = "0"+firstMins;
            }
               $('.surTime').eq(index).find('.timeLeft').html(firstHour + ":" +firstMins);
            // 添加时间修改颜色
            $('.surTime').eq(index).find('.timeLeft').addClass('current');
            
            if(lastHour<10){
              lastHour = "0"+lastHour;
            }
            if(lastMins<10){
              lastMins = "0"+lastMins;
            }
            $('.surTime').eq(index).find('.timeRight').html(lastHour + ":" +lastMins);
            // 添加时间修改颜色
            $('.surTime').eq(index).find('.timeRight').addClass('current');
		}  	
        // 获取时间
        function getData(num){
            if (num<10){
                return '0'+num;
            }else {
                return num;
            }
        }
        // 初始化Swiper 开始时间、结束时间定位到当前时间。
		function initSwiperLeft(){
            var firstHours = $(".headerLeft .startTimeCurrent").html().split(":")[0]*1-1;
            var firstMins = $(".headerLeft .startTimeCurrent").html().split(":")[1]*1/5-1;

			//console.log("firstHours="+firstHours+",firstMins="+firstMins+",lastHours="+lastHours+",lastMins="+lastMins);

            // 左边的小时
            swiperHourLeft = new Swiper('#dateHourLeft',{
            direction: 'vertical',
            loop: true,
            slidesPerview:'auto',
            initialSlide :firstHours,
            loopAdditionalSlides : 1,
            height: 60,
            autoplayDisableOnInteraction: false,
            centeredSlides: true,
            paginationClickable: true,
            onSlideChangeEnd:function(swiper){
                //  获取索引
                var hours = $(".startHour .swiper-slide-next").html();
                var firstTime =hours+ ":" +$(".headerLeft .startTimeCurrent").html().split(":")[1];
                $(".headerLeft .startTimeCurrent").html(firstTime);
                }
            });
            // 左边的分钟
            swiperMinuteLeft = new Swiper('#dateMinuteLeft',{
                direction: 'vertical',
                loop: true,
                slidesPerview:'auto',
                loopAdditionalSlides : 1,  
                autoplayDisableOnInteraction: false,             
                initialSlide :firstMins ,
                height: 60,
                centeredSlides: true,
                paginationClickable: true,
                onSlideChangeEnd:function(swiper){
                    var mins = $(".startMinute .swiper-slide-next").html();
                    var firstTimes =$(".headerLeft .startTimeCurrent").html().split(":")[0]+ ":" + mins;
                    $(".headerLeft .startTimeCurrent").html(firstTimes);
                }
            });
        } 
		
		function initSwiperRight(){
            var lastHours = $(".headerLeft .endTimeCurrent").html().split(":")[0]*1-1;
            var lastMins = $(".headerLeft .endTimeCurrent").html().split(":")[1]*1/5-1;
			
			//console.log("firstHours="+firstHours+",firstMins="+firstMins+",lastHours="+lastHours+",lastMins="+lastMins);
			
          console.log("lastHours="+lastHours+",lastMins="+lastMins);
		  
            // 右边的小时
            swiperHourRight = new Swiper('#dateHourRight',{
                direction: 'vertical',
                loop: true,
                slidesPerview:'auto',
                loopAdditionalSlides : 1,
                autoplayDisableOnInteraction: false,
                height: 60,
                centeredSlides: true,
                paginationClickable: true, 
                initialSlide :lastHours ,
                onSlideChangeEnd:function(swiper){
                    //  获取索引
                    var hours = $(".endHour .swiper-slide-next").html();
                    var firstTime =hours+ ":" +$(".headerLeft .endTimeCurrent").html().split(":")[1];
                    $(".headerLeft .endTimeCurrent").html(firstTime);
                }
            });
            // 右边的分钟
            swiperMinuteRight = new Swiper('#dateMinuteRight',{
                direction: 'vertical',
                loop: true,
                slidesPerview:'auto',
                loopAdditionalSlides : 1,
                autoplayDisableOnInteraction: false,
                initialSlide :lastMins ,
                height: 60,
                centeredSlides: true,
                paginationClickable: true,
                onSlideChangeEnd:function(swiper){
                    var mins = $(".endMinute .swiper-slide-next").html();
                    var firstTimes =$(".headerLeft .endTimeCurrent").html().split(":")[0]+ ":" + mins;
                    $(".headerLeft .endTimeCurrent").html(firstTimes);
                }  
            });
        } 
});
        

