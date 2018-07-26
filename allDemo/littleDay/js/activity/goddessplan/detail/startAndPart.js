/**
 * 活动详情已报名已参加js
 * 
 * @author qiu_zhongqiang
 * @date 2017/01/12 10:20
 */
var isHomework;//是否写作业
//7点之前显示前一天的任务
var currenthh=fmtDate(new Date(),"HH");
var hh=7;
$(function() {

	/**
	 * 初始化body
	 */
	var arrayli=$('.timelistBox ul li');
	for (var i = 0; i < arrayli.length; i++) {
		var li=$(arrayli[i]);
		var dateString=li.data('datestring');
		
		var tempDateString = null;
		
		if(currenthh>=hh){
			tempDateString=fmtDate(new Date(),"MM.dd");
		}else{
			tempDateString=fmtDate(new Date(new Date().getTime() - 86400000),"MM.dd");
		}
			
		
		if(dateString==tempDateString){
			if(activityStatue!="activityOff")
			weekJobGuide(li.data('activityid'),li);
		}
	}
	//活动结束现实第一天数据
	if(activityStatue=="activityOff"){//数据来源startAndPart.jsp ,Ctrl DayPlanDetailCtrl.java 577
		weekJobGuide($('.timelistBox ul li:eq('+0+')').data('activityid'),$('.timelistBox ul li:eq(0)'));
	}
	/**
	 * 作业补交卡领取
	 * @author qzq
	 */
	$('.submitBtn').on('click', function() {
		HH.ajax({
			waiting : false,
			url : "/yzmm/account/activity/goddessplan/detail/receiveJobMakeUpCard",
			data : {
				activityId : activityId
			},
			callback:function(data){
				if(data.success){
					$(".zybjk").fadeOut();
				}else{
					toast(data.msg);
				}
			}
		});
	})
	///获取活动第几天
	var datestringarr = new Array();
	for (var i = 0; i < $('.timelistBox ul li').length; i++) {
		datestringarr.push($($('.timelistBox ul li')[i]).data('datestring'));
	}
	//获取时间滑动条唯一标识集合
	var ulinds=new Array();
	for (var i = 0; i < $('.timelistBox ul').length; i++) {
		ulinds.push($('.timelistBox ul:eq('+i+')').data('index'));
	}
	var datestr=fmtDate(new Date(),'MM.dd');
	var theDayNumber=datestringarr.indexOf(datestr);
	if(currenthh>=hh){
	}else{
		theDayNumber--;
	}
	if(activityStatue!="activityOff")
	if(theDayNumber!=-1){
		$('.timelistBox ul li:eq('+theDayNumber+')').removeClass();
		$('.timelistBox ul li:eq('+theDayNumber+')').find('.num').css('background-color','#99da52');
		$('.timelistBox ul li:eq('+theDayNumber+')').find('.num').css('color','#f4f4f4');
		$('.timelistBox ul li:eq('+theDayNumber+')').find('.date').css('color','#99da52');
		$('.timelistBox ul li:eq('+theDayNumber+')').addClass("today");
		//控制时间条滚动
		var ul=$('.timelistBox ul li:eq('+theDayNumber+')').parent();
		var ulind=ul.data('index');
		var index=ulinds.indexOf(ulind);
		if(index>=0){
			var ww = $(window).width();
			$(".timelistBox").css("left",-index*ww);
		}
	}
	/**
	 * 选择当前天数显示总天数
	 * @param num
	 * @returns
	 */
	function selTheDotalDay(num){
		var word=$('.word')[0];
		$($(word).find('p span')[0]).html('第 '+(num+1)+' ／ '+totalDay+' 天 ');
	}
	/**
	 * 周期时间天数列表绑定事件
	 * 
	 * @author qiu_zhongqiang
	 */
	$('.timelistBox ul li').on('click', function() {
		var activityid=$(this).data('activityid');
		weekJobGuide(activityid,$(this));
	})
	/**
	 * @param obj
	 * @returns
	 */
	function addTopAudioTimelen(obj) {
		obj = $(obj);
		var a = obj.get(0);
		if (a && !obj.hasClass("time")) {
			window.setTimeout(
							function() {
								if (isNumeric(a.duration)) {
									var duration = a.duration;
									var o = obj;
									o.addClass("time");
									if (duration) {
										HH.ajax({
													waiting : false,
													url : "/yzmm/account/activity/daysPlan/ajaxAddTime",
													data : {
														dayId : "${dayId}",
														time : duration
													},
												});
									}
								}
							}, 2000);
		}
	}

	// 作业簿播放器
	function addhomeworkTimelen(obj) {
		obj = $(obj);
		var a = obj.get(0);
		if (a && !obj.hasClass("hastime")) {
			window
					.setTimeout(
							function() {
								if (isNumeric(a.duration)) {
									var duration = a.duration;
									var o = obj;
									o.addClass("hastime");
									var id = o.parents("li").data("id");
									if (id && duration) {
										HH
												.ajax({
													waiting : false,
													url : "/yzmm/account/activity/daysPlan/ajaxAddHomeWorkTime",
													data : {
														id : id,
														time : duration
													},
												});
									}
								}
							}, 2000);
		}
	}
	function audioeventHomework(homework) {
		// 播发器
		$("." + homework).myaudio({
			nowrap : true,
			play : function(thet) {
				var a = $(".pause").find("audio").get(0);
				if (a) {
					a.pause();
				}
			},
			audioPlay : function(audio) {
				// 添加时间
				addhomeworkTimelen($(audio));
			}
		});

		$("." + homework).each(function() {
			var o = $(this);
			if ("0" != o.data("time")) {
				var ad = $(this);
				ad.addClass("hastime");
				o.find(".duration").html(o.data("playTimeShow"));
			}
		});
	}
	// 导师点评播放器
	function audioeventTutor(tutor) {
		// 播放器样式
		$($(".audio").find(".time")).remove();
		// 播发器
		$("." + tutor).myaudio({
			nowrap : true,
			play : function(thet) {
				var a = $(".pause").find("audio").get(0);
				if (a) {
					a.pause();
				}
			},
		});
		$($(".audio").find(".bar")).attr("style", "margin-left: -1.1rem;");
	}
	/**
	 * 非当天日期轨迹不显示写作业入口
	 */
	function noNowDateJobInlet(dtstr,dayId){
		//动态修改提交作业需要的参数
			if(!(isPrivilege=='true')){
				HH.ajax({
					url:'/yzmm/account/activity/goddessplan/detail/canDoHomework',
					data:{dayId:dayId},
					callback:function(data){
						if(data.success){
							$(".writeBtn").attr('href','/yzmm/account/activity/daysPlan/toPublishHomework?activityId='+activityId+'&dayId='+dayId);
								$(".writeBtn").show();
						}else{
								$(".writeBtn").hide();
						}
					}
				});
			}
	} 
	
	/**
	 * 周作业指导
	 * @param activityId
	 * @returns
	 * @author qiu_zhongqiang 
	 */
	function weekJobGuide(dayId,obj){
		var outDay = false;
		if($(".today").data("activityid")){
			var todayId = $(".today").data("activityid");
			outDay =  todayId< dayId?true:false;
			if(outDay){
				toast("不能贪杯哦，课程未开始");
				return;
			}
		}
		
		//变动每日语音小标题
		$('#dryy').html(obj.data('topictitle'));
		//变动时间所选时间戳属于活动第几天
		var datestringarr = new Array();
		for (var i = 0; i < $('.timelistBox ul li').length; i++) {
			datestringarr.push($($('.timelistBox ul li')[i]).data('datestring'));
			if(dayId==$($('.timelistBox ul li')[i]).data('activityid')){
				$($('.timelistBox ul li')[i]).find(".num").css({"background-color":"rgb(153, 218, 82)","color":" rgb(244, 244, 244)"});
				$($('.timelistBox ul li')[i]).find(".date").css("color"," rgb(153, 218, 82)");
			}else{
				$($('.timelistBox ul li')[i]).find(".num").css({"background-color":"","color":""});
				$($('.timelistBox ul li')[i]).find(".date").css("color","");
			}
		}
		
		var dtstr=obj.data('datestring');
		var tdn=datestringarr.indexOf(dtstr);
		
		selTheDotalDay(tdn);
		HH.ajax({
			url:'/yzmm/account/activity/goddessplan/detail/weekJobGuide',
			data:{activityId:dayId},
			callback:function(data){
				if(data.success){
					var res=JSON.parse(data.ext);
					var todayspeak=$(".todayspeak");
					todayspeak.html(null);
					var div1=$('<div class"top"></div>').appendTo(todayspeak);
					var a1=$('<a href="javascript:void(0)" class="nextweek">第'+res.week+'周作业指导</a>').appendTo(div1);
					var div2=$('<div class="photo"><img src="'+res.tcablumUrl+'" /></div>导师今日说:').appendTo(div1);
					var span1=$('<span>导师今日说：</span>').appendTo(div1);
					var div3=$('<div class="audioItem"></div>').appendTo(todayspeak);
					if(res.playUrl){
						if(outDay){
							$('<div class="myaudio" style="padding: 0px;"><div class="mywrap"><div class="playpause"><a class="play" onclick=toast("不能贪杯哦，课程未开始")></a></div><div class="time">00:00</div><div class="bar" style="background-color: rgb(173, 99, 5);"><div class="bg3"></div><div class="white"></div></div><div class="duration">--</div></div></div>').appendTo(div3);
						}else{
							$('<audio class="pinglun topAudio" preload="none" style="visibility:hidden;" controls><source src="'+res.playUrl+'" /></div>').appendTo(div3);
						}
					}
					$('<div class="word">听听今天喵姐对你说了什么吧！</div>').appendTo(todayspeak);
					//作业指导里面的文字
					$(".zuoyezhidaoBox").empty().append('<div class="font17 tit">第'+res.week+'周作业指导</div>');
					$(".zuoyezhidaoBox").append('<div class="zyzdItem"></div>');
					if(res.theDaysActivity.activityDetailOneTitle&&res.theDaysActivity.activityDetailOne){
						$(".zyzdItem").append('<div class="detailOne"></div>');
						$(".zyzdItem .detailOne").append('<h2 class="font15">'+res.theDaysActivity.activityDetailOneTitle+'</h2>');
						$(".zyzdItem .detailOne").append('<p class="font12">'+res.theDaysActivity.activityDetailOne+'</p>');
					}	
					if(res.theDaysActivity.activityDetailTwoTitle&&res.theDaysActivity.activityDetailTwo){
						$(".zyzdItem").append('<div class="detailtwo"></div>');
						$(".zyzdItem .detailtwo").append('<h2 class="font15">'+res.theDaysActivity.activityDetailTwoTitle+'</h2>');
						$(".zyzdItem .detailtwo").append('<p class="font12">'+res.theDaysActivity.activityDetailTwo+'</p>');
					}	
					if(res.theDaysActivity.activityDetailThreeTitle&&res.theDaysActivity.activityDetailThree){
						$(".zyzdItem").append('<div class="detailthree"></div>');
						$(".zyzdItem .detailthree").append('<h2 class="font15">'+res.theDaysActivity.activityDetailThreeTitle+'</h2>');
						$(".zyzdItem .detailthree").append('<p class="font12">'+res.theDaysActivity.activityDetailThree+'</p>');
					}
					$(".zuoyezhidaoBox").append('<a href="javascript:void(0)" class="font18 zyzdBtn zuoyezhidaoBtn">我学会了</a>');
					if(res.showGuide){
							if( $.cookie("showGuide")!=dayId){
								$.cookie("showGuide", dayId, { expires: 1 }); 
								  $(".zuoyezhidao").show();
							}
					}
					//加载播放器
					$(".topAudio").myaudio({
						nowrap : true,
						play : function(thet) {
							var a = $(".pause").find("audio").get(0);
							if (a) {
								a.pause();
							}
						},
						audioPlay : function() {
							if ("0" == "${playTime}") {
								addTopAudioTimelen($(".topAudio"))
							}
						}
					});
					//显示作业信息
					showJobInfo(dayId,dtstr);
					//作业指导弹框
					$(".nextweek").click(function(){
						$(".zyzd").fadeIn();
					})
					
					$(".zyzd").click(function(){
						$(".zyzd").fadeOut();
					})
					
					//写作业入口必须是当天的
					var nowdayId=$('.timelistBox ul li:eq('+theDayNumber+')').data('activityid');
					if(activityStatue=="activityOff"){//数据来源startAndPart.jsp ,Ctrl DayPlanDetailCtrl.java 577
						return;
					}
					noNowDateJobInlet(dtstr,dayId);
				}
			}
		});
	}
	 
	var a0='/res/img/watermark/w13.png';//A_0(0, "模范作业"),
	var a1='/res/img/watermark/w14.png';//A_1(1, "快来膜拜"),
	var a2='/res/img/watermark/w15.png';//A_2(2, "太深刻了"),
	var b0='/res/img/watermark/w12.png';//B_0(3, "说得好!"),
	var b1='/res/img/watermark/w11.png';//B_1(4, "继续加油!"),
	var c0='/res/img/watermark/w10.png';//C_0(5, "认真最无敌!"),
	var c1='/res/img/watermark/w9.png';//C_1(6, "态度认真加1分!"),
	var c2='/res/img/watermark/w8.png';//C_2(7, "朕懂你!"),
	var d0='/res/img/watermark/w7.png';//D_0(8, "朕知你尽力了"),
	var d1='/res/img/watermark/w6.png';//D_1(9, "朕已阅"),
	var e0='/res/img/watermark/w4.png';//E_0(10, "你该回课了亲"),
	var e1='/res/img/watermark/w3.png';//E_1(11, "快看作业指导"),
	var e2='/res/img/watermark/w2.png';//E_2(12, "不要偷懒哦"),
	var e3='/res/img/watermark/w5.png';//E_3(13, "不要歪楼"),
	var e4='/res/img/watermark/w1.png';//E_4(14, "不要放弃");
	/**
	 * 显示作业详情
	 * @param dayId
	 * @returns
	 * @author qiu_zhongqiang
	 */
	function showJobInfo(dayId,dtstr){
	
		var pageIndex = 1;
		var sm = {};
		$(".workList").html(null);
		$(function(){
			sm = $(window).scrollme({
				target:$("#bb"),
				data:{pageSize:10,dayId:dayId,pageIndex:pageIndex},
				url:"/yzmm/account/activity/daysPlan/ajaxGetHomeworkList",
				beforeLoad:function(){
					//查询之前调用
					if(1!=pageIndex){
						$(".workList").show();
					}
				},
				callback:function(data,params){
					if(data.success){
						var list=data.list;
						var len = data.list.length;
						if(len){
							//增加页码
							params.pageIndex = ++pageIndex;
						}
						//添加抢沙发的页面元素，非当天则不添加沙发页面元素
						if(datestr==dtstr){
							if(list.length==0){
								$('.workList').html('<li style="text-align: center"><span class="font17" style="color:#8A7B7B" >还没有人交作业，快来抢沙发~</span></li>');
								return;
							}
						}
						
						for (var int = 0; int < list.length; int++) {
							var hw=list[int];
							var li=$('<li class="workitem" id="'+hw.id+'"></li>').appendTo($(".workList"));

							var watermarkUrl=getWatermakeUrl(hw);
							if(watermarkUrl){
								var img=$('<img src="'+watermarkUrl+'" class="watermark" />').appendTo(li);
							}
							var div1=$('<div class="photo"><img src="'+hw.userAlbumUrl+'" /></div>').appendTo(li);
							var div2=$('<div class="mebinfo"></div>').appendTo(li);
							var div3=$('<div class="txtyellow name">'+hw.userName+'</div>').appendTo(div2);
							var div4=$('<div class="other"></div>').appendTo(div2);
							var userIdentityAndBirthday=getUserIdentityAndBBBirthday(hw);
							var span1=$('<span></span><span>'+userIdentityAndBirthday+'</span>').appendTo(div4);
							var div5=$('<div class="word">'+hw.content+'</div>').appendTo(li);
							var div6=$('<div class="img imgone"><div class="imgitem"><img src="'+hw.imgFirst+'" ></div></div>').appendTo(li);
							
							var spanStr='';
							//判断是否点赞
							if(!hw.meIsMiaoThis){
								spanStr='<span class="zan" style="cursor: pointer;" onclick="addUpMiao(this,'+activityId+','+dayId+',\''+hw.id+'\')" data-miao="'+hw.miaoCount+'" data-id="'+hw.id+'">'+hw.miaoCount+'</span>';
							}else{
								spanStr='<span class="nozan">'+hw.miaoCount+'</span>';
							}
							//导师点评按钮
							var teachBtn = '';
							if(!hw.tutorCommentContent&&(isPrivilege=='true')){
								teachBtn = '<a href="javascript:;" onclick="toDoTutorRemark(this)" data-id="'+hw.id+'" class="teachBtn">导师点评</a>';
							}
							var div7=$('<div class="handle">'+teachBtn+'<span class="vote" style="cursor: pointer;" data-id="'+hw.dayId+'" data-homeworkid="'+hw.id+'">评论</span>'+spanStr+'<span class="hlong">'+hw.timeAgo+'</span></div>').appendTo(li);
							//如果点赞数为0 则 不显示点赞容器
							var miaoList=hw.miaoList;
							var miaolistNum=miaoList.length;
							var mebliststyle=miaolistNum>0?'':'style="display:none;"';
							var div8=$('<div class="meblist"'+mebliststyle+'></div>').appendTo(li);
							// 查询添加用户头像
							var divDianz=$('<div class="cont"></div>').appendTo(div8);
							if(miaolistNum>0){
								for (var i = 0; i < miaoList.length; i++) {
									var miao=miaoList[i];
									$('<span><img style="border-radius:30px;" src="'+miao+'" /></span>').appendTo(divDianz);
									//防止样式走形
									if(i>=6){
										$('<span><a href="#"></a></span>').appendTo(divDianz);
										break;
									}
								}
							}
							if(hw.tutorCommentContent){
								//导师评语
								var div10=$('<div class="teacherDP"></div>').appendTo(li);
								var div11=$('<div class="cont"></div>').appendTo(div10);
								var h2p=$('<h2 class="t">导师点评</h2><p>'+hw.tutorCommentContent+'</p>').appendTo(div11);
							}
							//没有评论不显示容器
							if(hw.homeworkCommentList.length>0){
								//用户评论加载
								var div9=$('<div class="othervote" ></div>').appendTo(li);
								
								var divPingl=$('<div class="cont" id="divPingl'+hw.id+'"></div>').appendTo(div9);
								var homeworkCommentList=hw.homeworkCommentList;
								for (var j = 0; j < homeworkCommentList.length; j++) {
									var hwc=homeworkCommentList[j];
									$('<p><span class="txtyellow">'+hwc.userName+'：</span>'+hwc.content+'</p>').appendTo(divPingl);
								}
								if(hw.commentCount>2){
									$('<a href="javascript:;" onclick="moreComment(this)" data-id="'+hw.id+'" class="viewmore">查看更多评论<span></span></a>').appendTo(li);
								}
							}else{
								var div9=$('<div class="othervote" style="display:none;" id="othervote'+hw.id+'"></div>').appendTo(li);
								var divPingl=$('<div class="cont" id="divPingl'+hw.id+'"></div>').appendTo(div9);
							}
						}
					}
				}
			});
			//加载数据
			sm.reload();
		})
	}
	/**
	 * 获取水印地址
	 * @param hw
	 * @returns
	 * @author qiu_zhongqiang
	 */
	function getWatermakeUrl(hw){
		var watermarkUrl="";
		if(hw){
			switch (hw.jobComments) {
			case "A_0":
				watermarkUrl=a0;
				break;
			case "A_1":
				watermarkUrl=a1;
				break;
			case "A_2":
				watermarkUrl=a2;
				break;
			case "B_0":
				watermarkUrl=b0;
				break;
			case "B_1":
				watermarkUrl=b1;
				break;
			case "C_0":
				watermarkUrl=c0;
				break;
			case "C_1":
				watermarkUrl=c1;
				break;
			case "C_2":
				watermarkUrl=c2;
				break;
			case "D_0":
				watermarkUrl=d0;
				break;
			case "D_1":
				watermarkUrl=d1;
				break;
			case "E_0":
				watermarkUrl=e0;
				break;
			case "E_1":
				watermarkUrl=e1;
				break;
			case "E_2":
				watermarkUrl=e2;
				break;
			case "E_3":
				watermarkUrl=e3;
				break;
			case "E_4":
				watermarkUrl=e4;
				break;
			default:
				break;
		}
		}
			return watermarkUrl;
	}
	/**
	 * 获取用户身份和宝宝生日
	 * @param hw
	 * @returns
	 * @author qiu_zhongqiang
	 */
	function getUserIdentityAndBBBirthday(hw){
		var res="";
		if(hw.userIdentity != 'HELPER'){
			switch (hw.userIdentity) {
			case 'GRAVIDA':
				res='已怀孕 '+hw.babyAge;
				break;
			case 'MOM':
				res = hw.babySex+" "+hw.babyAge;
				if(!hw.babySex){
					res='喵星人';
					return res;
				}
				break;
			default:
				if(!hw.babySex){
					res='喵星人';
					return res;
				}
				res=hw.babySex;
				break;
			}
		}else{
			res='喵星人';
		}
		return res;
	}
	/**
	 * 评论取消
	 * 
	 */	
	$(".publishVote .cancle").click(function(){
		$("#textAreaSubmit").val("");
		 $("#replyId").val("");
		 
		 var st = parseInt($("body").data("st"));
			$(".publishVote").addClass("slideBottom");
			setTimeout(function(){
				$("body").removeAttr("style");
				$(".publishVote").removeClass("slideTop");
				$(".publishVote").removeClass("slideBottom");
				$(".btnfixed").show();
				$(window).scrollTop(st);
			},800);
	});
	
	/**
	 * 评论点击事件
	 * @author qiu_zhongqiang
	 */
	//绑定评论事件
		$('body').on('click','.vote',function() {
			hwId = $(this).data("id");
			var homeworkid=$(this).data('homeworkid');
			$(".publishVote").addClass("slideTop");
			var st = $(window).scrollTop();
			$(window).scrollTop(0);
			$("body").css("overflow","hidden");
			$("body").data("st",st);
			$(".publishVote textarea").val("");
			$(".publishVote textarea").data('dayid',hwId);
			$(".publishVote textarea").data('homeworkid',homeworkid);
			$(".publishVote .num i").text("0");
			setTimeout(function(){
				$(".btnfixed").hide();
				//$(".publishVote textarea").focus();
			},800)
		
		});
});

