//喵姐说与三千问查询的js可以使用此js,用于v2.0版本
var enableDefaultImage = "true";
var openSearchShowObj = {
		clearKnowledgeCount:function(){
			$(".knowledgeCount").text("");
		},
		checkEmptyList:function(){
			//检查列表为空,子类重写
		},
		checkOnlyList:function(){
			//检查唯一,子类重写
		},
		setKnowledgeCount:function(number){
			if(number <= 0){
				return;
			}
			$(".knowledgeCount").text(number+"条");
		},
		clearCourseCount:function(){
			$(".courseCount").text("");
		},
		setCourseCount:function(number){
			if(number <= 0){
				return;
			}
			$(".courseCount").text(number+"节");
		},
		clearActivityCount:function(){
			$(".activityCount").text("");
		},
		setActivityCount:function(number){
			if(number <= 0){
				return;
			}
			$(".activityCount").text(number+"期");
		},
		
		clearTopicCount:function(){
			$(".topicCount").text("");
		},
		setTopicCount:function(number){
			if(number <= 0){
				return;
			}
			$(".topicCount").text(number+"场");
		},
		hideKnowledgeArea:function(){
			$(".knowledgeArea").hide();
		},
		showKnowledgeArea:function(){
			$(".knowledgeArea").show();
		},
		hideCourseArea:function(){
			$(".courseArea").hide();
		},
		showCourseArea:function(){
			$(".courseArea").show();
		},
		hideActivityArea:function(){
			$(".activityArea").hide();
		},
		showActivityArea:function(){
			$(".activityArea").show();	
		},
		hideTopicArea:function(){
			$(".topicArea").hide();
		},
		showTopicArea:function(){
			$(".topicArea").show();
		},
		//只保持三千问
		onlyKnowledge:function(_keyword){
			$(".courseArea").hide();
			$(".activityArea").hide();
			$(".topicArea").hide();
			$(window).unbind('scroll');
			openSearchShowObj.initKnowledgeList({pageIndex:knowledgePageIndex,pageSize:12,keyword:_keyword});
		},
		//只保持喵姐说
		onlyCourse:function(_keyword){
			$(".knowledgeArea").hide();
			$(".activityArea").hide();
			$(".topicArea").hide();
			$(window).unbind('scroll');
			openSearchShowObj.initCourseList({pageIndex:coursePageIndex,pageSize:12,keyword:_keyword});
		},
		//只保持活动
		onlyActivity:function(_keyword){
			$(".knowledgeArea").hide();
			$(".courseArea").hide();
			$(".topicArea").hide();
			$(window).unbind('scroll');
			openSearchShowObj.initActivityList({pageIndex:activityPageIndex,pageSize:12,keyword:_keyword});
		},
		//只保持话题
		onlyTopic:function(_keyword){
			$(".knowledgeArea").hide();
			$(".courseArea").hide();
			$(".activityArea").hide();
			$(window).unbind('scroll');
			openSearchShowObj.initTopicList({pageIndex:topicPageIndex,pageSize:12,keyword:_keyword});
		},
		//查询相关
		jointKnowledgeRecommend:function(o){
			if (o.minAgeRecommend.year < 1) {
				if (o.minAgeRecommend.month == 0) {
					mina = o.minAgeRecommend.year;
				} else {
					mina = o.minAgeRecommend.month + "月";
				}
			}
			if (o.minAgeRecommend.year >= 1 && o.minAgeRecommend.month < 6) {
				mina = o.minAgeRecommend.year;
			}
			if (o.minAgeRecommend.year >= 1 && o.minAgeRecommend.month >= 6) {
				mina = o.minAgeRecommend.year + ".5";
			}
			if (o.maxAgeRecommend.year < 1) {
				if (o.maxAgeRecommend.month == 0) {
					maxa = o.maxAgeRecommend.year + "岁";
				} else {
					maxa = o.maxAgeRecommend.month + "月";
				}
			}
			if (o.maxAgeRecommend.year >= 1 && o.maxAgeRecommend.month < 6) {
				maxa = o.maxAgeRecommend.year + "岁";
			}
			if (o.maxAgeRecommend.year >= 1 && o.maxAgeRecommend.month >= 6) {
				maxa = o.maxAgeRecommend.year + ".5岁";
			}
			return o;
		
		},
		jointKnowledgeResultString:function(_h,o){

			if(enableDefaultImage == "true"){
				o.picUrl = configuration.knowledge.listDefaultImg;
			}
			_h += "<li onclick='viewKnowledgeDetail("+o.id+")' data-id="+o.id+">";
			_h += "<a href=javascript:void(0)>";
			_h += "<div class=photo>";
			_h += "<img src="+o.picUrl+" >";
			_h += "</div>";
			_h += "<div class=info>";
			_h += "<h2><span></span>";
			_h += o.title;
			_h += "</h2>";
			_h += "<div class=other onclick='viewKnowledgeDetail("+o.id+")'>";
			_h += "推荐"+ mina+ '-'+ maxa;
			_h += "<span class=num>"+o.miaoNumber+"</span>";
			_h += "</div>";
			_h += "</div>";
			_h += "</a></li>";
			return _h;
		},
		jointCourseResultString:function(_h,o){
			
			if(enableDefaultImage == "true"){
				o.picUrl = configuration.course.indexDefaultImg;
			}
			if(o.courseType == "LIVE" ){
				_h += '<li onclick=viewLiveCourseDetail("'+o.courseId+'") data-id='+o.courseId+'>';
			}else{
				_h += '<li onclick=viewVodCourseDetail("'+o.courseId+'") data-id='+o.courseId+'>';
			}
			_h += "<a href=javascript:void(0)>";
			_h += "<div class=photo>";
			_h += "<span><img src="+o.imgUrl+" ></span>";
			_h += "</div>";
			_h += "<p>";
			_h += o.name;
			_h += "</p>";
			_h += "</a></li>";
			return _h;
		},
		jointActivityResultString:function(_h,o){
			if(null == o || "" == o){
				return _h;
			}
			if(enableDefaultImage == "true"){
				o.picUrl = configuration.activity.activityListDefaultImg;
			}
			_h += '<li onclick=viewActivityDetail("'+o.id+'") data-id='+o.id+'>';
			_h += "<div class=photo><img src="+o.titleImg+" >";
			_h += "<a href=javascript:void(0)></a>";
			_h += "</div>";
			_h += "<div class=info>";
			_h += "<h2 class=tit>"+o.topicTitle+"</h2>";
			if(null != o.timeSlice && "" != o.timeSlice){
				_h += "<p>时间："+o.timeSlice+"</p>";
			}else{
				_h += "<p></p>";
			}
			
			_h += "<div class=other>";
			_h += '<a href=javascript:void(0) class=join onclick=toActivityPart("'+o.id+'")>我要参与</a>';
			_h += "</div>";
			_h += "</div>";
			_h += "</li>";
			return _h;
		},
		jointTopicResultString:function(_h,o){
			
			if(enableDefaultImage == "true"){
				o.picUrl = configuration.topic.topicListDefaultImg;
			}
			_h += '<li onclick=viewTopicDetail("'+o.id+'") data-id='+o.id+'>';
			_h += "<div class=photo><a href=javascript:void(0)>";
			_h += "<img src="+o.titleImg+" ></a>";
			_h += "</div>";
			_h += "<div class=info>";
			_h += "<p class=word>";
			_h += o.topicTitle;
			_h += "</p>";
			_h += "<div class=num>";
			_h += o.pvCount + "人看过";
			_h += "</div>";
			_h += "</div>";
			_h += "</li>";
			return _h;
		},
		initKnowledge:function(params){
			var flag = false;
			//清空
			$(".recommendList").children().remove();
			HH.ajax({
				url:"/yzmm/account/home/ajaxOpenSerachKnowledgeList",
				data:params,
				async:false, 
				callback:function(data,params){
					var _h = "";
					if (data.success) {
						var slist =data.list;
						var totalRows = data.totalRows;
						//三千问推荐去重
						for(var i=0;i<slist.length;i++){
							if(slist[i].id==knowledgeId){
								//slist.remove(slist[i]);
								slist.splice(i, 1);
							}
						}
						var len = slist.length;
						if(len != 0){
							openSearchShowObj.showKnowledgeArea();
						}else{
							$(".knowledgeArea").remove();
							flag = false;
							return;
						}
						//初始化查询总条数
						openSearchShowObj.setKnowledgeCount(totalRows-1);
						for (var i = 0; i < len; i++) {
							var o = slist[i];
							//组装推荐数据
							openSearchShowObj.jointKnowledgeRecommend(o);
							if(!o.picUrl ){
								o.picUrl = configuration.knowledge.listDefaultImg;
							}
							//拼接列表
							_h = openSearchShowObj.jointKnowledgeResultString(_h,o);
						}
						flag =  true;
					}
						$(".recommendList").append(_h);
						//检查空列表
						openSearchShowObj.checkEmptyList();
						//检查唯一
						openSearchShowObj.checkOnlyList();
					}
			})
			return flag;
		},
		initCourse:function(params){
			var flag = false;
			$(".speakList").children().remove();
			HH.ajax({
				url:"/yzmm/account/home/ajaxOpenSerachCourseList",
				data:params,
				async:false, 
				callback:function(data,params){
					var _h = "";
					if (data.success) {
						var len = data.list.length;
						if(len != 0){
							openSearchShowObj.showCourseArea();
						}else{
							$(".courseArea").remove();
							flag = false;
							return;
						}
						//初始化查询总条数
						openSearchShowObj.setCourseCount(data.totalRows);
						for (var i = 0; i < len; i++) {
							var o = data.list[i];
							if(!o.imgUrl ){
								o.imgUrl = configuration.course.indexDefaultImg;
							}
							//拼接列表
							_h = openSearchShowObj.jointCourseResultString(_h,o);
						}
						flag = true;
					}
					$(".speakList").append(_h);
					$(".courseArea").hide();
					//检查空列表
					openSearchShowObj.checkEmptyList();
					//检查唯一
					openSearchShowObj.checkOnlyList();
					}
			})
			return flag;
		},
		initActivity:function(params){
			var flag = false;
			$(".activityUlList").children().remove();
			HH.ajax({
				url:"/yzmm/account/home/ajaxOpenSerachActivityList",
				data:params,
				async:false, 
				callback:function(data,params){
					var _h = "";
					if (data.success) {
						var len = data.list.length;
						if(len != 0){
							openSearchShowObj.showActivityArea();
						}else{
							$(".activityArea").remove();
							flag = false;
							return;
						}
						//初始化查询总条数
						openSearchShowObj.setActivityCount(data.totalRows);
						var len = data.list.length;
						for (var i = 0; i <len; i++) {
							var o = data.list[i];
							//限制两条
							if(i<2 && null != o){
								if(!o.titleImg){
									o.titleImg = configuration.activity.activityListDefaultImg;
								}
								//拼接列表
								_h = openSearchShowObj.jointActivityResultString(_h,o);
							}
						}
						flag = true;
					}
						$(".activityUlList").append(_h);
						$(".activityArea").hide();
						//检查空列表
						openSearchShowObj.checkEmptyList();
						//检查唯一
						openSearchShowObj.checkOnlyList();
					}
			})
			return flag;
		},
		initTopic:function(params){
			var flag = false;
			$(".topicList").children().remove();
			HH.ajax({
				url:"/yzmm/account/home/ajaxOpenSerachTopicList",
				data:params,
				async:false, 
				callback:function(data,params){
					var _h = "";
					if (data.success) {
						var len = data.list.length;
						if(len != 0){
							openSearchShowObj.showTopicArea();
						}else{
							$(".topicArea").remove();
							flag = false;
							return;
						}
						//初始化查询总条数
						openSearchShowObj.setTopicCount(data.totalRows);
						for (var i = 0; i < len; i++) {
							var o = data.list[i];
							if(!o.titleImg ){
								o.titleImg =  configuration.topic.topicListDefaultImg;
							}
							//拼接列表
							_h = openSearchShowObj.jointTopicResultString(_h,o);
						}
						flag = true;
					}
						$(".topicList").append(_h);
						$(".topicArea").hide();
						//检查空列表
						openSearchShowObj.checkEmptyList();
						//检查唯一
						openSearchShowObj.checkOnlyList();
					}
			})
			return flag;
		},
		initKnowledgeList:function(params){
			knowledgeListsm = $(window).scrollme({
				target:$(".recommendList"),
				heightOffset:140,
				data:params,
				url:"/yzmm/account/home/ajaxOpenSerachKnowledgeList",
				beforeLoad:function(){
					//查询之前调用
				},
				callback:function(data,params){
					var _h = "";
					if (data.success) {
						var slist =data.list;
						var totalRows = data.totalRows;
						//三千问推荐去重
						for(var i=0;i<slist.length;i++){
							if(slist[i].id==knowledgeId){
								//slist.remove(list[i]);
								slist.splice(i, 1);
							}
						}
						var len = slist.length;
						if (len) {
							//增加页码
							params.pageIndex = ++params.pageIndex;
						}
						if(len != 0){
							openSearchShowObj.showKnowledgeArea();
						}
						//初始化查询总条数
						openSearchShowObj.setKnowledgeCount(totalRows-1);
						for (var i = 0; i < len; i++) {
							var o = slist[i];
							//组装推荐数据
							openSearchShowObj.jointKnowledgeRecommend(o);
							if(!o.picUrl ){
								o.picUrl = configuration.knowledge.listDefaultImg;
							}
							//拼接列表
							_h = openSearchShowObj.jointKnowledgeResultString(_h,o);
						}
					} 
					$(".recommendList").append(_h);
				}
			});
			//加载数据
			knowledgeListsm.reload();
		},
		initCourseList:function(params){
			courseListsm = $(window).scrollme({
				target:$(".speakList"),
				heightOffset:140,
				data:params,
				url:"/yzmm/account/home/ajaxOpenSerachCourseList",
				beforeLoad:function(){
					//查询之前调用
				},
				callback:function(data,params){
					var _h = "";
					if (data.success) {
						var len = data.list.length;
						if (len) {
							//增加页码
							params.pageIndex = ++params.pageIndex;
						}
						if(len != 0){
							openSearchShowObj.showCourseArea();
						}
						//初始化查询总条数
						openSearchShowObj.setCourseCount(data.totalRows);
						for (var i = 0; i < len; i++) {
							var o = data.list[i];
							if(!o.imgUrl ){
								o.imgUrl = configuration.course.indexDefaultImg;
							}
							//拼接列表
							_h = openSearchShowObj.jointCourseResultString(_h,o);
						}
					} 
					$(".speakList").append(_h);
				}
			});
			//加载数据
			courseListsm.reload();
		},
		initActivityList:function(params){
			activityListsm = $(window).scrollme({
				target:$(".activityUlList"),
				heightOffset:140,
				data:params,
				url:"/yzmm/account/home/ajaxOpenSerachActivityList",
				beforeLoad:function(){
					//查询之前调用
				},
				callback:function(data,params){
					if(params.pageIndex > 1){
						return ;
					}
					var _h = "";
					if (data.success) {
						var len = data.list.length;
						if (len) {
							//增加页码
							params.pageIndex = ++params.pageIndex;
						}
						if(len != 0){
							openSearchShowObj.showActivityArea();
						}
						//初始化查询总条数
						openSearchShowObj.setCourseCount(data.totalRows);
						for (var i = 0; i < len; i++) {
							var o = data.list[i];
							if(!o.titleImg ){
								o.titleImg = configuration.activity.activityListDefaultImg;
							}
							//拼接列表
							_h = openSearchShowObj.jointActivityResultString(_h,o);
						}
					} 
					$(".activityUlList").append(_h);
				}
			});
			//加载数据
			activityListsm.reload();
		},
		initTopicList:function(params){
			topicListsm = $(window).scrollme({
				target:$(".topicList"),
				heightOffset:140,
				data:params,
				url:"/yzmm/account/home/ajaxOpenSerachTopicList",
				beforeLoad:function(){
					//查询之前调用
				},
				callback:function(data,params){
					var _h = "";
					if (data.success) {
						var len = data.list.length;
						if (len) {
							//增加页码
							params.pageIndex = ++params.pageIndex;
						}
						if(len != 0){
							openSearchShowObj.showTopicArea();
						}
						//初始化查询总条数
						openSearchShowObj.setCourseCount(data.totalRows);
						for (var i = 0; i < len; i++) {
							var o = data.list[i];
							if(!o.titleImg ){
								o.titleImg = configuration.topic.topicListDefaultImg;
							}
							//拼接列表
							_h = openSearchShowObj.jointTopicResultString(_h,o);
						}
					} 
					$(".topicList").append(_h);
				}
			});
			//加载数据
			topicListsm.reload();
		}
}
