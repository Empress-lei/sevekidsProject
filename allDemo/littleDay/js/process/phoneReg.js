$(function(){
		//发送事件
		var sendClick=function() {
			if (!isPhone($("#telephone").val())) {
				toast("请填写正确的手机号");
				return;
			}
			if (!checkAccount()) {
				toast($("#telephone").val() + "手机号已经存在");
				return;
			}
			if (time != 59) {
				return;
			}
			var timer=null;
			clearInterval(timer);
			$('.send').text(time + "s后重发");
			timer = setInterval(function() {
				time--;
				if (time == 0) {
					//重新绑定点击事件
					$('.send').click(sendClick);
					
					$('.send').text("获取验证码");
					time = 59;
					clearInterval(timer);
				} else {
					$('.send').text(time + "s后重发");
				}
			}, 1000);
			
			//去除 发送验证码事件
			$(".send").unbind('click');
			
			HH.ajax({
				url : "/yzmm/valid/send",
				params : {
					account : $("#telephone").val()
				},
				callback : function(data) {
					if (data.success) {
						$("#validId").val(data.ext);
					} else {
						toast(data.msg);
					}
				}
			});
		}
		/**
		** 绑定 发送短信 事件
		*/
		$('.send').click(sendClick);
	});
	var time = 59;
	function active() {
		//姓名realName
		if($("#realName").val() == "" || $("#realName").val().length > 50){
			toast("请输入姓名");
			return;
		}
		//身份值
		if($("#validCode").val().length<6){
			toast("请输入正确的验证码");
			return;
		}
		
		
		if (!isPhone($("#telephone").val())) {
			toast("请填写正确的手机号");
			return;
		}
		
		HH.ajax({
			form:$("#activeForm"),
			callback:function(data){
				if(data.success){
					//成功跳转页面
					window.location.href=toUrl;
				}else{
					//已经激活
					/* if(100052 == data.code){
						toast("你已经提交成功，即将进入首页",function(){
							window.location.href="/yzmm/index";
						});
					} */
					toast(data.msg);
				}
			}
		});
	}
	
		
	//<!-- 不修改h5样式，禁止表单直接被提交 -->
	function sub(){  
	    return false;
	}  
	/**
	* 检测用户是否存在
	*/
	function checkAccount() {
		var result = false;
		HH.ajax({
			url : "/yzmm/account/checkAccount",
			data : {
				account : $("#telephone").val()
			},
			async : false,
			callback : function(data) {
				if (data.success) {
					result = true;
				} else {
					result = false;
				}
			}
		});
		return result;
	}
	
	function nameRegular(obj){
		obj.value=obj.value.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,""); 
	}
	//取消
	function cancelSubmit(){
		var url=toUrl;
		if(toUrl==''){
			url="/yzmm/index";
		}
		HH.href(url);
	}