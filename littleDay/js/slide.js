;(function($){
	var stopWindowDefault = {
		windowdefaultEvent: function(windowflag){
			if(windowflag){
				$("body").removeAttr("style");
			}
			else{
				$("body").css("overflow","hidden");
			}
			window.ontouchmove = function(e){
				e.preventDefault && e.preventDefault();
				e.stopPropagation && e.stopPropagation();
				if(windowflag){
		            e.returnValue=true;
		            return true;	
				}
				else{
			        e.returnValue=false;
			        return false;
				}
			}
		}
	};
	$.fn.extend({
		//日期时间控件
		dateControl:function(options){
			document.onselectstart=function (){return false;};
			var defaults = {
				selectors:{
					slide:".ui-slide",
					slidelist:".ui-slide-list",
					scroll:".ui-slide-scroll",
					txt:".ui-stadus-txt",
					sure:".ui-sure",
					cancle:".ui-cancle",
					active:"ui-slide-active"
				},
				index:2,
				setData:""
			};
			var ops = $.extend({},defaults,options);

			//return this.each(function () {	
			var obj = $(this);
			var id = $(this).attr("id");
			var sy,my,ey,st,ix,sh,ah,len,objh,olen;
			var flag = false;
			var touchEvents = {
			    touchstart: "touchstart",
			    touchmove: "touchmove",
			    touchend: "touchend",
			    initTouchEvents: function () {
					var browser={
						versions:function(){
							var u = navigator.userAgent, app = navigator.appVersion;
							return {//移动终端浏览器版本信息
								trident: u.indexOf('Trident') > -1, //IE内核
								presto: u.indexOf('Presto') > -1, //opera内核
								webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
								gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
								mobile: !!u.match(/AppleWebKit.*Mobile.*/)||u.indexOf('iPad') > -1, //是否为移动终端
								ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
								android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
								iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
								iPad: u.indexOf('iPad') > -1, //是否iPad
								webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
							};
						}(),
						language:(navigator.browserLanguage || navigator.language).toLowerCase()
					}
					if(!browser.versions.mobile){
			            this.touchstart = "mousedown";
			            this.touchmove = "mousemove";
			            this.touchend = "mouseup";
					}
			    },
			};
			var scrollEvents = {
				sy:0,
				my:0,
				ey:0,
				st:0,
				ix:0,
				sh:0,
				ah:$(ops.selectors.scroll).children().eq(0).height(),
				len:0,
				objh:0,
				olen:0,
				_self:"",
				_slide:function(e){
					e.stopPropagation();
					scrollEvents._self = $(this);
					if($(ops.selectors.slide).is(":hidden")){
						$(ops.selectors.slide).show();
						$(ops.selectors.slidelist).slideDown("fast");
						stopWindowDefault.windowdefaultEvent(false);
					}
					else{
						$(ops.selectors.slidelist).slideUp("fast",function(){
							$(ops.selectors.slide).hide();
							stopWindowDefault.windowdefaultEvent(true);
						});
					}
					$(ops.selectors.scroll).each(function(){
						$(this).children().eq(ops.index).addClass(ops.selectors.active).siblings().removeClass(ops.selectors.active);
						$(this).css("top",scrollEvents.ah*2-ops.index*scrollEvents.ah);
					})
					var txt = scrollEvents._self.text();
					var str = txt.split("-");
					$(ops.selectors.scroll).each(function(i){
						$(this).children().each(function(j){
							if(str[i]==$(this).text()){
								$(this).addClass(ops.selectors.active).siblings().removeClass(ops.selectors.active)
								$(this).parent().css("top",scrollEvents.ah*2-j*scrollEvents.ah);
							}
						})
					})
					return scrollEvents._self;
				},
				_slidedown:function(e){
					if(e.target == this)
						$(ops.selectors.slidelist).slideUp("fast",function(){
							$(ops.selectors.slide).hide();
							stopWindowDefault.windowdefaultEvent(true);
						});
				},
				_start:function(e){
					flag = true;
					scrollEvents.sy = e.pageY || e.originalEvent.targetTouches[0].pageY;
					scrollEvents.st = parseInt($(this).css("top"));
					scrollEvents.ah = $(this).children().eq(0).height();
					scrollEvents.len = $(this).children().length-1;
					scrollEvents.objh = $(this).height();
					return sy,st,ah,len,objh;
				},
			    _move: function(e){
					e.stopPropagation;
					if(flag){
						scrollEvents.my = e.pageY || e.originalEvent.targetTouches[0].pageY;
						scrollEvents.ey = scrollEvents.my-scrollEvents.sy;
						if(scrollEvents.ey+scrollEvents.st>=scrollEvents.ah*2){
							scrollEvents.ix = 0;
						}
						else{
							scrollEvents.ix = Math.floor(Math.abs((scrollEvents.ah*2-scrollEvents.ey-scrollEvents.st+scrollEvents.ah/2)/scrollEvents.ah));
						}
						$(this).children().eq(scrollEvents.ix).addClass(ops.selectors.active).siblings().removeClass(ops.selectors.active);
						$(this).css("top",scrollEvents.ey+scrollEvents.st);
						return my,ey,ix;
					}
			    },
			    _end: function(){
					flag = false;
					if(scrollEvents.my){
						scrollEvents.st = parseFloat($(this).css("top"));
						if(scrollEvents.st>=scrollEvents.ah*2){
							scrollEvents.st = scrollEvents.ah*2;
						}
						else if(scrollEvents.st<=scrollEvents.ah*2-scrollEvents.len*scrollEvents.ah){
							scrollEvents.ix = scrollEvents.len;
							scrollEvents.st = scrollEvents.ah*2-scrollEvents.len*scrollEvents.ah;
						}
						else{
							scrollEvents.st = scrollEvents.ah*2-scrollEvents.ix*scrollEvents.ah;
						}
						$(this).attr("data-on",scrollEvents.ix);
						$(this).stop().animate({"top":scrollEvents.st},100);
						$(this).children().eq(scrollEvents.ix).addClass(ops.selectors.active).siblings().removeClass(ops.selectors.active);
						//ops.index = scrollEvents.ix;
						if($(this).attr("data-city")=="1"){
							getCity($(this));
							$(this).next().css("top",2*scrollEvents.ah);
							$(this).next().next().css("top",2*scrollEvents.ah);
						}
						else if($(this).attr("data-city")=="2"){
							getDistrict($(this));
							$(this).next().css("top",2*scrollEvents.ah);
						}
						scrollEvents.my = null;
					}
			    },
			    _sure:function(e){
			    	scrollEvents.olen = $(ops.selectors.scroll).length;
			    	var txt = "";
			    	for(i=0;i<scrollEvents.olen;i++){
			    		if(i<scrollEvents.olen-1){
			    			txt += $(ops.selectors.scroll+":eq("+i+") ."+ops.selectors.active).text()+"-";
			    		}
			    		else{
			    			txt += $(ops.selectors.scroll+":eq("+i+") ."+ops.selectors.active).text();
			    		}
			    	}
			    	scrollEvents._self.text(txt);
			    	scrollEvents._slide(e);
			    }
			}
			obj.on("click",ops.setData);
			obj.on("click",scrollEvents._slide);
			touchEvents.initTouchEvents();
			$(ops.selectors.slidelist).parent().on("click",scrollEvents._slidedown);
			$(ops.selectors.slidelist).on(touchEvents.touchstart,ops.selectors.scroll,scrollEvents._start);
			$(ops.selectors.slidelist).on(touchEvents.touchmove,ops.selectors.scroll,scrollEvents._move);
			$(ops.selectors.slidelist).on(touchEvents.touchend,ops.selectors.scroll,scrollEvents._end);
			$(ops.selectors.sure).on("click",scrollEvents._sure);
			$(ops.selectors.cancle).on("click",scrollEvents._slide);
			$(ops.selectors.slidelist).on("click","span",function(){
				var ix = $(this).index();
				var str = $(ops.selectors.slidelist).find(ops.selectors.scroll).attr("data-value")
				if(str){
					$(ops.selectors.slidelist).find(ops.selectors.scroll).css("top",scrollEvents.ah*2-ix*scrollEvents.ah)
					$(this).addClass(ops.selectors.active).siblings().removeClass(ops.selectors.active)
				}
			})
		//})
		}
	});
})(jQuery);