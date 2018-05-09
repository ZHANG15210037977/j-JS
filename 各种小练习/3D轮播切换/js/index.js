
let slideBox_one = (function () {
    //页面加载时开启定时器
    let times = setInterval(next,4000); 
    let main = document.getElementsByClassName('slideBox_one')[0];
    //样式控制数组(核心)
    let slideArr = ['lt1', 'lt2', 'lt3', 'lt4', 'lt5', 'lt6', 'lt7'];
    //轮播图节点列
    let silideBtnList = document.getElementsByClassName("silideBtn_list")[0].children;
    //控制按钮节点列
    let nodeList = document.getElementsByClassName('slideBox_center')[0].children[0].children;
    //当前显示
    let index = 3;
    //向上切换
    function prev() {
        //将样式控制数组首元素移到队尾
        let sum = slideArr.shift();
        slideArr.push(sum);
        //控制按钮节点取消蓝色
        silideBtnList[index].children[0].classList.value = '';
        //更改当前显示信息
        if (index == 0) {
            index = 6
        } else {
            index--;
        }

        //循环重写轮播图节点样式
        for (let i = 0; i <= 6; i++) {
            nodeList[i].classList.value = slideArr[i];
        }
        //给当前显示对应的按钮节点赋蓝色
        silideBtnList[index].children[0].classList.value = 'blue';
    }


    //向下切换 
    function next() {
        //将样式控制数组尾元素移到队首
        let sum = slideArr.pop();
        slideArr.unshift(sum);
        silideBtnList[index].children[0].classList.value = '';
        if (index == 6) {
            index = 0
        } else {
            index++;
        }

        for (let i = 0; i <= 6; i++) {
            nodeList[i].classList.value = slideArr[i];
        }
        silideBtnList[index].children[0].classList.value = 'blue';

    }

    //选择切换
    function chose(event) {

        //获取点击的按钮信息
        let tarIndex = event.target.dataset.index;
        //计算目标节点和当前节点间差值
        let Dvalue = tarIndex - index;
        silideBtnList[index].children[0].classList.value = '';
        if (Dvalue > 0) {//为正，则下移动差值张图片
            for (let i = 0; i < Dvalue; i++) {
                let sum = slideArr.pop();
                slideArr.unshift(sum);

                if (index == 6) {
                    index = 0
                } else {
                    index++;
                }
            }
        } else if (Dvalue < 0) {//为负，则向上移动差值张图片
            for (let i = 0; i < -Dvalue; i++) {
                let sum = slideArr.shift();
                slideArr.push(sum);

                if (index == 0) {
                    index = 6
                } else {
                    index--;
                }
            }
        }

        for (let i = 0; i <= 6; i++) {
            nodeList[i].classList.value = slideArr[i];
        }
        silideBtnList[index].children[0].classList.value = 'blue';

    }

    //鼠标移入清除定时器
    main.onmouseover = function(){
        clearInterval(times);
    }
    //鼠标移出开启定时器
    main.onmouseleave = function(){
        times = setInterval(next,4000);
    }
    
    return {
        next,
        prev,
        chose
    }
})();


