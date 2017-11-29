var dpr,rem,scale;
var docEl = document.documentElement; 
var fontEl = document.createElement('style'); 
var metaEl = document.querySelector('meta[name="viewport"]'); 
dpr = window.devicePixelRatio || 1;
rem = docEl.clientWidth * dpr / 10; 
scale = 1 / dpr;  
metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no'); 
docEl.firstElementChild.appendChild(fontEl); 
fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}'; 

