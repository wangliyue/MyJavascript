// 函数其实就是对象。使函数不同于其他对象的决定性特点是函数存在一个被称为[[call]]的内部属性。该内部属性函数独有。

// 两种字面形式
// 声明
function add(num1,num2){
    return num1 + num2;
}
// 表达式
var add = function(num1,num2){
    return num1 + num2;
}
// 函数声明会被提升到上下文的顶部，可以先使用函数后声明
var result = addNum(5,5);
function addNum(num1,num2){
    return num1 + num2;
}
// js引擎实际工作如下
function addNum(num1,num2){
    return num1 + num2;
}
var result = addNum(5,5)

// 函数就是对象
function sayHi(){
    console.log("Hi~");
}
sayHi();
var sayHi2 = sayHi;
sayHi2();
// 使用Function构造函数
var sayHi = new Function("console.log('Hi~')");
sayHi();
var sayHi2 = sayHi;
sayHi2();
// 将函数当做参数传递给其他函数
var numbers = [1,5,8,4,7,10,2,6];
numbers.sort(function(first,sencond){
    return first - sencond;
})
console.log(numbers);    // [1,2,4,5,6,7,8,10]
numbers.sort();          // 默认情况下，sort()将数组中的每个对象转换为字符串进行比较
console.log(numbers);   // [1,10,2,4,5,6,7,8]

// 参数
// 可以给函数传递任意数量的参数却不造成错误。因为函数参数实际上都被保存在一个被称为arguments的类似数组的对象中。arguments的length属性表示目前都多少参数值。
// arguments对象自动存在于函数中。函数的命名参数不过是为了方便，并不真正限制该函数可接受参数的个数。
// 命名参数个数是函数期望的参数个数，函数的length属性保存了该值。
function reflect(value){
    return value;
}
console.log(reflect("Hi~"));     // 'Hi~'
console.log(reflect("Hi~",25));  // 'Hi~'
console.log(reflect.length);           //  1

reflect = function (){
    return arguments[0];
}
console.log(reflect('Hi~'));    // 'Hi~'
console.log(reflect('Hi~',25)); // 'Hi~'
console.log(reflect.length)           // 0

// 接受任意数量的参数并返回它们的和
function sum(){
    var result = 0,
        i = 0,
        len = arguments.length;
    while(i < len){
        result += arguments[i];
        i++;
    }
    return result;
}
console.log(sum(1,2));    //3
console.log(sum(3,4,5,6));//18
console.log(sum(50));     //50
console.log(sum());       //0

// 重载？ 大多数语言支持函数重载，它能让一个函数具有多个签名。函数签名由函数名称、参数的个数及其类型组成。
// javascript函数可以接受任意数量的参数且参数类型完全没有限制。这说明Javascript函数其实根本没有签名，因此也不存在重载。
function sayMessage(message){
    console.log(message);
}
function sayMessage(){
    console.log("Default message");
}
sayMessage("Hello!")    // Default message
//使用Function构造函数，如下
var sayMessage = new Function("message","console.log(message);");
sayMessage = new Function("console.log(\"Default message\");");
sayMessage("Hello!");  // Default message
// 模仿函数重载
function sayMessage(message){
    if(arguments.length === 0){
        message = "Default message";
    }
    console.log(message);
}
sayMessage("Hello!");
sayMessage();

// 对象方法  如果对象的属性的值为函数，则该属性被称为方法
var person = {
    name : 'wang',
    sayName : function(){
        console.log(person.name);
    }
}
person.sayName();   // 'wang'
// this  javascript所有的函数作用域内都有一个this对象代表调用该函数的对象。
// 全局作用域中，this代表全局对象（浏览器里的window）。当一个函数作为对象的方法被调用时，默认this的值等于那个对象。
var person = {
    name : 'wang',
    sayName : function(){
        console.log(this.name);
    }
}
person.sayName();
// example
function sayNameForAll(){
    console.log(this.name);
}
var person1 = {
    name : 'wang',
    sayName : sayNameForAll
}
var person2 = {
    name : 'li',
    sayName : sayNameForAll
}
var name = 'zhang';
person1.sayName();    // wang
person2.sayName();   // li
sayNameForAll();     // in Brower will be 'zhang'

// 改变this
// call()  第一个参数指定了函数执行时this的值，其后的参数都是需要被传入函数的参数
// 记住函数是对象，而对象可以有方法，所以函数也有
function sayNameForAll(label){
    console.log(label + ":" + this.name);
}
var person1 = {
    name : 'wang'
}
var person2 = {
    name : 'li'
}
var name = 'zhang';
sayNameForAll.call(this,'global');       // global：zhang
sayNameForAll.call(person1, 'person1');  // person1: wang
sayNameForAll.call(person2, 'person2');  // person2: li
// apply()的工作方式和call()完全一样，但它只接受两个参数：this的值和一个数组或者类似数组的对象，内含需要被传入函数的参数
function sayNameForAll(label){
    console.log(label + "：" + this.name);
}
var person1 = {
    name : 'wang'
}
var person2 = {
    name : 'li'
}
var name = 'zhang';
sayNameForAll.apply(this,['global']);     // global：zhang
sayNameForAll.apply(person1,['person1']); // person1: wang
sayNameForAll.apply(person2,['person2']); // person2: li
// bind()   第一个参数是要传给新函数的this的值，其他所有参数代表需要被永久设置在新函数中的命名参数。可以在之后继续设置任何非永久参数。
function saynameForAllByBind(label,tag){
    console.log(label + ":" + this.name);
    if(tag != undefined){
        console.log(tag);
    }
}
var person1 = {
    name : 'wang'
}
var person2 = {
    name : 'li'
}
// 创建一个新函数，this永久绑定为person1
var sayNameForPerson1 = saynameForAllByBind.bind(person1);
sayNameForPerson1("person1",'developer');     //person1:wang    developer
// 创建一个新函数，this永久绑定为person2
var sayNameForPerson2 = saynameForAllByBind.bind(person2,"person2");
sayNameForPerson2('tester');             //person2:li    tester
// 将一个函数设置为一个对象的属性，但是这并不改变这个函数中this的值
person2.sayName = sayNameForPerson1;
person2.sayName("person2");      //person2:wang



