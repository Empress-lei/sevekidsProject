//静态变量
var courseId = $("#courseId").val();
var nickname = $("#nickname").val();
var albumUrl = $("#albumUrl").val();
var userIdentity = $("#userIdentity").val();
var babySex = $("#babySex").val();
var babyAge = $("#babyAge").val();
var playState = $("#playState").val();
var isVip = $("#isVip").val();
var uid = $("#uid").val();
var auth = $("#auth").val();
var isWeixin = $("#isWeixin").val();
var once = $("#once").val();
var answer = $("#answer").val();
$(function(){
	//点击评论
	$(".vote").click(function(){
		if(auth != "true"){
			var pl = "YES" == answer?"答疑":"评论";
			 toast("您还没有"+pl+"权限");
		 }
		$(".wrap").hide();
		$(".voteList").show().addClass("slideup");
		$(".editVote").show();
		dealdayipinglun();
	});
	$(".slidedownBtn").click(function(){
		$(".voteList").addClass("slidedown");
		$(".wrap").show();
		setTimeout(function(){
			$(".voteList").removeClass("slideup");
			$(".voteList").removeClass("slidedown");
			$(".editVote").hide();
			$(".voteList").hide();
		},500)
	});
})
$(function(){
	//发表评论
	var commentNo = 0; 
	$(".pubBtn").click(function(){
		 if(auth != "true"){
			 var pl = "YES" == answer?"答疑":"评论";
			 toast("您还没有"+pl+"权限");
			 return; 
		 }
		 if('YES'==answer){
			 $(".expression").hide();
			 var question = trim($(".textarea textarea").val());
				
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
								flushAnswer();
								$(".liveBottom").removeClass("liveBottomFocus");
				 				$(".editVote").removeClass("liveBottomFocus");
				 				$(".textarea textarea").val("");
			                } else {
			                  toast(data.msg);
			                }
						}
					});
			 
			 
			 return;
		 }
		 
		 $(".expression").show();
		 
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
   		
   		//本地添加
   	   	//var h = toGethercommentsContent(nickname,content,"刚刚",albumUrl,userIdentity,babySex,babyAge,null);
   	   	$(".commentView").prepend(h);
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
 					 $(window).scrollTop(0);
 					//清空输入框
 			   		$(".textarea textarea").val("");
 					$(".textarea").find("i").text(0);
 					var fc = data.ext?data.ext:0;
 					//定时判断评论数量
 		   			if(data.ext==1){
 		   				var int=self.setInterval(function(){
 		   					commentNo = 0;
 		   				},60000);
 		   			}
 		   		flushComment();
 		   		$(".liveBottom").removeClass("liveBottomFocus");
 				$(".editVote").removeClass("liveBottomFocus");
 				}else{
 					  $(".localdata").remove();
 	                  toast(data.msg);
 				}
 			}
      	})
	})
	
});


	$(function(){
		$(".addFav2").click(function(){
			var cid = courseId;
			var collectStatus;
			var follow;
			if ($(".addFav2").hasClass("addFavActive")) {
				//此次点击会添加收藏
				collectStatus = 1;
				//此处点击已关注
				follow=1;
			} else {
				//此次点击会取消收藏 
				collectStatus = 0;
				//此次点击取消关注
				follow=0;
			}
			HH.ajax({
				   waiting:false,
				   async:false,
				   url: "/yzmm/account/course/followAndCollectLive",
				   data: {
					   courseId : cid,
					   collectStatus : collectStatus,
					   follow:follow
				   },
				   callback: function(data){
						if (data.success) {
							if ($(".addFav2").hasClass("addFavActive")) {
								$(".addFav2").removeClass("addFavActive");
								$(".addFav2").html("已关注");
								toast("关注并收藏成功~");
							} else {
								$(".addFav2").html("未关注");
								$(".addFav2").addClass("addFavActive");
							}
						}
				   }
			});
		})
	})
//心跳开启 
//开启心跳
$(function(){
	dealdayipinglun();
	openHeartbeat();	
});
function dealdayipinglun(){
	   if('YES' == answer){
		   $("#showdayia").show();
		   //评论 
		   $("#commentView").hide();
		   $("#dayiView").show();
		   $(".vote").html("答 疑");
		   flushAnswer();
		}else{
			 $("#showdayia").hide();
			//答疑
			 $("#dayiView").hide();
			 $("#commentView").show();
			 $(".vote").html("评 论");
		   flushComment();
		}
}

