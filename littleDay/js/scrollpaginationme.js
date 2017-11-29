jQuery.fn.extend({
	scrollme: function(_params) {
		var thet = this;
		var dom = $(this);
		thet.currentTop = 0;
		thet.h = dom.height();
		//是否为window对象
		var isWin = dom.get(0) == window;
		if(!isWin){
			dom.css("overflow","auto")
		}
		//滑动无效
		thet._isStop = false;
		thet.stop=function(){
			thet._isStop = true;
		}
		thet.start=function(){
			thet._isStop = false;
		}
		thet.isStop=function(){
			return thet._isStop;
		}
		//数据条件
		thet.params = {target:null,heightOffset:10,data:{},beforeLoad:null,afterLoad:null,url:null,callback:null,error:null,complete:null};
		if(_params){
			$.extend(thet.params,_params);
		}
		
		//查询数据
		thet.reload=function(_data){
			if(_data){
				thet.params.data = _data;
			}
			if(thet.params.target){
				$(thet.params.target).empty();
			}
			thet.start();
			_query();
		};
		//高度
		var _isquery=function(){
			var mayLoad  = false;
			var target = dom;
			//相似高度执行一次的控制
			
			var mayLoad = false;
			  if(isWin){
//				  console.log(thet.currentTop+" "+target.scrollTop()+ " "+ target.height() +" "+$(document).height() );
				  mayLoad = target.scrollTop() + thet.h >= $(document).height() - thet.params.heightOffset;
				  mayLoad = (target.scrollTop() - thet.currentTop  >= thet.params.heightOffset) && mayLoad;
				  if(mayLoad){
					  thet.currentTop = target.scrollTop()+1;
//					  console.log(mayLoad);
				  }
			  }else{
				  var ch = 0;
				  dom.children().each(function(){
					  ch += $(this).height();
				  });
//				  console.log(target.scrollTop()+" "+thet.currentTop+ " "+ ch+" " +thet.h);
				  mayLoad = target.scrollTop() + thet.h >= ch - thet.params.heightOffset;
				  mayLoad = (ch > thet.currentTop) && mayLoad;
				  if(mayLoad){
					  thet.currentTop = ch;
//					  console.log(mayLoad);
				  }
			  }
			  
			 return mayLoad;
		}
		//滑动加载
		$(dom).unbind("scroll");
		$(dom).scroll(function(event){
			 if(thet._isStop){
				 return;
			 }
			 //是否加载
			 if(!_isquery()){
				 return;
			 }
			 //计算数据
			 _query();
		 });
		
		//防止过快加载
		var isQueryIng = false;
		//查询
		var _query=function(){
			if(!thet.params.url){
				return;
			}
			//防止过快加载
			if(isQueryIng){
				return;
			}
			isQueryIng = true;
			
			if(thet.params.beforeLoad){
				thet.params.beforeLoad();
			}
			toastWaiting();
			$.ajax({
				  type: "POST",
				  url: thet.params.url,
				  dataType: "JSON",
				  data:thet.params.data,
				  success:function(data){
						if(thet.params.callback){
							thet.params.callback(data,thet.params.data);
						}
						isQueryIng = false;
				  },
				  error:function(XMLHttpRequest, textStatus, errorThrown){
					  	if(thet.params.error){
					  		thet.params.error();
						}
					  	isQueryIng = false;
				  },
				  complete:function(XMLHttpRequest, textStatus) {
					    //this; // 调用本次AJAX请求时传递的options参数
					  if(thet.params.complete){
						  thet.params.complete();
					  }	
					  if(thet.params.afterLoad){
						  thet.params.afterLoad();
					  }	
					  toastWaitingColse();
				  }
				});
		};
		
		return this;
		
	}
});