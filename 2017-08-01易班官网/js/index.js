$(window).resize(function () {
    var windowSize = $(window).width();
    var movesHeight = $('.bigMoves').height();
    var video_width = $('#youkuplayer').width();

    //轮播黑边高度自适应控制
    $('.box_head .bgCollapse').css('height',(movesHeight + 40)+'px');

    //优酷视频播放框高度自适应控制
    $('#youkuplayer').css('height',(video_width / 900)*750 + 'px');

    //导航条显隐控制
    if(windowSize <= 1075){
        $('.box_nav').hide();
        $('.minNav').show();
    }else {
        $('.box_nav').show();
        $('.minNav').hide();
    }

    //part_one_list显隐控制
    if(windowSize <= 480){
        $('.part_one_list').hide();
    }else {
        $('.part_one_list').show();
    }
});
$(document).ready(function () {
    var windowSize = $(window).width();
    var movesHeight = $('.bigMoves').height();
    var video_width = $('#youkuplayer').width();

    //轮播黑边高度控制
    $('.box_head .bgCollapse').css('height',(movesHeight + 40)+'px');

    //优酷视频播放框高度控制
    $('#youkuplayer').css('height',(video_width / 900)*750 + 'px');

    //导航条显隐控制
    if(windowSize <= 1075){
        $('.box_nav').hide();
        $('.minNav').show();
    }else {
        $('.box_nav').show();
        $('.minNav').hide();
    }
    //part_one_list显隐控制
    if(windowSize <= 480){
        $('.part_one_list').hide();
    }else {
        $('.part_one_list').show();
    }

    //主页栏目按钮选择初始化
    for(var n = 1;n <= 4;n++){
        $('#ccdd_'+ n).css('display','none');
        $('#eeff_'+ n).css('display','none');
    }
    $('#ccdd_'+ 1).css('display','block');
    $('#eeff_'+ 1).css('display','block');
})

//主页栏目按钮选择函数
function met(id,a,b) {
    for(var n = 1;n <= b;n++){
        $('#' + id +'_'+n).css('display','none');
    }
    $('#' + id +'_'+a).css('display','block');
}

