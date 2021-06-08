const signUpForm = document.getElementById("signUpForm");
const email = document.getElementById("email");
const errorEmail = document.querySelector("#email + span.errorEmail");
const password = document.getElementById("password");
const errorPass = document.querySelector("#password + span.errorPass");
const passwordConf = document.getElementById("passwordConf");
const errorPassConf = document.querySelector(
  "#passwordConf + span.errorPassConf"
);
const zipcode = document.getElementById("zipcode");
const errorZipcode = document.querySelector("#zipcode + span.errorZip");
const country = document.getElementById("country");
const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const zipCodeRegex = /^\d{5}$/;

//confirm email (show error here)
email.addEventListener("input", function (e) {
  // Each time the user types something, we check if the
  // form fields are valid.

  if (email.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    errorEmail.textContent = ""; // Reset the content of the message
    errorEmail.className = "error"; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showError();
  }
});

//confirm password (show error here)
password.addEventListener("input", function (e) {
  // Each time the user types something, we check if the
  // form fields are valid.

  if (password.validity.valid) {
    errorPass.textContent = "";
    errorPass.className = "error";
  } else {
    showError();
  }
});

//confirm confirmation passwordConf (show error here)
passwordConf.addEventListener("input", function (e) {
  if (passwordConf.validity.valid) {
    errorPassConf.textContent = "";
    errorPassConf.className = "error";
  } else {
    showError();
  }
});

//confirm zipcode (show error here)
zipcode.addEventListener("input", function (e) {
  // Each time the user types something, we check if the
  // form fields are valid.
  if (zipcode.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    errorZipcode.textContent = ""; // Reset the content of the message
    errorZipcode.className = "error"; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showError();
  }
});

//form submit
signUpForm.addEventListener("submit", function (e) {
  // if the email field is valid, we let the form submit
  if (!email.validity.valid) {
    // If it isn't, we display an appropriate error message
    showError();
    // Then we prevent the form from being sent by canceling the event
    e.preventDefault();
  }
  if (!password.validity.valid) {
    showError();
    e.preventDefault();
  }
  if (!passwordConf.validity.valid) {
    showError();
    e.preventDefault();
  }
  if (!zipcode.validity.valid) {
    showError();
    e.preventDefault();
  }
});

//function to show the error
function showError() {
  //error for email
  if (email.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    errorEmail.textContent = "You need to enter an e-mail address.";
  } else if (email.validity.typeMismatch) {
    // If the field doesn't contain an email address,
    // display the following error message.
    errorEmail.textContent = "Entered value needs to be an e-mail address.";
  } else if (email.validity.tooShort) {
    // If the data is too short,
    // display the following error message.
    errorEmail.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }
  // Set the styling appropriately
  errorEmail.className = "error active";

  //error for password
  if (password.validity.valueMissing) {
    errorPass.textContent = "You need to enter a password.";
  } else if (email.validity.typeMismatch) {
    errorPass.textContent = "Entered at-least 8 characters.";
  } else if (email.validity.tooShort) {
    errorPass.textContent = `Password should be at least ${password.minLength} characters; you entered ${password.value.length}.`;
  }
  errorPass.className = "error active";

  //error for passwordconf
  if (passwordConf.value != password.value) {
    passwordConf.validity.valueMissing;
    errorPassConf.textContent = "Needs to match password above.";
    return;
  }
  errorPassConf.className = "error active";

  //error for zipcode
  if (zipcode.validity.valueMissing) {
    errorZipcode.textContent = "Needs to be zipcode";
  } else if (zipcode.validity.typeMismatch) {
    errorZipcode.textContent = "Entered at-least 8 characters.";
  } else if (zipcode.validity.tooShort) {
    errorZipcode.textContent = `Password should be at least ${zipcode.minLength} characters; you entered ${zipcode.value.length}.`;
  }
  errorZipcode.className = "error active";
}