/**
 * 跳转到导师点评
 * @param obj
 * @returns
 */
function toDoTutorRemark(obj){
	var o = $(obj);
	HH.href("/yzmm/account/activity/daysPlan/toDoTutorRemark?homeworkId="+o.data("id"));
}

/**
 * 添加喵：点赞
 * @param obj
 * @returns
 */
function addUpMiao(obj,activityId,dayId,hwid){
	if($(obj).hasClass("nozan")){
		  return;
	}
	var miaoNum = $(obj).data("miao");
	var homeworkId = $(obj).data("id");
	HH.ajax({
		url:'/yzmm/account/activity/daysPlan/doAgreeToHomework',
		data:{homeworkId:homeworkId,activityId:activityId,dayId:dayId}, 
		callback:function(data){
			if (data.success) {
				var newmiaoNum = parseInt(miaoNum)+1;
				$(obj).removeClass();
				$(obj).addClass('nozan');
				$(obj).html(newmiaoNum);
				//点赞头像自动加载
				var meblist=$('#'+hwid).find('.meblist');
				if(meblist.find('span').length==0){
					meblist.css('display','block');
					var cont=meblist.find('.cont');
					$('<img style="border-radius:30px;" src="'+data.ext+'">').appendTo(cont);
				}else{
					if(meblist.find('span').length>=6){
						return;
					}
					var cont=meblist.find('.cont');
					$('<span><img style="border-radius:30px;" src="'+data.ext+'"></span>').appendTo(cont);
				}
				
			}else{
				toast(data.msg);
			}
		}
	});
}
/**
 * 评论
 * @param obj
 * @returns
 */
