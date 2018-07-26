/**
 * 打赏js
 * @author qzq
 * @date 2016年12月27日 11:49:50
 */

$(function(){
	var content = {};
	var pageIndex = 1;
	var totalPage = 1;
	//打赏
	var expectionList=$('.expectionList');//打赏容器 ul
	content = scrollPagination({
		id:"expectionList",
		url:'/yzmm/account/tip/ajaxList', 
		data:{pageIndex:pageIndex},
		callback:function(data,params){
			if(data.success){
				if(data.totalPage == params.pageIndex){
					content.stopScrollPagination();
				}
				totalPage = data.totalPage;
				if(data.totalPage == 0){
					$(".noneData").remove();
					return '<div class="noneData"><span>您还没有出手打赏咧~</span></div>';
				}else{
					var len = data.list.length;
					if(len){
						//增加页码
						params.pageIndex = ++pageIndex;
					}
					for(var i=0;i< len;i++){
						var o = data.list[i];
						var li=$("<li class='expectionItem' onclick='javascript:window.location=\"/yzmm/account/course/toVodDetail?courseId="+o.courseId+"\"'></li>").appendTo(expectionList);
						var div1=$('<div class="expectionInfo"></div>').appendTo(li);
						var div2=$('<div class="time">'+o.updateTime+'</div>').appendTo(div1);
						var div3=$('<div class="name">'+o.courseName+'</div>').appendTo(div1);
						var div4=$('<div class="expectionMoney">'+o.money+'</div>').appendTo(li);
					}
					return "";
				}
			}
		}
	});
})
/**
 * 显示购买记录
 */
function showPurchaseRecord(){
	var sqwSection=$(".sqwSection");//三千问容器
	var vodCourseSection=$(".vodCourseSection"); //课程容器
	var activitySection=$(".activitySection");//活动容器
	HH.ajax({
		url:'/yzmm/account/order/smaRecord',
		data:{}, 
		callback:function(data){
			//判断发送是否成功
			if(data.success) {
				//喵姐说
    			var lvc=data.listVodCourse;
    			if(!lvc){
    				vodCourseSection.css('display','none');
    			}else{
    				var mjsbuyList=$("#mjsbuyList");//喵姐说列表容器ul
    				mjsbuyList.html(null);//清空原有数据
    				//喵姐说总条数赋值
    				$(".mjstxtyellow").html(data.listVodCourseCount);
    				for (var i = 0; i < lvc.length; i++) {
    					//页面数据嵌套
						var li=$("<li></li>").appendTo(mjsbuyList);
						var imgUrl=lvc[i].imgUrl==null||lvc[i].imgUrl==''?'/res/img/default/vod_default.png':lvc[i].imgUrl;
						var div1=$("<div class='photo'><a href='/yzmm/account/course/toVodDetail?courseId="+lvc[i].courseId+"'><img src='"+imgUrl+"'></a></div>").appendTo(li);
						var div2=$("<div class='info'><p><span class='word'></span>"+lvc[i].name+"</p><div class='num'>"+fmtDate(new Date(lvc[i].buyingTime*1000),"yyyy.MM.dd HH:mm")+"</div></div>").appendTo(li);
					}
    			}
    			//活动
    			var al=data.activityList;
    			if(!al){
    				activitySection.css('display','none');
    			}else{
    				var activitybuyList=$(".activitybuyList");//喵活动列表容器ul
    				activitybuyList.html(null);//清空原有数据
    				//喵姐说总条数赋值
    				$(".activitytxtyellow").html(data.activityListCount);
    				for (var i = 0; i < al.length; i++) {
    					//页面数据嵌套
						var li=$("<li></li>").appendTo(activitybuyList);
						var imgUrl=al[i].titleImg==null||al[i].titleImg==''?'/res/img/default/vod_default.png':al[i].titleImg;
						var div1=$("<div class='photo'><a href='/yzmm/account/activity/daysPlan/everyDayList?activityId="+al[i].id+"'><img src='"+imgUrl+"'></a></div>").appendTo(li);
						var div2=$("<div class='info'><p><span class='word'></span>"+al[i].topicTitle+"</p><div class='num'>"+fmtDate(new Date(al[i].buyingTime*1000),"yyyy.MM.dd HH:mm")+"</div></div>").appendTo(li);
					}
    			}
    			//三千问
    			var sl=data.sqwlist;
    			if(!sl){
    				sqwSection.css('display','none');
    			}else{
    				var sqwtxtyellow=$(".sqwtxtyellow");//三千问总条数
    				var recommendList=$("#recommendList");//三千问列表容器 ul
    				recommendList.html(null);//清空原有数据
    				//三千问总条数赋值
    				$(".sqwtxtyellow").html(data.sqwlistCount);
    				for (var i = 0; i < sl.length; i++) {
    					//页面数据嵌套
						var li=$("<li></li>").appendTo(recommendList);
						var a1=$("<a href='/yzmm/account/knowledge/viewDetail?knowledgeId="+sl[i].id+"'></a>").appendTo(li);
						var picUrl=sl[i].picUrl==null||sl[i].picUrl==''?'/res/img/default/knowledgeIndex.png':sl[i].picUrl;
						var div1=$("<div class='photo'><img src='"+picUrl+"'></div>").appendTo(a1);
						var div2=$("<div class='info'><h2><span class='hottag'></span>"+sl[i].title+"</h2><div class='other'>"+fmtDate(new Date(sl[i].buyingTime*1000),"yyyy.MM.dd HH:mm")+"</div></div>").appendTo(a1);
					}
    			}
            } else {
                toast(data.msg);
            }
		}
	});
}
/**
 * 三千问 more
 * @athor qzq
 * @date 2016年12月28日 15:36:54
 */
