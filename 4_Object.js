//对象是属性的无序列表。属性包含键和值。
var person1 = {
    name : 'wang'
}
var person2 = new Object();
person2.name = 'wang';

person1.age = "Redacted";
person2.age = "Redacted";
person1.name = "zhang";
person2.name = "li";
//属性探测
// in操作符会检查自有属性和原型属性
console.log("name" in person1);    // true
console.log("age" in person1);     // true
console.log("title" in person1);   // false
var person3 = {
    name : 'hang',
    sayName : function (){
        return this.name;
    }
}
console.log("sayName" in person3);   // true
// hasOwnProperty() 探测自有属性
var person4 = {
    name : 'song',
    sayName : function(){
        console.log(this.name);
    }
}
console.log("name" in person4);                   //true
console.log(person4.hasOwnProperty("name"));   //true

console.log("toString" in person4);                //true
console.log(person4.hasOwnProperty("toString")); //false
// 删除属性
var person5 = {
    name : "zhou"
}
console.log("name" in person5);      //true
delete person5.name;
console.log("name" in person5);      //false
console.log(person5.name);           //undefined
//属性枚举
// for-in循环会遍历自有属性和原型属性（很多原型属性默认都是都是不可枚举的，属性的[[Enumerable]]为false，所以并不会打印出来）
var object = {name:"zhang"};
var property;
for(property in object){
    console.log("Name:"+property);
    console.log("Value:"+object[property]);
}
// Object.keys()只返回自有属性
var properties = Object.keys(object);
var i,len;
for(i = 0,len = properties.length; i < len ; i++){
    console.log("Name:"+properties[i]);
    console.log("Value:"+object[properties[i]]);
}
//propertyIsEnumerable()检查一个属性是否为可枚举的
var person6 = {name:"song"}
console.log("name" in person6);                                //true
console.log(person6.propertyIsEnumerable("name"));          //true
var properties = Object.keys(person6);
console.log("length" in properties);                           //true
console.log(properties.propertyIsEnumerable("length"));     //false
//属性类型
//属性由两种类型：数据属性和访问器属性
//数据属性包含一个值，访问器属性不包含值而是定义一个当属性被读取时调用的函数（getter）和一个属性被写入时调用的函数（setter）。访问器属性仅需要getter和setter中的任意一个，也可以两者都有
// person7包含两个属性：_name为数据属性，name为访问器属性
var person7 = {
    _name : "wang",
    get name(){
        console.log("Reading name");
        return this._name;
    },
    set name(value){
        console.log("Setting name to %s",value);
        this._name = value;
    }
}
//读取访问器属性name，和数据属性访问一样
console.log(person7.name);
//写入访问器属性name，和数据属性写入一样
person7.name = "zhang";
console.log(person7.name);
//属性特征
//通用特征：[[Enumerable]]和[[Configurable]]。数据属性和访问器属性都具有这两个特征。
//如果一个属性的[[Configurable]]为true，可以用delete删除该属性，或随时改变它(这里的改变指改变属性类型，如数据属性变成访问器属性，值是否可以改变由[[Writable]]特征控制)，反之亦然。
//自定义的自有属性默认都是可枚举的，可配置的。Object.defineProperty()方法可以改变指定属性的特征。
var person8 = {name:"wu"};
Object.defineProperty(person8,"name",{
    enumerable : false
});
console.log("name" in person8);                      // true
console.log(person8.propertyIsEnumerable("name"));// false
var properties = Object.keys(person8);
console.log(properties.length);    // 0 (name属性已不可枚举)

