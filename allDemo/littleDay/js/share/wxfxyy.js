/*
var wxfenxiangcb={
		title: '${wxshare.title}', // 分享标题
	    desc: '${wxshare.desc}', // 分享描述
	    link: '${wxshare.link}', // 分享链接
	    imgUrl: '${wxshare.imgUrl}', // 分享图标
	    type: '${wxshare.type}', // 分享类型,music、video或link，不填默认为link
	    dataUrl: '${wxshare.dataUrl}', // 如果type是music或video，则要提供数据链接，默认为空
	    shareTimeline:function(bool){},
	    shareAppMessage:function(bool){},
	    shareQQ:function(bool){},
	    shareWeibo:function(bool){},
	    shareQZone:function(bool){},
	    localId:"",
		serverId:"",
		voiceRecordEnd:function(localId){}
};

 */

var wxfenxiangcb={
		title: '', // 分享标题
	    desc: '', // 分享描述
	    link: '', // 分享链接
	    imgUrl: '', // 分享图标
	    type: '', // 分享类型,music、video或link，不填默认为link
	    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	    shareTimeline:function(bool){},
	    cancelShareTimeline:function(bool){},
	    shareAppMessage:function(bool){},
	    cancelShareAppMessage:function(bool){},
	    shareQQ:function(bool){},
	    cancelShareQQ:function(bool){},
	    shareWeibo:function(bool){},
	    cancelShareWeibo:function(bool){},
	    cancelShareQZone:function(bool){},
	    localId:"",
		serverId:"",
		voiceRecordEnd:function(){},
		uploadVoice:function(){},
		hideOptionMenu:function(){
				wx.hideOptionMenu()
			},
		showOptionMenu:function(){
			wx.showOptionMenu();
		},
		showOptionMenu:function(){wx.showOptionMenu()},
		ready:function(){}
};
function initwxfxOnly(params){
	if(params){
		$.extend(wxfenxiangcb,params);
	}
}

function initwxfx(params){
	if(params){
		$.extend(wxfenxiangcb,params);
		initfenxiang();
	}
}

function whoshare(link,success){
	HH.ajax({
		url: "/yzmm/share/who",
		data:{
			success:success,
		    title: wxfenxiangcb.title, // 分享标题
		    desc: wxfenxiangcb.desc, // 分享描述
		    link: link?link:wxfenxiangcb.link, // 分享链接
		    imgUrl: wxfenxiangcb.imgUrl, // 分享图标
		    type: wxfenxiangcb.type, // 分享类型,music、video或link，不填默认为link
		    dataUrl: wxfenxiangcb.dataUrl // 如果type是music或video，则要提供数据链接，默认为空
		},
		callback:function(data){
			
		}
	});
}
/**
 * channel 0 好友 1 朋友圈
 * code
 *      int ERR_OK = 0;
        int ERR_COMM = -1;
        int ERR_USER_CANCEL = -2;
        int ERR_SENT_FAILED = -3;
        int ERR_AUTH_DENIED = -4;
        int ERR_UNSUPPORT = -5;
        int ERR_BAN = -6;
 */
function jsappsharecallback(channel,code){
 	whoshare(wxfenxiangcb.link+(channel==1?"08":"09"),0 == code);
	if(0 == code){
		 // 用户确认分享后执行的回调函数
        if(channel==1 && wxfenxiangcb.shareTimeline){
       	 	wxfenxiangcb.shareTimeline(true);
        }
        if(channel==0 && wxfenxiangcb.shareAppMessage){
       	 	wxfenxiangcb.shareAppMessage(true);
        }
	}else{
		// 用户取消分享后执行的回调函数
	   	 if(channel==1 && wxfenxiangcb.cancelShareTimeline){
	   			wxfenxiangcb.cancelShareTimeline(false);
	      }
	  	if(channel==0 && wxfenxiangcb.cancelShareAppMessage){
	      	 wxfenxiangcb.cancelShareAppMessage(false);
	  	}
	}
}

