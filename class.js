//Then use new MyClass() to create a new object with all the listed methods.
class MyClass {
  // constructor() called by new keyword can initialize the object
  constructor(name) {
    this.name = name;
  }

  //getter
  get name() {
    return this._name;
  }
  //setter
  set name(value) {
    if (value.length < 4) {
      console.log("Name is too short.");
      return;
    }
    this._name = value;
  }
  //plubic method
  method1() {
    console.log(`this is method 1 ${this.name}`);
  }
}

// Usage:
let user = new MyClass("John");
console.log(user.name);

user = new MyClass("");
user.method1();
/* 
MyClass.prototype contains 
methods 1,2,3
constructor: MyClass

*/
