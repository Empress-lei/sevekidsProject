Array.prototype.sub=function(start,end){
	var array=new Array();
	for(var si=start;si<end;si++){
		array.push(this[si]);
	}
	return array;
}
$(function(){
	HH.ajax({
		url:"/yzmm/account/homegloballabel/ajaxList",
		data:{pageSize:888,positionType:'MICRO_CLASS_CAMP'},
		callback:function(data,params){
			var container=$("#hotmeowask");
			var list=data;
			var hot = $(".hot");
			var len = list.length;
			var index = 0;
			while(index < len){
				var ent=list[index];
				var hhot = hot.clone();
				if(index<6){
					hhot.show();
				}
				container.append(hhot);
				var wky = hhot.children();
				if(index < len){
					//第一个
					var a = $(wky[0]);
					a.children("img").attr("src",ent.icon);
					a.attr('data-entid',ent.id);
					if(!ent.news){
						a.append('<img class="new" src="/../../../res/img/course/new.png">');
					}
					a.on('click',function(e){
						var entid=$(this).data('entid')
						HH.href("/yzmm/account/homegloballabel/globalLabelInfoDetail?id="+entid);
					});
				}
				index ++;
				if(index == len){
					$(wky[1]).remove();
					$(wky[2]).remove();
					break;
				}
				ent=list[index];
				if(index < len){
					//第二个
					var a = $(wky[1]);
					a.children("img").attr("src",ent.icon);
					a.attr('data-entid',ent.id);
					if(!ent.news){
						a.append('<img class="new" src="/../../../res/img/course/new.png">');
					}
					a.on('click',function(e){
						var entid=$(this).data('entid')
						HH.href("/yzmm/account/homegloballabel/globalLabelInfoDetail?id="+entid);
					});
				}
				index ++;
				if(index == len){
					$(wky[2]).remove();
					break;
				}
				ent=list[index];
				if(index < len){
					//第三个
					var a = $(wky[2]);
					a.children("img").attr("src",ent.icon);
					a.attr('data-entid',ent.id);
					if(!ent.news){
						a.append('<img class="new" src="/../../../res/img/course/new.png">');
					}
					a.on('click',function(e){
						var entid=$(this).data('entid')
						HH.href("/yzmm/account/homegloballabel/globalLabelInfoDetail?id="+entid);
					});
				}
				index ++;
			}
			hot.remove();
			container.after('<div style=" text-align: center; font-size: 0.35rem; margin-top: 0.2rem; border-top: 0.022rem solid rgba(217, 217, 217, 0.58); padding-top: 0.2rem;"><span id="hotmewaskbottom" style="cursor: pointer;color:#9E9E9E ">查看全部</span></div>');
			//加载全部热门喵问
			$('#hotmewaskbottom').on('click',function(){
				showHotmewask(container);
			});
		}
	})
})

var showHotmewask=function(container){
	if($('#hotmewaskbottom').html()=='查看全部'){
		var hots=container.find('.hot');
		hots.css('display','block');
		$('#hotmewaskbottom').html('收起');
	}else{
		var hots=container.find('.hot');
		for (var int = 2; int < hots.length; int++) {
			$(hots[int]).css('display','none');
		}
		$('#hotmewaskbottom').html('查看全部');
	}
}