//txt img music video url
function jsappshare(type){
	try{
		if(typeof jsapp =='undefined'){
			return;
		}
		// txt img music video url
		if(!type){
			type = "url";
		}
		
		//显示分享按钮
		var params = {
				type:type,
			    title: wxfenxiangcb.title, // 分享标题
			    link: wxfenxiangcb.link, // 分享链接
			    imgUrl: wxfenxiangcb.imgUrl, // 分享图标
			    desc: wxfenxiangcb.desc,
			    callbackFn:"jsappsharecallback"};
		
		jsapp.getMainTitle().setMenuShare($.toJSON(params)); 
	
	}catch(e){
		
	}
}

function initfenxiang() {
	jsappshare();
	
//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
wx.onMenuShareTimeline({
    title: wxfenxiangcb.title, // 分享标题
    link: wxfenxiangcb.link+"08", // 分享链接
    imgUrl: wxfenxiangcb.imgUrl, // 分享图标
    desc: wxfenxiangcb.desc,
    success: function () { 
    	whoshare(wxfenxiangcb.link+"08",true);
        // 用户确认分享后执行的回调函数
        if(wxfenxiangcb.shareTimeline){
       	 	wxfenxiangcb.shareTimeline(true);
        }
    },
    cancel: function () { 
    	whoshare(wxfenxiangcb.link+"08",false);
        // 用户取消分享后执行的回调函数
    	 if(wxfenxiangcb.cancelShareTimeline){
    			wxfenxiangcb.cancelShareTimeline(false);
       }
    }
});
//获取“分享给朋友”按钮点击状态及自定义分享内容接口
wx.onMenuShareAppMessage({
    title: wxfenxiangcb.title, // 分享标题
    desc: wxfenxiangcb.desc, // 分享描述
    link: wxfenxiangcb.link+"09", // 分享链接
    imgUrl: wxfenxiangcb.imgUrl, // 分享图标
    type: wxfenxiangcb.type, // 分享类型,music、video或link，不填默认为link
    dataUrl: wxfenxiangcb.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
    success: function () { 
    	whoshare(wxfenxiangcb.link+"09",true);
        // 用户确认分享后执行的回调函数
       // alert('分享到朋友');
        if(wxfenxiangcb.shareAppMessage){
       	 	wxfenxiangcb.shareAppMessage(true);
        }
    },
    cancel: function () { 
    	whoshare(wxfenxiangcb.link+"09",false);
        // 用户取消分享后执行的回调函数
	    	if(wxfenxiangcb.cancelShareAppMessage){
	       	 wxfenxiangcb.cancelShareAppMessage(false);
        }
    }
});
//获取“分享到QQ”按钮点击状态及自定义分享内容接口
wx.onMenuShareQQ({
	title: wxfenxiangcb.title, // 分享标题
    desc: wxfenxiangcb.desc, // 分享描述
    link: wxfenxiangcb.link+"10", // 分享链接
    imgUrl: wxfenxiangcb.imgUrl, // 分享图标
    success: function () { 
    		whoshare(wxfenxiangcb.link+"10",true);
       // 用户确认分享后执行的回调函数
    		if(wxfenxiangcb.shareQQ){
	       	 wxfenxiangcb.shareQQ(true);
    		}
    },
    cancel: function () { 
    		whoshare(wxfenxiangcb.link+"10",false);
       // 用户取消分享后执行的回调函数
     	if(wxfenxiangcb.cancelShareQQ){
	       	 wxfenxiangcb.cancelShareQQ(false);
       }
    }
});
//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
wx.onMenuShareWeibo({
	title: wxfenxiangcb.title, // 分享标题
    desc: wxfenxiangcb.desc, // 分享描述
    link: wxfenxiangcb.link+"10", // 分享链接
    imgUrl: wxfenxiangcb.imgUrl, // 分享图标
    success: function () { 
		whoshare(wxfenxiangcb.link+"10",true);
       // 用户确认分享后执行的回调函数
   	 	if(wxfenxiangcb.shareWeibo){
	       	 wxfenxiangcb.shareWeibo(true);
      	}
    },
    cancel: function () { 
		whoshare(wxfenxiangcb.link+"10",false);
        // 用户取消分享后执行的回调函数
    		if(wxfenxiangcb.cancelShareWeibo){
	       	 wxfenxiangcb.cancelShareWeibo(false);
     	}
    }
});
//获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
wx.onMenuShareQZone({
	title: wxfenxiangcb.title, // 分享标题
    desc: wxfenxiangcb.desc, // 分享描述
    link: wxfenxiangcb.link+"10", // 分享链接
    imgUrl: wxfenxiangcb.imgUrl, // 分享图标
    success: function () { 
		whoshare(wxfenxiangcb.link+"10",true);
       // 用户确认分享后执行的回调函数
   	 	if(wxfenxiangcb.shareQZone){
	       	 wxfenxiangcb.shareQZone(true);
     	}
    },
    cancel: function () { 
		whoshare(wxfenxiangcb.link+"10",false);
        // 用户取消分享后执行的回调函数
    		if(wxfenxiangcb.cancelShareQZone){
	       	 wxfenxiangcb.cancelShareQZone(false);
   	 	}
    }
});

};

