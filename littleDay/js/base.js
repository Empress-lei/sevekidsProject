/*
开发者：王亮
功能:仿jquery类库（功能强大，可扩展）
时间:2014.5.5
*/

/*默认值*/
Object.extend = function (destination, source) {
    if (!destination) return source;
    for (var property in source) {
        if (!destination[property]) {
            destination[property] = source[property];
        }
    }
    return destination;
}

/*json转化字符串*/
Object.stringify || (Object.stringify = function (o) {
    if (window.JSON && JSON.stringify) {
        return JSON.stringify(o);
    }
    var arr = [];
    for (var n in this) {
        if (typeof this[n] == 'function') continue;
        arr.push('"' + n + '":' + this[n]);
    }
    return '{' + arr.join(',') + '}';
})

/*查找首位*/
String.prototype.startsWith || (String.prototype.startsWith = function (v) {
    if (this.substring(0, 1) == v) {
        return true;
    }
    return false;
});
/*查找末位*/
String.prototype.endsWith || (String.prototype.endsWith = function (v) {
    if (this.substring(this.length - 1) == v) {
        return true;
    }
    return false;
});

/*匹配左侧出现*/
String.prototype.linkStartsWith || (String.prototype.linkStartsWith = function (v) {
    if (this.indexOf(v) == 0) {
        return true;
    }
    return false;
})

/*匹配右侧出现*/
String.prototype.linkEndsWith || (String.prototype.linkEndsWith = function (v) {
    var reg = new RegExp('.*' + v + '$');
    if (reg.test(this)) { return true; }
    return false;
})

/*去掉两侧空格*/
String.prototype.trim || (String.prototype.trim = function () {
    var reg = /^\s+|\s+$/g;
    return this.replace(reg, '');
})

/*去掉左侧空格*/
String.prototype.tl || (String.prototype.tl = function () {
    var reg = /^\s+/g;
    return this.replace(reg, '');
})

/*去掉右侧空格*/
String.prototype.tr || (String.prototype.tr = function () {
    var reg = /\s+$/g;
    return this.replace(reg, '');
})

/*是否为null*/
String.prototype.isNull || (String.prototype.isNull = function () {
    if (this && this.length > 0) return false;
    return true;
})

/*转化成json*/
String.prototype.parseJson || (String.prototype.parseJson = function () {
    if (window.JSON && JSON.parse) {
        return JSON.parse(this);
    }
    return (new Function("return " + this + ';'))();
})

/*文字所占字节*/
String.prototype.size || (String.prototype.size = function () {
    var count = 0;
    var splits = this.split('');
    for (var i = 0; i < splits.length; i++) {
        if (/[u4e00-u9fa5]+/g.test(splits[i])) {
            count += 1;
        } else {
            count += 2;
        }
    }
    return count;
})

/*遍历*/
Array.prototype.each || (Array.prototype.each = function (callback, args) {
    for (var i = 0; i < this.length; i++) {
        callback.call(this[i], i, this[i], args);
    }
})

/*返回删除索引*/
Array.prototype.removeIndex || (Array.prototype.removeIndex = function (index) {
    for (var i = 0; i < this.length; i++) {
        if (i == index) {
            this.splice(i, 1);
            i--;
            break;
        }
    }
})

/*删除符合条件*/
Array.prototype.remove || (Array.prototype.remove = function (v) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == v) {
            this.splice(i, 1);
            i--;
        }
    }
})

/*去重复*/
Array.prototype.distinct || (Array.prototype.distinct = function () {
    for (var i = 0; i < this.length; i++) {
        for (var j = i + 1; j < this.length; j++) {
            if (this[i] == this[j]) {
                this.splice(i, 1);
                i--;
            }
        }
    }
})

/*删除全部*/
Array.prototype.removeAll || (Array.prototype.removeAll = function () {
    this.length = 0;
})

/*查找首次出现*/
Array.prototype.indexOf || (Array.prototype.indexOf = function (v) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == v) {
            return i;
        }
    }
    return -1;
})

/*查找末次出现*/
Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function (v) {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] == v) {
            return i;
        }
    }
    return -1;
})

/*查找数组最大值*/
Array.prototype.maxValue || (Array.prototype.maxValue = function () {
    var max = 0;
    function each(arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] instanceof Array) {
                each(arr[i]);
            } else {
                if (max < arr[i]) { max = arr[i]; }
            }
        }
    }
    each(this);
    return max;
})

/*查找数组最小值*/
Array.prototype.minValue || (Array.prototype.minValue = function () {
    var min = 9999999;
    function each(arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] instanceof Array) {
                each(arr[i]);
            } else {
                if (min > arr[i]) { min = arr[i]; }
            }
        }
    }
    each(this);
    return min;
})

/*排序*/
Array.prototype.sortValue || (Array.prototype.sortValue = function (sortby) {
    var temp = null;
    //从高到低
    function desc(i, j) {
        if (this[i] < this[j]) {
            temp = this[i];
            this[i] = this[j];
            this[j] = temp;
        }
    }
    //从低到高
    function asc(i, j) {
        if (this[i] > this[j]) {
            temp = this[i];
            this[i] = this[j];
            this[j] = temp;
        }
    }

    var c = sortby == 'desc' ? desc : asc;
    function each(arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] instanceof Array) {
                each(arr[i]);
            } else {
                for (var j = i + 1; j < arr.length; j++) {
                    c.call(arr, i, j);
                }
            }
        }
    }
    each(this);
    return this;
})

