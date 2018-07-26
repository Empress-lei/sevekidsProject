/**
 * 本js初衷是为了方便jsp界面时间格式化问题而创建；
 * 且需要配合 common.js&jquery.js 使用
 * 
 * @author qiu_zhongqiang
 */
$(function(){
	//初始化页面时间
	let cts=$('.fmtDate');
	if(cts){
		for (let i = 0; i < cts.length; i++) {
			let ct=$(cts[i]);
			ct.text(fmtDate(new Date(ct.text()*1000)));
		}
	}
	//初始化页面时长
	let fdfms=$('.fmtDate_mmFssM');
	if(fdfms){
		for (let i = 0; i < fdfms.length; i++) {
			let fd=$(fdfms[i]);
			let obj=getDateObject(fd.text());
			fd.text((obj.mm?parseInt(obj.mm)+'分':'') + (obj.ss?obj.ss+'秒':''));
		}
	}
})