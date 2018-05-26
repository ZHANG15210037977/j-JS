let index = (function () {
    let dataArray = [];//原始数据
    let orderArray = [[]]//flex盒子order属性数组，二维数组，每个内数组对应排序中某一状态。
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
    }]


    function choice_sort(Data) {//选择排序，Data为二维数组，由外向内分别对应 row(步)，li（数据）
        let repeatData = [];
        let sortArr = [];
        for (let i = 0; i < Data[0].length; i++) {
            sortArr[i] = dataArray[i];//深复制原始数据
            Data[i + 1] = [];//order初始化
        }


        for (let i = 0; i < sortArr.length; i++) {

            for(let z = 0;z < Data[0].length;z++){
                Data[i + 1][z] = Data[i][z]; //深复制上一步结果，这里会产生溢出。
            }

            let tem = i;
            for (let j = i + 1; j < sortArr.length; j++) {
                if (sortArr[tem] > sortArr[j]) {
                    tem = j;
                }
            }
            let t = sortArr[i];//原始数据交换。
            sortArr[i] = sortArr[tem];
            sortArr[tem] = t;

            
            if(repeatData[sortArr[i]] == undefined){
                
                repeatData[sortArr[i]] = 1;
            }else{
                repeatData[sortArr[i]]++;
            }
            

            if(repeatData[sortArr[tem]] == undefined){
                repeatData[sortArr[tem]] = 1;
            }else{
                repeatData[sortArr[tem]]++;
            }

            
           

            let str = public.arrIndexOfde(dataArray,sortArr[i],repeatData[sortArr[i]]);
            console.log('bumber:')
            console.log(sortArr[i])
            console.log('x:')
            console.log(repeatData)
            let end = public.arrIndexOfde(dataArray,sortArr[tem],repeatData[sortArr[tem]]);
            console.log('str:')
            console.log(str)
            console.log('end:')
            console.log(end)

            t = Data[i + 1][str];//order对应状态同步改变
            Data[i + 1][str] = Data[i + 1][end]; 
            Data[i + 1][end] = t;
            
           
        }

        Data.pop();//移除溢出项目
        console.log(Data);
    }
    function addDataNode(Data) {//展示node写入函数，Data为orderArray内某一数组，其内存排序某一时刻的状态，对应li（数据）
        document.getElementById('show_process').insertAdjacentHTML("beforeend", `<div class="row hidden"><ul>第${row_index}步：</ul></div>`);

        let nowNode = document.getElementsByClassName('row')[row_index];//获取当前row
        for (let i = 0; i < Data.length; i++) {

            
            nowNode.children[0].insertAdjacentHTML("beforeend", `<li style = "order:${Data[i]}">${dataArray[i]}</li>`);


        }


        setTimeout(() => {
            nowNode.classList = "row";//逐渐出现

        }, 100)

        row_index++;

    }
    

    function orderChange(index){//order修改函数,index为对应步数。

       
        let nowNode = document.getElementsByClassName('row')[index].children[0];//获取当前row对应ul

        nowNode.children[index - 1].style.backgroundColor = '#72F9BE';
        for(let i = 0;i < nowNode.children.length;i++){
            nowNode.children[i].style.order = `${orderArray[index][i]}`;
        }
        

    }

    function start() {//开始按钮处理函数

        dataArray = document.getElementsByName('data')[0].value.split(',');//dataArray[0]为原始数据。

        showStyle = document.getElementsByName('show_style')[0].value;

        for (let i = 0; i < dataArray.length; i++) {//循环遍历数组 

            dataArray[i] = parseInt(dataArray[i]);//number类型转换
            if (isNaN(dataArray[i])) {
                dataArray.splice(i, 1);//去除非number类型
                i--

            }

            orderArray[0][i] = i;//初始化

        }

        if (dataArray.length == 0) {
            public.addNode(messageList[0], z_index);
            return;
        } else if (dataArray.length > 20) {
            public.addNode(messageList[1], z_index);
            return;
        }


        addDataNode(orderArray[row_index]);//原始数据写入DOM
        document.getElementsByClassName("start")[0].style.display = 'none';//按钮切换
        document.getElementsByClassName("next")[0].style.display = 'block';

        choice_sort(orderArray);

     


    }

    function next() {//下一步展示函数

        if (row_index < orderArray.length) {
            addDataNode(orderArray[row_index - 1]);
            setTimeout(() =>{
                orderChange(row_index - 1)
            },1000)
        } else {
            document.getElementsByClassName("start")[0].style.display = 'block';//按钮切换
            document.getElementsByClassName("next")[0].style.display = 'none';

            let container = document.getElementById('show_process');
            while (container.firstChild) {//移除show_process 中的所有元素
                container.removeChild(container.firstChild);
            }

            row_index = 0;    //步数初始化
            dataArray = [];//展示数据初始化
            orderArray = [[]]
        }
    }
    return {
        start,
        next
    }
})()