/**
 * Created by Administrator on 2018-02-21.
 */


function ReturnData(Data) {
    this.Data = Data;
}
ReturnData.prototype = {
    constructor:ReturnData,
    show_Data : function () {
        alert(this.Data);
    },
    insertion_sort : function (str){
        var key = null;
        var i = null;

        for(var  j = 1;j < this.Data.length;j++){
            key = this.Data[j];
            i = j - 1;
            if(str == 'up'){
                while(i >= 0 && this.Data[i] > key){
                    this.Data[i + 1] = this.Data[i];
                    i = i - 1;
                }
            }else {
                while(i >= 0 && this.Data[i] < key){
                    this.Data[i + 1] = this.Data[i];
                    i = i - 1;
                }
            }
            this.Data[i + 1] = key;
        }
        return this.Data;
    },
    search:function (key) {
        var i = 0;
        var return_data = '该元素不存在于数组';
        while(i < this.Data.length){
            if(this.Data[i] == key){
                return_data = this.Data[i];
                break;
            }
            i++;
        }

        return return_data;
    }
}


function and_two_array(array_1,array_2) {
    var n1 = array_1.length;
    var n2 = array_2.length;
    var array_3 = new Array();
    var n = null;
    var sum = null; //对应位相加之和
    var add = null;//进位数
    var rem = null;//余数，写入数组3对应位数
    //长度不等短数组高位补零
    if(n1 > n2){
        var j = n1 - n2;
        for(var i = 0;i < j ;i++){
            array_2.unshift(0);
        }
        n = n1;
    }else {
        j = n2 - n1;
        for(var i = 0;i < j ;i++){
            array_1.unshift(0);
        }
        n = n2;
    }
    array_3[n] = 0;//数组3低位初始化
    for(var i = n - 1;i >= 0; i--){
        var sum = array_1[i] + array_2[i] + array_3[i + 1];
        var rem = sum % 2;
        var add = (sum - rem) / 2;

        array_3[i + 1] = rem;
        array_3[i ] = add;
    }

    if(array_3[0] == 0){
        array_3.shift();
    }
    return array_3;
}
var a = [5,2,4,6,1,3];

var res = new ReturnData(a);




