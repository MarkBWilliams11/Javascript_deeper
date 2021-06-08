/* 
built-in form validation

required: Specifices whether a form needs to be filed in before the form
can be submitted. Default

minlength and maxlength: Specifices the minimum and maximum length of textual data(strings)

min and max: Specifices the minimum and maximum values of numerical input types

type: Specifices whether the data needs to be a number, an email address, or some other specific type
preset type

pattern: Specifices a regular expression that defines a pattern the entered data needs to follow.

*/

/* 
Constraint Validation API

HTMLButtonElement (represents  a <button> element)
HTMLFieldSetElement (represents  a <fieldset> element)
HTMLInputElement (represents  a <input> element)
HTMLOutputElement (represents  a <output> element)
HTMLSelectElement (represents  a <select> element)
HTMLTextAreaElement (represents  a <textarea> element)

validationMessage: Returns a localized message describing the validation constraints that
the control doesn't satisfy (if any). If the control is not a candidate for constraint 
validation (willValidate is false) or the element's value satisfies its constraints
  (is valid), this will return an empty string.

validity: Returns a ValidityState object that contains several properties describing the
validity state of the element. You can find full details of all the available properties 
in the ValidityState reference page; below is listed a few of the more common ones:

patternMismatch: Returns true if the value does not match the specified pattern, and false 
if it does match. If true, the element matches the :invalid CSS pseudo-class.

tooLong: Returns true if the value is longer than the maximum length specified by the 
maxlength attribute, or false if it is shorter than or equal to the maximum. If true,
the element matches the :invalid CSS pseudo-class.

tooShort: Returns true if the value is shorter than the minimum length specified by 
the minlength attribute, or false if it is greater than or equal to the minimum. 
If true, the element matches the :invalid CSS pseudo-class.

rangeOverflow: Returns true if the value is greater than the maximum specified by the max
attribute, or false if it is less than or equal to the maximum. If true, the element matches
valid and :out-of-range CSS pseudo-classes.

rangeUnderflow: Returns true if the value is less than the minimum specified by the min 
attribute, or false if it is greater than or equal to the minimum. 
If true, the element matches the :invalid and :out-of-range CSS pseudo-classes.

typeMismatch: Returns true if the value is not in the required syntax 
(when type is email or url), or false if the syntax is correct. 
If true, the element matches the :invalid CSS pseudo-class.

valid: Returns true if the element meets all its validation constraints, and is 
therefore considered to be valid, or false if it fails any constraint.
If true, the element matches the :valid CSS pseudo-class; 
the :invalid CSS pseudo-class otherwise.

valueMissing: Returns true if the element has a required attribute, but no value,
or false otherwise. If true, the element matches the :invalid CSS pseudo-class.

willValidate: Returns true if the element will be validated when the form is submitted; 
false otherwise.

The Constraint Validation API also makes the following methods available on the above elements.

checkValidity(): Returns true if the element's value has no validity problems; false otherwise. If the element is invalid, this method also fires an invalid event on the element.

setCustomValidity(message): Adds a custom error message to the element; if you set a custom error message, the element is considered to be invalid, and the specified error is displayed. This lets you use JavaScript code to establish a validation failure other than those offered by the standard HTML5 validation constraints. The message is shown to the user when reporting the problem.


*/

/* const email = document.getElementById("mail");

email.addEventListener("input", function (event) {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("I am expecting an e-mail address!");
  } else {
    email.setCustomValidity("");
  }
}); */

/*Example using constraints

// There are many ways to pick a DOM node; here we get the form itself and the email
// input box, as well as the span element into which we will place the error message.
const form = document.getElementsByTagName("form")[1]; //not first form but next form on currrent page
console.log(form);

const email = document.getElementById("mail");
const emailError = document.querySelector("#mail + span.error");

email.addEventListener("input", function (event) {
  // Each time the user types something, we check if the
  // form fields are valid.

  if (email.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    emailError.textContent = ""; // Reset the content of the message
    emailError.className = "error"; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showError();
  }
});

form.addEventListener("submit", function (event) {
  // if the email field is valid, we let the form submit

  if (!email.validity.valid) {
    // If it isn't, we display an appropriate error message
    showError();
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();
  }
});

function showError() {
  if (email.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    emailError.textContent = "You need to enter an e-mail address.";
  } else if (email.validity.typeMismatch) {
    // If the field doesn't contain an email address,
    // display the following error message.
    emailError.textContent = "Entered value needs to be an e-mail address.";
  } else if (email.validity.tooShort) {
    // If the data is too short,
    // display the following error message.
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }

  // Set the styling appropriately
  emailError.className = "error active";
}
*/

/* Not using constraints */
// There are fewer ways to pick a DOM node with legacy browsers
const form = document.getElementsByTagName("form")[1];
const email = document.getElementById("mail");

// The following is a trick to reach the next sibling Element node in the DOM
// This is dangerous because you can easily build an infinite loop.
// In modern browsers, you should prefer using element.nextElementSibling
let error = email;
while ((error = error.nextSibling).nodeType != 1);

// As per the HTML5 Specification
const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Many legacy browsers do not support the addEventListener method.
// Here is a simple way to handle this; it's far from the only one.
function addEvent(element, event, callback) {
  let previousEventCallBack = element["on" + event];
  element["on" + event] = function (e) {
    const output = callback(e);

    // A callback that returns `false` stops the callback chain
    // and interrupts the execution of the event callback.
    if (output === false) return false;

    if (typeof previousEventCallBack === "function") {
      output = previousEventCallBack(e);
      if (output === false) return false;
    }
  };
}

// Now we can rebuild our validation constraint
// Because we do not rely on CSS pseudo-class, we have to
// explicitly set the valid/invalid class on our email field
addEvent(window, "load", function () {
  // Here, we test if the field is empty (remember, the field is not required)
  // If it is not, we check if its content is a well-formed e-mail address.
  const test = email.value.length === 0 || emailRegExp.test(email.value);

  email.className = test ? "valid" : "invalid";
});

// This defines what happens when the user types in the field
addEvent(email, "input", function () {
  const test = email.value.length === 0 || emailRegExp.test(email.value);
  if (test) {
    email.className = "valid";
    error.textContent = "";
    error.className = "error";
  } else {
    email.className = "invalid";
  }
});

// This defines what happens when the user tries to submit the data
addEvent(form, "submit", function () {
  const test = email.value.length === 0 || emailRegExp.test(email.value);

  if (!test) {
    email.className = "invalid";
    error.textContent = "I expect an e-mail, darling!";
    error.className = "error active";

    // Some legacy browsers do not support the event.preventDefault() method
    return false;
  } else {
    email.className = "valid";
    error.textContent = "";
    error.className = "error";
  }
});
