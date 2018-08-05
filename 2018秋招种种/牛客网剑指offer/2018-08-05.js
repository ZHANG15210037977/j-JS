// 1.在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
export function Find(target, array)
{
    let hang = array.length - 1;
    let lie = 0;
    while (hang >= 0 && lie <= array[0].length - 1) {
        if (array[hang][lie] > target) {
            hang--;
        } else if (array[hang][lie] < target) {
            lie++;
        } else {
            return true
        }
    }
    return false
}

// 2.请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。
function replaceSpace(str)
{
    let arr = str.split('');
    for(let i = 0; i < arr.length; i++) {
        if (arr[i] === ' ') {
            arr[i] = '%20'
        }
    }
    return arr.join('')
}