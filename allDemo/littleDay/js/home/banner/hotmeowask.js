Array.prototype.sub=function(start,end){
	var array=new Array();
	for(var si=start;si<end;si++){
		array.push(this[si]);
	}
	return array;
}
$(function(){
	HH.ajax({
		url:"/yzmm/account/homegloballabel/hotMeowAsk",
		data:{pageSize:888},
		callback:function(data,params){
			var container=$("#hotmeowask");
			
			var obj=JSON.parse(data.ext);
			var list=obj.meowAsk.list;
			//标签为空 则不显示热门喵问
			if(!list){
				$('#hotmeowask').hide();
				return ;
			}
			$('#hotmeowask').show();
			
			
			var yu=(list.length%5>0?1:0);
			var len=parseInt(list.length/5)+yu;
			
			var start=0;
			var end=5;
			for(var i=0;i<=1;i++){
				var xlist=list.sub(start,end);
				loadHotmeoWask(xlist,container);
				start+=5;
				end+=5;
			}
			//解决小米手机不加载问题
			var hotaska=$('.hotask a').length;
			if(hotaska==0){
				var timer = null;
				timer = setInterval(function() {
					if($('.hotask a').length==0){
						for(var i=0;i<len;i++){
							loadHotmeoWask(list,container);
							start+=5;
							end+=5;
						}
					}else{
						clearInterval(timer);
					}
				}, 100);
			}
			$('<div style="text-align: center;font-size: 0.35rem;margin-top: 0.2rem;"><div style="font-size: 15px;border-bottom: 0.022rem solid rgba(217, 217, 217, 0.58);margin: 0.3rem 0 0.3rem 0;width: 100%;"></div><span id="hotmewaskbottom" style="cursor: pointer;color:#9E9E9E ">查看全部</span></div>').appendTo(container);
			//加载全部热门喵问
			$('#hotmewaskbottom').on('click',function(){
				showHotmewask(start,end,len,list,container);
			});
		}
	})
})

var showHotmewask=function(start,end,len,list,container){
	var index= 0;
	for(let i=1;i<len;i++){
		var xlist=list.sub(start,end);
		loadHotmeoWask(xlist,container);
		start+=5;
		end+=5;
		index++;
	}
	$('#hotmewaskbottom').parent().css('display','none');
	$("#hotmeowask").append('<div style="text-align: center;font-size: 0.35rem;margin-top: 0.2rem;"><div style="font-size: 15px;border-bottom: 0.022rem solid rgba(217, 217, 217, 0.58);margin: 0.3rem 0 0.3rem 0;width: 100%;"></div><span id="hotmewasklessbottom" style="cursor: pointer;color:#9E9E9E ">收起</span></div>'); 
	$('#hotmewasklessbottom').on('click',function(){
		$('#hotmewaskbottom').parent().css('display','block');
		for(let i=0;i<index;i++){
			$('#hotmewaskbottom').parent().next().remove();
		}
		$('#hotmewasklessbottom').parent().remove();
	});
}

/**
 * 加载 热门喵问
 * @param list
 * @param container
 */
function loadHotmeoWask(list,container){
	if(list==undefined){
		return ;
	}
	//----如果标签数量大于5个 随机去掉多余部分
	var deleteIndexs=new Array();
	
	var dyj=list.length-5;//多余几个
	if(dyj>0){
		for (var int = 0; int < dyj;) {
			var mathnum=Math.ceil(Math.random()*list.length);
			if(!deleteIndexs.contains(mathnum)){
				deleteIndexs.push(mathnum);
				int++;
			}
		}
		for (var int2 = 0; int2 < deleteIndexs.length; int2++) {
			list.remove(deleteIndexs[int2]);
		}
	}
	
	//-----------end
	
	var div=$('<div class="hotask"></div>').appendTo(container);
	for(var i=0;i<4;i++){
		var emp=list[i];
		if(emp==undefined){
			break;
		}
		var a1=$('<a href="javascript:void(0)"></a>').appendTo(div);
		var span=$('<span onclick="indexLabelSearch('+emp.id+',this)"><i style="background:url('+emp.icon+') center center no-repeat;background-size: 100% 100%;" ></i></span>'+emp.name+'</a>').appendTo(a1);
	}
}
function groupclick(ind){
	var index=ind+1;
	if(index>=groupNumArray.length){
		index=0;
	}
	var kdata={};
	//刷新 刷新按钮 href 值
	$('.refresh')[0].href='javascript:groupclick('+index+')';
	
	kdata.groupNum=groupNumArray[index];
	hotMeowAsk(kdata);
}
function indexLabelSearch(id,thet){
	var title = $(thet).parent().text();
	var url = "/yzmm/account/home/toLabelSearchGlobal?keyword="+title + "&type=INDEXLABELSEARCH"+"&labelId="+id;
	window.location = url;
	return ;
}
Array.prototype.contains=function(id){
	var length=this.length;
	for(var int=0;int<length;int++){
	var item=this[int];
	var itemId=item;
		if(undefined!=itemId){
			if(id==itemId){
			     return true;
			}
		}
	}
	return false;
}
Array.prototype.remove = function (dx) {  
    if (isNaN(dx) || dx > this.length) {  
        return false;  
    }  
    for (var i = 0, n = 0; i < this.length; i++) {  
        if (this[i] != this[dx]) {  
            this[n++] = this[i];  
        }  
    }  
    this.length -= 1;  
};