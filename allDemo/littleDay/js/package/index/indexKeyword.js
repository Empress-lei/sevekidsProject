//检测列表是否为空
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
			searchObj.setSearchTitle($(".searchTitleArea").val());
			showSearch();
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
			openSearchShowObj.onlyKnowledge($(".searchTitleArea").val());
		}
		if(hasKnowledge && !hasCourseList && hasActivityList && hasTopicList){
			//只有喵姐说init
			openSearchShowObj.onlyCourse($(".searchTitleArea").val());
		}
		if(hasKnowledge && hasCourseList && !hasActivityList && hasTopicList){
			//只有活动
			openSearchShowObj.onlyActivity($(".searchTitleArea").val());
		}
		if(hasKnowledge && hasCourseList && hasActivityList && !hasTopicList){
			//只有话题
			openSearchShowObj.onlyTopic($(".searchTitleArea").val());
		}
		onlyQueryNumber = 0;
	}
}
//搜索回调
searchObj.searchCallback = function(){
	//初始化搜索pageIndex
	$(".searchTitleArea").val(searchObj.searchShowValue);
	//初始化参数并且搜索
	init({pageIndex : 1,pageSize:2,keyword:searchObj.title,minScope:searchObj.minScope,maxScope:searchObj.maxScope});
}
function init(params){
		//初始化title
		if(params.keyword != "" && null != keyword){
			$(".searchTitleArea").val(params.keyword);
		}else if(params.minScope !="" && null != params.minScope){
			params.keyword = "";
			$(".searchTitleArea").val(params.minScope+"-"+params.maxScope+"岁");
		}
		openSearchShowObj.initKnowledge(params);
		openSearchShowObj.initCourse(params);
		openSearchShowObj.initTopic(params);
		openSearchShowObj.initActivity(params);
	}
//展示弹起框
	function showSearch(){
		searchObj.showSearch();
		//隐藏vip成为框
		if("VIP" != userAuthorise){
			searchObj.showEmptyAndNoVip();
		}else{
			searchObj.showEmptyAndVip();
		}
	}
	//隐藏弹起框
	function hideSearch(){
		searchObj.hideSearch();
		searchObj.hideEmptyAndNoVip();
		searchObj.hideEmptyAndVip();
		searchObj.clearTitle();
		searchObj.clearScope();
	}
function flush(){
		//清空历史搜索
		$(".recommendList").children().remove();
		$(".speakList").children().remove();
		$(".activityUlList").children().remove();
		$(".topicList").children().remove();
		//隐藏数据展示区
		openSearchShowObj.hideKnowledgeArea();
		openSearchShowObj.hideCourseArea();
		openSearchShowObj.hideActivityArea();
		openSearchShowObj.hideTopicArea();
		//初始化查询数
		openSearchShowObj.clearKnowledgeCount();
		openSearchShowObj.clearCourseCount();
		openSearchShowObj.clearActivityCount();
		openSearchShowObj.clearTopicCount();
	}
	//提交搜索
	$(".keywordSearch").submit(function(){
		flush();
		keyword = $(".searchTitleArea").val();
		minScope = "";
		maxScope = "";
		openSearchShowObj.initKnowledge({pageIndex : 1,pageSize:2,keyword:keyword,minScope:minScope,maxScope:maxScope});
		openSearchShowObj.initCourse({pageIndex : 1,pageSize:2,keyword:keyword,minScope:minScope,maxScope:maxScope});
		openSearchShowObj.initTopic({pageIndex : 1,pageSize:2,keyword:keyword,minScope:minScope,maxScope:maxScope});
		openSearchShowObj.initActivity({pageIndex : 1,pageSize:2,keyword:keyword,minScope:minScope,maxScope:maxScope});
		 return false;
	})
		$(".backBtn").click(function(){
			window.history.go(-1);
		return;
	})
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
			openSearchShowObj.onlyKnowledge(keyword,minScope,maxScope);
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
	
	