function boxResize() {
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
}
$(window).resize(function () {
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
$(document).ready(boxResize());

$(window).scroll(function() {
    var top = $(window).scrollTop();
    if(top < 842){
        $('.goodVoice').css('top',( 842 - top) + 'px');
    }
    }
);