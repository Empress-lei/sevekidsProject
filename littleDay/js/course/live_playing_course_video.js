//静态变量
//直播状态默认是不直播 PREPARE PLAYING GAMEOVER
//答疑是否开始 YES NO
var courseId = $("#courseId").val();
var nickname = $("#nickname").val();
var albumUrl = $("#albumUrl").val();
var playState = $("#playState").val();
var isVip = $("#isVip").val();
var auth = $("#auth").val();
var isWeixin = $("#isWeixin").val();
var answer = $("#answer").val();
var tcAblumUrl = $("#tcAblumUrl").val();
var tcName = $("#tcName").val();
$(function(){
	$(".tip_cf").click(function(){
		if(isWeixin!="true"){
			toast("请您进入微信支付");
			return false;
		}
		var obj = $(this);
		var content = "￥"+obj.data("money");
		//alert(content);
		wxmppay(obj.data("money"),obj.data("body"),courseId,"RED",function(orderId,result){
			if(result=="ok"){
				HH.ajax({
		   			waiting:false,
					url:'/yzmm/account/comment/sendComment', 
					data:{
						courseId:courseId,
						courseType:'LIVE',
						commentType:'TIP',
						content:content,
						commentStatus:'USE'
						}, 
					callback:function(data){
						//本地添加
						//前端显示
						flushComment();
						goToTop();
					}
				});
			}
		});
	   
	});
});

//评论刷新开关
var flushCommentStop = false;

function initLiveVote(){
	//设评论显示器高度zxk
	var lb = $(window).height()-$(".liveBottom").offset().top;
	var liveVoteH = $(window).height() -$(".liveVote").offset().top - lb -10;
	$(".liveVote").css("height",liveVoteH+"px");
	
	//评论爬楼时停止刷新
	$(".liveVote").scroll(function(){
		var cv = $(".bb");
		var cvh = cv.height();
		var cp = $(".liveVote")
		var cph = cp.height();
		var cps = cp.scrollTop();
// 		console.log(cvh +" "+cph+" "+ cps +" "+(cvh - cph - cps));
		if(cvh - cph - cps > 200){
			flushCommentStop = true;
		}else{
			flushCommentStop = false;
		}
	});
}

$(function (){
	initLiveVote();
});

//评论的时候用一次
function goToTop(){
	//爬楼
	if(flushCommentStop){
		return;
	}
	var cv = $(".bb");
	var cvh = cv.height();
	
	var cp = $(".liveVote");
	var cph = cp.height();
// 	console.log(cvh+" "+cph);
// 	console.log(cvh - cph);
	if(cvh > cph){
		cp.scrollTop(cvh - cph);
	}
}

$(function(){
	openHeartbeat();
	flushComment();
	
	if(answer=='YES'){
		$(".teaching").hide();
		$(".answer").show();
		$(".liveNote .tit").show();
	}else{
		$(".teaching").show();
		$(".answer").hide();
		$(".liveNote .tit").hide();
	}
//	if('GAMEOVER' == playState){
//		//answer = "NO";
//		$(".answerOrend").html("直播结束");
//		$(".teaching").hide();
//		$(".answer").show();
//		$(".liveNote .tit").hide();
//		flushAnswer();
//	}
});