var knowledgeMoreBoo=true;

function knowledgeMore(){
	
	if(knowledgeMoreBoo){
		knowledgeMoreBoo=false;
		$('.recommendList').css('display','none');
		$('.recommendListMore').css('display','block');
		var recommendListMore=$('.recommendListMore');//打赏容器 ul
		recommendListMore.html(null);
		HH.ajax({
			url:'/yzmm/account/order/smaRecordKnowledgeMore',
			data:{pageSize:9999},
			callback:function(data){
				if(data.success){
					if(!data.sqwlist){
						return;
					}
					var sl=data.sqwlist;
					for(var i=0;i< data.sqwlist.length;i++){
						//页面数据嵌套
						var li=$("<li></li>").appendTo(recommendListMore);
						var a1=$("<a href='/yzmm/account/knowledge/viewDetail?knowledgeId="+sl[i].id+"'></a>").appendTo(li);
						var picUrl=sl[i].picUrl==null||sl[i].picUrl==''?'/res/img/default/knowledgeIndex.png':sl[i].picUrl;
						var div1=$("<div class='photo'><img src='"+picUrl+"'></div>").appendTo(a1);
						var div2=$("<div class='info'><h2><span class='hottag'></span>"+sl[i].title+"</h2><div class='other'>"+fmtDate(new Date(sl[i].buyingTime*1000),"yyyy.MM.dd HH:mm")+"</div></div>").appendTo(a1);
					}
				}
			}
		});
	}else{
		knowledgeMoreBoo=true;
		$('.recommendList').css('display','block');
		$('.recommendListMore').css('display','none');
	}
}
/**
 * 喵姐说 more
 * @athor qzq
 * @date 2016年12月28日  
 */
var vodMoreBoo=true;

function vodMore(){
	var content = {};
	var pageIndex = 1;
	var totalPage = 1;
	if(vodMoreBoo){
		vodMoreBoo=false;
		$('.mjsbuyList').css('display','none');
		$('.buyListMore').css('display','block');
		var buyListMore=$('.buyListMore');//
		buyListMore.html(null);
		HH.ajax({
			url:'/yzmm/account/order/smaRecordVodMore',
			data:{pageSize:9999},
			callback:function(data){
				if(data.success){
					if(!data.listVodCourse){
						return;
					}
					var lvc=data.listVodCourse;
					for(var i=0;i< data.listVodCourse.length;i++){
						//页面数据嵌套
						var li=$("<li></li>").appendTo(buyListMore);
						var imgUrl=lvc[i].imgUrl==null||lvc[i].imgUrl==''?'/res/img/default/vod_default.png':lvc[i].imgUrl;
						var div1=$("<div class='photo'><a href='/yzmm/account/course/toVodDetail?courseId="+lvc[i].courseId+"'><img src='"+imgUrl+"'></a></div>").appendTo(li);
						var div2=$("<div class='info'><p><span class='word'></span>"+lvc[i].name+"</p><div class='num'>"+fmtDate(new Date(lvc[i].buyingTime*1000),"yyyy.MM.dd HH:mm")+"</div></div>").appendTo(li);
					}
				}
			}
		});
	}else{
		vodMoreBoo=true;
		$('.mjsbuyList').css('display','block');
		$('.buyListMore').css('display','none');
	}
}
/**
 * 活动 more
 * @athor qzq
 * @date 2016年12月28日  
 */
var activityMoreBoo=true;

function activityMore(){
	if(activityMoreBoo){
		activityMoreBoo=false;
		$('.activitybuyList').css('display','none');
		$('.activitybuyListMore').css('display','block');
		var activitybuyListMore=$('.activitybuyListMore');//
		activitybuyListMore.html(null);
		HH.ajax({
			url:'/yzmm/account/order/smaRecordActivityMore',
			data:{pageSize:9999},
			callback:function(data){
				if(data.success){
					if(!data.activityList){
						return;
					}
					var al=data.activityList;
					for(var i=0;i< data.activityList.length;i++){
						//页面数据嵌套
						var li=$("<li></li>").appendTo(activitybuyListMore);
						var imgUrl=al[i].titleImg==null||al[i].titleImg==''?'/res/img/default/vod_default.png':al[i].titleImg;
						var div1=$("<div class='photo'><a href='/yzmm/account/activity/daysPlan/everyDayList?activityId="+al[i].id+"'><img src='"+imgUrl+"'></a></div>").appendTo(li);
						var div2=$("<div class='info'><p><span class='word'></span>"+al[i].topicTitle+"</p><div class='num'>"+fmtDate(new Date(al[i].buyingTime*1000),"yyyy.MM.dd HH:mm")+"</div></div>").appendTo(li);
					}
				}
			}
		});
	}else{
		activityMoreBoo=true;
		$('.activitybuyList').css('display','block');
		$('.activitybuyListMore').css('display','none');
	}
}