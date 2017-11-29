/**

 * 我的作业列表
 * 
 * @author qiu_zhongqiang
 * @date 2017年02月18日16:33:28
 */
$(function() {
	var a0='/res/img/watermark/w14.png';//	A_0(0, "快来膜拜!"),
	var a1='/res/img/watermark/w15.png';//	A_1(1, "太深刻了!"),
	var b0='/res/img/watermark/w13.png';//B_0(2, "模范作业!"),
	var b1='/res/img/watermark/w12.png';//	B_1(3, "说得好!"),
	var b2='/res/img/watermark/w11.png';//B_2(4, "继续加油!"),
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
			case "B_0":
				watermarkUrl=b0;
				break;
			case "B_1":
				watermarkUrl=b1;
				break;
			case "B_2":
				watermarkUrl=b2;
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
	//------------业务代码------------
	HH.ajax({
		data:{pageSize:999,id:id},
		url:"/yzmm/account/activity/daysPlan/ajaxMyHomeworkList",
		callback:function(data,params){
			if (data.success) {
				//作业列表容器
				var ul=$('.myworkList');
				
				for(var i=0;i<data.list.length;i++){
					var hw=data.list[i];
					if(hw.homeworkCompleteStatus=='FINISHED'){
						var li=$('<li class="workitem"></li>').appendTo(ul);
						//正常作业--完成
						if(hw.jobComments){
							var watermarkUrl=getWatermakeUrl(hw);
							$('<img class="watermark" src="'+watermarkUrl+'">').appendTo(li);
						}
						$('<div class="numBox">'+hw.dayNumber+'</div>').appendTo(li);
						$('<div class="mebinfo"><div class="other">'+fmtDate(new Date(hw.createTime*1000),"MM.dd")+'</div></div>').appendTo(li);
						$('<div class="word">'+hw.content+'</div>').appendTo(li);
						
						var div1=$('<div class="handle"></div>').appendTo(li);

						try{
							//评论数
							var commentLen = hw.homeworkCommentList.length;
							$('<span class="vote">'+commentLen+'</span>').appendTo(div1);
						}catch(e){
							$('<span class="vote">0</span>').appendTo(div1);
						}
						
						try{
							//喵赞数
							var miaolistLen=hw.miaoList.length;
							$('<span class="zan">'+miaolistLen+'</span>').appendTo(div1);
						}catch(e){
							$('<span class="zan">0</span>').appendTo(div1);
						}
						//导师点评
						if(hw.tutorCommentContent){
							//导师评语
							var teacherDP=$('<div class="teacherDP"></div>').appendTo(li);
							var dpCont=$('<div class="cont"></div>').appendTo(teacherDP);
							$('<h2 class="t">导师点评</h2><p>'+hw.tutorCommentContent+'</p>').appendTo(dpCont);
						}
						
						//喵赞头像
						try{
							if(miaolistLen>0){
								var div2=$('<div class="meblist"></div>').appendTo(li);
								var div3=$('<div class="cont"></div>').appendTo(div2);
							}
							for(var j=0;j<miaolistLen;j++){
								if(j>6){
									break;
								}
								var miao=hw.miaoList[j];
								if(miao){
									$('<span><img src="'+miao+'" ></span>').appendTo(div3);
								}
							}
							if(miaolistLen>6){
								$('<span><a href="#"></a></span>').appendTo(div3);
							}
						}catch(e){
						}
						
						try{
							if(hw.homeworkCommentList.length==0){
								continue;
							}
							var othervote=$('<div class="othervote"></div>').appendTo(li);
							var cont=$('<div class="cont"></div>').appendTo(othervote);
							for (var j = 0; j < hw.homeworkCommentList.length; j++) {
								var c=hw.homeworkCommentList[j];
								$('<p><span class="txtyellow">'+c.userName+':</span>'+c.content+'</p>').appendTo(cont);
							}
						}catch(e){
						}
					}else if(hw.homeworkCompleteStatus=='MAKEUPCARD'){
						var li=$('<li class="workitem"></li>').appendTo(ul);
						$('<div class="numBox">'+hw.dayNumber+'</div>').appendTo(li);
						$('<div class="mebinfo"><div class="other">'+fmtDate(new Date(hw.createTime*1000),"MM.dd")+'</div></div>').appendTo(li);
						$('<div class="word">作业已经补交</div>').appendTo(li);
					}else{
						var li=$('<li class="workitem workitemWrong"></li>').appendTo(ul);
						$('<div class="numBox">'+hw.dayNumber+'</div>').appendTo(li);
						$('<div class="mebinfo"><div class="other">'+fmtDate(new Date(hw.createTime*1000),"MM.dd")+'</div></div>').appendTo(li);
						$('<div class="word">一不小心错过了交作业，我要<a href="javascript:makeHomework('+hw.activityId+','+hw.dayId+','+hw.createTime+')">【补交作业】</a></div>').appendTo(li);
					}
				}
			}
		}
	});
});
function audioeventHomework(homework){
	//播发器
	$("."+homework).myaudio({
		nowrap:true,
		play:function(thet){
			var a = $(".pause").find("audio").get(0);
			if(a){
				a.pause();
			}
		},
		audioPlay:function(audio){
			//添加时间
			addhomeworkTimelen($( audio));
		}
	});

	$("."+homework).each(function(){
		var o = $(this);
		if("0" != o.data("time")){
			var ad = $(this);
			ad.addClass("hastime");
			o.find(".duration").html(o.data("playTimeShow"));
		}
	});
}
//导师点评播放器
function audioeventTutor(tutor){
	//播放器样式
	$($(".audio").find(".time")).remove();
	$($(".audio").find(".bar")).attr("style","margin-left: -1.1rem;");
	//播发器
	$("."+tutor).myaudio({
		nowrap:true,
		play:function(thet){
			var a = $(".pause").find("audio").get(0);
			if(a){
				a.pause();
			}
		},
	});
}

//作业簿播放器
function addhomeworkTimelen(obj){
	obj = $(obj);
	var a = obj.get(0);
	if(a && !obj.hasClass("hastime")){
		window.setTimeout(function() {
			if(isNumeric(a.duration)){
				var duration = a.duration;
				var o = obj;
				o.addClass("hastime");
				var id = o.parents("li").data("id");
				 if(id && duration){
					 HH.ajax({
						   waiting:false,
						   url: "/yzmm/account/activity/daysPlan/ajaxAddHomeWorkTime",
						   data: {id:id,time:duration},
					});
				 }
			}
		}, 2000);
	}
}
/***
*作业补交卡js
*author qiu_zhongqiang
***/
function makeHomework(activityId,dayId,createTime){
	if(confirm("补交作业需要消耗一张作业补交卡哦!")){
		HH.ajax({
			url:'/yzmm/account/activity/daysPlan/makeHomework',
			data:{activityId:activityId,dayId:dayId,createTime:createTime},
			callback:function(data){
				console.log(data);
				if (data.success) {
					toast('作业补交卡 - 1');
					setTimeout(function(){
						HH.href('/yzmm/account/activity/daysPlan/myHomeworkList?activityId='+activityId);
					},500);
				}else{
					toast('您还没有作业补交卡，连续5天交作业，就能获得一张作业补交卡哦，加油吧~');
				}
			}
		});	
	}
}