function openHeartbeat(){
	
	 //心跳
   var timestamp=new Date().getTime();
   var timeInterval = 5000;
   if(auth == "true"){
	    window.setInterval(function(){
	    		//播放开始、结束\答疑开始、结束\评论总数
	    		ctrlPlay();
	    },timeInterval);
   }
 	//评论刷新
 	var timeIntervalflushComment = 5000;
   window.setInterval(function(){
		flushComment();
	},timeIntervalflushComment);
   
    //答疑刷新
//    var timeIntervalflushAnswer = 3000;
//    window.setInterval(function(){
//    		flushAnswer();
//    },timeIntervalflushAnswer);
    //最近进入用户信息
    var flushnewuserin =5000;
    window.setInterval(function(){
   	 getNewUserIn();
 	},flushnewuserin);
}
//最近进入的用户
var getNewUserInReqing = false; 
function getNewUserIn(){
	if(getNewUserInReqing){
		return ;
	}
	getNewUserInReqing = true;
	HH.ajax({
		waiting:false,
		data:{courseId:courseId},
		url:"/yzmm/account/course/getNewUserIn",
		success:function(data){
			//进入用户
			if(data.newcomeinusername){
				$(".scrollLive").css("display","block");
				$(".scrollLiveList").html('<a href="#">'+data.newcomeinusername+'加入课程</a>');	
			}else{
				$(".scrollLive").css("display","none");
				$(".scrollLiveList").html("");
			}
		},
		complete:function(){
			getNewUserInReqing = false;
		}
	});
}
/**
 * 评论刷新
 */
//上次的数据还没有返回
 var ajaxCommentReqing = false; 
//后台所有评论的数量
var pageMark = 0;
//第一次进入该页面
var isFirstTimeIn = true;

function flushComment(){
	if(ajaxCommentReqing){
		return ;
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
				toGethercommentsContent(data.list[i].nickname,data.list[i].commentType,data.list[i].content,commentId);
			}
			var currentSize = $(".cf").size(); 
			var dealSize = currentSize - data.ext;//ext 最大条数
			if(dealSize > 0){
				for(var j=0;j<dealSize;j++){
					var something = $(".commentView .video_class_comment1:first").remove();
				}
			}
			
			goToTop();
		},
		complete:function(){
			ajaxCommentReqing = false;
			isFirstTimeIn = false;
		}
	});
}

//后台最新评论数据的显示
var onPayShow = true;
//屏蔽第一次进来显示评论列表的送花特效
setTimeout("onPayShow = false;",3000);
function toGethercommentsContent(nickname,commentType,content,CommentId){
	var h = "";
	if(CommentId){
		h+='<li class="cf '+CommentId+'">';
	}else{
		h+='<li class=" cf localdata">';
	}
	h+='<div class="name">'+nickname+'：</div>';
	if(commentType=="TEXT"){
		h+='<div class="word">'+content+'</div>';
	}else if(commentType=="FLOWER"){
		h+='<div class="word"><span class="flower"></span></div>';
		
	}else if(commentType=="TIP"){
		if(!onPayShow){
			onPayShow = true;
			$(".payover").click();
			setTimeout("onPayShow = false;",7000);
		}
		h+='<div class="word"><span class="money"></span>'+content+'</div>';
	}
	
	h+='</li>'
	$(".bb").append(h);
}

