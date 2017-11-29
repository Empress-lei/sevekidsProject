var pageIndexSubject = 1;
function subjectlist(){
	var courseId=$("#courselistmoreid").val();
	pageIndexSubject = 1;
	subjectsm = $(".subjectList").scrollme({
		target:$(".subjectList .ul"),
	    url:'/yzmm/account/course/coursealllist',
	    data:{courseId:courseId,pageIndex:pageIndexSubject,pageSize:15},
	    callback:function(data,params){
	    	var h = "";
   		if(data.success){
   			var len = data.list.length;
				if(len){
					//增加页码
					params.pageIndex = ++pageIndexSubject;
				} 
				for(var i=0;i< len;i++){
					var o = data.list[i];
				    h +='<li>'
				    h +='<a onclick="toVod(this);" data-courseid="'+o.courseId+'">'+o.name+'</a></li>';
				} 
   		}
      	    $(".subjectList .ul").append(h);
	    }
	 });
	subjectsm.reload();
}

function subjectbtn(){
	var wh = $(window).height();
	var bh = $(".subjectBanner").height();
	$(".subjectInfo").hide();
	$(".subjectList").show().addClass("slideup");
	$(".subjectList").css({
		"height":wh-bh,
		"position":"fixed",
		"top":bh,
		"z-index":"102"
	});
	
	subjectlist();
	
	setTimeout(function(){
		$(".btn").show();
	},500);
}
$(function(){
	/*$(".subjectList").scroll(function(){
		alert(111)
	});
	*/
	 
	//课程列表
//	$(".subjectBtn").click();
	//课程详情
	$(".goback").click(function(){
		$(".subjectList").addClass("slidedown");
		$(".btn").hide();
		setTimeout(function(){
			$(".subjectList").hide();
			$(".subjectList").removeClass("slideup");
			$(".subjectList").removeClass("slidedown");
			$(".subjectInfo").show();
			$(".subjectList").removeAttr("style");
			$(".subjectList").scrollTop(0);
		},500)
		
	})
	
})