Object.defineProperty(person8,"name",{
    configurable : false
});
delete person8.name;           //尝试删除name属性
console.log("name" in person8); // true (仍然在)
console.log(person8.name);     // wu
//Object.defineProperty(person8,"name",{
//    configurable : true
//});                           // 出现error!   无法将一个不可配置的属性变成可配置的。
//数据属性特征：[[Value]]和[[Writable]]
//[[Value]]特征用于保存属性的值，所有数据属性的值都保存在[[Value]]特征上，哪怕该值是一个函数。
//[[Writable]]特征的值是一个布尔值，表示该属性是否可以写入。 所有的自定义自有属性默认都是可写的。
var person9 = {name:"qian"};
// 等同于
var perosn9 = {};
Object.defineProperty(perosn9,"name",{
    value : "qian",
    enumerable : true,
    configurable : true,
    writable : true
})
//访问器属性特征: [[Get]]和[[Set]]
//[[Get]]特征保存getter函数，[[Setter]]特征保存setter函数。
var person10 = {
    _name : "hang",
    get name(){
        console.log("Reading name");
        return this._name;
    },
    set name(value){
        console.log("Setting name to %s",value);
        this._name = value;
    }
}
// 等同于
var person10 = {_name:"hang"}
Object.defineProperty(person10,"name",{
    get : function(){
        console.log("Reading name");
        return this._name;
    },
    set : function(value){
        console.log("Setting name to %s",value);
        this._name = value;
    },
    enumerable : true,
    configurable : true
});
//定义多重属性，并配置属性的特征   Obejct.defineProperties()
var person11 = {}
Object.defineProperties(person11,{
    //定义_name数据属性
    _name : {
        value : "zhang",
        enumerable : true,
        configurable : true,
        writable : true
    },
    //定义name访问器属性
    name : {
        get : function(){
            console.log("Reading name");
            return this._name;
        },
        set : function(value){
            console.log("Setting name to %s",value);
            this._name = value;
        },
        enumerable : true,
        configurable : true
    }
})
//获取指定属性的特征
var person12 = {name:"shang"}
var descriptor = Object.getOwnPropertyDescriptor(person12,"name");
console.log(descriptor.enumerable);        //true
console.log(descriptor.configurable);      //true
console.log(descriptor.value);             //shang
console.log(descriptor.writable);          //true
//禁止修改对象
//对象和属性一样具有指导其行为的内部特征。[[Extensible]]是对象的一个特征，设置为false，就能禁止新属性的添加。
//禁止扩展   Object.preventExtensions()
var person13 = {
    name : "zhang"
}
console.log(Object.isExtensible(person13));     //true
Object.preventExtensions(person13);
console.log(Object.isExtensible(person13));     //false
person13.sayName = function(){
    console.log(this.name);
}
console.log("sayName" in person13);             //false
//对象封印
//一个被封印的对象是不可扩展的且其所有属性都不可配置。意味着不能添加新属性，不能删除属性，不能改变属性类型（数据属性访问器属性互转）。只能读写这个对象的属性。
var person14 = {
    name : "wang"
}
console.log(Object.isExtensible(person14));  //true
console.log(Object.isSealed(person14));      //false
Object.seal(person14); // 封印对象
console.log(Object.isExtensible(person14)); //false   对象的[[Extensible]]被置为false
console.log(Object.isSealed(person14));   //true
person14.sayName = function(){
    console.log(this.name)
}
console.log("sayName" in person14);     //false       不可添加属性
person14.name = "zhang";
console.log(person14.name);            //zhang        可读写属性
delete person14.name;
console.log("name" in person14);       //true         不可删除属性
console.log(person14.name);           //zhang
var descriptor = Object.getOwnPropertyDescriptor(person14,"name");
console.log(descriptor.configurable);               // false      属性的[[Configurable]]被置为false
//对象冻结
//一个被冻结的对象不能添加新属性，不能删除属性，不能改变属性类型（数据属性访问器属性互转），不能写属性。只能读对象的属性。
var person15 = {
    name : "wang"
}
console.log(Object.isExtensible(person15));    // true
console.log(Object.isSealed(person15));        // false
console.log(Object.isFrozen(person15));        // false
Object.freeze(person15);    //冻结对象
console.log(Object.isExtensible(person15));    // false
console.log(Object.isSealed(person15));        // true
console.log(Object.isFrozen(person15));        // true
person15.sayName = function(){
    console.log(this.name)
}
console.log("sayName" in person15);     //false       不可添加属性
person15.name = "zhang";
console.log(person15.name);            //wang         不可写属性，只能读属性
delete person15.name;
console.log("name" in person15);       //true         不可删除属性
console.log(person15.name);           //wang
var descriptor = Object.getOwnPropertyDescriptor(person15,"name");
console.log(descriptor.configurable);               // false      属性的[[Configurable]]被置为false
console.log(descriptor.writable);                   // false      属性的[[Writable]]被置为false

