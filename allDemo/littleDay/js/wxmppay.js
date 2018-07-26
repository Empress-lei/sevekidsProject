 var wxpayparam={};
 var wxpayorderId="";
 var wxpaycallback;
function onBridgeReady(){
	if(!wxpayparam){
		alert("初始化参数失败");
		return;
	}
   WeixinJSBridge.invoke(
       'getBrandWCPayRequest',wxpayparam ,
       function(res){   
    	   //console.log(res);//打印返回
    	   //get_brand_wcpay_request：ok	支付成功
    	   //get_brand_wcpay_request：cancel	支付过程中用户取消
    	   //get_brand_wcpay_request：fail	支付失败
    	   //注：JS API的返回结果get_brand_wcpay_request：ok仅在用户成功完成支付时返回。
    	   //由于前端交互复杂，get_brand_wcpay_request：cancel或 	者get_brand_wcpay_request：fail可以统一处理为用户遇到错误或者主动放弃，不必细化区分。
           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
	        	// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
	        	   if(wxpaycallback){
	        		   wxpaycallback(wxpayorderId,"ok");
	        	   }
           }  
           if(res.err_msg == "get_brand_wcpay_request:cancel" ) {
	        	   if(wxpaycallback){
	        		   wxpaycallback(wxpayorderId,"cancel");
	        	   }
           }  
           if(res.err_msg == "get_brand_wcpay_request:fail" ) {
           	   if(wxpaycallback){
           		   wxpaycallback(wxpayorderId,"fail");
           	   }
             }  
       }
   ); 
}
//控制连续点击	
var jswxmppaying = false;
/**
 * 微信支付
 */	
function wxmppay(money,body,courseId,tipType,couponId,callback){
	   if(jswxmppaying){
			return ;
	   }
	   jswxmppaying = true;
	   wxpaycallback = callback;
	   wxpayparam={};
	   wxpayorderId="";//参数清空
		
		if(!body || !money || !courseId ||!tipType){
			toast("网络繁忙，请稍后刷新再试!");
			return;
		}
		//设置提交的参数 打赏金额，描述
		HH.ajax({
			url:"/yzmm/wxmppay/pay",
			params:{"body":body,"money":money,"courseId":courseId,"tipType":tipType,"couponId":couponId},
			callback:function(data){
				if(data){
					if(data.success){
						if("true" == data.deduction){
							 wxpaycallback("","ok");
							return;
						}
						
						wxpayparam={"package":data.pkg,
								"appId":data.appId,
								"timeStamp":data.timeStamp,
								"nonceStr":data.nonceStr,
								"signType":data.signType,
								"paySign":data.paySign};
						wxpayorderId=data.orderId;//保存订单号属性
						//解决package是关键字的问题
						if(typeof WeixinJSBridge == "undefined"){
						   if( document.addEventListener ){
						       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
						   }else if (document.attachEvent){
						       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
						       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
						   }
						}else{
						   onBridgeReady();
						}
					}else{
						if(data.code==100057){
							location.reload(true);
						}else{
							toast(data.msg);
						}
					}
				}else{
					toast("网络繁忙，请稍后刷新再试!");
				}
			},
			complete:function(){
				jswxmppaying = false;
			}
		});
}
/**
 * 小白用户第一次进入进行公众号支付
 */	
function wxmppayfromfirstlogin(couponId,callback){
	if(jswxmppaying){
		return ;
	}
	jswxmppaying = true;
	wxpaycallback = callback;
	wxpayparam={};
	wxpayorderId="";//参数清空
	
	//设置提交的参数 打赏金额，描述
	HH.ajax({
		url:"/yzmm/wxmppay/newbie/pay",
		params:{"couponId":couponId},
		callback:function(data){
			if(data){
				if(data.success){
					if("true" == data.deduction){
						 wxpaycallback("","ok");
						return;
					}
					wxpayparam={"package":data.pkg,
							"appId":data.appId,
							"timeStamp":data.timeStamp,
							"nonceStr":data.nonceStr,
							"signType":data.signType,
							"paySign":data.paySign};
					wxpayorderId=data.orderId;//保存订单号属性
					//解决package是关键字的问题
					if(typeof WeixinJSBridge == "undefined"){
						if( document.addEventListener ){
							document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
						}else if (document.attachEvent){
							document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
							document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
						}
					}else{
						onBridgeReady();
					}
				}else{
					toast(data.msg);
				}
			}else{
				toast("网络繁忙，请稍后刷新再试!");
			}
		},
		complete:function(){
			jswxmppaying = false;
		}
	});
}

