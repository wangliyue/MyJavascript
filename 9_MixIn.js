//混入 Mixin
//Javascript中大量使用了伪类继承和原型对象继承，还有另一种伪继承的手段叫混入。
//一个对象在不改变原型对象链的情况下得到另一个对象的属性被称为混入。
function mixin(receiver,supplier){
    for (var property in supplier){
        if(supplier.hasOwnProperty(property)){
            receiver[property] = supplier[property];
        }
    }
    return receiver;
}

//例子
function EventTarget(){
}
EventTarget.prototype = {
    constructor : EventTarget,
    addListener : function (type,listener){
        if(!this.hasOwnProperty("_listeners")){
            this._listeners = [];
        }
        if(typeof this._listeners[type] == "undefined"){
            this._listeners[type] = [];
        }
        this._listeners[type].push(listener);
    },
    fire : function(event){
        if(!event.target){
            event.target = this;
        }
        if(!event.type){
            throw new Error("Event Object missing 'type' property.")
        }
        if(this._listeners && this._listeners[event.type] instanceof Array){
            var listeners = this._listeners[event.type];
            for(var i = 0, len = listeners.length; i < len; i++){
                listeners[i].call(this,event);
            }
        }
    },
    removeListener : function(type,listener){
        if(this._listeners && this._listeners[event.type] instanceof Array){
            var listeners = this._listeners[event.type];
            for(var i = 0, len = listeners.length; i < len; i++){
                if(listeners[i]===listener){
                    listeners.splice(i,1);
                    break;
                }
            }
        }
    }
}
//使用如下
var target = new EventTarget();
target.addListener("message",function(event){
    console.log("Message is " + event.data);
});
target.fire({
    type : "message",
    data : "Hello world!"
});                         // Message is Hello world!
// 如何让 person对象也支持事件？
// 如下，person拥有事件支持，但是person对象被构造为一个EventObject，不合适
var person = new EventTarget();
person.name = "wang";
person.sayName = function(){
    console.log(this.name);
    this.fire({
        type : "namesaid",
        name : name
    })
};
// 通过伪类继承
function Person(name){
    this.name = name;
}
Person.prototype = Object.create(EventTarget.prototype);    //Person构造函数的原型对象的原型对象指向EventTarget构造函数原型对象
Person.prototype.constructor = Person;
Person.prototype.sayName = function(){
    console.log(this.name);
    this.fire({
        type : "namesaid",
        name : name
    })
};
var person1 = new Person("wang");
console.log(person1 instanceof Person);      //true
console.log(person1 instanceof EventTarget); //true        person对象，还是一种EventObject？
// 通过混入
function NewPerson(name){
    this.name = name;
}
mixin(Person.prototype,new EventTarget());
mixin(Person.prototype,{
    constructor : NewPerson,
    sayName : function() {
        console.log(this.name);
        this.fire({
            type: "namesaid",
            name: name
        });
    }
});
var person2 = new NewPerson("wang");
console.log(person2 instanceof NewPerson);    //true
console.log(person2 instanceof EventTarget);  //false


//作用域安全的构造函数
//构造函数也是函数，所以可以不用new操作符直接调用它们来改变this的值。在非严格模式下，this被强制指向全局对象，这么做会导致无法预知的结果。
function NotSafePerson(name){
    this.name = name;
}
NotSafePerson.prototype.sayName = function(){
    console.log(this.name);
}
var person3 = NotSafePerson("wang");
console.log(person3 instanceof NotSafePerson);     //false
console.log(typeof person3);                       //undefined
console.log(name);                                 //wang
// 很多内建函数如Array和RegExp不需要new，也可以工作正常，这是因为它们被设计为作用域安全的构造函数。
function SafePerson(name){
    if(this instanceof SafePerson){
        //called with "new"
        this.name = name;
    }else{
        //called without "new"
        return new SafePerson(name);
    }
}
var person4 = new SafePerson("wang");
var person5 = SafePerson("li");
console.log(person4 instanceof SafePerson);       //true
console.log(person5 instanceof SafePerson);       //true