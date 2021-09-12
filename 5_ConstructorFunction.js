//构造函数  构造函数就是用new创建对象时调用的函数。
//使用构造函数创建对象，创建出的对象都有同样的属性和方法(对象就是属性的无序列表)。Javascript提供了内建的构造函数，如Object，Array，Function。
//构造函数也是函数，唯一的区别是构造函数名应该首字母大学，以此区分其他函数。
function Person(){
    // 空的构造函数
}
var person1 = new Person();
var person2 = new Person();
console.log(person1 instanceof Person);     // true
console.log(person2 instanceof Person);     // true
console.log(person1.constructor === Person)  // true  每个对象在创建时都自动拥有一个构造函数属性，其值是一个指向其构造函数的引用。(不推荐使用这种方式检测对象类型，因为constructor属性可以被覆盖)
console.log(person2.constructor === Person); // true

//调用构造函数时，new会自动创建一个this对象，其类型就是构造函数的类型，且在构造函数内不需要显式return这个对象（也可以显示return，如果返回值是一个对象，替代this对象返回，如果返回值是一个原始类型值，会被忽略，返回this对象）。
function GreatPerson(name){
    this.name = name;
    this.sayName = function(){
        console.log(this.name);
    }
}
var person3 = new GreatPerson("wang");
var person4 = new GreatPerson("zhang");
console.log(person3.name);    //wang
console.log(person4.name);    //zhang
person3.sayName();            //wang
person4.sayName();            //zhang

//BestPerson类型的对象，将有两个属性：访问器属性name，数据属性sayName
function BestPerson(name){
    Object.defineProperty(this,"name",{
        get : function (){
            return name;
        },
        set : function (newName){
            name = newName;
        },
        enumerable : true,
        configurable : true
    });
    this.sayName = function (){
        console.log(this.name);
    }
}
var person5 = BestPerson("wang");         // 没有使用new，直接调用构造函数，此时构造函数内部this对象指向全局this对象，并不会返回任何新创建对象
console.log(person5 instanceof BestPerson);     // false
console.log(typeof person5);                    // undefined
console.log(name);                              // wang



