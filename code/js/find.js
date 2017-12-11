/*在对象中查找对应层级的值*/

/*0*/
var find = function (obj, str) {
    //判断obj是都为空
    for(var name in obj) {
        if(!name) {
            return false;
        }
    }
    //判断str是否存在
    if(!str) {
        return false;
    }
    var arr = [],
        newObj = obj,
        selectVal = undefined,
        flag = false;
    arr = str.split('.');
    for(var i = 0; i < arr.length; i ++) {
        for(var name in newObj) {
            if(arr[i] == name) {
                newObj = newObj[arr[i]];
                selectVal = newObj;
                flag = true;
            }else {
                flag = false;
                selectVal = undefined;
            }
        }   
    }
    return selectVal;
}

var obj = {
    a: {
        b:{
            a: 1
        },
        m: 1
    }
}
var str = 'a.m'

console.log(find(obj, str))

/*1*/
//从Object.prototype继承来的hasOwnProperty，处理对象属性不会在原型连上查找

function findSimple(object, path) {  
    var props = path.split(".");  
    for(var i=0;i<props.length;i++){  
        var p = props[i];  
        if(object && object.hasOwnProperty(p)){  
            object = object[p];  
        }  
        else{  
            return undefined;  
        }  
    }  
    return object;  
}  
console.log(findSimple(obj, str))


/*2*/
/*改为递归*/
//还有问题，待修复
function findD(obj, str) {
    var arr = str.split('.'),
        newArr = [],
        flag = false;

    for(var i = 0; i < arr.length; i++){
        for(var name in obj) {
            if(arr[i] == obj[name]){
                newStr = arr.splice(0, 1).join('.');
                flag = true;
                return findD(obj[name], newStr);
            }else{
                flag = false;
                return undefined;
            }
        }
       
    }
}

console.log(findD(obj, str));