$(function(){
	//发表评论
	var commentNo = 0; 
	$(".commentBtn").click(function(){
		 commentNo=commentNo+1;
   		//评论内容不能为空
   		var content = trim($(".commentContent textarea").val());
   		if(!content){
   			return;
   		}else if(commentNo>20){
   			toast("您发送消息太频繁，请休息一下!");
   			return;
   		}else if(content.length>120){
   			toast("发送消息内容超长(120字)，请分条发送!");
   			return;
   		}
   		
   	   	//var h = toGethercommentsContent(nickname,"TEXT",content,null);
   	   //	$(".bb").append(h);
      	 HH.ajax({
    			waiting:false,
 			url:'/yzmm/account/comment/sendComment', 
 			data:{
 				courseId:courseId,
 				courseType:'LIVE',
 				commentType:'TEXT',
 				content:content,
 				commentStatus:'USE'
 				}, 
 			callback:function(data){
 				//判断发送是否成功
 				if(data.success) {
 					//清空输入框
 			   		$(".commentContent textarea").val("");
					$(".liveBottom").removeClass("liveBottomFocus");
					$(".editVote").removeClass("liveBottomFocus");
 			   		$(".commentContent").find("i").text(0);
 					var fc = data.ext?data.ext:0;
 					//定时判断评论数量
 		   			if(data.ext==1){
 		   				var int=self.setInterval(function(){
 		   					commentNo = 0;
 		   				},60000);
 		   			}
 		   			flushComment();
 		   			goToTop();
 				}else{
 					  $(".localdata").remove();
 	                  toast(data.msg);
 				}
 			}
      	})
	})
		//送花
		//一分钟最多送花数
		var flowercount = 8; 
		$(".flower").click(function(){
			var content = "";
	   		var fc = $("#flowercount").html();
	   		if(fc==0){
	   			toast("客官，休息一下，每分钟8朵哟");
	   			return;
	   		}
   		//本地添加nickname,commentType,content,CommentId
   	   	var h = toGethercommentsContent(nickname,"FLOWER",content,null);
   	   //	$(".bb").append(h);
      	 HH.ajax({
    			waiting:false,
 			url:'/yzmm/account/comment/sendComment', 
 			data:{
 				courseId:courseId,
 				courseType:'LIVE',
 				commentType:'FLOWER',
 				content:content,
 				commentStatus:'USE'
 				}, 
 			callback:function(data){
 				//判断发送是否成功
 				if(data.success) {
					var fc = data.ext?data.ext:0;
					 $("#flowercount").html(flowercount - data.ext);
					//定时判断送花数量
		   			if(data.ext==1){
		   				var int=self.setInterval(function(){
		   					$("#flowercount").html("8");
		   				},60000);
		   			}
		   			flushComment();
		   			goToTop();
 				}else{
 					  $(".localdata").remove();
 	                  toast(data.msg);
 				}
 			}
      	})
	})
	
});
/**
 * 直播准备中
 1、在直播开始前30分钟开始刷新直播控制
//提起半个小时换说明
 */
/**
 *播放开始、结束\答疑开始、结束\评论总数
 */  
 var ajaxCtrlPlayReqing = false;
function ctrlPlay(){
	if(ajaxCtrlPlayReqing){
		return ;
	}
	ajaxCtrlPlayReqing = true;
	HH.ajax({
		waiting:false,
		data:{playState:playState,courseId:courseId},
		url:"/yzmm/account/course/ctrlLivePlay",
		success:function(data){
			
			if('PLAYING' == playState && 'PREPARE' == data.playState){
				window.location.reload();
			}
			
			//直播状态转直播结束状态
			else if('GAMEOVER' == data.playState && 'PLAYING' != playState){
				$(".over").height($(".liveVedio").height());
				$(".liveVedio").hide();
				$(".over").show();
				//答疑关闭
				answer = "NO";
				$(".answerOrend").html("直播结束");
				$(".liveNote .tit").hide();
				$(".editVote").hide();
				myPlayer.pause();
				$(".flushDiv").hide();
				initLiveVote();
			}
			
			//更新状态
			playState = data.playState;
			
			//答疑开始
			if("YES" != answer && "YES" == data.answer && 'GAMEOVER' != data.playState){
				answer = "YES";
				toast("亲们~  答疑开始啦 O(∩_∩)O ");
				$(".teaching").slideUp();
				$(".liveNote .tit").show();
				$(".answer").show();
			}else if("NO" == data.answer){
				answer = "NO";
			}
		},
		complete:function(){
			ajaxCtrlPlayReqing = false;
		}
	});
}

$(function(){
	//发送提问
	$(".questionBtn").click(function(){
		if("YES" != answer){
			toast("目前非答疑时段哟~");
			return;
		}else if(playState=="GAMEOVER"){
			toast("直播已结束~");
		}
		var question = trim($(".questionContent textarea").val());
		
		//当提问为空的时候禁止提问。
		if(question==""){
			return;
		}else if(question.length>300){
	   			toast("发送提问内容超长(300字)，请分条发送!");
	   			return;
	   	}
	   	 HH.ajax({
	   			waiting:false,
				url:'/yzmm/qa/sendQa', 
				data:{
					courseId:courseId,
					questionText:question
					}, 
				callback:function(data){
					//判断发送是否成功
					if(data.success) {
						$(".questionContent textarea").val("");
						$(".liveBottom").removeClass("liveBottomFocus");
						$(".editVote").removeClass("liveBottomFocus");
						$(".questionContent").find("i").text(0);
	                } else {
	                  toast(data.msg);
	                }
				}
			});
	});
});


