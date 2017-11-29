$(function(){
	sm = $(window).scrollme({
		target:$(".recommendList"),
		heightOffset:140,
		data:kdata,
		url:"/yzmm/account/knowledge/ajaxOpenSerachKnowledgeList",
		beforeLoad:function(){
			//查询之前调用
			if(1!=pageIndex){
				//$("#showloaddiv").show();
			}
		},
		callback:function(data,params){
			//$("#showloaddiv").hide();
			var _h = "";
			if (data.success) {
				//是否为空
				if (data.list.length == 0 && data.curPage == 1) {
					if(userAuthorise == "VIP"){
						searchObj.showSearch();
						//没有查到数据，并且身份为vip
						searchObj.showEmptyAndVip();
					}else{
						searchObj.showSearch();
						//没有查到数据，并且身份非vip
						searchObj.showEmptyAndNoVip();
						
					}
				}else{
					var len = data.list.length;
					if (len) {
						if(data.totalPage<pageIndex){
							return;
						}else{
							//增加页码
							params.pageIndex = ++pageIndex;
						}
					}
					for (var i = 0; i < len; i++) {
						var o = data.list[i];
						if (o.minAge.year < 1) {
							if (o.minAge.month == 0) {
								mina = o.minAge.year;
							} else {
								mina = o.minAge.month + "月";
							}
						}
						if (o.minAge.year >= 1 && o.minAge.month < 6) {
							mina = o.minAge.year;
						}
						if (o.minAge.year >= 1 && o.minAge.month >= 6) {
							mina = o.minAge.year + ".5";
						}
						
						if (o.maxAge.year < 1) {
							if (o.maxAge.month == 0) {
								maxa = o.maxAge.year + "岁";
							} else {
								maxa = o.maxAge.month + "月";
							}
						}
						if (o.maxAge.year >= 1 && o.maxAge.month < 6) {
							maxa = o.maxAge.year + "岁";
						}
						if (o.maxAge.year >= 1 && o.maxAge.month >= 6) {
							maxa = o.maxAge.year + ".5岁";
						}
						if(!o.picUrl ){
							o.picUrl = defaultImage;
						}
						if(enableDefaultImage == "true"){
							o.picUrl = defaultImage;
						}
						
						//拼接列表
						_h += "<li data-id="+o.id+">";
						_h += "<a href=javascript:void(0)>";
						_h += "<div class=photo>";
						_h += "<img src="+o.picUrl+" >";
						_h += "</div>";
						_h += "<div class=info>";
						if(o.isNew){
							_h += "<h2 style='cursor: pointer' onclick='viewDetail("+o.id+")'><span class=newesttag ></span>";
						}else if(o.isHot){
							_h += "<h2 style='cursor: pointer' onclick='viewDetail("+o.id+")'><span class=hottag></span>";
						}else{
							_h += "<h2 style='cursor: pointer' onclick='viewDetail("+o.id+")'><span></span>";
						}
						_h += o.title;
						_h += "</h2>";
						_h += "<div class=other onclick='viewDetail("+o.id+")'>";
						_h += "适合"+ mina+ '-'+ maxa;
						_h += "<span class>&nbsp;&nbsp;|&nbsp;&nbsp;"+o.listen+" 位家长觉着有用</span>";
						_h += "</div>";
						_h += "<div class=other>";
						_h += "<span>时长:"+o.playTime;
						if(o.isFree=='YES'){
							_h += '<div class="freebutton" style="background-image: url(../../../res/img/xsmf.png);background-size: 52px;"></div>';
						}
						_h += "</span>";
						_h += "</div>";
						_h += "</div>";
						_h += "</a></li>";
					}
				}
				
			} 
			$(".recommendList").append(_h);
			//三千问列表
			$(".freebutton").click(function(){
				top.location="/yzmm/account/knowledge/showfreelist";
				return;
			})
		}
	});
	//加载数据
	sm.reload();
})
//详情
//function viewDetail(id) {
//		top.location="/yzmm/account/knowledge/viewDetail?knowledgeId="+id;
//		return;
//}
//返回
$(".backBtn").click(function(){
	top.location="/yzmm/account/knowledge/index";
	return;
})

//搜索条件
$(".inputFocus").click(function(){
	searchObj.showSearch();
	//隐藏vip成为框
	searchObj.hideEmptyAndNoVip();
	searchObj.hideEmptyAndVip();
})
//回调
searchObj.searchCallback = function(){
	//初始化搜索pageIndex
	$(".showInput").text(searchObj.searchShowValue);
	//初始化参数并且搜索
	var age = null;
	var sex = null;
	pageIndex = 1;
	var params = {
			pageIndex : pageIndex,
			pageSize : 10,
			title : searchObj.title,
			age : age,
			sex : sex,
			minScope : searchObj.minScope,
			maxScope : searchObj.maxScope,
		};
	sm.reload(params);
}
