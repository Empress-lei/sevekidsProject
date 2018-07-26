/*
 var wxfeixiangcb={
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
	    shareQZone:function(bool){}
};
 */

var wxfeixiangcb={
		title: '', // 分享标题
	    desc: '', // 分享描述
	    link: '', // 分享链接
	    imgUrl: '', // 分享图标
	    type: '', // 分享类型,music、video或link，不填默认为link
	    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	    shareTimeline:function(bool){},
	    shareAppMessage:function(bool){},
	    shareQQ:function(bool){},
	    shareWeibo:function(bool){},
	    shareQZone:function(bool){}
};

function whoshare(link,success){
	HH.ajax({
		url: "/yzmm/share/who",
		data:{
			success:success,
		    title: wxfeixiangcb.title, // 分享标题
		    desc: wxfeixiangcb.desc, // 分享描述
		    link: link?link:wxfeixiangcb.link, // 分享链接
		    imgUrl: wxfeixiangcb.imgUrl, // 分享图标
		    type: wxfeixiangcb.type, // 分享类型,music、video或link，不填默认为link
		    dataUrl: wxfeixiangcb.dataUrl // 如果type是music或video，则要提供数据链接，默认为空
		},
		callback:function(data){
			
		}
	});
}

function initfenxiang() {
//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
wx.onMenuShareTimeline({
    title: wxfeixiangcb.title, // 分享标题
    link: wxfeixiangcb.link+"08", // 分享链接
    imgUrl: wxfeixiangcb.imgUrl, // 分享图标
    desc: wxfeixiangcb.desc,
    success: function () { 
    		whoshare(wxfeixiangcb.link+"08",true);
        // 用户确认分享后执行的回调函数
     	//toast('分享到朋友圈');
        if(wxfeixiangcb.shareTimeline){
       	 	wxfeixiangcb.shareTimeline(true);
        }
    },
    cancel: function () { 
    	whoshare(wxfeixiangcb.link+"08",false);
        // 用户取消分享后执行的回调函数
    	 if(wxfeixiangcb.shareTimeline){
    			wxfeixiangcb.shareTimeline(false);
       }
    }
});
//获取“分享给朋友”按钮点击状态及自定义分享内容接口
wx.onMenuShareAppMessage({
    title: wxfeixiangcb.title, // 分享标题
    desc: wxfeixiangcb.desc, // 分享描述
    link: wxfeixiangcb.link+"09", // 分享链接
    imgUrl: wxfeixiangcb.imgUrl, // 分享图标
    type: wxfeixiangcb.type, // 分享类型,music、video或link，不填默认为link
    dataUrl: wxfeixiangcb.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
    success: function () { 
    	whoshare(wxfeixiangcb.link+"09",true);
        // 用户确认分享后执行的回调函数
       // alert('分享到朋友');
        if(wxfeixiangcb.shareAppMessage){
       	 	wxfeixiangcb.shareAppMessage(true);
        }
    },
    cancel: function () { 
    	whoshare(wxfeixiangcb.link+"09",false);
        // 用户取消分享后执行的回调函数
	    	if(wxfeixiangcb.shareAppMessage){
	       	 wxfeixiangcb.shareAppMessage(false);
        }
    }
});
//获取“分享到QQ”按钮点击状态及自定义分享内容接口
wx.onMenuShareQQ({
	title: wxfeixiangcb.title, // 分享标题
    desc: wxfeixiangcb.desc, // 分享描述
    link: wxfeixiangcb.link+"10", // 分享链接
    imgUrl: wxfeixiangcb.imgUrl, // 分享图标
    success: function () { 
    		whoshare(wxfeixiangcb.link+"10",true);
       // 用户确认分享后执行的回调函数
    		if(wxfeixiangcb.shareQQ){
	       	 wxfeixiangcb.shareQQ(true);
    		}
    },
    cancel: function () { 
    		whoshare(wxfeixiangcb.link+"10",false);
       // 用户取消分享后执行的回调函数
     	if(wxfeixiangcb.shareQQ){
	       	 wxfeixiangcb.shareQQ(false);
       }
    }
});
//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
wx.onMenuShareWeibo({
	title: wxfeixiangcb.title, // 分享标题
    desc: wxfeixiangcb.desc, // 分享描述
    link: wxfeixiangcb.link+"10", // 分享链接
    imgUrl: wxfeixiangcb.imgUrl, // 分享图标
    success: function () { 
		whoshare(wxfeixiangcb.link+"10",true);
       // 用户确认分享后执行的回调函数
   	 	if(wxfeixiangcb.shareWeibo){
	       	 wxfeixiangcb.shareWeibo(true);
      	}
    },
    cancel: function () { 
		whoshare(wxfeixiangcb.link+"10",false);
        // 用户取消分享后执行的回调函数
    		if(wxfeixiangcb.shareWeibo){
	       	 wxfeixiangcb.shareWeibo(false);
     	}
    }
});
//获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
wx.onMenuShareQZone({
	title: wxfeixiangcb.title, // 分享标题
    desc: wxfeixiangcb.desc, // 分享描述
    link: wxfeixiangcb.link+"10", // 分享链接
    imgUrl: wxfeixiangcb.imgUrl, // 分享图标
    success: function () { 
		whoshare(wxfeixiangcb.link+"10",true);
       // 用户确认分享后执行的回调函数
   	 	if(wxfeixiangcb.shareQZone){
	       	 wxfeixiangcb.shareQZone(true);
     	}
    },
    cancel: function () { 
		whoshare(wxfeixiangcb.link+"10",false);
        // 用户取消分享后执行的回调函数
    		if(wxfeixiangcb.shareQZone){
	       	 wxfeixiangcb.shareQZone(false);
   	 	}
    }
});

};

wx.ready(function () {
	//是否可用
if(!canwxaudio){
	return;
}
initfenxiang();
});