/**
 * 活动支付
 */	
function wxmppayactivity(id,activityType,couponId,callback){
	if(jswxmppaying){
		return ;
	}
	jswxmppaying = true;
	wxpaycallback = callback;
	wxpayparam={};
	wxpayorderId="";//参数清空
	
	//设置提交的参数 打赏金额，描述
	HH.ajax({
		data:{activityType:activityType,id:id,couponId:couponId},
		url:"/yzmm/wxmppay/activity/pay",
		callback:function(data){
			if(data){
				if(data.success){
					if("true" == data.deduction){
						 wxpaycallback("","ok");
						return;
					}
					wxpayparam={"package":data.pkg,
							"appId":data.appId,
							"timeStamp":data.timeStamp,
							"nonceStr":data.nonceStr,
							"signType":data.signType,
							"paySign":data.paySign};
					wxpayorderId=data.orderId;//保存订单号属性
					//解决package是关键字的问题
					if(typeof WeixinJSBridge == "undefined"){
						if( document.addEventListener ){
							document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
						}else if (document.attachEvent){
							document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
							document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
						}
					}else{
						onBridgeReady();
					}
				}else{
					toast(data.msg);
				}
			}else{
				toast("网络繁忙，请稍后刷新再试!");
			}
		},
		complete:function(){
			jswxmppaying = false;
		}
	});
}

/**
 * 三千问支付
 */	
function wxmppayasqw(kid,callback){
	if(jswxmppaying){
		return ;
	}
	jswxmppaying = true;
	wxpaycallback = callback;
	wxpayparam={};
	wxpayorderId="";//参数清空
	
	//设置提交的参数 打赏金额，描述
	HH.ajax({
		data:{knowledgeId:kid},
		url:"/yzmm/wxmppay/sqw/pay",
		callback:function(data){
			if(data){
				if(data.success){
					wxpayparam={"package":data.pkg,
							"appId":data.appId,
							"timeStamp":data.timeStamp,
							"nonceStr":data.nonceStr,
							"signType":data.signType,
							"paySign":data.paySign};
					wxpayorderId=data.orderId;//保存订单号属性
					//解决package是关键字的问题
					if(typeof WeixinJSBridge == "undefined"){
						if( document.addEventListener ){
							document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
						}else if (document.attachEvent){
							document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
							document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
						}
					}else{
						onBridgeReady();
					}
				}else{
					if(data.code==100057){
						location.reload(true);
					}else{
						toast(data.msg);
					}
				}
			}else{
				toast("网络繁忙，请稍后刷新再试!");
			}
		},
		complete:function(){
			jswxmppaying = false;
		}
	});
}


/**
 * 续费
 */	
function wxmppayrenew(couponId,callback){
	if(jswxmppaying){
		return ;
	}
	jswxmppaying = true;
	wxpaycallback = callback;
	wxpayparam={};
	wxpayorderId="";//参数清空
	
	//设置提交的参数 打赏金额，描述
	HH.ajax({
		url:"/yzmm/wxmppay/renew/pay",
		params:{"couponId":couponId},
		callback:function(data){
			if(data){
				if(data.success){
					if("true" == data.deduction){
						 wxpaycallback("","ok");
						return;
					}
					wxpayparam={"package":data.pkg,
							"appId":data.appId,
							"timeStamp":data.timeStamp,
							"nonceStr":data.nonceStr,
							"signType":data.signType,
							"paySign":data.paySign};
					wxpayorderId=data.orderId;//保存订单号属性
					//解决package是关键字的问题
					if(typeof WeixinJSBridge == "undefined"){
						if( document.addEventListener ){
							document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
						}else if (document.attachEvent){
							document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
							document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
						}
					}else{
						onBridgeReady();
					}
				}else{
					toast(data.msg);
				}
			}else{
				toast("网络繁忙，请稍后刷新再试!");
			}
		},
		complete:function(){
			jswxmppaying = false;
		}
	});
}

