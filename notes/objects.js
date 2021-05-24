/* 
Storing and retreiving data.
object literal 
*/

const myObject = {
  property: "Value",
  otherProperty: 77,
  "obnoxious property": function () {
    //do stuff
  },
};

//we can access them using the following

//dot notation to get data
myObject.property; // "Value"

//bracket noation
myObject["obnoxious property"]; // [Function]

/* 
Dot noation preferred, but some sometime there are times
when the bracket noation cant no be helped for example for myObject."obnoxius property"
will not work

like wise cant use variables in dot noation
*/

//Design patterns with objects

const playerOne = {
  name: "Tim",
  marker: "X",
};
const playerTwo = {
  name: "Anna",
  marker: "O",
};

// now we can print object key/value pairs passed into the argument
function printName(player) {
  console.log(player.name);
}

printName(playerOne);

//example of making a constructor function
function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.info = function () {
    return `${title} the author ${author}, and the number of pages ${pages}`;
  };
}
const thehobbit = new Book("The Hobbit", "J.R.R Tolkien", 295);

console.log(thehobbit.info());