var classNames = ['Webkit', 'ms', 'Moz', 'O', ''];
var eventNames = ['webkit', 'moz', 'o'];
var hv = 120;
(function ($) {
    $.fn.onload = function (fnEnd) {
        function e($o, end) {
            var obj = $o[0];

            obj.onload = function () {
                end && end.call($o);
                obj.onreadystatechange = null;
            }
            obj.onreadystatechange = function (ev) {
                if (obj.readyState == 'complete') {
                    end && end.call($o);
                    obj.onload = null;
                }
            }
        }

        if (this.length > 0) {

            var i = 0;
            this.each(function (index, curr) {
                var $this = $(curr);
                e($this, function () {
                    i++;
                    if (i >= this.length) { fnEnd && fnEnd.call($this) }
                });
            })
        } else {
            e(this, fnEnd);
        }
    }

    //添加css3样式
    $.fn.addClass3 = function (name, value) {
        var o = this[0];
        var cName = name.charAt(0).toUpperCase() + name.substring(1);
        for (var i = 0; i < classNames.length; i++) {
            o.style[classNames[i] + cName] = value;
        }
        return $(o);
    }

    //transition事件监听
    $.fn.transitionEnd = function (options) {
        var setting = {
            listen: 'TransitionEnd',
            end: null
        }
        options = Object.extend(options, setting);
        var $this = this;
        function seatTransitionEnd() {
            for (var i = 0; i < eventNames.length; i++) {
                if (eventNames[i] == 'moz') {
                    $this.removeEvent(options.listen.toLocaleLowerCase(), seatTransitionEnd);
                } else {
                    $this.removeEvent(eventNames[i] + options.listen, seatTransitionEnd);
                }
            }
            options.end && options.end.call($this);
        }
        for (var i = 0; i < eventNames.length; i++) {
            if (eventNames[i] == 'moz') {
                $this.addEvent(options.listen.toLocaleLowerCase(), seatTransitionEnd);
            } else {
                $this.addEvent(eventNames[i] + options.listen, seatTransitionEnd);
            }
        }
    }

    //触摸屏事件
    $.fn.touches = function (options) {
        var setting = {
            init: null,//初始化
            touchstart: null,  //按下
            touchmove: null, //滑动
            touchend: null //抬起
        };
        options = Object.extend(options, setting);
        var $this = this, touchesDiv = $this[0];
        touchesDiv.addEventListener('touchstart', function (ev) {
            options.touchstart && options.touchstart.call($this, ev);

            function fnMove(ev) {
                options.touchmove && options.touchmove.call($this, ev);
            }

            function fnEnd(ev) {
                options.touchend && options.touchend.call($this, ev);
                document.removeEventListener('touchmove', fnMove, false);
                document.removeEventListener('touchend', fnEnd, false);
            }
            document.addEventListener('touchmove', fnMove, false);
            document.addEventListener('touchend', fnEnd, false);
            return false;
        }, false)
        options.init && options.init.call($this);
    }

    //添加事件
    $.fn.addEvent = function (name, fn) {
        var obj = this[0];
        var cName = name.charAt(0).toUpperCase() + name.substring(1);
        for (var i = 0; i < eventNames.length; i++) {
            obj.addEventListener(eventNames[i] + cName, fn, false);
        }
        obj.addEventListener(name.charAt(0).toLowerCase() + name.substring(1), fn, false);
    }

    //删除事件
    $.fn.removeEvent = function (name, fn) {
        var obj = this[0];
        var cName = name.charAt(0).toUpperCase() + name.substring(1);
        for (var i = 0; i < eventNames.length; i++) {
            obj.removeEventListener(eventNames[i] + cName, fn, false);
        }
        obj.removeEventListener(name.charAt(0).toLowerCase() + name.substring(1), fn, false);
    }

    /*阅读模式*/
    $.fn.initReadWord = function (options) {
        var setting = {
            item: 'p',
            c: 'span',
            speed: 100,
            fnEnd: null
        }
        var $this = this;
        options = Object.extend(options, setting);
        var items = $this.find(options.item);
        items.each(function (index, curr) {
            var arr = curr.innerHTML.split('');
            curr.innerHTML = '';
            for (var i = 0; i < arr.length; i++) {
                var span = document.createElement(options.c);
                span.innerHTML = arr[i];
                span.style.display = 'none';
                curr.appendChild(span);
            }
        })
        var interval = 0, index = 0;
        var spans = $this.find(options.c);
        $this.on('reset', function (event) {
            index = 0;
            for (var i = 0; i < spans.length; i++) {
                spans[i].style.display = 'none';
            }
        })
        $this.on('play', function (event) {
            interval = setInterval(function () {
                spans[index] && (spans[index].style.display = 'inline-block');
                if (index >= spans.length) {
                    clearInterval(interval);
                }
                index++;
            }, options.speed);
        })
        options.fnEnd && options.fnEnd.call($this);
    }
})(jQuery);