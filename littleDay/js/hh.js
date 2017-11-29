window.HH = {} ;

HH.href = function(url){
		if(!url){
			return;
		}
		if(la){
			if(url.indexOf("?la=")==-1&&url.indexOf("&la=")==-1){
				   if(url.indexOf("?")==-1){
					   url+="?la="+la;
				   }else{
					   url+="&la="+la; 
				   }
			   }
		}
	top.location=url;
}

HH.ajax = function(option){
	if(!option || (!option.url && !option.form)){
		toast("无效参数！~");
		return ;
	}
	var url = option.url || option.form.attr('action');
	var params = option.params || option.data || ( option.form ? option.form.serialize() : null );
	var dataType = option.dataType?option.dataType:"json";
	var async = false == option.async ? option.async:true;
	var waiting = option.waiting;
	if(false!=waiting)toastWaiting();
	$.ajax({
		  type: "POST",
		  url: url,
		  dataType: dataType,
		  data:params,
		  async:async,
		  statusCode: {
			  404: function() {
				  toast('未找到您想要的页面');
			  },
			  500:function(){
				  toast('服务器太累啦，歇会儿再来呗！');
			  },
			  504:function(){
				  toast('服务器反应不过来啦');
			  }
		  },
		  success:function(data){
			  
				if((data)){
					switch (data.code) {
					// h5进行微信支付
					case 100058:
						toast(data.msg);	
						break;
					//登录
					case 501:
						//去小白信息注册弹框
					case 100001:
						// 手机号注册弹框
					case 100019:
						// 个人信息完善弹框
					case 100048:
						// 单次付费
					case 100056:
						// 成为会员弹框
					case 109100:
						if(typeof userAuthObj != "undefined"){
							userAuthObj.url = data.url;
							userAuthObj.urlAuthorise = data.urlAuthorise;
							userAuthObj.userAuthorise = data.userAuthorise;
							userAuthObj.msg = data.msg;
							//alert(userAuthObj.msg + "=" + userAuthObj.userAuthorise+ "=" + userAuthObj.urlAuthorise+ "=" + userAuthObj.url);
							userAuthOpt.authRedirect(userAuthObj);
							return;
						}else{
							toast(data.msg);	
						}
						break;
					}
					
					
				}
				if(false!=waiting)toastWaitingColse();
				if(option.callback){
					option.callback(data);
				}else{
					if(data.success){
						if(option.success){
							option.success(data);
						}
					}else{
						//toast(data.msg);
					}
				}
		  },
		  error:function(XMLHttpRequest, textStatus, errorThrown){
			  if(false!=waiting)toastWaitingColse();
			  	if(option.error){
					option.error();
				}else{
					if(2<=XMLHttpRequest.readyState)
						toast("请求没成功，请检查下网络是否异常。");
				}
		  },
		  complete:function(XMLHttpRequest, textStatus) {
			    //this; // 调用本次AJAX请求时传递的options参数
			  if(option.complete){
					option.complete();
			  }	
		  }
		});
	
};
