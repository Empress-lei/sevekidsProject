(function(window,$){
	IframeResize = function (){
		this.WIN_MIN_HEIGHT = 200;
		this.initHeight= this.WIN_MIN_HEIGHT;
		var thet = this;
		
		this.resize = function(){
			thet.init();
			var mainFrame = $("#mainFrame");
			var iframe = mainFrame.get(0);
			if(iframe){
				mainFrame.height(thet.initHeight);
			}
		};
		
		
		this.init = function(){
			var mainFrame = $("#mainFrame");
			var top = mainFrame.offset().top;
			var bottom = 0;
			var footerDiv = $(".footbr").outerHeight();
			if(footerDiv){
				bottom = footerDiv;
			}
			thet.initHeight =  document.documentElement.clientHeight-top-bottom;
			thet.initHeight = (thet.initHeight>thet.WIN_MIN_HEIGHT)?thet.initHeight:thet.WIN_MIN_HEIGHT;
		};
		
	};
	
	window.myframe = new IframeResize();
})(window,$);
function resize(){
	top.myframe.resize();
}
$(function(){
	//初始化高度
	//为iframe绑定事件，当页面转向后，重新算高度
	$("#mainFrame").bind("load",function(){
		window.myframe.resize();
	});
	//当浏览器改变窗口大小时改进行重算
	var iTimerID = 0;
	$(window).bind("resize",function(){
		if(iTimerID)window.clearTimeout(iTimerID);
		iTimerID  = window.setTimeout(function(){
			window.myframe.resize();
		},100);
	});
});
