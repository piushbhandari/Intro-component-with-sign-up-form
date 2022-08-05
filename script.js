const submitFormBtn = document.querySelector(".box__cta");
const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
submitFormBtn.addEventListener("click", validateForm);

function validateForm(e) {
  e.preventDefault();
  let isFNameValid = validateText(fname, fname.value);
  let isLNameValid = validateText(lname, lname.value);
  let isPasswordValid = validatePassword(password, password.value);
  let isEmailValid = validateEmail(email, email.value);

  let isFormValid =
    isFNameValid && isLNameValid && isPasswordValid && isEmailValid;

  if (isFormValid) {
    e.target.textContent = "Success!";
    showSuccess([fname, lname, email, password]);
    setTimeout(() => {
      e.target.textContent = "Claim your free trial";
    }, 3000);
  }
}

function validateText(input, val) {
  let valid = true;
  if (val.length === 0) {
    valid = false;
    showError("Field cannot be empty fren", input);
  } else {
    input.classList.add("success");
  }
  return valid;
}
function validatePassword(input, val) {
  let valid = true;
  let strongPass =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100000}$/;
  if (!val) {
    valid = false;
    showError("Field cannot be empty fren", input);
  } else if (val.length < 8) {
    valid = false;
    showError("password cannot be less than 8 characters", input);
  } else if (!strongPass.test(val)) {
    valid = false;
    showError(
      "password needs 1 uppercase, lower, number, and special character",
      input
    );
  } else {
    input.classList.add("success");
  }
  return valid;
}
function validateEmail(input, val) {
  let valid = true;
  let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!val) {
    showError("Field cannot be empty fren", input);
  } else if (!validRegex.test(val)) {
    valid = false;
    showError("please provide a valid email address", input);
  } else {
    input.classList.add("success");
  }

  return valid;
}

function showError(errMsg, input) {
  input.classList.add("active-error");
  let errElement = input.nextElementSibling;
  errElement.style.display = "block";
  errElement.textContent = errMsg;
}

function showSuccess(arrInputs) {
  arrInputs.forEach((input) => {
    let errElement = input.nextElementSibling;
    errElement.style.display = "none";
    input.classList.remove("active-error");
    input.classList.add("success");
    removeStyles(input, "success");
  });
}

function removeStyles(input, style) {
  setTimeout(() => {
    input.classList.remove(style);
    input.value = "";
  }, 3000);
}
