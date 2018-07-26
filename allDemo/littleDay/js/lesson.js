$(function(){
	var sm = {};
	$(".lessonBtn").click(function(){
		sm = $(window).scrollme({
			target:$("#packageList"),
		    url:'/yzmm/account/course/ajaxcoursesignlist',
		    data:{pageIndex:1,pageSize:10},
		    callback:function(data,params){
		    	var h = "";
	    		if(data.success){
	    			var len = data.list.length;
					if(len){
						//增加页码
						params.pageIndex = ++params.pageIndex;
					}
					for(var i=0;i< len;i++){
						var o = data.list[i];
					   h +='<a onclick="tosign(this);" data-labelid="'+o.labelId+'">'+o.labelName+'</a>';
					} 
	    		}
	    		if(params.pageIndex==2){
	    			//拼接强制打包课程组的内容
	    			HH.ajax({
	    				url: "/yzmm/account/coursegroup/ajaxpackcourseGroup",
	    				data:{},
	    				async:false,
	    				callback:function(data2){
	    					var len2 = data2.length;
	    					for(var i=0;i< len2;i++){
	    						var o = data2[i];
	    						if($("#courseGroup"+o.id).length==0){
	    							 h +='<a id="courseGroup'+o.id+'" onclick="tocourseGroup(this);" data-id="'+o.id+'">'+o.name+'</a>';
	    						}
	    					} 
	    					$(".package").show();
	    		    		$(".packageBox").show().addClass("slideup");
	    		       	    $("#packageList").append(h);
	    				}
	    			});
	    			
	    		}else{
	    			$(".package").show();
		    		$(".packageBox").show().addClass("slideup");
		       	    $("#packageList").append(h);
	    		};
		    }
		 });
		 sm.reload();
	})

	$(".package").click(function(e){
		e.stopPropagation();
		if($(e.target).hasClass("package") || $(e.target).is("span")){
			$(".packageBox").addClass("slidedown");
			var t;
			t = setTimeout(function(){
				$(".package").hide();
				$(".packageBox").removeClass("slideup");
				$(".packageBox").removeClass("slidedown");
			},500)
		}
	})
})

function tocourseGroup(obj){
	var id= $(obj).data("id");
	HH.href("/yzmm/account/coursegroup/toPackcourseGroup?id="+id);
}