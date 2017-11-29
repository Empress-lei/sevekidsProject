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
		scrollEve:function(options){
			document.onselectstart=function (){return false;};
			var defaults = {
				selectors:{
					scrollitem:".scollItem",
					sure:".sureBtn",
					cancle:".cancleBtn",
					active:".active"
				},
				index:2,
				setData:""
			};
			var ops = $.extend({},defaults,options);	
			var obj = $(this);
			var active = ops.selectors.active.split(".")[1];
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
				ah:$(ops.selectors.scrollitem).eq(0).find(ops.selectors.item).eq(0).height(),
				len:0,
				objh:0,
				olen:$(ops.selectors.scrollitem).length,
				_self:"",
				scrolltart:function(e){
					flag = true;
					scrollEvents.sy = e.pageY || e.originalEvent.targetTouches[0].pageY;
					scrollEvents.st = parseInt($(this).children().css("top"));
					scrollEvents.ah = $(this).find(ops.selectors.item).eq(0).height();
					scrollEvents.len = $(this).find(ops.selectors.item).length-1;
					scrollEvents.objh = $(this).height();
					return sy,st,ah,len,objh;
				},
			    scrollmove: function(e){
					if(flag){
						e.preventDefault();
						e.stopPropagation();
						scrollEvents.my = e.pageY || e.originalEvent.targetTouches[0].pageY;
						scrollEvents.ey = scrollEvents.my-scrollEvents.sy;
						if(scrollEvents.ey+scrollEvents.st>=scrollEvents.ah*2){
							scrollEvents.ix = 0;
						}
						else{
							scrollEvents.ix = Math.floor(Math.abs((scrollEvents.ah-scrollEvents.ey-scrollEvents.st+scrollEvents.ah/2)/scrollEvents.ah));
						}
						$(this).find(ops.selectors.item).eq(scrollEvents.ix).addClass(active).siblings().removeClass(active);
						$(this).children().css("top",scrollEvents.ey+scrollEvents.st);
						return my,ey,ix;
					}
			    },
			    scrollend: function(){
					flag = false;
					var dstr = "";
					if(scrollEvents.my){
						scrollEvents.st = parseFloat($(this).children().css("top"));
						if(scrollEvents.st>=scrollEvents.ah){
							scrollEvents.st = scrollEvents.ah;
						}
						else if(scrollEvents.st<=scrollEvents.ah-scrollEvents.len*scrollEvents.ah){
							scrollEvents.ix = scrollEvents.len;
							scrollEvents.st = scrollEvents.ah-scrollEvents.len*scrollEvents.ah;
						}
						else{
							scrollEvents.st = scrollEvents.ah-scrollEvents.ix*scrollEvents.ah;
						}
						$(this).attr("data-on",scrollEvents.ix);
						$(this).children().stop().animate({"top":scrollEvents.st},100);
						$(this).find(ops.selectors.item).eq(scrollEvents.ix).addClass(active).siblings().removeClass(active);
						var v = parseInt($(this).find(ops.selectors.item).eq(scrollEvents.ix).text());
						if($(this).hasClass("year")){
							var month = parseInt($(ops.selectors.scrollitem).eq(1).find(".active").text());
							var mix = $(ops.selectors.scrollitem).eq(2).find(".active").index();
							if((v%4==0 && v%100!=0)||(v%100==0 && v%400==0)){
								$("body").attr("data-year","1");
								if(month==2){
									for(i=1;i<=29;i++){
										dstr+="<span>"+i+"</span>";
									}
									$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).children().html(dstr);
									$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).find(ops.selectors.item).eq(mix).addClass(active);
								}
								else if(month!=1 && month!=3 && month!=5 && month!=7 && month!=8 && month!=10 && month!=12){
									for(i=1;i<=30;i++){
										dstr+="<span>"+i+"</span>";
									}
									$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).children().html(dstr);
									$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).find(ops.selectors.item).eq(mix).addClass(active);
								}
								else{
									for(i=1;i<=31;i++){
										dstr+="<span>"+i+"</span>";
									}
									$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).children().html(dstr);
									$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).find(ops.selectors.item).eq(mix).addClass(active);
								}
							}
							else{
								$("body").removeAttr("data-year");
								if(month==2){
									for(i=1;i<=28;i++){
										dstr+="<span>"+i+"</span>";
									}
									$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).children().html(dstr);
									$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).find(ops.selectors.item).eq(mix).addClass(active);
								}
								else if(month!=1 && month!=3 && month!=5 && month!=7 && month!=8 && month!=10 && month!=12){
									for(i=1;i<=30;i++){
										dstr+="<span>"+i+"</span>";
									}
									$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).children().html(dstr);
									$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).find(ops.selectors.item).eq(mix).addClass(active);
								}
								else{
									for(i=1;i<=31;i++){
										dstr+="<span>"+i+"</span>";
									}
									$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).children().html(dstr);
									$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).find(ops.selectors.item).eq(mix).addClass(active);
								}
							}

						}
						if($(this).hasClass("month")){
							var run = $("body").attr("data-year");
							if(run){
								if(v==2){
									for(i=1;i<=29;i++){
										dstr+="<span>"+i+"</span>";
									}
									$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).children().html(dstr);
								}
								else if(v!=1 && v!=3 && v!=5 && v!=7 && v!=8 && v!=10 && v!=12){
									for(i=1;i<=30;i++){
										dstr+="<span>"+i+"</span>";
									}
									$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).children().html(dstr);
								}
								else{
									for(i=1;i<=31;i++){
										dstr+="<span>"+i+"</span>";
									}
									$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).children().html(dstr);
								}
							}
							else{
								if(v==2){
									for(i=1;i<=28;i++){
										dstr+="<span>"+i+"</span>";
									}
									$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).children().html(dstr);
								}
								else if(v!=1 && v!=3 && v!=5 && v!=7 && v!=8 && v!=10 && v!=12){
									for(i=1;i<=30;i++){
										dstr+="<span>"+i+"</span>";
									}
									$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).children().html(dstr);
								}
								else{
									for(i=1;i<=31;i++){
										dstr+="<span>"+i+"</span>";
									}
									$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).children().html(dstr);
								}

							}
							var top = parseInt($(ops.selectors.scrollitem).eq(scrollEvents.olen-2).children().css("top"));
							var m = Math.abs(top/scrollEvents.ah)+1;
							var nlen = $(ops.selectors.scrollitem).eq(scrollEvents.olen-2).find(ops.selectors.item).length;
							if(m>nlen-1){
								m = nlen-1;
							}
							$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).find(ops.selectors.item).eq(m).addClass(active);
							$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).children().css("top",scrollEvents.ah-m*scrollEvents.ah)
						}
						scrollEvents.my = null;
					}
			    }
			}
			touchEvents.initTouchEvents();
			$(ops.selectors.scrollitem).on(touchEvents.touchstart,scrollEvents.scrolltart);
			$(ops.selectors.scrollitem).on(touchEvents.touchmove,scrollEvents.scrollmove);
			$(ops.selectors.scrollitem).on(touchEvents.touchend,scrollEvents.scrollend);
			$(ops.selectors.scrollitem).on("click",ops.selectors.item,function(){
				scrollEvents.ix = $(this).index();
				var dix = $(ops.selectors.scrollitem).eq(scrollEvents.olen-2).find(ops.selectors.active).index();
				$(this).addClass(active).siblings().removeClass(active);
				$(this).parent().animate({
					"top":scrollEvents.ah-scrollEvents.ix*scrollEvents.ah
				},100)
				//if($(this).parent().parent().hasClass("month")||$(this).parent().parent().hasClass("day")){
					var dstr="";
					var v = parseInt($(ops.selectors.scrollitem).eq(0).find(".active").text());
					var month = parseInt($(ops.selectors.scrollitem).eq(1).find(".active").text());
					var mix = $(ops.selectors.scrollitem).eq(2).find(".active").index();
					if((v%4==0 && v%100!=0)||(v%100==0 && v%400==0)){
						$("body").attr("data-year","1");
						if(month==2){
							for(i=1;i<=29;i++){
								dstr+="<span>"+i+"</span>";
							}
							$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).children().html(dstr);
							$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).find(ops.selectors.item).eq(mix).addClass(active);
						}
						else if(month!=1 && month!=3 && month!=5 && month!=7 && month!=8 && month!=10 && month!=12){
							for(i=1;i<=30;i++){
								dstr+="<span>"+i+"</span>";
							}
							$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).children().html(dstr);
							$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).find(ops.selectors.item).eq(mix).addClass(active);
						}
						else{
							for(i=1;i<=31;i++){
								dstr+="<span>"+i+"</span>";
							}
							$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).children().html(dstr);
							$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).find(ops.selectors.item).eq(mix).addClass(active);
						}
					}
					else{
						$("body").removeAttr("data-year");
						if(month==2){
							for(i=1;i<=28;i++){
								dstr+="<span>"+i+"</span>";
							}
							$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).children().html(dstr);
							$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).find(ops.selectors.item).eq(mix).addClass(active);
						}
						else if(month!=1 && month!=3 && month!=5 && month!=7 && month!=8 && month!=10 && month!=12){
							for(i=1;i<=30;i++){
								dstr+="<span>"+i+"</span>";
							}
							$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).children().html(dstr);
							$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).find(ops.selectors.item).eq(mix).addClass(active);
						}
						else{
							for(i=1;i<=31;i++){
								dstr+="<span>"+i+"</span>";
							}
							$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).children().html(dstr);
							$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).find(ops.selectors.item).eq(mix).addClass(active);
						}
					}
					var dlen = $(ops.selectors.scrollitem).eq(scrollEvents.olen-2).find(ops.selectors.item).length;
					if(dix>=dlen){
						$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).find(ops.selectors.item).eq(dlen-1).addClass(active)
						$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).children().animate({
							"top":scrollEvents.ah-(dlen-1)*scrollEvents.ah
						},100)
					}
				//}
			})
			$(ops.selectors.sure).on("click",function(){
				var len  = $(ops.selectors.scrollitem).length;
				var str = $(ops.selectors.scrollitem).eq(0).find(ops.selectors.active).text()+"."+$(ops.selectors.scrollitem).eq(1).find(ops.selectors.active).text()+"."+$(ops.selectors.scrollitem).eq(2).find(ops.selectors.active).text()+$(ops.selectors.scrollitem).eq(3).find(ops.selectors.active).text();
				var i = parseInt($("body").attr("data-ix"));
				$(obj).children().eq(i).find(ops.selectors.obj).find(".txt2").text(str);
				$(obj).addClass("active");
				$(".scroll").fadeOut();
				$(obj).addClass("active");
			})
			$(ops.selectors.cancle).on("click",function(){
				$(".scroll").fadeOut();	
			})
			$(".scroll").on("click",function(e){
				if($(e.target).hasClass("scroll")){
					$(".scroll").fadeOut();
				}
			})
			$(obj).on("click",ops.selectors.obj,function(i){
				i.stopPropagation();
				$(".scroll").fadeIn();
				var today = new Date();
				var y = today.getFullYear();
				var m = today.getMonth()+1;
				var d = today.getDate();
				var dstr ="";
				$("body").attr("data-ix",obj.find(ops.selectors.obj).index($(i.target)));
				if(!$(this).hasClass("active")){
					$(".scollItem:eq(0) span").eq(50).addClass("active").siblings().removeClass("active");
					$(".scollItem:eq(0)").children().css("top",scrollEvents.ah-50*scrollEvents.ah)
					$(".scollItem:eq(1) span").eq(m-1).addClass("active").siblings().removeClass("active");
					$(".scollItem:eq(1)").children().css("top",scrollEvents.ah-(m-1)*scrollEvents.ah)
					$(".scollItem:eq(2) span").eq(d-1).addClass("active").siblings().removeClass("active");
					$(".scollItem:eq(2)").children().css("top",scrollEvents.ah-(d-1)*scrollEvents.ah)

					if((y%4==0 && y%100!=0)||(y%100==0 && y%400==0)){
						$("body").attr("data-year","1");
							if(m==2){
								for(i=1;i<=29;i++){
									dstr+="<span>"+i+"</span>";
								}
								$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).children().html(dstr);
								$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).find(ops.selectors.item).eq(d-1).addClass(active);
							}
							else if(m!=1 && m!=3 && m!=5 && m!=7 && m!=8 && m!=10 && m!=12){
								for(i=1;i<=30;i++){
									dstr+="<span>"+i+"</span>";
								}
								$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).children().html(dstr);
								$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).find(ops.selectors.item).eq(d-1).addClass(active);
							}
							else{
								for(i=1;i<=31;i++){
									dstr+="<span>"+i+"</span>";
								}
								$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).children().html(dstr);
								$(ops.selectors.scrollitem).eq(scrollEvents.olen-2).find(ops.selectors.item).eq(d-1).addClass(active);
							}
					}		
					else{
						$("body").removeAttr("data-year");
					}
				}
				else{
					var str = $(this).text();
					var gy = 50+parseInt(str.split("年")[0])-y;
					var gm = parseInt(str.split("年")[1].split("月")[0]);
					var gd = parseInt(str.split("年")[1].split("月")[1].split("日")[0]);
					var gs = str.split("年")[1].split("月")[1].split("日")[1].split("\t\/\t")[1];
					$(".scollItem:eq(0) span").eq(gy).addClass("active").siblings().removeClass("active");
					$(".scollItem:eq(0)").children().css("top",scrollEvents.ah-gy*scrollEvents.ah)
					$(".scollItem:eq(1) span").eq(gm-1).addClass("active").siblings().removeClass("active");
					$(".scollItem:eq(1)").children().css("top",scrollEvents.ah-(gm-1)*scrollEvents.ah)
					$(".scollItem:eq(2) span").eq(gd-1).addClass("active").siblings().removeClass("active");
					$(".scollItem:eq(2)").children().css("top",scrollEvents.ah-(gd-1)*scrollEvents.ah)
					if(gs=="小公主"){
						$(".scollItem:eq(3) span").eq(1).addClass("active").siblings().removeClass("active");
						$(".scollItem:eq(3)").children().css("top","0px")
					}
					else{
						$(".scollItem:eq(3) span").eq(0).addClass("active").siblings().removeClass("active");
						$(".scollItem:eq(3)").children().css("top",scrollEvents.ah)
					}
				}
			})
		}
	});
})(jQuery);
$(function(){
	//日历设置
	var today = new Date();
	var y = today.getFullYear();
	var miny = y-50;
	var maxy = y+50
	var str = "";
	for(i=miny;i<=maxy;i++){
		str+="<span>"+i+"</span>";
	}
	$(".scollItem:eq(0) .perCont").html(str);
})