var loginBar = {
			loginRefer : "",
			loginReferParam : "",
			loginReferPre:"/yzmm/account/login",
			setLoginReferParam : function(loginReferParam){
				loginBar.loginRefer = "?loginRefer=" + encodeURIComponent(loginReferParam);
			},
			}
$(function(){
	
	if(!la){
		var h='<div class="loginBar"><p>您还没有登录哟,为不影响正常操作，请先&nbsp;<a>登录</a></p></div>';
		$("body").prepend(h);

	}
	$(".loginBar a").click(function(){
		//alert(loginBar.loginRefer);
		top.location=loginBar.loginReferPre+loginBar.loginRefer;
	});
});	