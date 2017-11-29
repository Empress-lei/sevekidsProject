//后台所有评论的数量
var pageMark = 0;
var auth = $("#auth").val();
$(document).ready(function(){
	openHeartbeat();
	flushComment();
});

function openHeartbeat(){
	 //心跳
   var timestamp=new Date().getTime();
   var timeInterval = 5000;
  //console.log(timeInterval);
   window.setInterval(function(){
   		//评论刷新
   		flushComment();
   },timeInterval);
}
//后台所有评论的数量
var pageMark = 0;
//刷新评论
var ajaxCommentReqing = false; //请求中,结果未返回
function flushComment(){
	if($(".voteList").is(":hidden")){
		return 
	}
	if(ajaxCommentReqing){
		return ;
	}
	if(isFirstTimeIn){
		return;
	}
	ajaxCommentReqing = true;
	HH.ajax({
		waiting:false,
		data:{
			courseId:courseId,
			pageMark:pageMark
		},
		url:"/yzmm/account/comment/getComments",
		success:function(data){
			
			$(".localdata").remove();
			
			 //加内容
			var len = data.list.length;
			 
			//请最大下标
			pageMark = data.pageMark;
			for(var i=len-1;i>=0;i--){
				var commentId = data.list[i].commentId;
					//var contentAll = toGethercommentsContent(data.list[i].nickname,data.list[i].content,data.list[i].timeAgo,data.list[i].albumUrl,data.list[i].userIdentity,data.list[i].babySex,data.list[i].babyAge,commentId);
					//$(".commentView").prepend(contentAll);
				commentList(data.list[i].albumUrl,data.list[i].nickname,data.list[i].userIdentity,data.list[i].babySex,data.list[i].babyAge,data.list[i].content,data.list[i].commentType,data.list[i].timeAgo,true);
			}
			
			var currentSize = $(".commentView .video_class_comment1").size();  
			var dealSize = currentSize - data.ext;//ext 最大条数
			if(dealSize > 0){
				for(var j=0;j<dealSize;j++){
					var something = $(".commentView .video_class_comment1:first").remove();
				}
			}
		},
		complete:function(){
			ajaxCommentReqing = false;
			isFirstTimeIn = false;
		}
	});
}
//向上加载页码数(第一页就是该时间段加载的，向上翻从第二页)
var getMorePage = 1;
var currentCH = 0;

