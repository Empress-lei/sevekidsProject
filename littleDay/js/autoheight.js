$.fn.autoHeight = function(){
	
	function autoHeight(elem){
		
		elem.scrollTop = 0; //防抖动
		elem.style.height = elem.scrollHeight + 'px';
	}
	
	this.each(function(){
		autoHeight(this);
		$(this).on('keyup', function(){
			autoHeight(this);
			var len = $(this).val().length;
			$(".textarea i").text(len);
		});
	});
 
}