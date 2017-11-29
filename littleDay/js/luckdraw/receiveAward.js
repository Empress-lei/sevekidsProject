 var activityId="e5c644a6edc946728b4a504cd1740cf9";
 var activityName="暗战";
 var type="线下活动20161210";
$(function(){
	try{
		//--先查看中奖纪录，有值再去领奖，执行领奖的ajax
		HH.ajax({
    		url:"/yzmm/account/luckDraw/recordAward",
    		data:{awardTimeIsNull:true,pageSize:50,type:'WINNING',activityId:activityId},
    		callback:function(data,params){
    			if(data.success){
    				var prlint=$(".count");
    				
    				var ext=JSON.parse(data.ext);
    				if(ext){
    					var list=ext.list;
    					if(list){
    						var values=JSON.parse(list);
    						prlint.html(null);
    						
    						//生成界面元素 ,领奖时间 写成 客户端当前时间
							var obj=values[0];
							$('<p>'+fmtSecond(new Date().getTime()/1000).substring(11,16)+'</p>').appendTo(prlint);
							$('<p>您成功领奖一次</p>').appendTo(prlint);
							//领取奖励
							HH.ajax({
					    		url:"/yzmm/account/luckDraw/receiveAward",
					    		data:{awardTimeIsNull:true,activityId:activityId},
					    		callback:function(data){
					    		}
							});
    					}
    				}else{
    					$('<p></p>').appendTo(prlint);
						$('<p>您未中奖或已领过奖品~</p>').appendTo(prlint);
    				}
    			}
    		}
    	})
		//---查看历史领奖记录
		HH.ajax({
    		url:"/yzmm/account/luckDraw/recordAward",
    		data:{awardTimeIsNull:false,pageSize:50},
    		callback:function(data,params){
    			if(data.success){
    				var prlint=$(".prizeRecodeList");
    				
    				var ext=JSON.parse(data.ext);
    				
    				var list=ext.list;
    				if(list){
	    				var values=JSON.parse(list);
	    				prlint.html(null);
	    				
	    				var group=new Array();
	    				group=groupList(values);
	    				//生成界面元素
	    				for (var int3 = 0; int3 < group.length; int3++) {
	    					var obj=group[int3];
	    					$("<li>"+obj.substring(0,5)+" 您领取了"+obj.substring(5,obj.length)+"次奖品</li>").appendTo(prlint);
	    				}
    				}
    			}
    		}
    	})
	}catch (e) {
	}
});
/**
 * 结果集 根据小时分组
 * @param group
 * @returns
 */
function groupList(values){
	var group=new Array();
	for (var int = 0; int < values.length; int++) {
		var luckdraw=values[int];
		if(luckdraw.awardTime!=undefined){
			var str=fmtSecond(luckdraw.awardTime);str=str.substring(0,str.length-6);
			var strT=fmtSecond(luckdraw.awardTime);strT=strT.substring(strT.length-8).substring(0,5);
			group.push(strT);
		}
	}
	
	var newgroup=new Array();//新容器
	
	for (var int2 = 0; int2 < group.length; int2++) {
		var obj =group[int2];
		
		if(!newgroup.contains(obj)){
			newgroup.push(obj+""+group.getIndsByVal(obj).length);
		}
	}
 
	return newgroup;
}