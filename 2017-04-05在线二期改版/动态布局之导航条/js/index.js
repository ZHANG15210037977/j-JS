//巨幕定时向下切换
timer = setInterval(function () {
    $('.banner .imgPlay .next').trigger('click');
},4000);

$('.banner .imgPlay').hover(function () {
    clearInterval(timer);
},function () {
    timer = setInterval(function () {
        $('.banner .imgPlay .next').trigger('click');
    },4000);
});
//小于1680巨幕样式处理处理
function changeCss(windowSize,h) {
    if(windowSize <1680){
        $('.banner').css({
            'width' : windowSize + 'px',
            'height': h + 'px'
        });

        $('.banner .imgPlay').css({
            'width' : windowSize + 'px',
            'height': h + 'px',
            'margin-left': -windowSize/ 2 + 'px'
        });

        $('.banner .imgPlay ul').css({
            'width' : 5 * windowSize + 'px',
            'height': h + 'px'

        });

        $('.banner .imgPlay li').css({
            'width' : windowSize + 'px',
            'height': h + 'px'
        });

        $('.banner .imgPlay li img').css({
            'width' : windowSize + 'px',
            'height': h + 'px'
        });
    }
}
//小于1680px巨幕切换函数
function moveSent() {
    windowSize = $(window).width();
    var xnoll = 0;
    var imgSize = $('.banner .imgPlay li img').width();
    $('.banner .imgPlay .prev').unbind();
    $('.banner .imgPlay .next').unbind();
    //向上切换
    if(windowSize < 1680){
        $('.banner .imgPlay .prev').click(function () {
            if(xnoll < 1){
                xnoll = 5;
            }
            xnoll = xnoll - 1;
            $('.banner .imgPlay ul').animate({
                'margin-left' : xnoll * (-imgSize) + 'px'
            });
        });
        //向下切换
        $('.banner .imgPlay .next').click(function () {
            if(xnoll > 3){
                xnoll = -1;
            }
            xnoll = xnoll + 1;
            $('.banner .imgPlay ul').animate({
                'margin-left' : xnoll * (-imgSize) + 'px'
            });
        });
    }
}
//屏幕宽度
var windowSize = $(window).width();

//屏幕宽度变动运行函数
$(window).resize(function () {
    windowSize = $(window).width();//屏幕宽度
    var Dh = $('.dh');
    var w = parseInt(Dh.width());//导航条宽度
    //自适应导航条函数
    var num = Math.floor(w / 120);
    if(num < 10)
    {

        $('.dhc').css('width',num * 120 + 'px');
        var x = $('.position1>li').length;
        var y = $('.dhc .more-box li').length;
        $('.more').css('display','inline').hover(function(){
            $('.more-box').css('display','inline');
        },function(){
            $('.more-box').css('display','none');
        });
        if(x > num){
            for(var i = 0; i < (x - num);i++){
                $('.position1>li:last').prev('li').prependTo('.dhc .more-box ul');
            }
        }
        else{
            for( i = 0; i < (num - x);i++){
                $('.more-box li:first').insertBefore('.position1>li:last');
            }
        }
    }else{
        $('.dhc').css('width',1200 + 'px');
        $('.more').css('display','none');
        for(i = 0;i < 1;i++){
            $('.more-box li:first').insertBefore('.position1>li:last');
        }
    }

    //巨幕自适应
    if(windowSize < 1680){

        var pre = windowSize / 1680;
        var h = 520 *  pre;
        changeCss(windowSize,h);
        moveSent();
    }
});

//自适应导航条函数
$(document).ready(function () {
    var Dh = $('.dh');
    var w = parseInt(Dh.width());
    var num = Math.floor(w / 120);
    if(num < 10)
    {

        $('.dhc').css('width',num * 120 + 'px');
        var x = $('.position1>li').length;
        var y = $('.dhc .more-box li').length;
        $('.more').css('display','inline').hover(function(){
            $('.more-box').css('display','inline');
        },function(){
            $('.more-box').css('display','none');
        });
        if(x > num){
            for(var i = 0; i < (x - num);i++){
                $('.position1>li:last').prev('li').prependTo('.dhc .more-box ul');
            }
        }
        else{
            for( i = 0; i < (num - x);i++){
                $('.more-box li:first').insertBefore('.position1>li:last');
            }
        }
    }else{
        $('.dhc').css('width',1200 + 'px');
        $('.more').css('display','none');
        for(i = 0;i < 1;i++){
            $('.more-box li:first').insertBefore('.position1>li:last');
        }
    }
});
//巨幕滚动函数
$(document).ready(function () {
    windowSize = $(window).width();
    var xnoll = 0;
    if(windowSize < 1680){

        var pre = windowSize / 1680;
        var h = 520 *  pre;
        changeCss(windowSize,h);
        $('.banner .imgPlay .prev').unbind();
        $('.banner .imgPlay .next').unbind();
        var imgSize = $('.banner .imgPlay li img').width();
        //向上切换
        $('.banner .imgPlay .prev').click(function () {
            if(xnoll < 1){
                xnoll = 5;
            }
            xnoll = xnoll - 1;
            $('.banner .imgPlay ul').animate({
                'margin-left' : xnoll * (-imgSize) + 'px'
            });
        });
        //向下切换
        $('.banner .imgPlay .next').click(function () {
            if(xnoll > 3){
                xnoll = -1;
            }
            xnoll = xnoll + 1;
            $('.banner .imgPlay ul').animate({
                'margin-left' : xnoll * (-imgSize) + 'px'
            });
        });
    }else {
        //向上切换
        $('.banner .imgPlay .prev').click(function () {
            if(xnoll < 1){
                xnoll = 5;
            }
            xnoll = xnoll - 1;
            $('.banner .imgPlay ul').animate({
                'margin-left' : xnoll * (-1680) + 'px'
            });
        });
        //向下切换
        $('.banner .imgPlay .next').click(function () {
            if(xnoll > 3){
                xnoll = -1;
            }
            xnoll = xnoll + 1;
            $('.banner .imgPlay ul').animate({
                'margin-left' : xnoll * (-1680) + 'px'
            });
        });
    }
});