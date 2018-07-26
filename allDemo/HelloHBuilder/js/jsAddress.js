var addressInit = function(_cmbProvince, _cmbCity, _cmbArea, defaultProvince, defaultCity, defaultArea)  
{  
    var cmbProvince = document.getElementById(_cmbProvince);  
    var cmbCity = document.getElementById(_cmbCity);  
    var cmbArea = document.getElementById(_cmbArea);  
      
    function cmbSelect(cmb, str)  
    {  
        for(var i=0; i<cmb.options.length; i++)  
        {  
            if(cmb.options[i].value == str)  
            {  
                cmb.selectedIndex = i;  
                return;  
            }  
        }  
    }  
    function cmbAddOption(cmb, str, obj)  
    {  
        var option = document.createElement("OPTION");  
        cmb.options.add(option);  
        option.innerText = str;  
        option.value = str;  
        option.obj = obj;  
    }  
      
    function changeCity()  
    {  
        cmbArea.options.length = 0;  
        if(cmbCity.selectedIndex == -1)return;  
        var item = cmbCity.options[cmbCity.selectedIndex].obj;  
        for(var i=0; i<item.areaList.length; i++)  
        {  
            cmbAddOption(cmbArea, item.areaList[i], null);  
        }  
        cmbSelect(cmbArea, defaultArea);  
    }  
    function changeProvince()  
    {  
        cmbCity.options.length = 0;  
        cmbCity.onchange = null;  
        if(cmbProvince.selectedIndex == -1)return;  
        var item = cmbProvince.options[cmbProvince.selectedIndex].obj;  
        for(var i=0; i<item.cityList.length; i++)  
        {  
            cmbAddOption(cmbCity, item.cityList[i].name, item.cityList[i]);  
        }  
        cmbSelect(cmbCity, defaultCity);  
        changeCity();  
        cmbCity.onchange = changeCity;  
    }  
      
    for(var i=0; i<provinceList.length; i++)  
    {  
        cmbAddOption(cmbProvince, provinceList[i].name, provinceList[i]);  
    }  
    cmbSelect(cmbProvince, defaultProvince);  
    changeProvince();  
    cmbProvince.onchange = changeProvince;  
}  
  
var provinceList = [  

  
{name:'南京', cityList:[          
{name:'江宁区', areaList:['东山街道','秣陵街道','汤山街道','淳化街道','禄口街道','江宁街道','谷里街道','湖熟镇','横溪镇']},           
{name:'玄武区', areaList:['梅园街道','新街口街道','玄武门街道','后宰门街道','锁金村街道','红山街道','孝陵卫街道','玄武湖街道']},
{name:'雨花台区', areaList:['宁南街道','赛虹桥街道','雨花新村街道','西善桥街道','板桥街道','铁心桥街道','梅山街道']}    
]},
{name:'上海', cityList:[          
{name:'徐汇区', areaList:['湖南街道','天平街道','枫林街道','徐家汇街道','斜土街道','长桥街道','漕河泾街道']},           
{name:'黄浦区', areaList:['南京东路街道','外滩街道','半淞园路街道','小东门街道','豫园街道','老西门街道']},
{name:'静安区', areaList:['曹家渡街道','静安寺街道','江宁路街道','南京西路街道','石门二路街道']}    
]}
]
