//导航菜单显示
$(document).ready(function() {
    $('.center .top-head .navigation li').hover(function () {
        $(this).children('.menu').toggleClass('hidden')
    })
})