function openHeartbeat(){
	 //心跳
   var timestamp=new Date().getTime();
   var timeInterval = (11+timestamp%10)*100;
    window.setInterval(function(){
    		//播放开始、结束\答疑开始、结束\评论总数
    		ctrlPlay();
    },timeInterval);

 	//评论刷新
 	var timeIntervalflushComment = (5+timestamp%5)*1000;
   window.setInterval(function(){
	   dealdayipinglun();
	},timeIntervalflushComment);
   
}
//后台所有评论的数量
var pageMark = 0;
// 刷新评论
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
					var contentAll = toGethercommentsContent(data.list[i].nickname,data.list[i].content,data.list[i].timeAgo,data.list[i].albumUrl,data.list[i].userIdentity,data.list[i].babySex,data.list[i].babyAge,commentId);
					$("#commentView").prepend(contentAll);
			}
			
			var currentSize = $("#commentView .video_class_comment1").size();  
			var dealSize = currentSize - data.ext;//ext 最大条数
			if(dealSize > 0){
				for(var j=0;j<dealSize;j++){
					var something = $("#commentView .video_class_comment1:first").remove();
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
		target:$("#commentView"),
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
							var contentAll = toGethercommentsContent(data.list[i].nickname,data.list[i].content,data.list[i].timeAgo,data.list[i].albumUrl,data.list[i].userIdentity,data.list[i].babySex,data.list[i].babyAge,commentId);
							$("#commentView").append(contentAll);
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
	if($(".voteList").is(":hidden")){
		return 
	}
	if(ajaxAnswerReqing){
		return ;
	}
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
					var qatemp = qa[i];
					var h = togetherQacontent(qatemp.nickname,qatemp.albumUrl,qatemp.question,qatemp.timeAgo,qatemp.babyAge,qatemp.babySex,qatemp.userIdentity)
					$("#dayiView").append(h);
				}
				//请最大下标
				questionMark = data.qaList.pageMark;
			}
		},
		complete:function(){
			ajaxAnswerReqing = false;
		}
	});
}

//拼接答疑
function togetherQacontent(nickname,albumUrl,question,createTime,babyAge,babySex,userIdentity){
	var h = "";
		h+='<li class="localdata dayi">';
		h+='<div class="photo"><img src="'+albumUrl+'" ></div>';
			h+='<div class="voteInfo">';
				h+='<div class="name">'+nickname+'</div>';
					h+='<div class="other">';
						if(userIdentity=='GRAVIDA'){
							h+='<span class="icon-yun"></span>已怀孕 ';
							if(babyAge){
								h+=babyAge;
							}
						}else if(userIdentity=='MOM'){
							if(babySex){
								if(babySex=='MALE'){
									h+='<span class="icon-boy"></span>小王子 ';
								}else if(babySex=='FAMALE'){
									h+='<span class="icon-girl"></span>小公主 ';
								}
							}
							if(babyAge){
								h+=babyAge;
							}
						}
						
					h+='</div>';
				h+='<div class="word">'+question+'</div>';
				h+='<div class="timeout">'+createTime+'<a href="#" class="atTa" onclick="atTa(this)" >@TA</a></div>';
			h+='</div>';
		h+='</li>';
	return h;
}

