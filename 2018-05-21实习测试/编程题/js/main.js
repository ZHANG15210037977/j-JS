'use strict';

let myMode = (function () {
    //判断数据类型
    function type_of(data){
        let type = typeof data;
        if(isNaN(data)){
            return 'NaN';
        }
        
        if(type == 'object'){//引用对象判断
            if(data === null){//null判断
                type = 'null';
            }else{
                type = Object.getPrototypeOf(data).constructor.name;//获取对象类构造函数名
            }
        }

        return type;
    }

    function arrIndexOfde(arr,number,x){//查找数组中，指定第几个数据的位置。arr指定数组，number数字,x个数

        let len = arr.length,//传入数组长度
            counter = 0,//计数器
            pos = 0;//起始位置

            while(pos < len && counter < x){
                pos = arr.indexOf(number,pos);
                if(pos == -1) break;
                counter++;
                pos = pos + 1;
            }

            return (pos - 1);

    }
    function addNode(messageList, z_index) {//表单消息提示处理函数，参数为提示信息对象

        document.getElementsByTagName('body')[0].insertAdjacentHTML("beforeend",//增加提示Html Node
            `<div class="prompt-message clear-float prompt-message-hidden" style = "z-index:${z_index++}">
                <div class="prompt" style = "background-color:${messageList.bg_color}">${messageList.title}</div>
                <div class="message">${messageList.message}</div>
            </div>`);

        let nowNode = document.getElementsByTagName('body')[0].lastChild;//获取当前Node
        setTimeout(() => {
            nowNode.classList = "prompt-message clear-float";//逐渐出现
        }, 100);
        setTimeout(() => {
            nowNode.classList += " prompt-message-hidden";//逐渐隐藏
            setTimeout(() => {
                nowNode.parentNode.removeChild(nowNode);//去除当前Node
            }, 800);
        }, 3000);

    }

    function addUrl(url, name, value) {//get模式 信息写入url函数
        url += (url.indexOf("?") == -1 ? "?" : "&");
        uel += encodeURIComponent(name) + '=' + encodeURIComponent(value);
        return url;
    }

    function request(par) {//仿wx.request，封装ajax传输函数，传入par为一个对象

        let xhr = new XMLHttpRequest();//新建传输对象

        let rqObj = {
            url: null,//http地址
            data : null,//传输数据
            header : 'application/json',//post 反馈报头
            method : 'get',// 传输类型 ，默认get
            success : function () {},//成功回调函数
            fail : function () {}, //失败回调函数
            complete : function () {}, //无论成功失败都
            sync : true, //是否异步发送，默认异步
        };



        for (let key in par) {//遍历传入对象传参
            rqObj[key] = par[key];
        }

       
        if (rqObj.method == 'post') {
            //回调判断
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {

                    let res = {
                        data: JSON.parse(xhr.responseText),
                        statusCode: xhr.status,
                        resHeader: xhr.statusText
                    };

                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                        rqObj.success(res);//成功回调函数
                    } else {
                        rqObj.fail(res);//失败回调函数
                    }
                    rqObj.complete(res);//全执行函数
                }
            };

            xhr.open(rqObj.method, rqObj.url, rqObj.sync);
            xhr.setRequestHeader("Cotent-Type", rqObj.header);
            let para = JSON.stringify(rqObj.data);

            xhr.send(para);

        } else {
            //date写入url
            for (let key in rqObj.data) {
                url = addUrl(rqObj.url, key, rqObj.data[key]);
            }

            //回调判断
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {

                    let res = {
                        data: JSON.parse(xhr.responseText),
                        statusCode: xhr.status,
                        resHeader: xhr.statusText
                    };

                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                        rqObj.success(res);
                    } else {
                        rqObj.fail(res);
                    }
                    rqObj.complete(res);
                }
            };

            xhr.open(rqObj.method, rqObj.url, rqObj.sync);
            xhr.send(null);
        }



    }

    return {
        addNode,
        request,
        type_of,
        arrIndexOfde
    }
})();

