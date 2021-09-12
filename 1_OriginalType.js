/************************原始类型*********************/
//string
var name = 'wangliyue';
var section = 'a';

//numbers
var count = 25;
var cost = 1.51;

//boolean
var found = true;

//null
var object = null;

//undefined
var flag = undefined;
var ref;       //默认赋值undefined

var color1 = "red";
var color2 = color1;
color1 = "blue";
console.log(color1);    // blue
console.log(color2);    // red

/***********************鉴别原始类型********************/
console.log(typeof "wang");
console.log(typeof 10);
console.log(typeof 5.1);
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof null);  // object

/*********************原始方法***********************/
var name = "wang";
var lowercaseName = name.toLowerCase();
var firstLetter = name.charAt(0);
var middleOfName = name.substr(1,3);

var count = 10;
var fixedCount = count.toFixed(2);    // 10.00
var hexCount = count.toString(16);          // "a"

var flag = true;
var stringFlag = flag.toString();                // "true"