//拼接评论
//后台最新评论数据的显示
function toGethercommentsContent(nickname,content,createTime,albumUrl,userIdentity,babySex,babyAge,CommentId){
	if(!content){
		return;
	}
	var h = "";
	if(CommentId){
		h+='<li class="comment'+CommentId+' pinglun">';
	}else{
		h+='<li class="localdata">';
	}
		h+='<div class="photo"><img src="'+albumUrl+'" ></div>';
			h+='<div class="voteInfo">';
				h+='<div class="name">'+nickname+'</div>';
					h+='<div class="other">';
						if(userIdentity=='GRAVIDA'){
							h+='<span class="icon-yun"></span>已怀孕 ';
							if(babyAge){
								h+=babyAge;
							}
						}else if(userIdentity=='MOM'){
							if(babySex){
								if(babySex=='小王子'){
									h+='<span class="icon-boy"></span>小王子 ';
								}else if(babySex=='小公主'){
									h+='<span class="icon-girl"></span>小公主 ';
								}
							}
							if(babyAge){
								h+=babyAge;
							}
						}
						
					h+='</div>';
				h+='<div class="word">'+content+'</div>';
				h+='<div class="timeout">'+createTime+'<a href="#" class="atTa" onclick="atTa(this)" >@TA</a></div>';
			h+='</div>';
		h+='</li>';
	return h;
}

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
			//倒计时
			var remainTime = data.remainTime?data.remainTime:0;
			if(remainTime){
				var now = new Date().getTime();
				now = Math.floor(now/1000);
				remainTime = remainTime - now;
				if(remainTime<3600 && remainTime>1800){
					$(".time").html("直播准备中~");
				}else if(remainTime<1800 && remainTime>0){
					remainTime = parseInt(remainTime);
					var fen = remainTime/60;
					var miao = remainTime%60;
					fen = Math.floor(fen);
					if(fen < 10){
						fen = "0"+fen;
					}
					if(miao < 10){
						miao = "0"+miao;
					}
					$(".time").html("直播倒计时["+fen+":"+miao+"]");
				}else if(remainTime < 0){
					$(".time").html("直播准备中~");
				}
			}
			
			//非直播状态转直播中状态
			if('PREPARE' == playState && 'PLAYING' == data.playState){
				if(auth == "true"){
					toast("直播开始啦，自动移步直播间~~");
					window.location.reload();
				 }else{
					 $(".time").html("直播进行中");
				 }
				
			}
			if('PLAYING' == playState && 'PREPARE' == data.playState){
				$(".time").html("直播准备中");
			}
			if('PLAYING' == playState && 'GAMEOVER' == data.playState){
				HH.href("/yzmm/account/course/ending?courseId="+courseId);
			}
			//更新状态
			playState = data.playState;
			answer = data.answer;
		},
		complete:function(){
			ajaxCtrlPlayReqing = false;
		}
	});
}
//推荐
function tosqwlist(obj){
	window.location.href="/yzmm/account/knowledge/viewDetail?knowledgeId="+$(obj).data('sqwmoreid');
}
//三千问推荐加载更多
var sqwSumFlag = 1;
function sqwSum(){
	if(sqwSumFlag==1){
		var type ='SQW';
		  var sqwsum=$("#sqwsum").val();
		  var keyword=$("#keyWord").val();
		  var sqwOneId=$("#soneidinput").val();
		  var sqwTwoId=$("#stwoidinput").val();
		  var sqwThreeId=$("#sthreeidinput").val();
		 HH.ajax({
			    url:'/yzmm/account/course/ajaxmoreknowledge',
			    data:{
			    	sum:sqwsum,
			    	courseId:courseId,
			    	keyWords:keyword,
			    	sqwOneId:sqwOneId,
			    	sqwTwoId:sqwTwoId,
			    	sqwThreeId:sqwThreeId
			    	},
			    callback:function(data,params){
			    	var h = "";
		   		if(data.success){
		   			sqwSumFlag = true;
		   			var len = data.list.length;
						for(var i=0;i< len;i++){
							var o = data.list[i];
							if(o.sqwOneTitle!=null){
								h+='<li class="moresanqianwenlist"><a onclick="tosqwlist(this);" data-sqwmoreid="'+o.sqwOneId+'" >';
								h+='<div class="photo"><img src="'+o.sqwOneImg+'" ></div>';
								h+='<div class="info">';
							    h+='<h2><span class="hottag"></span>'+o.sqwOneTitle+'</h2>';
								h+='<div class="other">推荐'+o.sqwOneAge+'岁<span class="num">'+o.sqwOneListenCount+'人听过</span></div>';
								let obj=getDateObject(o.sqwOneTimeCount);
								h+='<div class="other" style="width: 50%;">时长:<span class="fmtDate_mmFssM">'+(obj.mm?parseInt(obj.mm)+'分':'') + (obj.ss?obj.ss+'秒':'')+'</span>';
								if(o.sqwOneIsFree){
									h+='<div class="freebutton" style="background-image: url(../../../res/img/xsmf.png);background-size: 52px;"></div>';
								}
								h+='</div>';
								h+='</div></a></li>';
							}
						} 
		   		}
		   		sqwSumFlag=2;
		   			 $("#sqwandid").append(h);
			    }
		    });
	}else{
		sqwSumFlag=1;
		$(".moresanqianwenlist").hide();
	}
	
}
function tocourselist(obj){
	window.location.href="/yzmm/account/course/toVodDetail?courseId="+$(obj).data('coursemoreid');
}
//课程加载更多
var coursemoreFlag = 1;
function coursemore(){
	if(coursemoreFlag==1){
		var type ='COURSE';
		var keyword=$("#keyWord").val();
		 HH.ajax({
			    url:'/yzmm/account/course/ajaxmoretopicandactivity',
			    data:{
			    	type:type,
			    	courseId:courseId,
			    	keyWords:keyword
			    	},
			    callback:function(data,params){
			    	var h = "";
		   		if(data.success){
		   			coursemoreFlag = true;
		   			var len = data.list.length;
						for(var i=0;i< len;i++){
							var o = data.list[i];
							
							if(o.courseOneTitle!=null){
								 h+='<li style="height:4.6rem;" class="morecourselist"><a onclick="tocourselist(this);" data-coursemoreid="'+o.courseOneId+'">';
							     h+='<div class="photo"><span><img src="'+o.courseOneImg+'" ></span></div>';
							     h+='<p>'+o.courseOneTitle+'</p>';
							     if(o.courseMoney){
							    	 h+='<label style="float: right;font-size: 0.32rem;margin-right: 5px;color: red;"><i>￥</i><em>'+o.courseMoney+'</em></label>';
							     }
							     h+='</a></li>';	
							}
						} 
		   		}
		   		coursemoreFlag=2;
		   		$("#courseandid").append(h);
			    }
		    });
	}else{
		coursemoreFlag=1;
		$(".morecourselist").hide();
	}
	
}
function totopicmore(obj) {
	var topicid=$(obj).data('topimoreid');
	window.location = "/yzmm/account/miao/topic/viewDetailIncludeReply?id="+topicid;
}
function totopic(id) {
	window.location = "/yzmm/account/miao/topic/viewDetailIncludeReply?id="+id;
}
function toactivitymore(obj) {
	var id=$(obj).data('activitymoreid');
	window.location = "/yzmm/account/course/toactivitypath?activityId="+id;
}
$(function(){
    HH.ajax({
    	url:'/yzmm/account/course/ajaxrecommend',
	    data:{courseId:courseId},
		 callback: function(data,params){
			 h="";
			 if(data.success){
				 var len = data.list.length;
			     for(var i=0;i<len;i++){
				 var o = data.list[i];
				 h +='<input type="hidden" id="keyWord" value="'+o.keyWord+'">';
				 if(o.courseOneTitle!=null){
					 h+='<div class="section" style="display:none;">';
				     h+='<div class="sectionTit">';
				     if(o.courseCount>1){
				    	 h+='<a onclick="coursemore()" class="more">';
					     h+='相关<span class="txtyellow" id="coursemore" value="'+o.courseCount+'">'+o.courseCount+'节</span>课程';
					     h+='</a>';
				     }
				     h+='<span class="icon-speak"></span>喵姐说';
				     h+='</div>';
				     h+='<ul class="speakList" id="courseandid">';
				     h+='<li style="height:4.6rem;"><a onclick="toVod(this);" data-courseid="'+o.courseOneId+'">';
				     h+='<div class="photo"><span><img src="'+o.courseOneImg+'" ></span></div>';
				     h+='<p>'+o.courseOneTitle+'</p>';
				     if(o.courseMoney){
				    	 h+='<label style="float: right;font-size: 0.32rem;margin-right: 5px;color: red;"><i>￥</i><em>'+o.courseMoney+'</em></label>';
				     }
				     h+='</a></li>';
				     h+='<li style="height:4.6rem;"><a onclick="toVod(this);" data-courseid="'+o.courseTwoId+'">';
				     h+='<div class="photo"><span><img src="'+o.courseTwoImg+'" ></span></div>';
				     h+='<p>'+o.courseTwoTitle+'</p>';
				     if(o.courseMoney2){
				    	 h+='<label style="float: right;font-size: 0.32rem;margin-right: 5px;color: red;"><i>￥</i><em>'+o.courseMoney2+'</em></label>';
				     }
				     h+='</a></li>';
				     h+='</ul></div>';
				 }
				 if(o.activityTitle!=null){
					 h+='<div class="section" style="display:none;">';
				     h+='<div class="sectionTit">';
				     if(o.activityCount!=1){
				    	 h+='<a class="more" onclick="activitymore()">';
					     h+='相关<span class="txtyellow" id="activitymore" value="'+o.activityCount+'">'+o.activityCount+'期</span>活动';
					     h+='</a>';
				     }
				     h+='<span class="icon-activity"></span>喵活动';
				     h+='</div>';
				     h+='<ul class="activityList" id="activityandid">';
				     h+='<li onclick=toactivitylist() >';
				     h+='<input type="hidden" value="'+o.activityId+'" id="actid">';
				     h+='<div class="photo"><a href="#"><img src="'+o.activityImg+'" ></a></div>';
				     h+='<div class="info">';
				     h+='<h2 class="tit">'+o.activityTitle+'</h2>';
				     h+='<p>时间：'+o.activityStartTime+'－'+o.activityEndTime+'</p>';
				     h+='<div class="other"><a href="#" class="join">我要参与</a>会员价：￥'+o.activityMoney+'元</div>';
				     h+='</div></li></ul></div>';
				 }
				 if(o.topicOneTitle!=null){
					 h+='<div class="section sectionBorder0" style="display:none;">';
				     h+='<div class="sectionTit">';
				     if(o.topicCount!=1){
				    	  h+='<a class="more" onclick="topicmore()">';
						  h+='相关<span class="txtyellow" id="topicmore" value="'+o.topicCount+'">'+o.topicCount+'场</span>话题';
						  h+='</a>'; 
				     }
				     h+='<span class="icon-topic"></span>喵话题';
				     h+='</div>';
				     h+='<ul class="activityList" id="topicandid">';
				     h+='<li onclick=totopic('+o.topicOneId+')>';
				     h+='<div class="photo"><a ><img src="'+o.topicOneImg+'" ></a></div>';
					 h+='<div class="info">';
					h+='<p class="word">'+o.topicOneTitle+'</p>';
					h+='<div class="num">'+o.topicOnePv+'人看过</div>';
					h+='</div></li>';
					 if(o.topicTwoTitle!=null){
						  h+='<li>';
						    h+='<div class="photo"><a><img src="'+o.topicTwoImg+'" ></a></div>';
							h+='<div class="info">';
							h+='<p class="word">'+o.topicTwoTitle+'</p>';
							h+='<div class="num">'+o.topicTwoPv+'人看过</div>';
							h+='</div></li>'; 
					 }
					 if(o.topicThreeTitle!=null){
						  h+='<li>';
						    h+='<div class="photo"><a ><img src="'+o.topicThreeImg+'" ></a></div>';
							h+='<div class="info">';
							h+='<p class="word">'+o.topicThreeTitle+'</p>';
							h+='<div class="num">'+o.topicThreePv+'人看过</div>';
							h+='</div></li>';
					 }
					 h +='<input type="hidden" id="keyWord" value="'+o.keyWord+'">';
					h+='</ul></div>';
				 }
				}
			 }
          $(".wrap").append(h);
		 }
	 });
});
function toactivitylist(obj){
	var id=$("#actid").val();
	window.location ="/yzmm/account/course/toactivitypath?activityId="+id;
}
$("#soneid").click(function(){
	var id=$("#soneidinput").val();
	window.location ="/yzmm/account/knowledge/viewDetail?knowledgeId="+id;
});
$("#stwoid").click(function(){
	var id=$("#stwoidinput").val();
	window.location ="/yzmm/account/knowledge/viewDetail?knowledgeId="+id;
});
$("#sthreeid").click(function(){
	var id=$("#sthreeidinput").val();
	window.location ="/yzmm/account/knowledge/viewDetail?knowledgeId="+id;
});
function toVod(obj){
	window.location.href="/yzmm/account/course/toCoursePath?courseId="+$(obj).data('courseid');
}
