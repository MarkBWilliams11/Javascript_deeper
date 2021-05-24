//Prototype Property
/* 
Every Javascripty function has prototype property (empty by default).
  can attach properties and methods.

  -not enumerable(isnt accessible in for/in loop)

  but some browsers offer _proto_(alternatice syntax), allows
  aceess an object's prototype property (primarily for inheritance)
  making properties and methods avaiable to instances of the objecta

*/

//Proptotype Atrribute
/* 
The prototype attribute (like the characteristics od an object)
  an object prototype points tot the "parent" for it properities

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
