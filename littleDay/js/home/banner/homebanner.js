$(document).ready(function(){
	//容器
	var container=$(".swiper-wrapper");
	
	//bannerList 为空则不执行以下代码
	if(bannerList=='[]'){
		$(".swiper-wrapper").hide();
		return;
	}
	
	///----------- 调整 banner 部分样式 
	tzheight();
	
	//防止手机出现 banner 样式冲突
	var timer = null;
	
	var i=0;//
	timer = setInterval(function() {
		//防止图片加载的高度高于500而导致的定时器 不停止; 定时器最多跑10次
		i++;
		if(i>10){
			clearInterval(timer);
		}
		
		var h=container.height();
		var imgs=$('.swiper-wrapper img');
		var zgheight=getImgHighest(imgs);
		if(h>zgheight){
			tzheight();
		}else{
			clearInterval(timer);
		}
	}, 500);
	///-----------
	
	//滑动插件
	var mySwiper = new Swiper('.swiper-container', {
		autoplay: 5000,
		pagination: '.swiper-pagination'
	});
	/**
	 * 调整 banner 部分样式
	 */
	function tzheight(){
		var imgs=$('.swiper-wrapper img'); var swsl=$('.swiper-slide');
		//获取图片最高高度
		var zgheight=getImgHighest(imgs)+"px";
		swsl.height(zgheight);
		container.height(zgheight);
	}
	/**
	 * 获取图片最高高度
	 * imgs 图片数组
	 */
	function getImgHighest(imgs) {
		var zgheight=0;
		try{
			if(imgs.length!=0){
				zgheight = imgs[0].height;//获取第一个图片高度
				for (var int = 0; int < imgs.length; int++) {
					var height = imgs[int].height;
					try {
						var dbheight = imgs[int + 1];
						if (dbheight > height) {
							zgheight = dbheight;
						}
					} catch (err) {
					}
				}
			}
		}catch(err){
		}
		//如果没有高度添加默认高度，||前提是 有图片||
		if(zgheight==0){
			zgheight=436;
		}
		return zgheight;
	}
})