function wxmpcoursegrouppay(money,body,groupId,tipType,callback){
	   if(jswxmppaying){
			return ;
	   }
	   jswxmppaying = true;
	   wxpaycallback = callback;
	   wxpayparam={};
	   wxpayorderId="";//参数清空
		
		if(!body || !money || !groupId ||!tipType){
			toast("网络繁忙，请稍后刷新再试!");
			return;
		}
		//设置提交的参数 打赏金额，描述
		HH.ajax({
			url:"/yzmm/wxmppay/coursegroup/pay",
			params:{"body":body,"money":money,"groupId":groupId,"tipType":tipType},
			callback:function(data){
				if(data){
					if(data.success){
						wxpayparam={"package":data.pkg,
								"appId":data.appId,
								"timeStamp":data.timeStamp,
								"nonceStr":data.nonceStr,
								"signType":data.signType,
								"paySign":data.paySign};
						wxpayorderId=data.orderId;//保存订单号属性
						//解决package是关键字的问题
						if(typeof WeixinJSBridge == "undefined"){
						   if( document.addEventListener ){
						       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
						   }else if (document.attachEvent){
						       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
						       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
						   }
						}else{
						   onBridgeReady();
						}
					}else{
						if(data.code==100057){
							location.reload(true);
						}else{
							toast(data.msg);
						}
					}
				}else{
					toast("网络繁忙，请稍后刷新再试!");
				}
			},
			complete:function(){
				jswxmppaying = false;
			}
		});
}

function wxmpmiaoqapay(req,callback){
	   if(jswxmppaying){
			return ;
	   }
	   jswxmppaying = true;
	   wxpaycallback = callback;
	   wxpayparam={};
	   wxpayorderId="";//参数清空
		
		if(!req ){
			toast("网络繁忙，请稍后刷新再试!");
			return;
		}
		//设置提交的参数 打赏金额，描述
		HH.ajax({
			url:"/yzmm/wxmppay/miaoqa/pay",
			params:req,
			callback:function(data){
				if(data){
					if(data.success){
						if("true" == data.deduction){
							 wxpaycallback("","ok");
							return;
						}
						wxpayparam={"package":data.pkg,
								"appId":data.appId,
								"timeStamp":data.timeStamp,
								"nonceStr":data.nonceStr,
								"signType":data.signType,
								"paySign":data.paySign};
						wxpayorderId=data.orderId;//保存订单号属性
						//解决package是关键字的问题
						if(typeof WeixinJSBridge == "undefined"){
						   if( document.addEventListener ){
						       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
						   }else if (document.attachEvent){
						       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
						       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
						   }
						}else{
						   onBridgeReady();
						}
					}else{
						if(data.code==100057){
							location.reload(true);
						}else{
							toast(data.msg);
						}
					}
				}else{
					toast("网络繁忙，请稍后刷新再试!");
				}
			},
			complete:function(){
				jswxmppaying = false;
			}
		});
}

/**
 * 小白用户第一次进入进行公众号支付
 */	
function wxmppayvirtualcard(id,callback){
	if(jswxmppaying){
		return ;
	}
	jswxmppaying = true;
	wxpaycallback = callback;
	wxpayparam={};
	wxpayorderId="";//参数清空
	if(!id){
		toast("网络繁忙，请稍后刷新再试!");
		return;
	}
	//设置提交的参数 打赏金额，描述
	HH.ajax({
		params:{"id":id},
		url:"/yzmm/wxmppay/virtualcard/pay",
		callback:function(data){
			if(data){
				if(data.success){
					wxpayparam={"package":data.pkg,
							"appId":data.appId,
							"timeStamp":data.timeStamp,
							"nonceStr":data.nonceStr,
							"signType":data.signType,
							"paySign":data.paySign};
					wxpayorderId=data.orderId;//保存订单号属性
					//解决package是关键字的问题
					if(typeof WeixinJSBridge == "undefined"){
						if( document.addEventListener ){
							document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
						}else if (document.attachEvent){
							document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
							document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
						}
					}else{
						onBridgeReady();
					}
				}else{
					toast(data.msg);
				}
			}else{
				toast("网络繁忙，请稍后刷新再试!");
			}
		},
		complete:function(){
			jswxmppaying = false;
		}
	});
}