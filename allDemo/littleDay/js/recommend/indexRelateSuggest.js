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
			//如果全部为空,隐藏相关推荐按钮
			$(".relaTit2").hide();
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
function init(params){
		//初始化title
		if(params.keyword != "" && null != keyword){
			$(".searchTitleArea").val(params.keyword);
		}else if(params.minScope !="" && null != params.minScope){
			$(".searchTitleArea").val(params.minScope+"-"+params.maxScope+"岁");
		}
		var knowFlag = openSearchShowObj.initKnowledge(params);
		var courseFlag = openSearchShowObj.initCourse(params);
		var topicFlag = openSearchShowObj.initTopic(params);
		var activityFlag = openSearchShowObj.initActivity(params);
		//alert(knowFlag+" "+courseFlag+" "+topicFlag+" "+activityFlag);
		if((!knowFlag)&&(!courseFlag)&&(!topicFlag)&&(!activityFlag)){
			//如果全部为空,隐藏相关推荐按钮
			$(".relaTit2").hide();
		}else if((knowFlag)){
			$(".knowledgeArea").show();
			if(((courseFlag)||(topicFlag)||(activityFlag))){
				$(".knowledgeArea").append('<a href="javascript:void(0)" class="viewmore">查看更多推荐<span></span></a>');
			}
		}else if((!knowFlag)&&(courseFlag)){
			$(".courseArea").show();
			if((topicFlag)||(activityFlag)){
				$(".courseArea").append('<a href="javascript:void(0)" class="viewmore">查看更多推荐<span></span></a>');
			}
		}else if((!knowFlag)&&(!courseFlag)&&(activityFlag)){
			$(".activityArea").show();
			if(topicFlag){
				$(".topicArea").append('<a href="javascript:void(0)" class="viewmore">查看更多推荐<span></span></a>');
			}
		}else if(topicFlag){
			$(".topicArea").show();
		}
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
	
	