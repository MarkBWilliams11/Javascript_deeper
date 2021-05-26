//Prototype Property
/* 
Every Javascript function has prototype property (empty by default).
  can attach properties and methods.

  -not enumerable(isnt accessible in for/in loop)

  but some browsers offer _proto_(alternatice syntax), allows
  aceess an object's prototype property (primarily for inheritance)
  making properties and methods avaiable to instances of the objecta

*/

//Proptotype Atrribute
/* 
The prototype attribute (like the characteristics of an object)
  an object prototype points to the "parent" for it properities

  The prototype attribute is normally referred to as the prototype obejct,
  it is automaically set when we create a new object.
  (lineage of the parent object)

*/
function PrintStuff(myDocuments) {
  this.documents = myDocuments;
}
// We add the print () method to PrintStuff prototype property so that other instances (objects) can inherit it:
PrintStuff.prototype.print = function () {
  console.log(this.documents);
};
// Create a new object with the PrintStuff () constructor, thus allowing this new object to inherit PrintStuff's properties and methods.
var newObj = new PrintStuff("I am a new Object and I can print.");
// newObj inherited all the properties and methods, including the print method, from the PrintStuff function. Now newObj can call print directly, even though we never created a print () method on it.
newObj.print(); //I am a new Object and I can print.

//Constructors

/* 
A constructor is a function used for initiziing new objects, using the new keyword 
to call the constructor
*/
//ex:
function Account() {}
// This is the use of the Account constructor to create the userAccount object.
var userAccount = new Account();

//Note: constructor property holds or points to the constuctor of the object
//The constructor in this example is Object ()
var myObj = new Object();
// And if you later want to find the myObj constructor:
console.log(myObj.constructor); // Object()

// Another example: Account () is the constructor
var userAccount = new Account();
// Find the userAccount object's constructor
console.log(userAccount.constructor); // Account()

// The userAccount object inherits from Object and as such its prototype attribute is Object.prototype.
var userAccount = new Object();
// This demonstrates the use of an object literal to create the userAccount object;
// the userAccount object inherits from Object; therefore, its prototype attribute is Object.prototype just as the userAccount object does above.
var userAccount = { name: "Mike" };

//Demonstration of Inheritance in JavaScript:
function Plant() {
  this.country = "Mexico";
  this.isOrganic = true;
}

// Add the showNameAndColor method to the Plant prototype property
Plant.prototype.showNameAndColor = function () {
  console.log("I am a " + this.name + " and my color is " + this.color);
};

// Add the amIOrganic method to the Plant prototype property
Plant.prototype.amIOrganic = function () {
  if (this.isOrganic) console.log("I am organic, Baby!");
};

function Fruit(fruitName, fruitColor) {
  this.name = fruitName;
  this.color = fruitColor;
}

// Set the Fruit's prototype to Plant's constructor, thus inheriting all of Plant.prototype methods and properties.
Fruit.prototype = new Plant();

// Creates a new object, aBanana, with the Fruit constructor
var aBanana = new Fruit("Banana", "Yellow");

// Here, aBanana uses the name property from the aBanana object prototype, which is Fruit.prototype:
console.log(aBanana.name); // Banana

// Uses the showNameAndColor method from the Fruit object prototype, which is Plant.prototype. The aBanana object inherits all the properties and methods from both the Plant and Fruit functions.
console.log(aBanana.showNameAndColor()); // I am a Banana and my color is yellow.

//This example demonstrates the prototype chain of an object’s prototype object:

var myFriends = { name: "Pete" };
/* To find the name property below, the search will begin directly on 
the myFriends object and will immediately find the name property because 
we defined the property name on the myFriend object. This could be thought
of as a prototype chain with one link.*/
console.log(myFriends.name);
/*  
In this example, the search for the toString () method will also 
begin on the myFriends’ object, but because we never created a toString 
method on the myFriends object, the compiler will then search for it on 
the myFriends prototype (the object which it inherited its properties from).

And since all objects created with the object literal inherits from Object.
prototype, the toString method will be found on Object.prototype—see important 
note below for all properties inherited from Object.prototype. 
 */
myFriends.toString();

//Note: Object.prtotpype properties inherited by all objects
/* 
The inheried properties and methods are constructor, hasOwnProperty(),
isPrototypeOf(), propertyIsEnumerable(), toLocaleString(), toString(), and valueOf()
*/
function People() {
  this.superstar = "Michael Jackson";
}
// Define "athlete" property on the People prototype so that "athlete" is
//accessible by all objects that use the People () constructor.
People.prototype.athlete = "Tiger Woods";

var famousPerson = new People();
famousPerson.superstar = "Steve Jobs";

/* The search for superstar will first look for the superstar
property on the famousPerson object, and since we defined it there, 
that is the property that will be used. Because we have overwritten 
the famousPerson’s superstar property with one directly on
 the famousPerson object, the search will NOT proceed up the prototype chain.  */

console.log(famousPerson.superstar); // Steve Jobs

// Note that in ECMAScript 5 you can set a property to read only, and in that case you cannot overwrite it as we just did.

// This will show the property from the famousPerson prototype (People.prototype), since the athlete property was not defined on the famousPerson object itself.
console.log(famousPerson.athlete); // Tiger Woods

/*  
In this example, the search proceeds up the prototype chain and
find the toString method on Object.prototype, from which the Fruit 
object inherited—all objects ultimately inherits from Object.prototype 
as we have noted before.
 */
console.log(famousPerson.toString()); // [object Object]

/* 
Accesor properties are an execpetion, as assigment is handled by a setter funtion. so writing 
to such a property is actually the same as calling a function
*/

let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  },
};

let admin = {
  __proto__: user,
  isAdmin: true,
};

alert(admin.fullName); // John Smith (*)

// setter triggers!
admin.fullName = "Alice Cooper"; // (**)

alert(admin.fullName); // Alice Cooper, state of admin modified
alert(user.fullName); // John Smith, state of user protected

/* 
The value of this 

No matter where the method found in a object or its prototype.in a method call, "this"
is always the object before the dot.
*/
// animal has methods
let animal = {
  eats: true,
  walk() {
    if (!this.isSleeping) {
      alert(`I walk`);
    }
  },
  sleep() {
    this.isSleeping = true;
  },
};

let rabbit = {
  jumps: true,
  name: "White Rabbit",
  __proto__: animal,
};

// modifies rabbit.isSleeping
rabbit.sleep();

alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined (no such property in the prototype)

/* 
for..in loop iterates over inherited properties too
*/

// Object.keys only returns own keys
alert(Object.keys(rabbit)); // jumps

// for..in loops over both own and inherited keys
for (let prop in rabbit) alert(prop); // jumps, then eats

/* 

If we want to exclude inherited properties, theres is a built-in method obj.hasOwnProperty(key)
returns true if "obj" has its own property named "key"
*/

for (let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);

  if (isOwn) {
    alert(`Our: ${prop}`); // Our: jumps
  } else {
    alert(`Inherited: ${prop}`); // Inherited: eats
  }
}

//note: for...in is not enumerable it only lists enumerable properties