//===============================================================

//4.2 开始录音
function weixinStartRecord(){
	 wx.startRecord({
		    cancel: function () {
		    	toast('您拒绝了授权录音');
		    }
		  });
}
//4.3 停止录音
function weixinStopRecord(){
	 wx.stopRecord({
		    success: function (res) {
		    		wxfenxiangcb.localId = res.localId;
		    },
		    fail: function (res) {
		     	toast("微信停止录音失败");
		    }
		  });
}

// 4.4 播放音频
function weixinPlayVoice(){
	if (wxfenxiangcb.localId == '') {
		  toast('请先录制您的声音');
	    return;
	  }
	  wx.playVoice({
	    localId: wxfenxiangcb.localId
	  });
}
// 4.5 下载音频
function weixinDownPlayVoice(){
	  if (wxfenxiangcb.serverId == '') {
		  toast('请先录制您的声音');
	    return;
	  }
	  wx.downloadVoice({
		    serverId: wxfenxiangcb.serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
		    isShowProgressTips: 1, // 默认为1，显示进度提示
		    success: function (res) {
		        var localId = res.localId; // 返回音频的本地ID
		        wx.playVoice({
		            localId: localId
		          });
		    }
		});
}

//4.6 暂停播放音频
function weixinPauseVoice(){
	wx.pauseVoice({
	    localId: wxfenxiangcb.localId
	  });
}
//4.7 停止播放音频
function weixinStopVoice(){
	wx.stopVoice({
	    localId: wxfenxiangcb.localId
	  });
}

// 4.8 上传语音
function weixinUploadVoice(func){
	if(!wxfenxiangcb.uploadVoice){
		 if (wxfenxiangcb.localId == '') {
			 toast('请先录制您的声音');
		    return;
		  }
		  wx.uploadVoice({
		    localId: wxfenxiangcb.localId,
		    success: function (res) {
		    	wxfenxiangcb.serverId = res.serverId;
		   	HH.ajax({
				url: "/yzmm/upload/temp/wxaudio",
				data:{serverId:wxfenxiangcb.serverId,parent:"wxaudio"},
				callback:function(data){
					if(data.success){
						toast(data.msg);
					}else{
						toast(data.msg);
					}
				}
			});
		      
		    },
		    fail:function(){
		    	 toast('您的声音上传失败');
		    }
		  });
	}else{
		wxfenxiangcb.uploadVoice(func);
	}
	 
}

//===============================================================


wx.ready(function () {
	//是否可用
	if(!canwxaudio){
		return;
	}
	initfenxiang();
	//4.4 监听录音自动停止
	wx.onVoiceRecordEnd({
	  complete: function (res) {
		wxfenxiangcb.localId = res.localId;
	    if(wxfenxiangcb.voiceRecordEnd){
	    		wxfenxiangcb.voiceRecordEnd(wxfenxiangcb.localId);
	    }else{
	    		toast('录音时间最长60S');
	    }
	  }
	});
	
	if(wxfenxiangcb.ready){
		wxfenxiangcb.ready();
	}
});