/**
 * Created by sherrys on 16-3-3.
 */
$(function(){


    //首页Tab Menu 切换
    $('.menu a').click(function() {
        tabSwitch($(this).attr('href'));
    });

    function tabSwitch(tabName) {
        $('.index_tab_wrap').children().hide();
        $('.menu li').removeClass('on');
        var index = parseInt(tabName.charAt(tabName.length - 1));
        $('.menu li').eq(index-1).addClass('on');
        $(tabName).show();

        switch (tabName){
            case "#tab1" :
                pageIndex = 0, pageSize = 10;
                
                break;
            case "#tab2" :
                
                break;
            case "#tab3" :
                
                break;
        }
    }

    

    

    
});