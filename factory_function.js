//similar to constructor but instead the function returns the object
const personFactory = (name, age) => {
  const sayHello = () => console.log("Hi");
  return { name, age, sayHello };
};

const mac = personFactory("mac", 27);
console.log(mac.name);

//scope this
var myFunction = function () {
  console.log(this); // this = global, [object Window]
};
myFunction();

var myObject = {};
myObject.myMethod = function () {
  console.log(this); // this = Object { myObject }
};

//Private Scope

//define module
var Module = (function () {
  // private scope inside here
  var myModule = {};
  /* 
   These privately scoped functions are things like helpers, 
   addClass, removeClass, Ajax/XHR calls, Arrays, Objects, anything you can think of.
  */
  var _privateMethod = function () {
    console.log("hi");
  };
  myModule.publicMethod = function () {
    // has access to `privateMethod`, we can call it:
    // privateMethod();
    console.log("myMethod has been called.");
  };
  myModule.anotherPublicMethod = function () {};
  return myModule; // returns the Object with public methods
})();

// usage
Module.publicMethod();

//privateMethod(); //undefinded at the global scope

//Counter Example
const counterCreator = () => {
  let count = 0;
  return () => {
    console.log(count);
    count++;
  };
};
const counter = counterCreator();
console.log(
  counter(), // 0
  counter(), // 1
  counter(), // 2
  counter() // 3
);

//game example
const Player = (name, level) => {
  let health = level * 2;
  const getLevel = () => level;
  const getName = () => name;
  const die = () => {
    // uh oh
  };
  const damage = (x) => {
    health -= x;
    if (health <= 0) {
      die();
    }
  };
  const attack = (enemy) => {
    if (level < enemy.getLevel()) {
      damage(1);
      console.log(`${enemy.getName()} has damaged ${name}`);
    }
    if (level >= enemy.getLevel()) {
      enemy.damage(1);
      console.log(`${name} has damaged ${enemy.getName()}`);
    }
  };
  return { attack, damage, getLevel, getName };
};

const jimmie = Player("jim", 10);
const badGuy = Player("jeff", 5);
console.log(jimmie.attack(badGuy));

//using Object.assign it uses [[Get]] on the source and [[Set]] on the target

//cloning an obj
const obj = { a: 1 };
const copy0 = Object.assign({}, obj);
console.log(copy0); // { a: 1 }

//merging an obj
const atarget = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const returnedaTarget = Object.assign(atarget, source);
console.log(atarget);
// expected output: Object { a: 1, b: 4, c: 5 }
console.log(returnedaTarget);
// expected output: Object { a: 1, b: 4, c: 5 }

// Deep Clone
obj1 = { a: 0, b: { c: 0 } };
let obj3 = JSON.parse(JSON.stringify(obj1));
obj1.a = 4;
obj1.b.c = 4;
console.log(JSON.stringify(obj3)); // { "a": 0, "b": { "c": 0}}

//Merging objects with same properties
const o1 = { a: 1, b: 1, c: 1 };
const o2 = { b: 2, c: 2 };
const o3 = { c: 3 };
const somObj = Object.assign({}, o1, o2, o3);
console.log(somObj); // { a: 1, b: 2, c: 3 }

//Copying symbol-typed properties
const a1 = { a: 1 };
const a2 = { [Symbol("foo")]: 2 };
const objAnother = Object.assign({}, a1, a2);
console.log(objAnother); // { a : 1, [Symbol("foo")]: 2 } (cf. bug 1207182 on Firefox)
Object.getOwnPropertySymbols(objAnother); // [Symbol(foo)]

/* 
Properties on the prototype chain and non-enumerable properties cannot be copied
*/
const objSom1 = Object.create(
  { foo: 1 },
  {
    // foo is on obj's prototype chain.
    bar: {
      value: 2, // bar is a non-enumerable property.
    },
    baz: {
      value: 3,
      enumerable: true, // baz is an own enumerable property.
    },
  }
);
const copy = Object.assign({}, objSom1);
console.log(copy); // { baz: 3 }

//copy accessors
const objSom2 = {
  foo: 1,
  get bar() {
    return 2;
  },
};

let copy2 = Object.assign({}, objSom2);
console.log(copy2);
// { foo: 1, bar: 2 }
// The value of copy.bar is obj.bar's getter's return value.

// This is an assign function that copies full descriptors
function completeAssign(target, ...sources) {
  sources.forEach((source) => {
    let descriptors = Object.keys(source).reduce((descriptors, key) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
      return descriptors;
    }, {});

    // By default, Object.assign copies enumerable Symbols, too
    Object.getOwnPropertySymbols(source).forEach((sym) => {
      let descriptor = Object.getOwnPropertyDescriptor(source, sym);
      if (descriptor.enumerable) {
        descriptors[sym] = descriptor;
      }
    });
    Object.defineProperties(target, descriptors);
  });
  return target;
}

copy1 = completeAssign({}, objSom2);
console.log(copy1);
// { foo:1, get bar() { return 2 } }

//do nerdy stuff
const Person = (name) => {
  const sayName = () => console.log(`my name is ${name}`);
  return { sayName };
};
const Nerd = (name) => {
  // simply create a person
  const prototype = Person(name);
  const doSomethingNerdy = () => console.log("nerd stuff");
  return Object.assign({}, prototype, { doSomethingNerdy });
};
const jeff = Nerd("jeff");
jeff.sayName(); //my name is jeff
jeff.doSomethingNerdy(); // nerd stuff
