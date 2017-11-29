
/**
* 给js中的浮点型数值补零，加千分位符号(例如："3124" 自动转换成"3,124.00")
* @param amount{float} 需要转换的数值
*/
function fmtMoney(amount){
	if(null==fmtMoney||""==fmtMoney){
		return "";
	}
	// 补零
	var amountString = amount+"";
	if(amountString.indexOf(".")==-1){
		amountString = amountString+".00";
	}else if(amountString.indexOf(".")==amountString.length-2){
		amountString = amountString+"0";
	}
	
	//加千分符 
	var intAmount =  "";
	var flag = "";
	if(parseFloat(amountString )<0){
		flag = amountString .substring(0,1);
		intAmount = amountString.substring(1,amountString.indexOf("."));
	}else{
		intAmount = amountString.substring(0,amountString.indexOf("."));
	}
	var pointAmount = amountString.substring(amountString.indexOf("."));
	if(0==intAmount.length){
		amountString  = flag+"0"+pointAmount;
	}else{
		amountString  = flag+comma(intAmount)+pointAmount;
	}
	
	return amountString;
}
/**
* 表现形式增加逗号，只对整数部分做处理
* @param {Integer} 需转换数值	
* @return {String} 转换后的字符串
*/
function comma(number) {
	number = '' + number;
	if (number.length > 3) {
		var mod = number.length % 3;
		var output = (mod > 0 ? (number.substring(0,mod)) : '');
		for (i=0 ; i < Math.floor(number.length / 3); i++) {
			if ((mod == 0) && (i == 0))
				output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
			else
				output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
		}
		return (output);
	}
	else return number;
}

/**
 * 取固定长度的字符串
 * @param str
 * @param count
 * @returns
 */
function cutoutChar(str,count,after){
	if(!str){
		return str;
	}
	var len = str.length;
	if(len<=count){
		return str;
	}else{
		return str.substr(0,count)+(after?after:"");
	}
	return str;
}

/**
 * 
 * @param date  YYYY-MM-DD HH:mm:ss
 * @returns  毫秒
 */
function getTime(date){
	var fmtd = trim(date);
	var fmt = /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
	if(!fmt.test(date)){
		return 0;
	}
	var _fmtd = fmtd.substr(0,4);
	fmtd = fmtd.substr(5,5)+"-"+_fmtd+" 23:59:59";
	fmtd = fmtd.replace(/-/g,"/");
	date =  Date.parse(fmtd);
	return date;
}
/**
 * YYYY-MM-DD HH:mm:ss
 * @param second 秒数
 */
function fmtSecond(second){
	return fmtDate(new Date(second*1000));
}
/**
 * 
 */
function fmtSecondyyyMMDD(second){
	return fmtDate(new Date(second*1000),"yyyy-MM-dd");
}

function fmtSecondyyyMMDDdot(second){
	return fmtDate(new Date(second*1000),"yyyy.MM.dd");
}
/**
 * 
 */
function fmtSecondMMDD(second){
	return fmtDate(new Date(second*1000),"MM-dd");
}

/**
 * YYYY-MM-DD HH:mm:ss
 * @param millis 毫秒数
 */
function fmtMillis(millis){
	return fmtDate(new Date(millis));
}

/**
 * 用于fmtDate的内部
 * @param fmt
 * @return
 */
function patternDate(fmt) {      
     var o = {        
    "M+" : this.getMonth()+1, //月份       
    "d+" : this.getDate(), //日       
    "h+" : this.getHours() == 0 ? 12 : this.getHours(), //小时       
    "H+" : this.getHours(), //小时       
    "m+" : this.getMinutes(), //分       
    "s+" : this.getSeconds(), //秒       
    "q+" : Math.floor((this.getMonth()+3)/3), //季度       
    "S" : this.getMilliseconds() //毫秒       
    };       
    if(/(y+)/.test(fmt)){       
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));       
    }       
  
    for(var k in o){       
    	 
        if(new RegExp("("+ k +")").test(fmt)){       
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
           
        }       
    }  
     return fmt;       
 }  


