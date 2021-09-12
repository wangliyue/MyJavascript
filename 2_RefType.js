var object = new Object();
var object1 = object;
//var object = null;

//添加属性
object1.myCustomProterty = "Awesome!";
console.log(object1.myCustomProterty);
console.log(object.myCustomProterty);

//内建类型
var items = new Array();
var now = new Date();
var error = new Error("Something bad happened.");
var func = new Function("console.log('Hi')");
var obj = new Object();
var regex = new RegExp("\\d+");

//字面形式
//Object
var book = {
    name : "The Principles of Object-Oriented Javascript",
    year : 2014
}
//等同于
var book = new Object();
book.name = "The Principles of Object-Oriented Javascript";
book.year = 2014;
//Array
var colors = ['red','blue','green'];
//等同于
var colors = new Array('red','blue','green');
//Function
function reflect(value){
    return value;
}
//等同于
var reflect = new Function("value","return value;");
//RegExp
var numbers = /\d+/g;
//等同于
var numbers = new RegExp("\\d+","g");

//访问属性
var array = [];
array.push(123456);
array["push"](123456);
var method = "push";
array[method](123456);

//鉴别引用类型
function reflect(value){
    return value;
}
console.log(typeof reflect);    // "function"

var items = [];
var object = {};
function reflect(value){
    return value;
}
console.log(items instanceof Array);   //true
console.log(items instanceof Object);  //true
console.log(object instanceof Object); //true
console.log(object instanceof Array);  //false
console.log(reflect instanceof Function); //true
console.log(reflect instanceof Object);   //true

console.log(Array.isArray(items));

//原始封装类型  String Number Boolean
var name = 'wang';
var firstChar = name.charAt(0);
console.log(firstChar);     // 'w'
// js引擎实际工作如下
var name = 'wang';
var temp = new String(name);
var firstChar = temp.charAt(0);
temp = null;
console.log(firstChar);  // 'w'

var name = 'wang';
name.last = 'liyue';
console.log(name.last);    // undefined
// js引擎实际工作如下
var name = 'w';
var temp = new String(name);
temp.last = 'liyue';
temp = null;
var temp = new String(name);
console.log(temp.last);    // undefined
temp = null;

var name = 'wang';
var count = 10;
var found = false;
//临时对象仅在值被读取时创建，instanceof并没有真的读取任何东西，也就没有创建临时对象
console.log(name instanceof String);   //false
console.log(count instanceof Number);  //false
console.log(found instanceof Boolean);  //false