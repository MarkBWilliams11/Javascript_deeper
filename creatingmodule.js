/* 
IIFE (immediately invoked function expression) with a function inside:
*/

//module  myModule used for exporting
var myModule = (function () {
  ("use strict"); // Strict mode will protect from more dangerous parts in JavaScript.
  // Your code here
  // All function and variables are scoped to this function

  var _privateProperty = "Hello World";
  var publicProperty = "I am a public property";

  //private method
  function _privateMethod() {
    console.log(_privateProperty);
  }

  //public method
  function publicMethod() {
    _privateMethod();
  }

  return {
    //returns public method, priavte method is not returned here, so not available at the global scope
    publicMethod: publicMethod,
    publicProperty: publicProperty,
  };
})();

myModule.publicMethod(); // outputs 'Hello World'
console.log(myModule.publicProperty); // outputs 'I am a public property'
//console.log(myModule._privateProperty); // is undefined protected by the module closure
//myModule._privateMethod(); // is TypeError protected by the module closure

//Formatter example
//
const documentMock = (() => ({
  querySelector: (selector) => ({
    innerHTML: null,
  }),
}))();

const Formatter = (function (doc) {
  const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);
  const timesRun = [];

  const makeUppercase = (text) => {
    log("Making uppercase");
    timesRun.push(null);
    return text.toUpperCase();
  };

  //dependecy
  const writeToDOM = (selector, message) => {
    doc.querySelector(selector).innerHTML = message;
  };
  //public methods
  return {
    writeToDOM,
    makeUppercase,
    timesRun,
  };
})(document || documentMock);

console.log(Formatter.makeUppercase("tomek"));
console.log(Formatter.makeUppercase("tomek"));
console.log(Formatter.makeUppercase("tomek"));
console.log(Formatter.timesRun.length); //it was run 3 times

Formatter.writeToDOM("#targetId", "Hi there"); //<div id="targetId">Hi there</div>
//!Note: things can be overwritten in the global scope
Formatter.timesRun = 10;
console.log(Formatter.timesRun);
