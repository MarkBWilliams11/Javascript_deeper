// The recommended method for Prototypal inheritance
/* 
setting  the prototype of an object is "Object.create"
creates a new object
with the specified prototype and any additional properties added
*/
function Student() {}

Student.prototype.sayName = function () {
  console.log(this.name);
};

function EighthGrader(name) {
  this.name = name;
  this.grade = 8;
}

EighthGrader.prototype = Object.create(Student.prototype);

const carl = new EighthGrader("carl");
carl.sayName(); // console.logs "carl"
carl.grade; // 8

// note: this does not work: EighthGrader.prototype = Student.prototype

//Another example
const dog = {
  init: function (sound) {
    this.sound = sound;
  },
  makeSound: function () {
    console.log(this.sound);
  },
};

const max = Object.create(dog).init("woof");
max.makeSound();
console.log("max is a dog?", dog.isPrototypeOf(max));
