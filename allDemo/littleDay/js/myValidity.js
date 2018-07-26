Array.prototype.max = function()
{
	var i, max = this[0];
	
	for( i = 1; i < this.length; i++ )
	{
		if( max < this[i] )
		max = this[i];
	}
	
	return max;
};

// 为 String 类增加一个 trim 方法
String.prototype.trim = function()
{
    // 用正则表达式将前后空格用空字符串替代。
    return this.replace( /(^\s*)|(\s*$)/g, "" );
};

function getCheckLength(E) {
	var D = 0, _$ = 0;
	for (var i = 0; i < E.length; i++) {
		var B = E.substr(i, 1), A = escape(B);
		if (A.substring(0, 2) == "%u") {
			_$ += 3;
			_$ += D;
			D = 0;
		} else if (A.substring(0, 3) == "%0D")
			D += 1;
		else if (A.substring(0, 3) == "%0A")
			D += 1;
		else if (A.substring(0, 3) == "%20")
			D += 1;
		else {
			_$ += 1;
			_$ += D;
			D = 0;
		}
	}
	return _$;
}

//匹配正则表达式
function checkExp(re,s){
	return re.test(s); 
}

// 验证是否 字母数字
function isAlphaNumeric( strValue,boxObj)
{
	// 只能是 A-Z a-z 0-9 之间的字母数字 或者为空
	return checkExp( /^\w*$/gi, strValue );
}

// 验证是否 日期
function isDate( strValue,boxObj )
{
	// 日期格式必须是 2001-10-1/2001-1-10

	if( !checkExp( /^\d{4}-[01]?\d-[0-3]?\d$/, strValue ) ) 
	{
		return false;
	}
	// 或者 /^\d{4}-[1-12]-[1-31]\d$/
	
	var arr = strValue.split( "-" );
	var year = arr[0];
	var month = arr[1];
	var day = arr[2];
	
	if(year<1900||year>2060)
	{
		return false;
	}

	// 1 <= 月份 <= 12，1 <= 日期 <= 31
	if( !( ( 1<= month ) && ( 12 >= month ) && ( 31 >= day ) && ( 1 <= day ) ) )
	{
		return false;
	}
		
	// 润年检查
	if( !( ( year % 4 ) == 0 ) && ( month == 2) && ( day == 29 ) )
	{
		return false;
	}
	
	// 7月以前的双月每月不超过30天
	if( ( month <= 7 ) && ( ( month % 2 ) == 0 ) && ( day >= 31 ) )
	{
		return false;
	}
	
	// 8月以后的单月每月不超过30天
	if( ( month >= 8) && ( ( month % 2 ) == 1) && ( day >= 31 ) )
	{
		return false;
	}
	
	// 2月最多29天
	if( ( month == 2) && ( day >=30 ) )
	{
		return false;
	}
	
	return true;
}

// 验证是否 日期
function isShortDate( strValue,boxObj )
{
	var DATETIME = strValue;
	if( !checkExp(/^\d{4}-[01]?\d/g,DATETIME) )
	{
		return false;
	}

	var arr = DATETIME.split( "-" );
	var year = arr[0];
	var month = arr[1];
	if(year<1753)
	{
		return false;
	}

	if(arr.length==3)
	{
	   return false;
	}
	if( !((1<= month ) && ( 12 >= month )))
	{
		return false;				
	}
	
	return true;
}

// 验证是否 Email
function isEmail( strValue,boxObj )
{
	// Email 必须是 x@a.b.c.d 等格式
	
	//return checkExp( /^\w+@(\w+\.)+\w+$/gi, strValue );	//2001.12.24测试出错 检查 jxj-xxx@114online.com时不能通过
	//Modify By Tianjincat 2001.12.24
	var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
	return checkExp( pattern, strValue );
	
}

// 验证是否 数字
function isNumeric( strValue,boxObj )
{
	// 数字必须是 0123456789
	if( !checkExp( /^[+-]?\d+(\.\d+)?$/g, strValue ))
	{
		return false;
	}
	return true;
}

// 验证是否 货币
function isMoney( strValue,boxObj )
{
	// 货币必须是 -12,345,678.9 等格式
	
	return checkExp( /^[+-]?\d+(,\d{3})*(\.\d+)?$/g, strValue );
}

// 验证是否 电话
function isPhone( strValue,boxObj )
{
	// 普通电话	(0755)4477377-3301/(86755)6645798-665
	// Call 机	95952-351
	// 手机		130/131/135/136/137/138/13912345678
	
	return checkExp( /(^\(\d{3,5}\)\d{6,8}(-\d{2,8})?$)|(^\d+-\d+$)|(^\d{11}$)/g, strValue );
}

// 验证是否 邮政编码
function isPostalCode( strValue,boxObj )
{
	// 邮政编码必须是6位数字
	if(!checkExp( /(^$)|(^\d{6}$)/gi, strValue ))
	{
		return false;
	}
	return true;
}

