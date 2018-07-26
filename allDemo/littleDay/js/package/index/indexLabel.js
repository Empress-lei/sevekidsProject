$(".more ").click(function(){
		if(!$(this).hasClass("hasClick")){
			$(this).addClass("hasClick");
			$(this).removeClass("moreactive");
			queryOnlyList(this);
		}else{
			$(this).removeClass("hasClick");
			$(this).addClass("moreactive");
			init({pageIndex : 1,pageSize:2,keyword:keyword,minScope:minScope,maxScope:maxScope});
			$(window).unbind('scroll');
		}
	})
	function queryOnlyList(thet){
		if($(thet).hasClass("moreKnowledge")){
			openSearchShowObj.onlyKnowledge(keyword);
		}
		if($(thet).hasClass("moreCourse")){
			openSearchShowObj.onlyCourse(keyword);
		}
		if($(thet).hasClass("moreActivity")){
			openSearchShowObj.onlyActivity(keyword);
		}
		if($(thet).hasClass("moreTopic")){
			openSearchShowObj.onlyTopic(keyword);
		}
	}
	function init(params){
		//初始化title
		openSearchShowObj.initKnowledge(params);
		openSearchShowObj.initCourse(params);
		openSearchShowObj.initTopic(params);
		openSearchShowObj.initActivity(params);
	}
	//空列表检查
	openSearchShowObj.checkEmptyList = function(){
		//每次初始化ajax+1
		ajaxQueryNumber ++;
		var emptyKnowledgeList = true;
		var emptyCourseList = true;
		var emptyActivityList = true;
		var emptyTopicList = true;
		//当四次ajax查询完毕后，进行判断
		if(ajaxQueryNumber == 4){
			if($(".recommendList").children().length > 0){
				emptyKnowledgeList = false;
			}
			if($(".speakList").children().length > 0){
				emptyCourseList = false;
			}
			if($(".activityUlList").children().length > 0){
				emptyActivityList = false;
			}
			if($(".topicList").children().length > 0){
				emptyTopicList = false;
			}
			if(emptyKnowledgeList && emptyCourseList && emptyActivityList && emptyTopicList){
				//如果全部为空，则弹起查询框
				//alert("查询结果为空");
				var description = "网络不好，请刷新试试";
				window.location.href="/yzmm/account/home/toBlankResultPage?description="+description;
			}
			ajaxQueryNumber = 0;
		}
	
	}
	//检测唯一,可使用优化
	openSearchShowObj.checkOnlyList = function(){
		onlyQueryNumber ++;
		var hasKnowledge = false;
		var hasCourseList = false;
		var hasActivityList = false;
		var hasTopicList = false;
		//当四次ajax查询完毕后，进行判断
		if(onlyQueryNumber == 4){
			if($(".recommendList").children().length == 0){
				hasKnowledge = true;
			}
			if($(".speakList").children().length == 0){
				hasCourseList = true;
			}
			if($(".activityUlList").children().length == 0){
				hasActivityList = true;
			}
			if($(".topicList").children().length == 0){
				hasTopicList = true;
			}
			//查找唯一
			if(!hasKnowledge && hasCourseList && hasActivityList && hasTopicList){
				//只有三千问
				openSearchShowObj.onlyKnowledge(keyword);
			}
			if(hasKnowledge && !hasCourseList && hasActivityList && hasTopicList){
				//只有喵姐说init
				openSearchShowObj.onlyCourse(keyword);
			}
			if(hasKnowledge && hasCourseList && !hasActivityList && hasTopicList){
				//只有活动
				openSearchShowObj.onlyActivity(keyword);
			}
			if(hasKnowledge && hasCourseList && hasActivityList && !hasTopicList){
				//只有话题
				openSearchShowObj.onlyTopic(keyword);
			}
			onlyQueryNumber = 0;
		}
	}