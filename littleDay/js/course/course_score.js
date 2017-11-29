/**
 * 评星评论
 * @author qzq
 */
//暂停播放 时间限制：弹评星框
var stopPayTime=60*20;
$(function(){
	//------------------基础代码
	//点击空白处弹层消失
	$(".courseScore").on("click",function(e){
		e.stopPropagation();
		if($(e.target).hasClass("courseScore")){
			$(".courseScore").hide();
		}
	})
	//星级效果
	$(".starlist .star").on("click",function(){
		var ix = $(this).index();
		var len,txt;
		len = $(".starlist .staron").length;
		if(!$(this).hasClass("starton")){
			if(ix>=len){
				for(var i=0;i<=ix;i++){
					$(".starlist .star").eq(i).addClass("staron");
				}
			}
			else{
				for(var i=ix+1;i<5;i++){
					$(".starlist .star").eq(i).removeClass("staron");
				}
			}
			len = $(".starlist .staron").length;
			txt = changeWord(len);	
		}
		$(".courseScoreBox .word").text(txt);
	})
	function changeWord(i){
		if(i==1){
			return "很不好，什么都没有学到";
		}
		else if(i==2){
			return "不太好，学到的东西不多";
		}
		else if(i==3){
			return "一般，还会继续学习";
		}
		else if(i==4){
			return "还不错，内容很实用";
		}
		else if(i==5){
			return "非常好，收获很多";
		}
	}
	//----------------业务逻辑
	/**
	 * 提交评论
	 */
	$('.txtbtn').on('click',function(){
		//获取星级
		var scoreLevel=$('.staron').length;
		//获取评论
		var comment=$('.courseScoreBox textarea').val();
		
		if(scoreLevel==0){
			toast('请给课程打分～');
			return;
		}
		//枚举
		switch (scoreLevel) {
			case 1:
				scoreLevel='A_LEVEL';
				break;
			case 2:
				scoreLevel='B_LEVEL';
				break;
			case 3:
				scoreLevel='C_LEVEL';
				break;
			case 4:
				scoreLevel='D_LEVEL';
				break;
			case 5:
				scoreLevel='E_LEVEL';
				break;
		}
		//提交评论
		HH.ajax({
			    url:'/yzmm/account/course/courseScore',
			    data:{
			    	courseId:courseId,
			    	scoreType:scoreType,
			    	scoreLevel:scoreLevel,
			    	comment:comment
			    	},
			    callback:function(data){
			   		if(data.success){
			   			$(".courseScore:eq(0)").hide();
			   			$(".courseScore:eq(1)").show();
			   			
			   			setTimeout(function(){
			   				$(".courseScore:eq(1)").hide();
			   			},3000);
			   		}else{
			   			setTimeout(function(){
			   				$(".courseScore").hide();
			   			},500);
			   		}
			    }
		    });
	});
})
/**
 * 检查是否需要弹框
 * @returns
 */
function courseScore(){
	HH.ajax({
	    url:'/yzmm/account/course/checkIsScore',
	    data:{
	    	courseId:courseId,
	    	},
	    callback:function(data){
	   		if(data.success){
	   			$('.courseScore:eq(0)').show();
	   		}
	    }
    });
}
