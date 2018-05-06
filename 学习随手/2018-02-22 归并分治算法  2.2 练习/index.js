
function Return_data(Data) {
    this.Data = Data;
}

Return_data.prototype = {
    constructor:Return_data,
    merge_sort_up:function (q,r) {
        if(q<r){
            var p = Math.floor((q+r)/2);
            this.merge_sort_up(q,p);
            this.merge_sort_up(p+1,r);
            merge_up(this.Data,q,p,r);
            return this.Data;
        }
    },
    merge_sort_dow:function (q,r) {
        if(q<r){
            var p = Math.floor((q+r)/2);
            this.merge_sort_dow(q,p);
            this.merge_sort_dow(p+1,r);
            merge_dow(this.Data,q,p,r);
            return this.Data;
        }
    }
}



function merge_up(array,q,p,r) {
    var array_1 = new Array();
    var array_2 = new Array();
    for(var i = 0;i < p - q + 1;i++){
        array_1[i] = array[q + i];
    }
    array_1.push(Number.POSITIVE_INFINITY);
    for(i = 0;i< r - p ;i++){
        array_2[i] = array[p + i +1]
    }
    array_2.push(Number.POSITIVE_INFINITY);
     i = 0;
    var j = 0;
    for(var c = q;c < r + 1 ;c++){
        if(array_1[i] > array_2[j] ){
            array[c] = array_2[j];
            j++;
        }else {
            array[c] = array_1[i];
            i++;
        }
    }

    return array;
}

function merge_dow(array,q,p,r) {
    var array_1 = new Array();
    var array_2 = new Array();
    for(var i = 0;i < p - q + 1;i++){
        array_1[i] = array[q + i];
    }
    array_1.push(Number.NEGATIVE_INFINITY);
    for(i = 0;i< r - p ;i++){
        array_2[i] = array[p + i +1]
    }
    array_1.push(Number.NEGATIVE_INFINITY);
    i = 0;
    var j = 0;
    for(var c = q;c < r + 1 ;c++){
        if(array_1[i] < array_2[j] ){
            array[c] = array_2[j];
            j++;
        }else {
            array[c] = array_1[i];
            i++;
        }
    }
    return array;
}

var STE = Math.pow(2,3);