// 验证是否 URL
function isURL( strValue,boxObj )
{
	// http://www.yysoft.com/ssj/default.asp?Type=1&ArticleID=789
	
	var pattern = /^(http|https|ftp):\/\/(\w+\.)+[a-z]{2,3}(\/\w+)*(\/\w+\.\w+)*(\?\w+=\w*(&\w+=\w*)*)*/gi;
	// var pattern = /^(http|https|ftp):(\/\/|\\\\)(\w+\.)+(net|com|cn|org|cc|tv|[0-9]{1,3})((\/|\\)[~]?(\w+(\.|\,)?\w\/)*([?]\w+[=])*\w+(\&\w+[=]\w+)*)*$/gi;
	// var pattern = ((http|https|ftp):(\/\/|\\\\)((\w)+[.]){1,}(net|com|cn|org|cc|tv|[0-9]{1,3})(((\/[\~]*|\\[\~]*)(\w)+)|[.](\w)+)*(((([?](\w)+){1}[=]*))*((\w)+){1}([\&](\w)+[\=](\w)+)*)*)/gi;

	return checkExp( pattern, strValue );
	
}
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

function isNotEmpty( strValue,boxObj )
{
	strValue=trim(strValue);
	if( !strValue||strValue == '' )
		return false;
	else
		return true;
}

function isEmpty( strValue,boxObj )
{
	strValue=trim(strValue);
	if( strValue == "" )
		return true;
	else
		return false;
}
function isInteger(_) {
	var $ = RegExp(/^[0-9]+$/);
	return ($.test(_));
}
function isFloat(_) {
	var $ = RegExp(/^([0-9]+(\.+))[0-9]+$/);
	return ($.test(_));
}
function isDecimal(_) {
	var $ = RegExp(/^([0-9]+(\.?))?[0-9]+$/);
	return ($.test(_));
}
function isIntChar(_) {
	var $ = RegExp(/^[a-zA-Z0-9]+$/);
	return ($.test(_));
}
function isIntCharSpecial(_) {
	var $ = RegExp(/^[a-zA-Z0-9(\|)(\_)(\-)(\*)(\&)(\%)(\$)(\#)(\@)(\!)(\~)(\^)(\()(\))]+$/);
	return ($.test(_));
}
function containIntChar(_) {
	var $ = RegExp(/[a-zA-Z0-9]+/);
	return ($.test(_));
}
function containSpecial(_) {
	var $ = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
	return ($.test(_));
}

function checkLength(E, C) {
	var D = E.value, $ = 0;
	for (var i = 0; i < D.length; i++) {
		var B = D.substr(i, 1), A = escape(B);
		if (A.substring(0, 2) == "%u")
			$ += 3;
		else
			$ += 1;
	}
	if (C >= $)
		return true;
	else {
		var _ = Math.floor(C / 3);
		alert("\u8be5\u8f93\u5165\u9879\u63d2\u5165\u503c\u8fc7\u957f\uff01\u6700\u591a"
				+ C
				+ "\u4e2a\u5b57\u7b26\u6216"
				+ _
				+ "\u4e2a\u6c49\u5b57\u3002");
		//E.value = "";
		//E.focus();
		return false;
	}
}

function checkAreaLength(F, C) {
	var E = F.value, D = 0, $ = 0;
	for (var i = 0; i < E.length; i++) {
		var B = E.substr(i, 1), A = escape(B);
		if (A.substring(0, 2) == "%u") {
			$ += 3;
			$ += D;
			D = 0;
		} else if (A.substring(0, 3) == "%0D")
			D += 1;
		else if (A.substring(0, 3) == "%0A")
			D += 1;
		else if (A.substring(0, 3) == "%20")
			D += 1;
		else {
			$ += 1;
			$ += D;
			D = 0;
		}
	}
	if ($ > C) {
		var _ = Math.floor(C / 3);
		alert("\u8be5\u8f93\u5165\u9879\u63d2\u5165\u503c\u8fc7\u957f\uff01\u6700\u591a"
				+ C
				+ "\u4e2a\u5b57\u7b26\u6216"
				+ _
				+ "\u4e2a\u6c49\u5b57\u3002");
		//F.value = "";
		//F.focus();
		return false;
	}
	return true;
}
/**
 * 获取指定秒数与当前时间相差时间 格式：dd天hh小时mm分
 * @param second
 * @returns
 */
function timer(second) {
	var ts = (second * 1000) - (new Date());//计算剩余的毫秒数
	var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
	var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
	var mm = parseInt(ts / 1000 / 60 % 60, 10);//计算剩余的分钟数
	var ss = parseInt(ts / 1000 % 60, 10);//计算剩余的秒数
	dd = checkTime(dd);
	hh = checkTime(hh);
	mm = checkTime(mm);
	ss = checkTime(ss);

	var dateTime = dd+"天"+ hh + "小时" + mm + "分";

	return dateTime;
}

function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
};