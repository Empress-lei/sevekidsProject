var qrcodeUtils = {
		generateQRCode : function(qrcode,rendermethod, picwidth, picheight, url){
			 $("#"+qrcode).qrcode({
			        render: rendermethod, // 渲染方式有table方式（IE兼容）和canvas方式
			        width: picwidth, //宽度 
			        height:picheight, //高度 
			        text: url, //内容 utf16to8(url)
			        typeNumber:-1,//计算模式
			        correctLevel:2,//二维码纠错级别
			        background:"#ffffff",//背景颜色
			        foreground:"#000000"  //二维码颜色
			    });
		}
}
