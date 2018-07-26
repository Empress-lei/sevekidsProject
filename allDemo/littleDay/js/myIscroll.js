/**
 * jquery 选择器
 * _wrapper : #wrapper
 */
function initScroll(_wrapper){
	if(!_wrapper || !$(_wrapper).get(0)){
		return;
	}
	var wrapper = $(_wrapper);
	wrapper.addClass("wrapper");
	var scroller = $('<div class="scroller"></div>');
	wrapper.append(scroller);
	scroller.append('<div id="scroller-pullDown">'
			+'<span id="down-icon" class="icon-double-angle-down pull-down-icon"></span>'
			+'<span id="pullDown-msg" class="pull-down-msg">下拉刷新</span></div>');
	var contentDiv = $("<div></div>");
	scroller.append(contentDiv);
	scroller.append('<div id="scroller-pullUp"><span id="up-icon" class="icon-double-angle-up pull-up-icon"></span>'
			+'<span id="pullUp-msg" class="pull-up-msg">上拉刷新</span></div>');
	
	var myScroll, upIcon = $("#up-icon"), downIcon = $("#down-icon");
	myScroll = new IScroll(_wrapper, { probeType: 3, mouseWheel: true ,scrollbars:true });
	//probeType属性，表明此插件，可以监听scroll事件
	// myScroll.refresh(); // 数据加载完成后，调用界面更新方法  
	myScroll.on("scroll",function(){
		//scroll事件，可以用来控制上拉和下拉之后显示的模块中，
		//样式和内容展示的部分的改变。
		var y = this.y,
			maxY = this.maxScrollY - y,
			downHasClass = downIcon.hasClass("reverse_icon"),
			upHasClass = upIcon.hasClass("reverse_icon");
	
		if(y >= 40){
			!downHasClass && downIcon.addClass("reverse_icon");
			return "";
		}else if(y < 40 && y > 0){
			downHasClass && downIcon.removeClass("reverse_icon");
			return "";
		}
	
		if(maxY >= 40){
			!upHasClass && upIcon.addClass("reverse_icon");
			return "";
		}else if(maxY < 40 && maxY >=0){
			upHasClass && upIcon.removeClass("reverse_icon");
			return "";
		}
	});
	
	myScroll.content = contentDiv;
	
	myScroll.slideDown = function(fn){
		if("function" == typeof fn){
			myScroll._slideDown = fn;
		}
	};
	
	myScroll.on("slideDown",function(){
		$("#scroller-pullDown").show();
		if(this.y > 40){
			if(myScroll._slideDown){
				myScroll._slideDown();
			}
		}
	});
	
	myScroll.slideUp = function(fn){
		if("function" == typeof fn){
			myScroll._slideUp = fn;
		}	
	};
	myScroll.on("slideUp",function(){
		$("#scroller-pullUp").show();
		if(this.maxScrollY - this.y > 40){
			if(myScroll._slideUp){
				myScroll._slideUp();
			}
		}
	});
	
	return myScroll;
}
