/*
**	Anderson Ferminiano
**	contato@andersonferminiano.com -- feel free to contact me for bugs or new implementations.
**	jQuery ScrollPagination
**	28th/March/2011
**	http://andersonferminiano.com/jqueryscrollpagination/
**	You may use this script for free, but keep my credits.
**	Thank you.
*/

(function( $ ){
	 
		 
 $.fn.scrollPagination = function(obj,options) {
  	
		var opts = $.extend($.fn.scrollPagination.defaults, options);  
		var target = opts.scrollTarget;
		opts.scrollTarget = target;
		$.fn.scrollPagination.init(obj, opts);
  };
  
  $.fn.startScrollPagination = function(){
	 	$(this).get(0).scrollPagination='enabled';
  };

  $.fn.stopScrollPagination = function(){
	 	$(this).get(0).scrollPagination='disabled';
  };
  
  $.fn.scrollPagination.loadContent = function(obj, opts){
	 var target = $(opts.scrollTarget);
	//var mayLoadContent = $(target).scrollTop()+opts.heightOffset >= $(document).height() - $(target).height();
    if(target.scrollTop() > obj.maxScrollTop){
    	obj.maxScrollTop = target.scrollTop();
    }
	 var mayLoadContent = false;
	 if($(target).get(0) == window){
		 mayLoadContent = (target.scrollTop() + opts.heightOffset + target.height()  >= $(document).height()) &&  obj.maxScrollTop == target.scrollTop();
		 //console.log(target.scrollTop()+ " "+ target.height() +" "+$(document).height() + " "+ (target.scrollTop() + opts.heightOffset + target.height()-$(document).height()));
	 }else{
		 mayLoadContent = (target.scrollTop() + opts.heightOffset + target.height()  >= obj.height()) &&  obj.maxScrollTop == target.scrollTop();
		// console.log(target.scrollTop()+ " "+ target.height() +" "+obj.height() + " "+ (target.scrollTop() + opts.heightOffset + target.height()-obj.height()));
	 }
	 if (mayLoadContent){
		 $(obj).get(0).scrollPaginationAjaxing=true;
		 if (opts.beforeLoad != null){
			var isContinue = opts.beforeLoad(opts.contentData); 
			if(!isContinue){
				return;
			}
		 }
		 $(obj).children().attr('rel', 'loaded');
		 toastWaiting();
		 $.ajax({
			  type: 'POST',
			  url: opts.contentPage,
			  dataType: "json",
			  data: opts.contentData,
			  success: function(data){
				  if(opts.callback){
					  data = opts.callback(data,opts.contentData);
				  }
				$(obj).append(data); 
				var objectsRendered = $(obj).children('[rel!=loaded]');
				if (opts.afterLoad != null){
					opts.afterLoad(objectsRendered);	
				}
			  },
			  complete:function(){
				  $(obj).get(0).scrollPaginationAjaxing=false;
				  toastWaitingColse();
			  }
		 });
	 }
	 
  };
  
  $.fn.scrollPagination.init = function(obj, opts){
	 var target = opts.scrollTarget;
	 $(obj).get(0).scrollPagination='enabled';
	 $(obj).get(0).scrollPaginationAjaxing=false;
	 obj.opts = opts;
	 obj.maxScrollTop = 0;
	 $(target).scroll(function(event){
		 var ct = $(obj).get(0);
		if (ct.scrollPagination == 'enabled' && !ct.scrollPaginationAjaxing){
	 		$.fn.scrollPagination.loadContent(obj, opts);		
		}
		else {
			event.stopPropagation();	
		}
	 });
	 if(false != opts.autoLoad){
		 $.fn.scrollPagination.loadContent(obj, opts);
	 }
	 
 };
	
 $.fn.scrollPagination.defaults = {
      	 'contentPage' : null,
     	 'contentData' : {},
		 'beforeLoad': null,
		 'afterLoad': null	,
		 'scrollTarget': null,
		 'heightOffset': 0,
		 'callback':null
 };	
})( jQuery );

//code for fade in element by element
$.fn.fadeInWithDelay = function(){
	var delay = 0;
	return this.each(function(){
		$(this).delay(delay).animate({opacity:1}, 200);
		delay += 100;
	});
};
/**
 * 
 * @param opts {id:容器id,url:数据请求,callback:function(data,params){return html;} ,target:滚动目标id 不填默认为window,heightOffset:去除的底部高度,autoLoad:true 自动加载数据}
 */
function scrollPagination(opts){
	var obj = $('#'+opts.id);
	var target = opts.target ? $("#"+opts.target) : $(window);
	if(opts.target){
		target.css("overflow","auto");
	}
	var options ={
			'contentPage': opts.url, // the url you are fetching the results
			'contentData': opts.data, // these are the variables you can pass to the request, for example: children().size() to know which page you are
			'scrollTarget': opts.target ? $("#"+opts.target) : $(window), // who gonna scroll? in this example, the full window
			'heightOffset': opts.heightOffset ? opts.heightOffset:10, // it gonna request when scroll is 10 pixels before the page ends
			'beforeLoad':  opts.beforeLoad,// before load function, you can display a preloader div
			'afterLoad': function(elementsLoaded){ // after loading content, you can use this function to animate your new elements
				 var i = 0;
				 $(elementsLoaded).fadeInWithDelay();
				 //if ($('#content').children().size() > 100){ // if more than 100 results already loaded, then stop pagination (only for testing)
				 //	$('#content').stoptscrollPagination();
				 //}
				 if(opts.afterLoad){
					 opts.afterLoad(elementsLoaded);
				 }
			},
			'autoLoad':opts.autoLoad,
			'callback':opts.callback
		};
	obj.opts = options;
	obj.scrollPagination(obj,options);
	return obj;
}
/**
 * 
 * @param content:scrollPagination返回的对象 params:{} 默认reload第一页
 */
function scrollPageReload(content,params){
	content.startScrollPagination();
	content.maxScrollTop = 0;
	if(params){
		if(!params.pageIndex){
			params.pageIndex=1;
		}
		$.extend(content.opts.contentData,params);
	}
	content.html("");
	$.fn.scrollPagination.loadContent(content, content.opts);
}
