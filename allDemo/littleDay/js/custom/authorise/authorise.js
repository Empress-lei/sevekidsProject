//这个要写成JS文件
var userAuthObj = {
		once:{
			price:100,
			title:""
		},
		msgOjb:{
			"NOTALL":"js 0",
			"LOGIN":"js 1",
			"CELLPHONE":"js 2",
			"SELFINFO":"js 3",
			"ONCE":"js 4",
			"VIP":"js 5"
		},   
		urlAuthorise : {
			"NOTALL":"NOTALL",
			"LOGIN":"LOGIN",
			"CELLPHONE":"CELLPHONE",
			"SELFINFO":"SELFINFO",
			"ONCE":"ONCE",
			"VIP":"VIP"
		},
		userAuthorise : {
			"NOTALL":"NOTALL",
			"LOGIN":"LOGIN",
			"CELLPHONE":"CELLPHONE",
			"SELFINFO":"SELFINFO",
			"ONCE":"ONCE",
			"VIP":"VIP"
		},
		url : "",
		msg : "",
		urlTypeScore : "",
		showMsg : function(auth){
			alert(this.getMsg(auth));
		},
		getMsg : function(auth){
			switch (auth) {
			case "NOTALL":
				// 小白信息注册页
				return this.msgOjb.LOGIN;
			case "LOGIN":
				// 去登陆
				return this.msgOjb.LOGIN;
			case "CELLPHONE":
				// 手机号注册
				return this.msgOjb.CELLPHONE;
			case "SELFINFO":
				// 个人信息完善
				return this.msgOjb.SELFINFO;
			case "ONCE":
				// 单次打赏
				return this.msgOjb.SELFINFO;
			case "VIP":
				// 不是会员身份
				return this.msgOjb.VIP;
			default:
				return this.msgOjb.VIP;
			}
		},
		code:function(auth){
			switch (auth) {
			case "NOTALL":
				// 小白信息注册页
				return 0;
			case "LOGIN":
				// 去登陆
				return 1;
			case "CELLPHONE":
				// 手机号注册
				return 2;
			case "SELFINFO":
				// 个人信息完善
				return 3;
			case "ONCE":
				// 单次打赏
				return 4;
			case "VIP":
				// 不是会员身份
				return 5;
			default:
				return 5;
			}
		},
		filter : function(userAuth,urlAuth){
			if(userAuth.code >= urlAuth.code){
				return true;
			}
			//回调
			switch (urlAuth) {
			case "NOTALL":
				// 小白信息注册页
				userAuthOpt.notall(urlAuth);
				break;
			case "LOGIN":
				userAuthOpt.login(urlAuth);
				break;
			case "CELLPHONE":
				// 手机号注册
				userAuthOpt.cellphone(urlAuth);
				break;
			case "SELFINFO":
				// 个人信息完善
				userAuthOpt.selfinfo(urlAuth);
				break;
			case "VIP":
				// 不是会员身份
				userAuthOpt.vip(urlAuth);
				break;
			default:
				userAuthOpt.vip(urlAuth);
				break;
			}
		}

};
var userAuthOpt = {
		notall : function(urlAuthorise){
			openPromptBack();
			userAuthObj.showMsg(urlAuthorise);
		},
		login : function(urlAuthorise){
			openPromptBack();
			userAuthObj.showMsg(urlAuthorise);
		},
		cellphone : function(urlAuthorise){
			openPromptBack();
			$(".box4").show();
			userAuthObj.showMsg(urlAuthorise);
		},
		selfinfo : function(urlAuthorise){
			openPromptBack();
			$(".box3").show();
			userAuthObj.showMsg(urlAuthorise);
		},
		//url:去付费的url
		once : function(price,url,title){
			userAuthObj.once.price=price;
			userAuthObj.url=url;
			userAuthObj.once.title=title;
			oncePayEvent(userAuthObj);
		},
		vip : function(urlAuthorise){
			userAuthObj.showMsg(urlAuthorise);
		},
		authRedirect : function(userAuthObj){
			//跳转指定页面
			window.location = userAuthObj.url;
		}
		}