/**
 * YYYY-MM-DD HH:mm:ss
 * @param date 对象或规定格式的日期字符串
 * @param fmtString 格式化字符串
 * @return
 */
  function fmtDate(date,fmtString){
	  try{
		  if(!fmtString)fmtString = "yyyy-MM-dd HH:mm:ss";
			  
		  var _date = null;
		  if("string" == typeof(date)){
			  _date = new Date(date);
		  }else{
			  _date = date;
		  }
		  _date.patternDate = patternDate;
		return _date.patternDate(fmtString);
       }catch(e){
			return date;
       }
  }

/**
 * 去除两端空格
 * @param strValue
 * @returns
 */  
function trim(strValue)
  {
  	if(!strValue||strValue=='') return strValue;
  	while(strValue.substring(0,1)==' ')
  	{
  		strValue=strValue.substring(1);
  	}
  	if(strValue=='') return strValue;
  	while(strValue.substring(strValue.length-1,strValue.length)==' ')
  	{
  		strValue=strValue.substring(0,strValue.length-1);
  	}
  	return strValue;
  }

//为 String 类增加一个 trim 方法
String.prototype.trim = function()
{
    // 用正则表达式将前后空格用空字符串替代。
    return this.replace( /(^\s*)|(\s*$)/g, "" );
};
 

/**
*取得格式字符串  yyyy-MM-dd 
*/
function getDateFmtStrYMD(){
	   return  "yyyy-MM-dd";
  }
/**
 * 用于生成URL数据请求
 */
jQuery.fn.extend({
	paramsUrl: function() {
		var param="";
		var ipt = this.find(":text,:password,:file,input:hidden,select,textarea");
		ipt.each(function(){
			var thet = $(this);
			var name = thet.attr("name");
			if(!name){
				name = thet.attr("id");
			}
			if(!name){
				return true;
			}
			param+= "&"+name+"="+encodeURIComponent(thet.val());
		});
		var otr = this.find(":radio:checked,:checkbox:checked");
		otr.each(function(){
			var thet = $(this);
			var name = thet.attr("name");
			if(!name){
				name = thet.attr("id");
			}
			if(!name){
				return true;
			}
			param+= "&"+name+"="+encodeURIComponent(thet.val());
		});
		param = param.substr(1);
		return param.replace(/%20/g, "+");
	},
	paramsJosn: function() {
		var param="";
		var ipt = this.find(":text,:password,:file,input:hidden,select,textarea");
		ipt.each(function(){
			var thet = $(this);
			var name = thet.attr("name");
			if(!name){
				name = thet.attr("id");
			}
			if(!name){
				return true;
			}
			param+= ',"'+name+'":"'+thet.val()+'"';
		});
		var otr = this.find(":radio:checked,:checkbox:checked");
		otr.each(function(){
			var thet = $(this);
			var name = thet.attr("name");
			if(!name){
				name = thet.attr("id");
			}
			if(!name){
				return true;
			}
			param+= ',"'+name+'":"'+thet.val()+'"';
		});
			if(param){
				param = "{"+param.substr(1)+"}";
			}
			return param.replace(/%20/g, "+");
	},
	paramsObj: function() {
		var param={};
		var ipt = this.find(":text,:password,:file,input:hidden,select,textarea");
		ipt.each(function(){
			var thet = $(this);
			var name = thet.attr("name");
			if(!name){
				name = thet.attr("id");
			}
			if(!name){
				return true;
			}
			param[name] = thet.val();
		});
		var otr = this.find(":radio:checked,:checkbox:checked");
		otr.each(function(){
			var thet = $(this);
			var name = thet.attr("name");
			if(!name){
				name = thet.attr("id");
			}
			if(!name){
				return true;
			}
			param[name] = thet.val();
		});
		return param;
	}
});