function doCommentText(obj){
	var text = $(obj).prev().prev(".voteBox").children("textarea").val();
	$(obj).prev().prev(".voteBox").children("textarea").val("");
	var homeworkId = $(".publishVote textarea").data('homeworkid');
	var dayId=$(".publishVote textarea").data('dayid');

	HH.ajax({
		url:'/yzmm/account/activity/daysPlan/doHomeworkComment',
		data:{homeworkId:homeworkId,activityId:activityId,dayId:dayId,
			text:text}, 
			callback:function(data){
				if (data.success) {
					$("#divPingl"+homeworkId).append("<p><span class='txtyellow'>"+data.ext+"：</span>"+text+"</p>");
					$("#divPingl"+homeworkId).css("display",'block');
					$("#othervote"+homeworkId).css("display",'block');
					$(".publishVote .cancle").click();
				}else{
					toast(data.msg);
				}
			}
	});
}

/**
 * 更多评论
 * @param obj
 * @returns
 */
function moreComment(obj) {
	var id = $(obj).data("id");
	var beginIndex = 2;
	HH.ajax({
		url : '/yzmm/account/activity/daysPlan/ajaxHomeworkComment',
		data : {
			pageSize : 1000,
			homeworkId : id,
			beginIndex : beginIndex
		},
		callback : function(data) {
			var h = "";
			if (data.success) {
				// 是否为空
				if (!data.totalPage) {
					$(obj).hide();

				} else {
					var len = data.list.length;
					$(obj).hide();
					var divPingl = $('#divPingl' + id + '');
					var homeworkCommentList = data.list;
					for (var j = 0; j < homeworkCommentList.length; j++) {
						var hwc = homeworkCommentList[j];
						$('<p><span class="txtyellow">' + hwc.userName + '：</span>' + hwc.content + '</p>').appendTo(divPingl);
					}
				}
			}
		}
	});
}
//根据页面元素确认是否已写作业
setTimeout(function(){
	//isHomework=$('.writeBtn').css('display')=="none"?true:false;
},2000);

/**
 * 跳转我的作业
 * @param activityId
 * @returns
 */
function myHomework(activityId){
	HH.href('/yzmm/account/activity/daysPlan/myHomeworkList?activityId='+activityId);
}
function meowClass(activityId){
	HH.href('/yzmm/account/activity/goddessplan/miaoclass/list?activityId='+activityId);
}
