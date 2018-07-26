;(function($){
	var stopWindowDefault = {
		windowdefaultEvent: function(windowflag){
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
		slide:function(options){
			document.onselectstart=function (){return false;};
			var defaults = {

			};
			var ops = $.extend({},defaults,options);	
			var obj = $(this);
			var sx,mx,ex,lx,ow;
			var ix = 0;
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
				scrolltart:function(e){
					flag = true;
					sx = e.pageX || e.originalEvent.targetTouches[0].pageX;
					lx = obj.offset().left;
					ow = obj.parent().width();
					sw = obj.width();
				},
			    scrollmove: function(e){
					if(flag){
						e.preventDefault();
						e.stopPropagation();
						mx = e.pageX || e.originalEvent.targetTouches[0].pageX;
						ex = mx-sx;
						if(ex>0){
							obj.css("left",ex);
							$(".dragBg").width(ex);
						}
						if(ex>=ow-sw){
							obj.hide();
							$(".right").show();
							$(".dragTxt").css("color","#fff");
							$(".dragTxt").text("验证通过")
						}
					}
			    },
			    scrollend: function(){
					flag = false;
					if(ex<ow-sw){
						obj.css("left","0px");
						$(".dragBg").width("0px");
					}
			    }
			}
			touchEvents.initTouchEvents();
			obj.on(touchEvents.touchstart,scrollEvents.scrolltart);
			obj.on(touchEvents.touchmove,scrollEvents.scrollmove);
			obj.on(touchEvents.touchend,scrollEvents.scrollend);

		}
	});
})(jQuery);
