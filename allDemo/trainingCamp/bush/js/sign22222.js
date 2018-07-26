/**
 * Created by Administrator on 2017/10/16.
 */
var initialSlide = 0;
$(function() {

    var swiper4 = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 7,
        initialSlide: initialSlide,
        centeredSlides: false,
        paginationClickable: true,
        spaceBetween:13,
        slideToClickedSlide: true,
        onClick: function(swiper){
                alert('你点了Swiper');
            $('.signWeek .swiper-slide-active .listCir').removeClass('listGray').addClass('listOraBig').parent().siblings().find($('.listLi .listCir')).removeClass('listOraBig').addClass('listGray');
        }
    });
    //首先进来默认是第几天的就显示图片为大
    if($(initialSlide)) {
        $('.signWeek .swiper-slide-active .listCir').addClass('listOraBig');
    }
    var swiper3 = new Swiper('.signSilde', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        // autoHeight: true,
        slidesPerView: 'auto',
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
        initialSlide: initialSlide,
        onSlideChangeEnd: function(swiper) {
            if($(".signSilde .sign").length == $(".signWeek .listLi").length) {
                if($('.signWeek .listLi .listCir').hasClass('listGray')) {
                    $('.signWeek .swiper-slide-active .listCir').removeClass('listGray').addClass('listOraBig').parent().siblings().find($('.listLi .listCir')).removeClass('listOraBig').addClass('listGray');
                }
            }
            $(".listLi").eq(swiper.activeIndex-1).find("span").addClass("listOraBig").removeClass("listOraSmall").parent(".listLi").siblings(".listLi").find("span").removeClass("listOraBig").addClass("listOraSmall");
        },
    });
    $('.btnEvaluate li').click(function() {
        if($(this).hasClass('orangeBtn')) {
            $(this).removeClass('orangeBtn');
        } else {
            $(this).addClass('orangeBtn').siblings('li').removeClass('orangeBtn');
        }
    });
    swiper4.params.control = swiper3;//需要在Swiper2初始化后，Swiper1控制Swiper2
    swiper3.params.control = swiper4;

});
function fn() {
    var len = $(".font13 textarea").val().length;
    $(".font13 p span").text(len);
    $(".font13 textarea").css('height','2rem');
}
function vfn() {
    var len = $(".font13 textarea").val().length;
    if(len < 10) {
        toast("至少输入10个字符");
        return false;
    }
}
