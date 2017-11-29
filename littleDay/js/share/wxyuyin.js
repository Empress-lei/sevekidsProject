var wxfeixiangcb={
		localId:"",
		serverId:""
};

//4.2 开始录音
function weixinStartRecord(){
	 	wx.startRecord({
		    cancel: function () {
		    	toast('您拒绝了授权录音');
		    }
		  });
}

// 4.2 开始录音
document.querySelector('#startRecord').onclick = function () {
  wx.startRecord({
    cancel: function () {
    	toast('您拒绝了授权录音');
    }
  });
};
//4.3 停止录音
document.querySelector('#stopRecord').onclick = function () {
  wx.stopRecord({
    success: function (res) {
    		wxfeixiangcb.localId = res.localId;
    		HH.ajax({
    			url: "/yzmm/upload/temp/wxaudio",
    			data:{serverId:wxfeixiangcb.localId,parent:"wxaudio"},
    			callback:function(data){
    				if(data.success){
    					toast(data.msg);
    				}else{
    					toast(data.msg);
    				}
    			}
    		});
    },
    fail: function (res) {
     	toast("微信停止录音失败");
    }
  });
};

// 4.5 播放音频
document.querySelector('#playVoice').onclick = function () {
  if (wxfeixiangcb.localId == '') {
	  toast('请先录制您的声音');
    return;
  }
  wx.playVoice({
    localId: wxfeixiangcb.localId
  });
};
// 4.5 播放音频
document.querySelector('#downplayVoice').onclick = function () {
  if (wxfeixiangcb.serverId == '') {
	  toast('请先录制您的声音');
    return;
  }
  wx.downloadVoice({
	    serverId: wxfeixiangcb.serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
	    isShowProgressTips: 1, // 默认为1，显示进度提示
	    success: function (res) {
	        var localId = res.localId; // 返回音频的本地ID
	        wx.playVoice({
	            localId: localId
	          });
	    }
	});
};
//4.6 暂停播放音频
document.querySelector('#pauseVoice').onclick = function () {
  wx.pauseVoice({
    localId: wxfeixiangcb.localId
  });
};
//4.7 停止播放音频
document.querySelector('#stopVoice').onclick = function () {
  wx.stopVoice({
    localId: wxfeixiangcb.localId
  });
};

// 4.8 上传语音
document.querySelector('#uploadVoice').onclick = function () {
  if (wxfeixiangcb.localId == '') {
	 toast('请先录制您的声音');
    return;
  }
  wx.uploadVoice({
    localId: wxfeixiangcb.localId,
    success: function (res) {
    	wxfeixiangcb.serverId = res.serverId;
   	HH.ajax({
		url: "/yzmm/upload/temp/wxaudio",
		data:{serverId:wxfeixiangcb.serverId,parent:"wxaudio"},
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
};


// 4.9 下载语音
/*
document.querySelector('#downloadVoice').onclick = function () {
  if (voice.serverId == '') {
    alert('请先使用 uploadVoice 上传声音');
    return;
  }
  wx.downloadVoice({
    serverId: voice.serverId,
    success: function (res) {
      alert('下载语音成功，localId 为' + res.localId);
      voice.localId = res.localId;
    }
  });
};
*/
wx.ready(function () {
	//是否可用
	if(!canwxaudio){
		return;
	}
	//4.4 监听录音自动停止
	wx.onVoiceRecordEnd({
	  complete: function (res) {
		wxfeixiangcb.localId = res.localId;
	    toast('录音时间最长60S');
	  }
	});
});