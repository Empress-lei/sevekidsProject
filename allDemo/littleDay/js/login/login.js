//初始化滑动条
$(".dragBlock").slide();
//滑块验证
var validDrag=false;

$(function(){
	var time = 59;
	//发送事件
	var sendClick=function() {
		if (!isPhone($("#tel").val())) {
			addFormTxt("请填写正确的手机号");
			return;
		}
		
		if (time != 59) {
			return;
		}
		
		
		HH.ajax({
			url : "/yzmm/account/h5login/send",
			params : {
				account : $("#tel").val()
			},
			callback : function(data) {
				if (data.success) {
					//定时器
					var timer=null;
					clearInterval(timer);
					$('.send').text("("+time + "s后重发)");
					timer = setInterval(function() {
						time--;
						if (time == 0) {
							//重新绑定点击事件
							$('.send').click(sendClick);
							$('.send')[0].style.color='red';
							$('.send').text("获取验证码");
							time = 59;
							clearInterval(timer);
						} else {
							$('.send').text("("+time + "s后重发)");
						}
					}, 1000);
					
					//去除 发送验证码事件
					$(".send").unbind('click');
					//灰化发送按钮
					$('.send')[0].style.color='#999';
					//隐藏域 validId赋值
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
		/*$("#hqcode").on('click',function(){
			var phone=$("#tel").val();
			
			if (!isPhone(phone)) {
				toast("请填写正确的手机号");
				return;
			}
			
			HH.ajax({
				url: "/yzmm/account/h5login/send",
				data:{account:phone},
				callback:function(data){
					if(data.success){
						$('#validId').val(data.ext);
					}else{
		    			toast(data.msg);
					}
				}
			});
		});*/
		
		//验证
		$("#submit").on('click', function(){
			
			var phone=$("#tel").val();
			if(phone==''){
				addFormTxt('请输入手机号');
				return;
			}
			if (!isPhone(phone)) {
				addFormTxt('手机号格式不正确，请重新输入');
				return;
			}
			//是否滑块验证
			if(validDrag){
				//是否滑动了滑动条   滑块验证通过后 样式 为：rgb(255, 255, 255)
				var isTg=document.getElementsByClassName('dragTxt')[0].style.color;
				if(!(isTg=='rgb(255, 255, 255)')){
					addFormTxt('请拖动滑块完成校验');
				}else{
					loginValid();
				}
			}else{
				loginValid();
			}
		});
		function loginValid(){
			var tel = $('#tel').val(),
		    pwd = $('#pwd').val(),validId=$('#validId').val(),
		    telVal = tel;
			
			if(tel==''){
				addFormTxt('请输入手机号');
				return;
			}
			if (!isPhone(tel)) {
				addFormTxt('手机号格式不正确，请重新输入');
				return;
			}
			if(trim(pwd)==""){
				addFormTxt('验证码不能为空');
				return;
			}
	    	HH.ajax({
	    		url: "/yzmm/account/h5login/valid",
	    		data:{validCode:pwd,validId:validId,account:telVal},
	    		callback:function(data){
	    			if(data.success){
	    				//toLogin
	    				HH.ajax({
	    		       		url: "/yzmm/account/h5login/login",
	    		       		data:{username:telVal,password:pwd,validId:validId},
	    		       		callback:function(data){
	    		       			if(data.success){
	    		       				if(loginReferer){
	    		       					window.location.href=loginReferer;
	    		       				}else{
	    		       					window.location.href='/yzmm/index';
	    		       				}
	    		       			}else{
	    		       				toast(data.msg);
	    		       			}
	    		       		}
	    		       	});
	    			}else{
	    				if(!data.ext&&data.ext!=null){
	    					validDrag=true;//开始滑块验证
	    					showDrag();
	    				}
		    			toast(data.msg);
	    			}
	    		}
	    	});
		}
	});
	//显示滑动条
	function showDrag(){
		document.getElementsByClassName('drag')[0].style.display='block';
	}
	//隐藏滑动条
	function hideDrag(){
		document.getElementsByClassName('drag')[0].style.display='none';
	}
	function cancel(){
		window.location.href='/yzmm/account/h5login/cancelSubmit';
	}
	function addFormTxt(txt){
		var formTxt=$('.formTxt');
		formTxt.html(txt);
		formTxt.css("visibility","inherit");
	}