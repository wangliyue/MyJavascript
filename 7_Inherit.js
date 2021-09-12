//前言：原型对象的属性可经由对象实例访问，这就是继承的一种形式。对象实例继承了原型对象的属性。
//因为原型对象也是一个对象，它也有自己的原型对象并继承其属性，这就形成了一条链，也就是原型对象链：对象继承其原型对象，而原型对象继承它的原型对象，依次类推。
var book = {
    title:"This is a new book"
}
var prototype = Object.getPrototypeOf(book);
console.log(prototype == Object.prototype);   //true
//继承自Object.prototype的方法
//hasOwnProperty()          检查是否存在一个给定名字的自有属性
//propertyIsEnumerable()    检查一个自有属性是否可枚举
//isPrototypeOf()           检查一个对象是否是另一个对象的原型对象
//valueOf()                 返回一个对象的值表达
//toString()                返回一个对象的字符串表达

//valueOf()，每当一个操作符被用于一个对象时就会调用valueOf()方法。 Date对象的valueOf()方法返回一个时间戳值，单位是毫秒
var now = new Date();
var earlier = new Date(2020,1,1);
console.log(now > earlier);      //true     之所有可以这样比较两个Date对象，是因为调用了valueOf()方法，实际上比较的是两个对象的valueOf()返回值的大小
//toString()，一旦valueOf()返回的是一个引用值而不是一个可以用于操作符的原始值的时候，就会回退调用toString()方法。另外，当Javascript期望一个字符串时，也会对原始值隐式调用toString()方法。
var book1 = {
    title : "This is another new book"
};
var message = "Book = "+book1;
console.log(message);  //Book = [object Object]

var book2 = {
    title : "This is another new book",
    toString : function(){
        return "[Book "+this.title+"]";
    }
}
var message = "Book = " + book2;
console.log(message);     //Book = [Book This is another new book]

//修改Object.prototype ，不要这样做
Object.prototype.add = function (value){
    return this + value;
};
var book3 = {
    title : "This is another new book"
};
//任何一个对象都拥有了add方法，但是这个方法对某些对象是没有意义的
console.log(book3.add(5));
console.log("title".add("end"));
//console.log(document.add(true));
//console.log(window.add(true));

//对象继承，使用Object.create()方法显示的指定哪个对象是新对象的原型对象，即[[Prototype]]。
var book4 = {
    title : "This is a new book"
};
//等同于
var book4 = Object.create(Object.prototype,{
    title : {
        configurable : true,
        enumerable : true,
        value : "This is a new book",
        writable : true
    }
})

var person1 = {
    name : "wang",
    sayName : function(){
        console.log(this.name);
    }
};
var person2 = Object.create(person1,{
    name : {
        configurable : true,
        enumerable : true,
        value : "zhang",
        writable : true
    }
});
person1.sayName();       //wang
person2.sayName();       //zhang
console.log(person1.hasOwnProperty("sayName"));    //true
console.log(person1.isPrototypeOf(person2));          //true
console.log(person2.hasOwnProperty("sayName"));    //false
// 当访问一个对象的属性时，Javascript引擎会执行一个搜索过程。
// 如果在对象实例上发现该属性，该属性值就会被使用。如果对象实例上没有发现该属性，则搜索[[Prototype]]。
// 如果任然没有发现，则继续搜索该原型对象的[[Prototype]]，直到继承链末端。末端通常是一个Object.prototype，其[[Prototyope]]被置为null。
// 通过Object.create()创建一个[[Prototyope]]为null的对象
var nakedObject = Object.create(null);       //   nakedObject对象为一个白板对象，没有任何自有属性和原型属性，适合做哈希容器。
console.log("toString" in nakedObject);     //false
console.log("valueOf" in nakedObject);      //false

//构造函数继承
//自定义的 YourConstructor构造函数
function YourConstructor(){

}
//Javascript引擎在背后默认设置了构造函数的prototype属性
YourConstructor.prototype = Object.create(Object.prototype,{
    constructor : {
        configurable : true,
        enumerable : true,
        value : YourConstructor,
        writable : true
    }
});

function Rectangle(length,width){
    this.length = length;
    this.width = width;
}
Rectangle.prototype.getArea = function(){
    return this.length * this.width;
};
Rectangle.prototype.toString = function(){
    return "[Rectangle "+this.length+"x"+this.width+"]";
};
function Square(size){
    this.length = size;
    this.width = size;
}
Square.prototype = new Rectangle();
Square.prototype.constructor = Square;
Square.prototype.toString= function(){
    return "[Square "+this.length+"x"+this.width+"]";
}
var rect = new Rectangle(5,10);
var square = new Square(5);
console.log(rect.getArea());          //50
console.log(square.getArea());        //25
console.log(rect.toString());         //[Rectangle 5x10]
console.log(square.toString());       //[Square 5x5]
console.log(rect instanceof Rectangle);    //true
console.log(rect instanceof Object);     // true
console.log(square instanceof Square);   // true
console.log(square instanceof Rectangle); //true
console.log(square instanceof Object);    //true
// 上例中 Square的prototype属性赋值为一个Rectangle对象，这是非必须的。可改写如下：
function SquarePro(size){
    this.length = size;
    this.width = size;
}
SquarePro.prototype = Object.create(Rectangle.prototype,{
    constructor : {
        configurable : true,
        enumerable : true,
        value : SquarePro,
        writable : true
    }
});
SquarePro.prototype.toString = function(){
    return "[SquarePro "+this.length+"x"+this.width+"]";
}

//构造函数窃取
//问题：上例中Rectangle构造函数定义了length，width属性，Square同样定义了length，width属性，是否可以避免这种重复？
function Rectangle(length,width){
    this.length = length;
    this.width = width;
}
Rectangle.prototype.getArea = function(){
    return this.length * this.width;
};
Rectangle.prototype.toString = function(){
    return "[Rectangle "+this.length+"x"+this.width+"]";
};
function Square(size){
    Rectangle.call(this,size,size);                  //构造函数窃取的关键
    //定义其他属性...
}
Square.prototype = Object.create(Rectangle.prototype,{
    constructor : {
        configurable : true,
        enumerable : true,
        value : Square,
        writable : true
    }
});
Square.prototype.toString = function(){
    return "[Square "+this.length+"x"+this.width+"]";
}
var square = new Square(6);
console.log(square.length);      //6
console.log(square.width);       //6
console.log(square.getArea());   //36
// 一般来说，需要修改prototype来继承方法并用构造函数窃取来设置某些属性，这种做法模仿了那些基于类的语言的类继承，通常被称为【伪类继承】

//访问父类方法
Square.prototype.toString = function(){
    var text = Rectangle.prototype.toString.call(this);
    return text.replace("Rectangle","Square");
}
