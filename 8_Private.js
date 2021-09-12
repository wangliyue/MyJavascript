//前言：Javascript对象的所有属性都是公有的，且没有显式的方法指定某个属性不能被外界某个对象访问。
//问题：如何让某些属性私有？
//通过使用命名规则，在不希望公有的属性名称前加上下划线，但是没有语法定义这种为私有属性，只能算是一种约定
var a = {_name:"wang"};
//模块模式，是一种用于创建私有数据的单件对象的模式，通过立调函数表达式返回一个对象。基本格式如下：
//立调函数表达式（IIFE）是一种被定义后立即调用并产生结果的函数表达。
var yourObject = (function(){
    //private data variables

    return {
        //public methods and properties
    }
}());
//模块模式允许你使用普通变量作为私有对象属性，通过创建闭包函数作为对象方法来操作它们。闭包函数就是一个可以访问其作用域外部数据的普通函数。
//对比Java，通过将Field私有，通过指定方法访问私有属性，体现封装特性。
var person = (function(){
    var age = 25;                     //变量age为一个私有属性，无法被外界直接访问，只能通过getAge和growOlder方法访问。
    return {
        name : "wang",
        getAge : function(){
            return age;
        },
        growOlder : function (){
            age++;
        }
    };
}());
console.log(person.name);      //wang
console.log(person.getAge());  //25
person.age = 100;
console.log(person.getAge());  //25
person.growOlder();
console.log(person.getAge());  //26
// 暴露模块模式   和模块模式作用一样
var person1 = (function(){
   var age = 25;
   function getAge(){
       return age;
   }
   function growOlder(){
       age++;
   }
   return {
       name : "wang",
       getAge : getAge,
       growOlder : growOlder
   };
}());

//构造函数的私有成员
//问题： 通过模块模式，在定义单个通用对象的私有属性上是十分有效的，对于需要私有属性的自定义类型对象，如何创建呢？
//通过和模块模式对比，构造函数的私有成员，只是模块模式在构造函数的运用罢了，只是不需要显式的return对象了
function Person(name){
    var age = 25;                 //虽然创建出的实例对象没有age属性，但是通过getAge和growOlder方法可以访问到age值，好像实例对象拥有一个私有的age属性一样
    this.name = name;
    this.getAge = function(){
        return age;
    };
    this.growOlder = function (){
        age++;
    };
}
var person2 = new Person("li");
console.log(person2.name);         //li
console.log(person2.getAge());     //25
person2.age = 100;
console.log(person2.getAge());    //25
person2.growOlder();
console.log(person2.getAge());    //26
//如果需要所有实例可共享的私有数据，可以结合模块模式和构造函数，如下
var NewPerson = (function(){
    var age = 25;
    function InnerPerson(name){
        this.name = name;
    }
    InnerPerson.prototype.getAge = function(){
        return age;
    };
    InnerPerson.prototype.growOlder = function (){
        age++;
    }
    return InnerPerson;
}());
var person3 = new NewPerson("wang");
var person4 = new NewPerson("li");
console.log(person3.name);      //wang
console.log(person3.getAge());  //25
console.log(person4.name);      //wang
console.log(person4.getAge());  //25
person3.growOlder();
console.log(person3.getAge()); //26
console.log(person4.getAge()); //26