//第一次进入该页面
var isFirstTimeIn = true;
//点击是不自动刷新
ajaxCommentReqing = true;
currentCH = $("#commentPage").height();
var sm = {};
var pageIndex = 1;
var fistTime =0;
$(function(){
	 sm = $(window).scrollme({
		target:$(".commentView"),
		waiting:false,
		data:{courseId:courseId,
			timeMark:fistTime,
			getMorePage:getMorePage,
			pageSize:20},
		url:"/yzmm/account/comment/ajaxGetMore",
		beforeLoad:function(){
		},
		callback:function(data,params){
			
			var h = "";
			if (data.success) {
				//是否为空
				if (!data.totalPage) {
					$(".noresult").remove();
					
				} else {
					$(".noresult").hide();
					if(1==getMorePage){
						//请最大下标,用于自动刷新
						pageMark = data.totalRows;
					}
					params.timeMark = data.pageMark;
					params.getMorePage = data.ext;
					var len = data.list.length; 
					for(var i=0;i<len;i++){
						var commentId = data.list[i].commentId;
							//var contentAll = toGethercommentsContent(data.list[i].nickname,data.list[i].content,data.list[i].timeAgo,data.list[i].albumUrl,data.list[i].userIdentity,data.list[i].babySex,data.list[i].babyAge,commentId);
							//$(".commentView").append(contentAll);
						commentList(data.list[i].albumUrl,data.list[i].nickname,data.list[i].userIdentity,data.list[i].babySex,data.list[i].babyAge,data.list[i].content,data.list[i].commentType,data.list[i].timeAgo,null);
					}
				}
			} 
		}, 
		complete:function(){
			ajaxCommentReqing = false;
			isFirstTimeIn = false;
		}
	}); 
	//加载数据
	sm.reload();
})
function commentList(albumUrl,nickname,userIdentity,babySex,babyAge,content,contentType,timeAgo,local){
	var container=$("#courseComment");
	if(local){
		var li=$('<li></li>').prependTo(container);
	}else{
		var li=$('<li></li>').appendTo(container);
	}
	var div1=$('<div class="photo"><img src="'+albumUrl+'"></div>').appendTo(li);
	var div2=$('<div class="voteInfo"></div>').appendTo(li);
	var div3=$('<div class="name">'+nickname+'</div>').appendTo(div2);
	
	var userIdentityClassName="";//身份样式
	//获取身份样式
	if(userIdentity=='GRAVIDA'){
		userIdentityClassName='<span class="icon-yun"></span>已怀孕';
	}else if(userIdentity=='MOM'){
		if(babySex){
			if(babySex=='小王子'){
				userIdentityClassName='<span class="icon-boy"></span>小王子 ';
			}else if(babySex=='小公主'){
				userIdentityClassName='<span class="icon-girl"></span>小公主 ';
			}else if(babySex=='小宝宝'){
				userIdentityClassName='<span class="icon-boy"></span>小宝宝 ';
			}
		}
	}
	var babyAgeName=""; //用户年龄
	if(babyAge){
		babyAgeName = babyAge;
	}
	var div4=$('<div class="other">'+userIdentityClassName+babyAgeName+'</div>').appendTo(div2);
	var contentInfo=""; //内容信息
	if(contentType=='TEXT'){
		contentInfo=content;
	}else if(contentType=='FLOWER'){
		contentInfo='<span class="flower"></span>';
	}else if(contentType=='TIP'){
		contentInfo='<span class="money"></span>'+content;
	}
	var div5=$('<div class="word">'+contentInfo+'</div>').appendTo(div2);
	var div6=$('<div class="timeout">'+timeAgo+'<a href="#" onclick="atTa(this);" class="atTa">@TA</a></div>').appendTo(div2);
}
//发表评论
$(function(){
	//发表评论
	var commentNo = 0; 
	$(".pubBtn").click(function(){
		if(auth!="true"){
			  toast("喵~请先喂(qu)猫(zhi)粮(fu)");
			  return;
		  } 
		 commentNo=commentNo+1;
   		//评论内容不能为空
   		var content = trim($(".textarea textarea").val());
   		if(!content){
   			return;
   		}else if(commentNo>20){
   			toast("您发送消息太频繁，请休息一下!");
   			return;
   		}else if(content.length>120){
   			toast("发送消息内容超长(120字)，请分条发送!");
   			return;
   		}
      	 HH.ajax({
    			waiting:false,
 			url:'/yzmm/account/comment/sendComment', 
 			data:{
 				courseId:courseId,
 				courseType:'VOD',
 				commentType:'TEXT',
 				content:content,
 				commentStatus:'USE'
 				}, 
 			callback:function(data){
 				//判断发送是否成功
 				if(data.success) {
 					//清空输入框
 			   		$(".textarea textarea").val("");
 					$(".textarea").find("i").text(0);
 					 $(window).scrollTop(0);
 					var fc = data.ext?data.ext:0;
 					//定时判断评论数量
 		   			if(data.ext==1){
 		   				var int=self.setInterval(function(){
 		   					commentNo = 0;
 		   				},60000);
 		   			}
	 		   		$(".liveBottom").removeClass("liveBottomFocus");
	 				$(".editVote").removeClass("liveBottomFocus");
	 				flushComment();
 				}else{
 					  $(".localdata").remove();
 	                  toast(data.msg);
 				}
 			}
      	})
	})
})