let index = (function () {
    let dataArray = [];//原始数据,二维数组，每个内数组对应排序中某一状态
    let showStyle = null;//展示方式
    let row_index = 0;//当前步数，初始化为0
    let z_index = 2000;//消息提示框高度
    let messageList = [{
        message: '演示数据输入有误，请查证',
        title: '×',
        bg_color: '#FF4949'
    }, {
        message: '演示数据过多，请适当删减',
        title: '×',
        bg_color: '#FF4949'
    }];


    function choice_sort(Data) {//选择排序，Data为二维数组，由外向内分别对应 row(步)，li（数据）

        let sortArr = [];
        for (let i = 0; i < Data[0].length; i++) {
            sortArr[i] = Data[0][i];//深复制原始数据
            Data[i + 1] = [];
        }


        for (let i = 0; i < sortArr.length; i++) {
            let tem = i;
            for (let j = i + 1; j < sortArr.length; j++) {
                if (sortArr[tem] > sortArr[j]) {
                    tem = j;
                }
            }
            let t = sortArr[i];//原始数据交换。
            sortArr[i] = sortArr[tem];
            sortArr[tem] = t;

            for (let z = 0; z < sortArr.length; z++) {
                Data[i + 1][z] = sortArr[z];
            }


        }

        Data.pop();//移除溢出项目
    }

    function up_sort(Data) {//冒泡排序
        let counter = 0;
        let sortArr = [];
        let len = Data[0].length;
        for (let i = 0; i < len; i++) {
            sortArr[i] = Data[0][i];//深复制原始数据
        }


        for (let i = 0; i < len; i++) {
            for (let j = i + 1; j < len; j++) {
                if (sortArr[i] > sortArr[j]) {

                    let t = sortArr[j];//原始数据交换。
                    sortArr[j] = sortArr[i];
                    sortArr[i] = t;

                    Data[++counter] = [];//排序状态留影
                    for (let z = 0; z < len; z++) {
                        Data[counter][z] = sortArr[z];
                    }
                }
            }




        }

    }

    function insert_sort(Data) {//插入排序
        let sortArr = [];
        let counter = 0;
        let len = Data[0].length;
        let key = null;
        let i = null;
        for (let i = 0; i < len; i++) {
            sortArr[i] = Data[0][i];//深复制原始数据
        }

        for (let j = 1; j < len; j++) {

            key = sortArr[j];
            i = j - 1;
            while (i >= 0 && sortArr[i] > key) {
                sortArr[i + 1] = sortArr[i];
                i = i - 1;
            }
            sortArr[i + 1] = key;

            Data[++counter] = [];//排序状态留影
            for (let z = 0; z < len; z++) {
                Data[counter][z] = sortArr[z];
            }
        }
    }

    function merge_sort(Data) {//归并排序
        let sortArr = [];
        let counter = 0;
        let len = Data[0].length;

        for (let i = 0; i < len; i++) {
            sortArr[i] = Data[0][i];//深复制原始数据
        }

        merge_sort_up(0, len - 1);
        function merge_sort_up(q, r) {
            if (q < r) {
                var p = Math.floor((q + r) / 2);
                merge_sort_up(q, p);
                merge_sort_up(p + 1, r);
                merge_up(sortArr, q, p, r);

                Data[++counter] = [];//排序状态留影
                for (let z = 0; z < len; z++) {
                    Data[counter][z] = sortArr[z];
                }
                return sortArr;
            }
        }

        function merge_up(array, q, p, r) {//合并函数
            var array_1 = [];
            var array_2 = [];
            for (var i = 0; i < p - q + 1; i++) {
                array_1[i] = array[q + i];
            }
            array_1.push(Number.POSITIVE_INFINITY);
            for (i = 0; i < r - p; i++) {
                array_2[i] = array[p + i + 1];
            }
            array_2.push(Number.POSITIVE_INFINITY);
            i = 0;
            var j = 0;
            for (var c = q; c < r + 1; c++) {
                if (array_1[i] > array_2[j]) {
                    array[c] = array_2[j];
                    j++;
                } else {
                    array[c] = array_1[i];
                    i++;
                }
            }

            return array;
        }

    }

    function fast_sort(Data) {//快速排序

        let sortArr = [];
        let counter = 0;
        let len = Data[0].length;

        for (let i = 0; i < len; i++) {
            sortArr[i] = Data[0][i];//深复制原始数据
        }


        function diverd(arr, str, end) {
            let key = arr[end];
            let j = str - 1;
            let sum = null;
            for (let i = str; i < end; i++) {
                if (arr[i] <= key) {
                    j++;
                    sum = arr[j];
                    arr[j] = arr[i];
                    arr[i] = sum;

                }
            }

            sum = arr[j + 1];
            arr[j + 1] = arr[end];
            arr[end] = sum;


            return j + 1;


        }


        function work(arr, str, end) {

            if (str < end) {


                let p = diverd(arr, str, end);
                Data[++counter] = [];//排序状态留影
                for (let z = 0; z < len; z++) {
                    Data[counter][z] = arr[z];
                }
                work(arr, str, p - 1);
                work(arr, p + 1, end);


            }

        }

        work(sortArr, 0, len - 1);
    }

    function addDataNode(Data) {//展示node写入函数，Data为dataArray内某一数组，其内存排序某一时刻的状态，对应li（数据）
        document.getElementById('show_process').insertAdjacentHTML("beforeend", `<div class="row hidden"><ul>第${row_index}步：</ul></div>`);

        let nowNode = document.getElementsByClassName('row')[row_index];//获取当前row
        for (let i = 0; i < Data.length; i++) {


            nowNode.children[0].insertAdjacentHTML("beforeend", `<li style = "left:${i * 51}px">${Data[i]}</li>`);


        }


        setTimeout(() => {
            nowNode.classList = "row";//逐渐出现

        }, 100);

        row_index++;

    }


    function orderChange(index) {//order修改函数,index为对应步数。


        let nowNode = document.getElementsByClassName('row')[index].children[0];//获取当前row对应ul


        for (let i = 0; i < dataArray[0].length; i++) {
            if (dataArray[index][i] != dataArray[index - 1][i]) {
                nowNode.children[i].style.backgroundColor = '#72F9BE';
            }
        }

        setTimeout(() => {
            for (let i = 0; i < nowNode.children.length; i++) {
                nowNode.children[i].style.left = `${i * 51}px `;
                nowNode.children[i].innerHTML = dataArray[index][i];
            }
        }, 1000);

    }

    function start() {//开始按钮处理函数

        dataArray[0] = document.getElementsByName('data')[0].value.split(',');//dataArray[0]为原始数据。

        showStyle = document.getElementsByName('show_style')[0].value;

        for (let i = 0; i < dataArray[0].length; i++) {//循环遍历数组 

            dataArray[0][i] = parseInt(dataArray[0][i]);//number类型转换
            if (isNaN(dataArray[0][i])) {
                dataArray[0].splice(i, 1);//去除非number类型
                i--;

            }


        }

        //判断输入数据个数，给出反馈
        if (dataArray[0].length == 0) {
            myMode.addNode(messageList[0], z_index);
            return;
        } else if (dataArray[0].length > 20) {
            myMode.addNode(messageList[1], z_index);
            return;
        }





        switch (showStyle) {
            case '1':
                choice_sort(dataArray);
                break;
            case '2':
                up_sort(dataArray);
                break;
            case '3':
                insert_sort(dataArray);
                break;
            case '4':
                merge_sort(dataArray);
                break;
            case '5':
                fast_sort(dataArray);
                break;

        }

        addDataNode(dataArray[row_index]);//原始数据写入DOM
        setTimeout(showSort, 2600);

        function showSort() {//每隔2.6s调用函数，展示排序步骤

            addDataNode(dataArray[row_index - 1]);
            setTimeout(() => {
                orderChange(row_index - 1);
            }, 100);

            if (row_index < dataArray.length) {
                setTimeout(showSort, 2600);
            }
        }

        document.getElementsByClassName("start")[0].style.display = 'none';//按钮切换
        document.getElementsByClassName("clear")[0].style.display = 'block';


    }

    function clear() {//下一步展示函数

        document.getElementsByClassName("start")[0].style.display = 'block';//按钮切换
        document.getElementsByClassName("clear")[0].style.display = 'none';

        let container = document.getElementById('show_process');
        while (container.firstChild) {//移除show_process 中的所有元素
            container.removeChild(container.firstChild);
        }

        row_index = 0;    //步数初始化
        dataArray = [[]];//展示数据初始化

    }
    return {
        start,
        clear
    }
})();

module.exports = index;