//阻止冒泡
function getEvent() {
  if (document.all) {
      return window.event; //如果是ie
  }
  func = getEvent.caller;
  while (func != null) {
      var arg0 = func.arguments[0];
      if (arg0) {
          if ((arg0.constructor == Event || arg0.constructor == MouseEvent) || (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
              return arg0;
          }
      }
      func = func.caller;
  }
  return null;
}

function stopevt() {
	var ev = getEvent();
  if (ev.stopPropagation) {
      ev.stopPropagation();
  } else if (window.ev) {
      window.ev.cancelBubble = true;
  }
}
/**
 * 实现Java中 Array contains 方法
 */
Array.prototype.contains = function(str) {
	var length = this.length;
	for (var int = 0; int < length; int++) {
		var item = this[int];
		var itemId = item;
		if (undefined != itemId) {
			if (itemId.indexOf(str) >= 0) {
				return true;
			}
		}
	}
	return false;
}
/**
 * 值获取Array 索引数组
 */
Array.prototype.getIndsByVal = function(val) {
	var length = this.length;
	var inds=new Array();
	for (var int = 0; int < length; int++) {
		var item = this[int];
		var value = item;
		if (undefined != val) {
			if (value==val) {
				inds.push(int);
			}
		}
	}
	return inds;
}
/**
 * sub 截取<br>
 * 根据下标截取
 */
Array.prototype.sub = function(start,end) {
	if(start<0){
		start=0;
	}
	var length = this.length;
	if(end>length){
		end=length;
	}
	var vals=new Array();
	for (var int = start; int < end; int++) {
		var item = this[int];
		var value = item;
		vals.push(value);
	}
	return vals;
}
function utf16to8(str){
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;

}
/**
 * 根据秒获取 年月周日
 * @param time
 * @returns
 */
function getDateObject(time) {
	var dateObject = {};
	if (null != time) {
		// 年 365 * 24 * 60 * 60
		if (time >= 31536000) {
			dateObject.year = time / 31536000;
			time = time % 31536000;
		}
		// 月 30 * 24 * 60 * 60
		if (time >= 2592000) {
			dateObject.month = time / 2592000;
			time = time % 2592000;
		}
		//周 7 * 24 * 60 * 60
		if(time>=604800){
			dateObject.week=time/604800;
			time=time%604800;
		}
		// 天 24 * 60 * 60
		if (time >= 86400) {
			dateObject.day = time / 86400;
			time = time % 86400;
		}
		// 小时 60 * 60
		if (time >= 3600) {
			dateObject.hh = time / 3600;
			time = time % 3600;
		}
		// 分 60
		if (time >= 60) {
			dateObject.mm = time / 60;
			time = time % 60;
		}
		// 秒 1
		if (time >= 1) {
			dateObject.ss = time / 1;
			time = time % 1;
		}
	}
	return dateObject;
}
/**
 * 几岁几个月
 * @param age
 * @returns
 */
function ageYearMonth(age) {
	var sage ='';
	if (age.year > 0) {
		sage=parseInt(age.year)+"岁";
	}
	if (age.month > 0) {
		sage+=parseInt(age.month)+"个月";
	}
	if(sage.indexOf('岁')!=-1){
//		if (age.week > 0) {
//			sage+=parseInt(age.week)+"周";
//		}
	}else{
		if (age.week > 0) {
			sage+=parseInt(age.week)+"周";
		}
	}
	if(sage.indexOf('月')==-1&&sage.indexOf('岁')==-1){
		if (age.day > 0) {
			sage+=parseInt(age.day)+"天";
		}
	}
	if (age.year == 0 && age.month == 0) {
		if (age.day > 0 || age.hour > 0 || age.minute > 0 || age.second > 0) {
			sage=1+"个月";
		} else {
			sage=0+"岁";
		}
	}
	return sage;
}
/** 把秒数切换成 时分秒 */
function formatSeconds(value) {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    if(theTime > 60) {
        theTime1 = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
            if(theTime1 > 60) {
            theTime2 = parseInt(theTime1/60);
            theTime1 = parseInt(theTime1%60);
            }
    }
        var result = ""+parseInt(theTime)+"秒";
        if(theTime1 > 0) {
        result = ""+parseInt(theTime1)+"分"+result;
        }
        if(theTime2 > 0) {
        result = ""+parseInt(theTime2)+"小时"+result;
        }
    return result;
}
