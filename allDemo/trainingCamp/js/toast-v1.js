/**
 * js在head 添加样式
 * @param cssText
 */
function addCSS(cssText) {
	var style = document.createElement('style'), // 创建一个style元素
	head = document.head || document.getElementsByTagName('head')[0]; // 获取head元素
	style.type = 'text/css'; // 这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用
	if (style.styleSheet) { // IE
		var func = function() {
			try { // 防止IE中stylesheet数量超过限制而发生错误
				style.styleSheet.cssText = cssText;
			} catch (e) {

			}
		}
		// 如果当前styleSheet还不能用，则放到异步中则行
		if (style.styleSheet.disabled) {
			setTimeout(func, 10);
		} else {
			func();
		}
	} else { // w3c
		// w3c浏览器中只要创建文本节点插入到style元素中就行了
		var textNode = document.createTextNode(cssText);
		style.appendChild(textNode);
	}
	head.appendChild(style); // 把创建的style元素插入到head中
}
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
//---------------------------------toast-------------------------------

var toast_timer_show_time = 2*1000;//提示消息显示时间长度

// 添加 toast 样式内容
addCSS('.cuowu {  width: 100%; max-width:540px; height: 100%;  position: fixed;  z-index: 99999999;    top: 0; } .cuowu > div {  position: absolute;  width: 62%;  left: 50%;  margin-left: -31%;  background: rgba(0, 0, 0, 0.5);  margin-top: -1.78666667rem;  padding: 0.61333333rem 0;  top: 50%;  border-radius: 6px; } .cuowu > div span {  display: block;  text-align: center;  color: #fff;  line-height: 0.48rem;  margin-top: 0.21333333rem;  font-size: 15px; } .cuowu > div img {  display: block;  width: 1.06666667rem;  height: 1.09333333rem;  margin: 0 auto; } .cuowu .cw2 {  padding: 0.42666667rem 0.26666667rem;  line-height: 10px; } .load { width: 100%; height: 100%; position: fixed; left: 0; top: 0;z-index: 99999999; } .load .loading { width: 1.16rem; height: 1.16rem; position: relative; top: 50%; margin: -0.58rem auto 0 auto; background: url(/res/img/load-miao.png) no-repeat center center; background-size: 0.66666667rem; } .load .loadbg { width: 1.16rem; height: 1.16rem; background: url(/res/img/loadbg.png) no-repeat center center; background-size: 1.16rem 1.13333333rem; animation: rotate 1s linear infinite; -webkit-animation: rotate 1s linear infinite; -moz-animation: rotate 1s linear infinite; -o-animation: rotate 1s linear infinite; }@keyframes rotate { 0% {  transform: rotate(0deg);  -webkit-transform: rotate(0deg);  -moz-transform: rotate(0deg);  -o-transform: rotate(0deg); } 100% {  transform: rotate(360deg);  -webkit-transform: rotate(360deg);  -moz-transform: rotate(360deg);  -o-transform: rotate(360deg); }}@-webkit-keyframes rotate { 0% {  transform: rotate(0deg);  -webkit-transform: rotate(0deg);  -moz-transform: rotate(0deg);  -o-transform: rotate(0deg); } 100% {  transform: rotate(360deg);  -webkit-transform: rotate(360deg);  -moz-transform: rotate(360deg);  -o-transform: rotate(360deg); }}@-moz-keyframes rotate { 0% {  transform: rotate(0deg);  -webkit-transform: rotate(0deg);  -moz-transform: rotate(0deg);  -o-transform: rotate(0deg); } 100% {  transform: rotate(360deg);  -webkit-transform: rotate(360deg);  -moz-transform: rotate(360deg);  -o-transform: rotate(360deg); }}@-o-keyframes rotate { 0% {  transform: rotate(0deg);  -webkit-transform: rotate(0deg);  -moz-transform: rotate(0deg);  -o-transform: rotate(0deg); } 100% {  transform: rotate(360deg);  -webkit-transform: rotate(360deg);  -moz-transform: rotate(360deg);  -o-transform: rotate(360deg); }}');
/***
 * 创建div元素并添加类样式
 * @param _className
 * @returns {___anonymous5333_5340}
 */
function createDivAddClassName(_className) {
	var _div = document.createElement("div");
	_div.className = _className;
	return _div;
}
/***
 * 消息提示Base函数
 * @param txtNode
 * @param _src
 * @param noImg
 */
function _tips(txtNode, _src, noImg,fn,stime) {
	var body = this.document.body
			|| this.document.getElementsByTagName('body')[0];
	
	var _divs = document.getElementsByClassName('cuowu');
	if(_divs.length==0){
		
		var _div=createDivAddClassName('cuowu');
		var _div2 = createDivAddClassName('cw cw2');
		//判断是否显示图片
		if (noImg != 'yes') {
			var img = document.createElement("img");
			img.src = _src;
		}
		var span = document.createElement("span");
		
		var txt = document.createTextNode(txtNode);
		
		span.appendChild(txt);
		//判断是否显示图片
		if (noImg != 'yes') {
			_div2.appendChild(img);
		}
		_div2.appendChild(span);
		_div.appendChild(_div2);
		body.appendChild(_div);
	}else{
		var _div=_divs[0];
		var _div2=_div.getElementsByTagName('div')[0];
		var _span=_div.getElementsByTagName('span')[0];
		var _imgs=_div.getElementsByTagName('img');
		var _img;
		//判断是否显示图片
		if (noImg != 'yes') {
			if(_imgs.length==0){
				_img = document.createElement("img");
			}else{
				_img=_imgs[0];
			}
			_img.src = _src;
		}
		//判断是否显示图片
		if (noImg != 'yes') {
			_span.parentNode.removeChild(_span);
			_span = document.createElement("span");
			var txt = document.createTextNode(txtNode);
			_span.appendChild(txt);
			_div2.appendChild(_img);
			_div2.appendChild(_span);
		}else{
			if(_imgs.length!=0){
				_img=_imgs[0];
				_img.parentNode.removeChild(_img);
			}
			_span.innerHTML=txtNode;
		}
		_div.style.display = 'block';
	}
	if(stime){
		toast_timer_show_time = stime;
	}
	//延时隐藏消息提示
	setTimeout(function() {
		_div.style.display = 'none';
		if ("function" == typeof fn) {
			fn();
		}
	}, toast_timer_show_time);
}
function toast(txtNode,fn) {
	_tips(txtNode, null, 'yes',fn,null);
}
function toast(txtNode,fn,showtime) {
	_tips(txtNode, null, 'yes',fn,showtime);
}
function _errorTips(txtNode) {
	_tips(txtNode, '/res/img/iconfont-cuowutishi@1x.png');
}
function _warningTips(txtNode) {
	_tips(txtNode, '/res/img/iconfont-iconfontcolor100-copy@1x.png');
}
function _successTips(txtNode) {
	_tips(txtNode, '/res/img/iconfont-success@1x.png');
}
//---------waiting---------------
function toastWaiting() {
	var _load = document.getElementById('loadingwrapdiv');
	if(_load!=undefined){
		_load.style.display = 'block';
	}else{
		var _body = this.document.body
		|| this.document.getElementsByTagName('body')[0];
		_load = createDivAddClassName('load');
		_load.id = 'loadingwrapdiv';
		var _loading = createDivAddClassName('loading');
		var _loadbg = createDivAddClassName("loadbg");
		_load.appendChild(_loading);
		_loading.appendChild(_loadbg);
		_body.appendChild(_load);
	}
}

function toastWaitingColse() {
	var _load = document.getElementById('loadingwrapdiv');
	if(_load){
		_load.style.display = 'none';
	}
}