var searchObj = {
		//搜索回调
		searchCallback:function(){
		},
		pageIndex : "",
		title : "",
		minScope : "",
		maxScope : "",
		//搜索值传递属性
		searchShowValue : "",
		showSearch : function(){
			$(".searchItem").show().animate({"top":"0"},300,function(){
				$(".wrap").hide();
				$(".searchItem").show();
				//增加聚焦效果
				$(".mySearchTitle").focus();
			});
		},
		hideSearch : function(){
			$(".searchItem").hide();
			$(".wrap").show();
			//$(".searchItem").animate({"top":"100%"},300);
		},
		//数据为空则展示空div
		showEmptyAndNoVip : function(){
			$(".emptyAndNoVip").show();
		},
		hideEmptyAndNoVip : function(){
			$(".emptyAndNoVip").hide();
		},
		showEmptyAndVip : function(){
			$(".emptyAndVip").show();
		},
		hideEmptyAndVip : function(){
			$(".emptyAndVip").hide();
		},
		hotWordSearch : function(thet){
			searchObj.title = $(thet).text();
			searchObj.searchShowValue = searchObj.title
			searchObj.clearScope();
			searchObj.submitSearch();
		},
		memorySearch : function(thet){
			searchObj.title = $(thet).text();
			searchObj.searchShowValue = searchObj.title
			searchObj.clearScope();
			searchObj.submitSearch();
		},
		removeTag : function(thet){
			stopevt();
			$(thet).parent().remove();
			var title = $(thet).parent().text();
			searchObj.deleteHistory(title);
		},
		submitSearch : function(){
			searchObj.hideSearch();
			//清空
			$(".mySearchTitle").val("");
			//子类搜索
			searchObj.searchCallback();
		},
		deleteHistory : function(historyText){
			//根据历史标记内容删除	
				var url = '/yzmm/account/knowledge/deleteHistory';
				HH.ajax({
					waiting:false,
					data:{historyText:historyText},
					url:url,
					success:function(data){
						
					},
				});
		},
		//清空搜索条件
		clearTitle : function(){
			searchObj.title = "";
		},
		clearScope : function(){
			searchObj.minScope = "";
			searchObj.maxScope = "";
		},
		setSearchTitle : function(title){
			$(".mySearchTitle").val(title);
		},
		getSearchTitle : function(){
			return $(".mySearchTitle").val();
		},
		clearSearchTitle : function(){
			return $(".mySearchTitle").val("");
		}
}
$(".searchCancleBtn").click(function(){
	searchObj.hideSearch();
})
//成为VIP
$(".vipBtn").click(function(){
	window.location.href="/yzmm/account/VIPStatus";
	return;
})
//去提问
$(".quizBtn").click(function(){
	window.location.href="/yzmm/account/miaoqa/index";
	return;
})
//点击年龄标签
$(".age").click(function(){
	var obj = $(this);
	searchObj.minScope = obj.attr("data-minScope");
	searchObj.maxScope = obj.attr("data-maxScope");
	searchObj.searchShowValue = searchObj.minScope + "-" + searchObj.maxScope + "岁";
	//清空其他搜索条件
	searchObj.clearTitle();
	searchObj.submitSearch();
})
//点击热词标签
$(".hotWord").click(function(){
	searchObj.hotWordSearch(this);
})
//历史搜索
$(".memory").click(function(){
	searchObj.memorySearch(this);
})
//提交搜索
$(".mySearch").submit(function(){
	searchObj.title = $(".mySearchTitle").val();
	if(!searchObj.title){
		searchObj.searchShowValue = "";
	}else{
		searchObj.searchShowValue = searchObj.title;
	}
	searchObj.clearScope();
	searchObj.submitSearch();
	return false;
})
//删除缓存
$(".remove").click(function(){
	searchObj.removeTag();
})

//加载搜索历史
	HH.ajax({
		   url: "/yzmm/account/knowledge/ajaxSearch",
		   data:{pageSize:20},
	       success: function(data){
			   if (data.success) {
				   var len = data.list.length;
					if(len != 0){
					   var _s = "";
						for (var i = 0; i < data.list.length; i++) {
							_s += '<a href="javascript:void(0)" class="memory">'
							_s += data.list[i];
							_s += '<i class="remove"></i>';
							_s += '</a>';
						}
						$(".mySearchHistory").append(_s);
					}else{
						$(".searchHistory").hide();
					}
				 
					//绑定方法
					$('.memory').unbind("click").bind('click', function(event) {
						searchObj.memorySearch(this);
					  });
					$('.remove').unbind("click").bind('click', function(event) {
						searchObj.removeTag(this);
					});
					
			   }
		   }
	});
//加载热门搜索
	HH.ajax({
		   url: "/yzmm/account/home/search/ajaxgetHotWord",
	       success: function(data){
			   if (data.success) {
				   var _s = "";
					for (var i = 0; i < data.list.length; i++) {
						_s += '<a href="javascript:void(0)" class="hotWord">'
						_s += data.list[i].hotWords;
						_s += '</a>';
					}
					$(".hotSearch").append(_s);
					//绑定方法
					$('.hotWord').unbind("click").bind('click', function(event) {
						searchObj.hotWordSearch(this);
					  });
			   }
		   }
	});