/**
 * 答疑刷新
 */
 //后台答疑数量
 var questionMark = 0;
 //后台答案更新时间
 var timeMark = 0;
 //后台时间段里面 分页起始 offset
 var offset = 0;
//上次的数据还没有返回
var ajaxAnswerReqing = false; 
function flushAnswer(){
	if(ajaxAnswerReqing){
		return ;
	}
	/* if('YES' != answer){
		return ;
	} */
	
	ajaxAnswerReqing = true;
	//定时刷新答疑
	HH.ajax({
		waiting:false,
		data:{
			courseId:courseId,
			pageMark:questionMark,
			timeMark:timeMark,
			offset:offset
		},
		url:"/yzmm/qa/ajaxQalist",
		success:function(data){
			if(data.qaList.success){
				//console.log("first");
				var qalen = data.qaList.list.length;
				//console.log("qa:"+qalen);
				 var qa = data.qaList.list;
				for(var i=0;i<qalen;i++){
					var orderId = data.qaList.pageMark-qalen+i+1;
					togetherQacontent(orderId,qa[i].id,qa[i].nickname,qa[i].albumUrl,qa[i].question,tcName,tcName,qa[i].sqwTitle,qa[i].answerText,qa[i].sqwId)
				}
				//请最大下标
				questionMark = data.qaList.pageMark;
			}
			if(data.awList.success){
				//console.log("second");
				 //加内容
				var awlen = data.awList.list.length;
				//console.log("aw:"+awlen);
				var aw = data.awList.list;
				timeMark = data.awList.pageMark;
				offset = data.awList.ext;
				for(var i =0;i<awlen;i++){
					var obj = $("#"+aw[i].id);
					//console.log(obj.html());
					if(obj.hasClass("active")){
						return;
					}
					if(aw[i].sqwTitle||aw[i].answerText){
						if(i==awlen-1){
							$(".ansPhoto").each(function(index){
								//alert(index);
								var id2 = $(this).data("id");
								var o = $("#"+id2);
								$(this).remove();
								o.addClass("active");
								var over2 = $("#over"+id2);
								over2.html("已回答");
							})
							var info = $(".info"+aw[i].id);
							var h="";
							h+='<div data-id="'+aw[i].id+'" class="ansPhoto ans'+aw[i].id+'">';
							h+='<img src="'+tcAblumUrl+'" >';
							h+='<span class="bar"></span>';
							h+='</div>';
							info.append(h);
						}else{
							obj.addClass("active");
							var over = $("#over"+aw[i].id);
							over.html("已回答");
						}
					}
				}
			}
		},
		complete:function(){
			ajaxAnswerReqing = false;
		}
	});
}


//后台返回所有答疑结果
function togetherQacontent(orderId,id,nickname,albumUrl,question,tcName,tcAblumUrl,sqwTitle,answerText,sqwId){
	var h ="";
	if(sqwTitle||answerText){
		h+='<li class="active" id="'+id+'" data-id="'+id+'">';	
	}else{
		h+='<li id="'+id+'" data-id="'+id+'">';	
	};
			h+='<div class="photo"><img src="'+albumUrl+'" ></div>';
			h+='<div class="info info'+id+'">';
				h+='<h2><span>Q'+orderId;
				if(sqwTitle||answerText){
					h+='<label id="over'+id+'">已回答</label>';
				}else{
					h+='<label id="over'+id+'"></label>';
				};
					h+='</span>'+nickname+'</h2>';
				h+='<P>'+question+'</P>';
			h+='</div>';
		h+="</li>";
		$(".answerList").append(h);
}