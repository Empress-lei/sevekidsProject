var Finance = {} || window.Finance;
/**
 * 加载处理弹窗.
 * @type {dialog}
 * @content 内容 ary
 */
Finance.dialog = new function () {
    var self = this;
    var content = "正在加载";
    self.openDialog = function(_content) {
        var sHeight;
        sHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var bigDiv = document.createElement("div");
        bigDiv.setAttribute('id', 'big');
        bigDiv.setAttribute('class', 'big_popup1');
        bigDiv.style.width = "6.4rem";
        bigDiv.style.height = sHeight + "px";
        bigDiv.style.background = "rgba(166,162,162,0.5)";
        document.body.appendChild(bigDiv);
        var str = "";
        str += "<div class='dialog' id='dialog'> ";
        str += (_content[0] || content[0]);
        str += "…";
        str += "</div>";
        bigDiv.innerHTML += str;
    };
    self.closeDialog = function() {
        document.body.removeChild(document.getElementById("big"));
    };
};

/*弹出框1，一个按钮*/
/**
 *
 * @type {popup1}
 * *@content 内容 ary
 * @footer 底部  ary
 * */

Finance.popup1 = new function () {
    var self = this;
    self.openPopup1 = function (content, footer) {
        var sHeight;
        sHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var bigDiv = document.createElement("div");
        bigDiv.setAttribute('id', 'big');
        bigDiv.setAttribute('class', 'big_popup1');
        bigDiv.style.width = "6.4rem";
        bigDiv.style.height = sHeight + "px";
        document.body.appendChild(bigDiv);
        var str = "";
        str += "<div class='popup1' id='popup1'> ";
        for (i = 0; i < content.length; i++) {
            str += "<p>" + content[i] + "</P>";

        }
        window.f=footer[1];
        str += "<a  href='javascript:;' onclick='Finance.openNew(f);'>" + footer[0] + "</a>";
        str += "</div>";
        bigDiv.innerHTML += str;
        /*元素定位居中*/
        var popup1 = document.getElementById("popup1");
        var w = popup1.offsetWidth;
        var h = popup1.offsetHeight;
        popup1.style.marginLeft = -(w / 2) + "px";
        popup1.style.marginTop = -(h / 2) + "px";
    }; 
    self.closePopup1 = function() {
        document.body.removeChild(document.getElementById("big"));
    };
};
/*弹出框2,两个按钮*/
/**
 *
 * @type {popup2}
 * @content 内容 ary
 * @footer 底部  ary
 *
 */
Finance.popup2 = new function () {
    var self = this;
    self.openPopup2 = function (content, footer1,footer2) {
        var sHeight;
        sHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var bigDiv = document.createElement("div");
        bigDiv.setAttribute('id', 'big');
        bigDiv.setAttribute('class', 'big_popup1');
        bigDiv.style.width = "6.4rem";
        bigDiv.style.height = sHeight + "px";
        document.body.appendChild(bigDiv);
        var str = "";
        str += "<div class='popup1 cf' id='popup1'> ";
        for (i = 0; i < content.length; i++) {
            str += "<p>" + content[i] + "</P>";

        }
        str+="<div class='popup2-2 cf'>";
        window.f1=footer1[1];
        window.f2=footer2[1];
        str += "<a  href='javascript:;' onclick='Finance.openNew(f1);'>" + footer1[0] + "</a>";
        str += "<a  href='javascript:;' onclick='Finance.openNew(f2);'>" + footer2[0] + "</a>";
        str += "</div>";
        str += "</div>";
        bigDiv.innerHTML += str;
        /*元素定位居中*/
        var popup1 = document.getElementById("popup1");
        var w = popup1.offsetWidth;
        var h = popup1.offsetHeight;
        popup1.style.marginLeft = -(w / 2) + "px";
        popup1.style.marginTop = -(h / 2) + "px";
    };
    self.closePopup2 = function() {
        document.body.removeChild(document.getElementById("big"));
    };
};
/**
 * a标签点击后，函数
 * @param par string
 */

Finance.openNew=function(par){
    if(!par){
        document.body.removeChild(document.getElementById("big"));
    }
    else{
        window.location.href=par;
    }
};





