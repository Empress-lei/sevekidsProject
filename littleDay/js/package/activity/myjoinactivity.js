var myJoinActivityShowObj = {
		clearActivityMyList:function(){
			$(".containerActBox").text("");
		},
		hideActivityArea:function(){
			$(".containerAct").hide();
		},
		showActivityArea:function(){
			$(".containerAct").show();	
		},
		emptyJoinActivity:function(Ishot){
			$(".actempty").show();
			if(Ishot){
				$(".btnred").show();
			}else{
				//当没有热招活动时不显示
				$(".btnred").remove();
				$(".actempty").unbind("click");
			}
		},
		accordingProcessStatusToIndex:function(o){
			var _h='/yzmm/account/activity/goddessplan/detail/statusSeleter?activityId='+o.activityId+'&processStatus=';
			if(o.processStatus=='DONE'){
				_h+='RESULT';
			}else{
				_h+=o.processStatus;
			}
			return _h;
		},
		onlyOneJoinActivity:function(o,_h){
			//每一条我的活动信息
			var _h="";
			_h+='<li class="actitem"><a href="'+myJoinActivityShowObj.accordingProcessStatusToIndex(o)+'">';
				_h+='<div class="img"><img src="'+o.activityImg+'" ></div>';
				_h+='<div class="cont">';
					_h+='<h2>'+o.title+'</h2>';
					if(o.processStatus=="CHECKIN"||o.processStatus=="CHECKIN_OVER"){
						_h+='<p>已入营女神：'+o.userNumber+'人</p>';
						_h+='<p>距开始：<span class="txtyellow">'+timer(o.joinTime)+'</span></p>';
					}else if(o.processStatus=="DOING"){
						_h+='<p>已入营女神：'+o.userNumber+'人</p>';
						//今天有子活动  and  是否未提交
						if(o.todayDayIsHave==true&&o.todayHomeworkIsDo==false){
							_h+='<p class="txttag"><span class="txtorage">今日作业未提交</span></p>';
						}else if(o.todayDayIsHave==true&&o.todayHomeworkIsDo==true){
							_h+='<p class="txttag"><span class="txtgreen">今日作业已提交</span></p>';
						}
					}else if(o.processStatus=="DONE"||o.processStatus=="RESULT"){
						_h+='<p>已入营女神：'+o.userNumber+'人</p>';
						if(o.latestMedal!=null){
							_h+='<p class="txttag"><span class="txtred">荣获'+o.latestMedal+'勋章</span></p>';
						}
					}
				_h+='</div>';
			_h+='</a></li>';
			return _h;
		},
		jointActivityResultString:function(o){
			//拼凑包含日期的活动列表
			var _h="";
			if($("#"+o.joinMonth).length==0){
				_h+='<ul id="'+o.joinMonth+'" class="activityListMy">';
					_h+='<li class="datetime">'+o.joinMonth+'</li>';
					_h+=myJoinActivityShowObj.onlyOneJoinActivity(o);
				_h+='</ul>';
				$(".containerActBox").append(_h);
			}else{
				_h=myJoinActivityShowObj.onlyOneJoinActivity(o);
				$("#"+o.joinMonth).append(_h);
			}
		},
		jointHotResultString:function(o){
			//拼凑包含日期的三千问列表
			var _h="";
			_h+='<li class="actitem"><a href="'+myJoinActivityShowObj.accordingProcessStatusToIndex(o)+'">';
				_h+='<div class="img"><img src="'+o.activityImg+'" ></div>';
				_h+='<div class="cont">';
					_h+='<h2>'+o.title+'</h2>';
					_h+='<p>已入营女神：'+o.userNumber+'人</p>';
					_h+='<p>距开始：'+timer(o.joinTime)+'</p>';
					_h+='<span class="tag txtorage">热招中</span>';
				_h+='</div>';
			_h+='</a></li>';
			$(".containerActBox2 .activityList").append(_h);
		},
		initActivityList:function(params){
			activityListsm = $(window).scrollme({
				target:$(".containerActBox"),
				heightOffset:140,
				data:params,
				url:"/yzmm/account/myJoinactivity/ajaxList",
				beforeLoad:function(){
					//查询之前调用
				},
				callback:function(data,params){
					if (data.success) {
						var len = data.list.length;
						if(data.totalRows==0){
							myJoinActivityShowObj.emptyJoinActivity(data.ext);
							activityListsm.stop();
						}
						if (len) {
							//增加页码
							params.pageIndex = ++params.pageIndex;
						}
						if(len != 0){
							//myJoinActivityShowObj.showActivityArea();
						}
						//初始化查询总条数
						for (var i = 0; i < len; i++) {
							var o = data.list[i];
							if(!o.titleImg ){
								o.titleImg = configuration.activity.activityListDefaultImg;
							}
							//拼接列表
							 myJoinActivityShowObj.jointActivityResultString(o);
							
						}
					} 
					
				}
			});
			//加载数据
			activityListsm.reload();
		},
		initHotActivityList:function(params){
			activityListsm = $(window).scrollme({
				target:$(".activityList"),
				heightOffset:140,
				data:params,
				url:"/yzmm/account/myJoinactivity/ajaxHotRecruit",
				beforeLoad:function(){
					//查询之前调用
				},
				callback:function(data,params){
					if (data.success) {
						var len = data.list.length;
						if (len) {
							//增加页码
							params.pageIndex = ++params.pageIndex;
						}
						if(len != 0){
							//myJoinActivityShowObj.showActivityArea();
						}
						//初始化查询总条数
						for (var i = 0; i < len; i++) {
							var o = data.list[i];
							if(!o.titleImg ){
								o.titleImg = configuration.activity.activityListDefaultImg;
							}
							//拼接列表
							 myJoinActivityShowObj.jointHotResultString(o);
							
						}
					} 
					
				}
			});
			//加载数据
			activityListsm.reload();
		}
}
