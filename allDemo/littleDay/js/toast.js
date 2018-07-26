//可视区的高度
function getViewHeight() {
	return document.documentElement.clientHeight || document.body.clientHeight;
}
// 可视区的高度
function getViewWidth() {
	return document.documentElement.clientWidth || document.body.clientWidth;
}
// 整个文档的高度
function getScrollHeight() {
	return document.documentElement.scrollHeight || document.body.scrollHeight;
}
// 滚动条高度
function getScreenTop() {
	return document.documentElement.scrollTop || document.body.scrollTop;
}
//---------waiting---------------
function toastWaiting(){
	 if(!$("#loadingwrapdiv").get(0)){
	    var html = ".loading{z-index:99;width: 100%;height:100%;position:fixed;left:0;top:0;background:rgba(0,0,0,0.3);width: 3rem;height: 1.4rem;border-radius:0.2rem;position: fixed;margin:-1.5rem 0 0 -1.5rem;left:50%;top:50%;z-index:100;} .loading img{width: 3rem;height: 1.4rem;} .mask2{z-index:99;width: 100%;height:100%;position:fixed;left:0;top:0;background:(0,0,0,0);}";
			var style = document.createElement('style');
			style.id = "toastWaiting";
			style.type="text/css";
			style.innerHTML = html;
		document.head.appendChild(style);
		 
		var h = '<div id="loadingwrapdiv" class="loading_wrap" style="display:none">'
		    + '<div class="loading"><img src="'
		    +'data:image/gif;base64,R0lGODlhLAGMAOZHAAAAAJ0YE0gKCQ4CAlUMCqwaFLscFmQODMgeFysGBnMRDjkHB48VEf///xwDBIETEOV1d+yXmOZ6e9ciGv319fz09Pzy8/vp6ts5N/vs7fK6u/vt7f76+uZ5euNiZPfX2OZ7fNgnIvrk5eiDhd5HSNcjHPzv7+JiY9kqJe+ur//9/f77+/vo6d1CQuZ4edozMPjd3t9QUdgpJO6rrNs2NfXKy/729uRrbO6lptgkHfK+v95LTP/+/t9TU/K/wPfY2ed/gfCxs+NjZdgmIfGys+d+gNchGNchGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphM2NiNDI3MS0yOTczLTRhM2MtOTFlOC0yODc5Njg1ZGZlMGIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkYzMEZCRjMxNzdDMTFFNkE1OUJCRDE2OUY4NTBDNDMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkYzMEZCRjIxNzdDMTFFNkE1OUJCRDE2OUY4NTBDNDMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpiZjg5ZDIxZC0xMmM3LTQzMjUtYmY2Yy00N2NhNDQ4MmMxNmEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6YTNjYjQyNzEtMjk3My00YTNjLTkxZTgtMjg3OTY4NWRmZTBiIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkECR4ARwAsAAAAACwBjAAAB/+AR4KDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/wADChxIsKDBgwgTKlzIsKHDhxAjSmRoxAimihP5VcRYaaPFjPk8fpwkEuQ9kSMjoTRZDyVHlStZynPJkabHQTRlxrPJs2dMne18Cu0JNOjQozmLqkPKtKRSdE2jbnx6TqpUquWsWsU6TutVruG8fuX1ElfZf2LHkkwZ6uZFtpn/3AJMG9WSXFBO7U7dlLcfXbWQfnoSvPauXsP7kEKoAIHm4sZHKbn8NPkwYkmV/SHd0OACTc6eI2NOypf06MyFCYdESqGBBZqtXyM9jfpt7cA2O5rWxzRCgwg0fQOfDTN3XOOpbzfiqRnpBAwTaD6PTvyRUJyisTOnjZyoIJ9+rUrIkEGCV9x/ATtKPzS8VBsNGpg4b519Xe72lbfUKiG+ea3o5ZddgAKqZo9Y8YlVX4EDrsfgbid5lSB9yz3YICMWQrgfUjf04NGEFZHgQglNOZgheASeCNeGQ+3QAAdCVORBfCBUFEMFDZxQYoUqbrdgjyvSw5QMMDSgQgozrBAf/w9E4MBBAyy8sCOGQCJnIpCJMUXDB/HF90MNXTYgQgv3UVmlfomcGeQ8UQ3RgQY+ABFCDm/qMAIK6iGiJpp6npnlnpcdAmhfPGIJ1qGIJqrooow26uijkEYq6aSUVmrppZhmqummnHbqaSgIGIBAJAYw8EABozJigKiIrOrqqoqEmmqoBiQia6umBlDrp44EAIAAjiBAwAAAFFtsAgXESmwCiCRgrLEDJEBAsoUQAAADgvgKQACIKADAAYUgIACxzybALa+L+AosIwU4AIADBDzAwAELFKtAIg8YS20hzgpAwL8CJEDuvYRYi+0R2jqQaiHegjuIAe7CK68C9QJAMP+6iKirKrEEGBIAsQ4b4uwB3x7i7L6DMEDsuoIYnK2xHRvS8MMge0zswRh7/CsjApR8iAEDDLArIQUAsAACQZsMAMqDIODuvi4jbLSzOA8ysyA9X1wIAwAwm7POLCNS9AALG0Jy2C0D8MARURNyMiL5LjBI1OoaAADZDPtctMKJuDv01y+jbbbFsd4dbtCjFi03v0snQmyqdO/s7eJW+0yy1oYUwMDfgGusSL3n9g3A3/nGfITfjDNNSL3URr5uvWtX7nDPoQPe686KoP75tqs3LsjVg7yNSNSuCwK00LILorvttwteCLGMtG23A4TYPUDqiZAce/GC5Ov1EVdDX8j/AgmUb37VneMuOueGgD7I5eNf67bvh9Ce9sGeY004+D4vL0gCDgigA4gVO+blDxH2yx0AFgYyBTjQgT2j3BGEp7RdcU8QSGvc1RKICO0xL3CLgJ+tDCcIrj3rhKMLHv0OB4C5yU9qaPOVwq4mwg6q7YMwXMTYylYtAJgOdgUIohALYK2LUbAQJDPdBV1IgKvtMHs3/OABh+dDsd0tVdazIvX+t8JB+Apv9wNhuNxVr5BZK2SDK6DtpniIDB6tEPmK4hFIhkbGneuIRzCAteTIthey8QhFK1bI3MjDIzDAXWpM3wAWwMhGNrKABqjXIg+gAAG4awBVe1oivLUuZzlSkGDFckDt+og/9SFRkNWT5AKaeABLFksA7MuZtlAIM4Y5C1qwJATXvtfGYo3qltCS1gMKuUTG1RF8wAylAFSHw0gUIACFDMYzUdXMalrzmtjMpja3yc1uevOb4AynOMdJznKa85zoTKc618nOdrrznfCMpzznSc962vOe+MynPvfJz376858ADahAB0rQggokEAAh+QQJHgBHACwAAAAALAGMAAAH/4BHgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAMKHEiwoMGDCBMqXMiwocOHECNKnKjLiBFMFinus5ixEseLGvF9BDlpZEh7I0lGSnmSXsqOK1m2jPeyY82Pg2rOhHezp0+ZO9n9HOozqFCiSHUaTZe0qcml55xK5QjV3NSpVcldvZpV3FasXY/BpPQVLK6xANGCwkm2rNRMav8xUhXINtRTSW7fyo3rsa4/oJ4AP8prtq1fS4L5vfy0GC9SCBUg1IQsGemlxogT67vZiXNMohsaXKgZerTlvphLKu3Xk5PnwUkpNLBQUzbtpKhTf9YssjXc146aRmgQoebw4rgNr4bkW/HPnKehN2/UdAKGCTWtY0/uuKgg70eeOydcmNFWCRkySPiqmrz4je71Br9qo0EDE+y7xweeb79T2FdJYN96W7Xnn273HNgUgFfZV5Z+Ct7VX4TRLVKWg/kxRyGC9WxI1HxJ3dDDRxhaRIILJfynoYeHocQieBYmtUMDHAhhkQf2gWBRDLKdoCKDL8L3In+JNCUDDA2okML/DCvYx0MQOHDQAAsv/AjikEIOyeEhTtHwgX32/VADmA2I0IJ8Vwa5mZbLKSJVCCBo4EMRIeTQgQY6jIBCeeaxmSWbLSIC6JZF+hnWoYgmquiijDbq6KOQRirppJRWaumlmGaq6aacduopIggYgEAkBjDwQAGjMmKAqIis6uqqioSaaqgGJCJrq6YGUOunjQQAgACOIEDAAAAUW2wCBcRKbAKIJGCssQMkQECyhRAAAAOC+ApAAIgoAMABhSAgALHPJsAtr4r4CiwjBTgAgAMEPMDAAQsUq0AiDxhLbSHOCkDAvwIkQO69hFiL7RHaOpBqId6CO4gB7sIrrwL1AkAw/7qHqKsqsQQYEgCxDhvi7AHfHuLsvoMwQOy6ghicrbEdG9LwwyB7TOzBGBei8SIClHyIAQMMsCshBQCwAAJBmwwAyoMg4O6+LiNstLM4DzKzID1fXAgDADCbs86/LlL0AAsbQjLLg1j7wBFRE3IyIvkukPa1LwtgAABkM+xz0Qon4u7QX0uN9iEka20IAniHG/SoRcvN79KJEJtq1Bp767jVPheuSAEMAP71zonUe67fAACeb8xH/P0404TUSy3lYR9R79qYO9zz6IH3GjvpnhsieuuQC3L1IG8jEjXs6wItdO2CqJ67I6AjQiwjbd/tACF3D7B6IiTTjvwg+Xp9xP/V0xeyQALop1/157sj4nzo2w6iOfBVF3/I7S3TLTghWQvv8/uCSIADBugAYtEud9G7X/wU4a6FgUwBEIRgzy53BPuJrHT5O1j0kAa5q+GPewA4YOASaDaLxSpxguDas1aIwQAG73DlY5v+EugrhV1tfojo3vP2tzm8la1aAEDd7ApAxCIWwFoXsyAhSIa67wGRAFcb2w+XGMIdktAQ1kJdIaQoiOwhgm/EeyEhfJW3DNbtcO6qV8isFbISipB9gzsEB49WiHxVURAka+PjzqVEA1jrjmbk4RaNFbI5TpEB7npjzsi4gEY60pEHNEC9BrCAAyhAAO4aQNWelghvrcuQWY8UWLEcgDsZarB9VPRZFye5ACgeAJPFspsVWbhCLY7PWdCSZcq6dkIAjAqX0JLWA6boRKXp8ZYrdIAAWLfDSBQgAFMMxjNR1cxqWvOa2MymNrfJzW5685vgDKc4x0nOcprznOhMpzrXyc52uvOd8IynPOdJz3ra8574zKc+98nPfvrznwANqEAHStCCCiQQACH5BAUeAEcALAAAAAAsAYwAAAf/gEeCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/v8AAwocSLCgwYMIEypcyLChw4cQI0qciM+IEUwWKe6zmLESx4saK370ODJkvY8dJaEEaVLeypSQXrZ0+RJkzZJHas6Ed7Onz5U73f0c6jMoO6JIbxpVl7QpyqXonErlCNXc1KlVyV29mlXcVqxdE8HcNfbRV7AAy37COUmtJ7aO/86i/Qf3bV2zVEU9jSnXaUCgoACr3LuWcKO+c/nJtGuYb2NNi+MihVABQk3KlpHS1clJaSTPm0AzSrqhwYWapU9r9tezM2fHkTOJVtSUQgMLNW3jTsq6tezZh31jBI6oaYQGEWoeT85b8c9BzaEXxTs952rpwmknnYBhQk3u3qPrQ7wVNvmmwadKyJBBwlfn5/1Sjy9e7FUbDRqYeL+RPvr5/g012lYS5OdeeeMFWJ92ChI14Fb5ndVfgw6mR+FzDF4VIX/5XFjhgx5md4hTN/Tw0YYWkeBCCfKJFKKI9r1IHCFN7dAABx5Y5EF+IFgUg20ntHiPjDAWR+RrRiIlA/8MDaiQwgwr5MdDEDhw0AALLwhpz5FIZshlXjEiRcMH+eX3QQ1lNiBCC1Il+OVdI74JJ3ZJDdGBBj4AEUIOd+owAgqJnSQnmIsMSmichoal6KKMNuroo5BGKumklFZq6aWYZqrpppx26umnoIaKCAIGIBCJAQw8UICpjBhQKiKuxuqqIqSySqoBidQKa6oB4CpqIwEAIIAjCBAwAADIIptAAbQemwAiCSSb7AAJEMBsIQQAwIAgwQIQACIKAHBAIQgIcKy0CXz7qyLBDstIAQ4A4AABDzBwwALIKpDIA8leW0i0AhAgsAAJnKsvIdlue0S3DrBaSLjjDmJAvPPWqwD/vgAcvO4h7bZ6LAGGBHBsxIZEe4C4h0Tr7yAMHOuuIAlzmyzIhkAs8cghH6vwxoV0vIgAKB9iwAAD+EpIAQAsgADRKQOw8iAIxOtvzAsnHe3Og9gsCNAaF8IAAM/y3LOwiyA9gMOGnPzyINk+cATVhKiMCL8LsK2tzAIYAMDZDweNdMOJxGu02FWvfcjJXRuCwN7kEm0q0nX/63Qix7JKdcfhRp510IgrUgADg4vtcyL4qhs4AIPzS/MRgkv+NCH4Xns52Ufg6/bmEQNtOuHA0n566IaUDvvkgmg9iNyIUD27u0MXjbsgrfPuyOiIHMsI3Ho7QIjeA7ieyMm3Lz8I/79hH6G19YUskMD67GMtuu+IRE+6t4N0PjzWyB+iO8x3F04I18ULmvwEkQAHGNABx7od76inP/opIl4OG5kCJjhBoGnuCPkrGer4pzDqLW1yWtvf9wCgQMIxMG0ZoxXjBPE1ablwgwQknuLQ97b+MTBYDdOa/RABPun5z3N7Qxu2ALA62xXgiEgsQLY0lkFCnGx14hsiAbRmNiE6kYQ+PKEhsrW6QlRRENxDxN+OJ0NCBItvHMSb4uKFL5Jli2QoLOH7DHeIDyqtEPzCoiBOBkfJqauJBsiWHtP4Qy8mi2R2tCID4iVHnp1xAZCMZCQVaAB8DWABB1CAAOI1AKxJLZUR4XJXtCRZMGQ5YHc17CD8rhg0MFpyAVM8wCaRlbcsvtCFXTRftKZVS5aBTYUAMNUup1WtB1gxik3roy5d6AABvM6HkShAAKwYDGmuCprYzKY2t8nNbnrzm+AMpzjHSc5ymvOc6EynOtfJzna6853wjKc850nPetrznvjMpz73yc9++vOfAA2oQAdK0IIa9KAIFUggAAA7'
			+'"/></div>'
		    +'<div class="mask2"></div>'
		    +'</div>';
		$("body").append(h);
	 }
	 $("#loadingwrapdiv").show();
}

