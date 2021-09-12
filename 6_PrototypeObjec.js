//原型对象
// 没有原型对象之前存在的问题：通过Person构造函数，创建100个对象，需要在内存中为每个对象创建自己的sayName函数对象。而sayName函数不是数据，是方法，可以所有的对象共用一个。如何让所有的对象共用一个sayName函数？
var book = {
    title : "I am OK"
}
console.log("title" in book);                                     //true
console.log(book.hasOwnProperty("title"));                     //true
console.log("hasOwnProperty" in book);                            //true    book拥有hasOwnProperty方法，但它不是book的自有属性
console.log(book.hasOwnProperty("hasOwnProperty"));            //false
console.log(Object.prototype.hasOwnProperty("hasOwnProperty"));//true    Object是Javascript内建的一个构造函数，函数也是对象，拥有一个protoype属性，其值是原型对象，拥有hasOwnProperty方法。通过Object构造函数创建的对象，共享原型对象中的属性、方法、
// 鉴别一个原型属性
function hasPrototypeProperty(object,name){
    return name in object && !object.hasOwnProperty(name);
}
console.log(hasPrototypeProperty(book,"title"));         //false
console.log(hasPrototypeProperty(book,"hasOwnProperty"));//true

//[[Prototype]]内部属性
//一个对象实例通过[[Prototype]]内部属性引用其原型对象。通过new创建一个新对象时，构造函数的原型对象(构造函数对象通过prototype属性引用原型对象)就会被赋值给实例对象的[[Prototype]]属性。
var object = {};
var prototype = Object.getPrototypeOf(object);        // Object.getPrototypeOf()可以返回指定对象的[[Prototype]]内部属性的值。
console.log(prototype === Object.prototype);         //  true     实例对象的[Prototype]]内部属性 和 构造函数的prototype属性指向同一个对象，即原型对象。
//用isPrototypeOf()检验某个对象是不是指定对象的原型对象
var object = {};
console.log(Object.prototype.isPrototypeOf(object));   // true
//当读取一个对象的属性时，Javascript引擎首先在该对象的自有属性中查找，如果找到则返回，没有找到该属性，则会搜索对象[[Prototype]]自有属性指向的原型对象，原型对象包含则返回，没有找到则继续查找原型对象的原型对象。（原型对象也是一个对象，同样拥有自己的原型对象）
var object = {};
console.log(object.toString());     //[object Object]      toString方法来自原型对象
object.toString = function(){
    return "[object Custom]";
};
console.log(object.toString());    //[object Custome]      toString方法来自实例对象自身
delete object.toString;
console.log(object.toString());    //[object Object]       toString方法来自原型对象
delete object.toString;
console.log(object.toString());    //[object Object]       toString方法来自原型对象

//在构造函数中使用原型对象
function Person(name){
    this.name = name;
}
Person.prototype.sayName = function(){            //在构造函数Person的原型对象上定义sayName属性，原型对象通过Person的prototype属性引用
    console.log(this.name);
}
var person1 = new Person("wang");
var person2 = new Person("zhang");
console.log(person1.name);       //wang
console.log(person2.name);       //zhang
person1.sayName();               //wang           sayName是实例对象的原型属性
person2.sayName();               //zhang

Person.prototype.favorites = [];          //在原型对象上定义非方法属性
var person3 = new Person("qian");
var person4 = new Person("wu");
person3.favorites.push("pizza");
person4.favorites.push("quinoa");
console.log(person3.favorites);         //[ 'pizza', 'quinoa' ]
console.log(person4.favorites);         //[ 'pizza', 'quinoa' ]

//使用对象字面形式直接定义原型对象
//原型对象具有一个constructor属性，这是其他对象实例所没有的。当一个构造函数被创建时，它的prototype属性也被创建，且该原型对象的constructor属性指向该函数。
//直接使用对象字面形式定义原型对象，相当于覆盖了原先的原型对象，不要忘记添加constructor属性。
Person.prototype = {
    constructor : Person,
    sayName : function (){
        console.log(this.name);
    },
    toString : function (){
        return "[Person " + this.name + "]";
    }
}
var person5 = new Person("song");
var person6 = new Person("li");
console.log(person5 instanceof Person);        //true
console.log(person5.constructor === Person);   //true
console.log(person5.toString());              //[Person song]
console.log(person6.toString());              //[Person li]

//改变原型对象
//可以随时在原型对象上添加属性，实例对象上也能访问到添加的属性
var person7 = new Person("zheng");
var person8 = new Person("hu");
Person.prototype.sayHi = function(){
    console.log("Hi~");
}
person7.sayHi();    // Hi~
person8.sayHi();    // Hi~
// 因为随时可以在原型对象上添加属性，封印一个实例对象或者冻结一个实例对象之后，实例对象也可以通过在其原型对象上添加属性，从而获得新属性。封印或冻结实例对象，完全是在操作对象的自有属性。
var person9 = new Person("tian");
var person10 = new Person("huang");
Object.seal(person9);
Person.prototype.sayHello = function(){
    console.log("Hello~");
};
person9.sayHello();          // Hello~
person10.sayHello();         // Hello~

//内建对象的原型对象   Javascript允许在内建对象的原型对象上添加属性
Array.prototype.sum = function(){
    return this.reduce(function (previous,current){
       return previous + current;
    });
};
var numbers = [1,2,3,4,5,6];
var result = numbers.sum();
console.log(result);         // 21

String.prototype.capitalize = function(){
    return this.charAt(0).toUpperCase() + this.substring(1);
};
var message = "hello world!";
console.log(message.capitalize());  // Hello world!