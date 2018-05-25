let index = (function(){
    let z_index = 2000;
    let messageList = [{
        message: '数据中包含非数字元素，请查证',
        title: '×',
        bg_color: '#FF4949'
    }]

    let DataArray = [];//排序数据
    let showStyle = null;//展示方式

    function start(){//开始按钮处理函数
        DataArray= document.getElementsByName('data')[0].value.split(',');
        showStyle = document.getElementsByName('show_style')[0].value;
        for(let i = 0;i < DataArray.length;i++){//循环遍历数组 

            DataArray[i] = parseInt(DataArray[i]);//number类型转换
            if(isNaN(DataArray[i])){
                DataArray.splice(i,1);//去除非number类型
                i--
                
            }
        }
        
  

    }

    return{
        start
    }
})()