function toastWaitingColse(){
	 $("#loadingwrapdiv").hide();
}

//----------toast--------
var toast_timer_show_time = 2*1000;
var toast_show = false;
function toast(html, fn, waiting) {
	toast_show = true;
	inittoast();
	
	var oMark = document.getElementById('mark');
	var oDiv = document.getElementById('dialog');
	if(!oMark){
		oMark = document.createElement('div');
		oMark.id = 'mark';
		oDiv = document.createElement('div');
		oDiv.id = 'dialog';
		document.body.appendChild(oMark);
		document.body.appendChild(oDiv);
	}
	
	//oDiv.style.top = (getViewHeight()-oDiv.offsetHeight)/2 + getScreenTop() +'px';
	oDiv.innerHTML = html;
	oMark.style.display="block";
	oDiv.style.display="block";
	if(!waiting){
		var timer = null;
		timer = setTimeout(function() {
			oMark.style.display="none";
			oDiv.style.display="none";
			toast_show = false;
			if ("function" == typeof fn) {
				fn();
			}
		}, toast_timer_show_time);
	}else{
		var timer = null;
		timer = setTimeout(function() {
			if ("function" == typeof fn) {
				fn();
			}
		}, toast_timer_show_time);
		toast_show = false;
	}
}
function inittoast(){
	var toaststyle = document.getElementById('toaststyle');
	if(!toaststyle){
		var html = "#dialog{min-width:60%;height:32px;padding:0 5px; margin:auto; background:#000;opacity:0.65; color:#fff; line-height:32px; text-align:center;  border-radius:5px; overflow:hidden; z-index:999; position: fixed; bottom: 65%; margin-left: 20%;} #mark{width:100%;height:100%;position:absolute;left:0px;top:0px;z-index:995;}";
		var style = document.createElement('style');
		style.id = "toaststyle";
		style.type="text/css";
		style.innerHTML = html;
		document.head.appendChild(style);
	}
}
