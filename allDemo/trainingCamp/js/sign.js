/**
 * Created by Administrator on 2017/10/16.
 */
var initialSlide = 0;
$(function() {
    //朦层引导：点击知道啦  页面消失
    $('.sildeShare .knowBtn').click(function() {
        $('.sildeShare').fadeOut();
    });
    var swiper4 = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 7,
        initialSlide: initialSlide,
        centeredSlides: false,
        controlBy:'container',
        paginationClickable: true,
        spaceBetween:13,
        slideToClickedSlide: true,
    });
    //首先进来默认是第几天的就显示图片为大
    // if($(initialSlide)) {
    //     $('.signWeek .swiper-slide-active .listCir').addClass('listOraBig');
    // }
    var swiper5 = new Swiper('.signSilde', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        // autoHeight: true,
        slidesPerView: 'auto',
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
        initialSlide: initialSlide,
        slideToClickedSlide: true,
        paginationType : 'custom',

    });
    swiper4.params.control = swiper5;
    swiper5.params.control = swiper4;
    $('.btnEvaluate li').click(function() {
        if($(this).hasClass('orangeBtn')) {
            $(this).removeClass('orangeBtn');
        } else {
            $(this).addClass('orangeBtn').siblings('li').removeClass('orangeBtn');
        }
    });
    //点击邀请朋友一起学   出现分享弹层
    $('.signFundBtn').click(function() {
        $('.promptShare').fadeIn();
    });
    $('.promptShare').click(function() {
        $('.promptShare').fadeOut();
    });

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
